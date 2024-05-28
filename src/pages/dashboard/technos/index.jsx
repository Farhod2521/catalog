import React, {useState} from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import GridView from "../../../containers/grid-view";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import Image from "next/image";
import Button from "@/components/button";
import {useTranslation} from "react-i18next";
import Search from "@/layouts/dashboard/components/search";
import {get, isNil} from "lodash";
import {NumericFormat} from "react-number-format";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";
import Link from "next/link";
import usePutQuery from "@/hooks/api/usePutQuery";
import {OverlayLoader} from "@/components/loader";
import {toast} from "react-hot-toast";

const Technos = () => {
    const {t} = useTranslation();
    const [pageSize, setPageSize] = useState(20);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("")
    const [itemId, setItemId] = useState(null);

    const {data: currency} = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency,
    })
    const {mutate: deactivateRequest, isLoading: isLoadingDeActivate} = usePutQuery({
        listKeyId: KEYS.myTechnos
    })


    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span>{index}</span>
        },
        {
            title: 'Kodi',
            key: 'techno_code',
            render: ({value, row}) => <Link className={'underline'} href={`/technos/${get(row, 'techno_code')}`}>
                <span className={'text-[#28366D]'}>{value}</span>
            </Link>
        },
        {
            title: 'Nomi',
            key: 'techno_name',
        },
        {
            title: 'Narxi',
            key: 'techno_price',
            render: ({
                         value,
                         row
                     }) => (value * get(currency, `data[${get(row, 'techno_price_currency')}]`, 1) > 0 ?
                <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                               thousandSeparator={' '}

                               value={(value * get(currency, `data[${(get(row, 'techno_price_currency'))}]`, 1)).toFixed(2)}/> : t("by_order")),
            classnames: 'text-center'
        },
        {
            title: 'Miqdori',
            key: 'techno_measure',
            classnames: 'text-center'
        },
        {
            title: 'Joylangan vaqti',
            key: 'techno_created_date',
            render: ({value}) => dayjs(value).format("DD.MM.YYYY HH:mm ", "Asia/Tashkent"),
            classnames: 'text-center',
        },
        {
            title: 'Action',
            key: 'action',
            render: ({row}) =>                 <div className={"flex"}>
                <Link href={`/technos/${get(row, 'techno_code')}`} className={'mr-1.5 inline'}>
                    <Image className={'inline'} width={20} height={20}
                           src={'/icons/eye-icon.svg'}
                           alt={'eye'}/>
                </Link>
                <div className={'cursor-pointer'}>
                    <Image
                        className={'inline'} width={20} height={20}
                        src={'/icons/trash-icon.svg'}
                        onClick={() => setItemId(get(row, 'id'))}
                        alt={'trash'}
                    />

                </div>
            </div>
        }
    ]

    const deActivate = (_id) => {
        if(_id) {
            deactivateRequest({
                url: URLS.deactivateTechnos,
                attributes: {
                    id: _id
                }
            }, {
                onSuccess: () => {
                    toast.success('E‘lon muvaffaqiyatli o‘chirildi!', {position: 'top-center'})
                    setItemId(null);
                }
            })
        }


    }
    return (
        <Dashboard>
            <Subheader title={'Uskuna va qurilmalar'}/>
            <div className="p-7">
                {
                    isLoadingDeActivate && <OverlayLoader/>
                }
                <div className="grid grid-cols-12">
                    <div className={'col-span-12 flex items-center justify-between mb-[30px]'}>
                        <div className={'flex  items-center gap-x-[30px]'}>

                            <select className={'p-[10px] cursor-pointer'}
                                    onChange={(e) => setPageSize(e?.target?.value)} value={pageSize}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>

                            <span className={'ml-[10px]'}> {t("tadan ko'rish")} </span>

                            <div className={'w-[370px] h-[40px] flex relative '}>
                                <input type="search"
                                       placeholder={'Qidirish...'}
                                       onChange={(e) => setSearch(e?.target?.value)} value={search}
                                       className="bg-white h-[40px] w-[370px] pl-[50px]  rounded-lg focus:outline-none hover:cursor-pointer"
                                       name=""/>
                                <span className="absolute top-2 left-0 pl-4 z-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none">
                                                    <g clipPath="url(#clip0_1_1276)">
                                                        <rect width="24" height="24" fill="white"/>
                                                        <path
                                                            d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                                            stroke="#516164" strokeWidth="1.25" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                        <path d="M21 21L15 15" stroke="#516164" strokeWidth="1.25"
                                                              strokeLinecap="round" strokeLinejoin="round"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_1276">
                                                            <rect width="24" height="24" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                    </span>
                            </div>
                        </div>

                        <Button url={'/dashboard/technos/add-ads'}
                                className={'bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center'}>
                            <Image

                                className={'mr-1.5'} width={20} height={40} src={'/icons/plus.svg'}
                                alt={'plus'}
                            />{

                            t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className={'col-span-12 mb-[10px]'}>
                        <p className={'text-sm text-[#516164]'}>*<NumericFormat value={count}
                                                                                displayType={'text'}
                                                                                thousandSeparator={" "}/> ta natija
                            mavjud</p>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            getCount={setCount}
                            url={URLS.myTechnos}
                            key={KEYS.myTechnos}
                            columns={columns}
                            defaultPageSize={pageSize}
                            params={{value:search,key:'all'}}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 bg-black z-50 bg-opacity-30 flex justify-center items-center ${isNil(itemId) ? 'hidden' : 'visible'}`}>
                <div className={'w-[550px] p-[30px] rounded-[5px] bg-white'}>
                    <div>
                        <Image onClick={() => setItemId(null)} src={'/icons/closeModal.svg'} alt={'modalcloser'}
                               width={24} height={24} className={'float-right block cursor-pointer'}/>
                    </div>
                    <br/>

                    <div className={'flex items-center gap-x-[15px]'}>
                        <div
                            className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <Image src={'/images/warning.png'} alt={'warning'} width={30} height={30}/>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6  md:text-left">
                            <p className="font-bold">E'lonni o‘chirmoqchimisiz?</p>
                            <p className="text-sm text-gray-700 mt-1">O'chirish tugmasi bosilganidan so‘ng siz tanlagan
                                e'lon o‘chiriladi.
                            </p>
                        </div>
                    </div>

                    <div className={'text-center flex items-center gap-x-[20px] mt-[20px]'}>
                        <button onClick={() => deActivate(itemId)}
                                className={'block w-full px-4 py-3 md:py-2 bg-red-200 hover:bg-red-400 duration-300 transition-all text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2'}>O'chirish
                        </button>
                        <button onClick={() => setItemId(null)}
                                className={"block w-full  md:w-auto px-4 py-3 md:py-2 bg-gray-200 hover:bg-gray-400 transition-all duration-300 rounded-lg font-semibold text-sm  md:mt-0 md:order-1"}>Bekor
                            qilish
                        </button>
                    </div>


                </div>
            </div>
        </Dashboard>
    );
};

export default Technos;
