import React, {useEffect, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {debounce, head, get, isEmpty, find} from "lodash";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import useGetQuery from "@/hooks/api/useGetQuery";
import {useRouter} from 'next/navigation';
import Select from "react-select";

const Ads = () => {
    const {t} = useTranslation();
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(10);
    const [smallMechano, setSmallMechano] = useState({})
    const [smallMechanoValue, setSmallMechanoValue] = useState(null)
    const [warning, setWarning] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({values: smallMechano})
    const router = useRouter();


    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }



    const {data: smallMechanos, isLoadingSmallMechano} = useGetQuery({
        key: KEYS.smallMechanos,
        url: URLS.smallMechanos,
        params: {
            key: 'name',
            value: search,
            page_size: 100
        },
        enabled: !!(search)
    })


    const {mutate: addAds, isLoading} = usePostQuery({listKeyId: KEYS.mySmallMechano})


    useEffect(() => {
        if (!isEmpty(head(get(smallMechanos, 'data.results', [])))) {
            setSmallMechano(find(get(smallMechanos, 'data.results', []), ({smallmechano_csr_code}) => smallmechano_csr_code === smallMechanoValue))
        }
    }, [smallMechanos, smallMechanoValue])

    const onSubmit = ({
                          smallmechano_csr_code,
                          smallmechano_description,
                          smallmechano_rent_price,
                          smallmechano_rent_price_currency,
                          smallmechano_image,
                          smallmechano_amount,
                          sertificate_blank_num,
                          sertificate_reestr_num,
                          smallmechano_owner,
                          smallmechano_measure
                      }) => {
        let formData = new FormData();
        formData.append('smallmechano_name', smallmechano_csr_code)
        formData.append('smallmechano_description', smallmechano_description)
        formData.append('smallmechano_rent_price', smallmechano_rent_price)
        formData.append('smallmechano_rent_price_currency', smallmechano_rent_price_currency)
        formData.append('smallmechano_image', smallmechano_image[0])
        formData.append('smallmechano_amount', smallmechano_amount)
        formData.append('sertificate_blank_num', sertificate_blank_num)
        formData.append('sertificate_reestr_num', sertificate_reestr_num)
        formData.append('smallmechano_owner', smallmechano_owner)
        formData.append('smallmechano_amount_measure', smallmechano_measure)
        formData.append('smallmechano_measure', smallmechano_measure)
        addAds({
                url: URLS.smallMechanoAddAds,
                attributes: formData
            },
            {
                onSuccess: () => {
                    toast.success("E'lon muvaffaqiyatli joylandi", {position: 'top-center'});
                    router.push('/dashboard/small-mechano');
                },
                onError: (error) => {
                    toast.error(`Error is ${error}`, {position: 'top-right'})
                }
            }
        )


    }



    return (
        <Dashboard>
            <Subheader title={'Kichik mexanizatsiya bo\'limiga e’lon qo’shish'}/>
            <div className="p-7">

                <form className={'grid grid-cols-12 gap-x-[30px]'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'col-span-12 mb-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Qidiruv</h4>
                    </div>

                    <div className={'col-span-12  gap-x-[30px]'}>

                        <Select
                            isClearable
                            placeholder={'nomni rus tilida kiriting'}
                            options={get(smallMechanos, 'data.results', []).map(item => ({
                                value: get(item, 'smallmechano_csr_code'),
                                label: get(item, 'smallmechano_name')
                            }))}
                            defaultValue={search}
                            onChange={(val)=>setSmallMechanoValue(get(val,'value'))}
                            onKeyDown={debounce(function (e) {
                                if(e.target.value.length > 3) {
                                    setSearch(e.target.value)
                                    setWarning(false)

                                } else {
                                    setWarning(true)
                                }
                            }, 500)}
                        />


                    </div>



                    {/*  material kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px] mt-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(smallMechano, 'smallmechano_category_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            disabled={true}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px] mt-[20px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Mahsulot guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               defaultValue={get(smallMechano, 'smallmechano_group_name')}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px] mt-[20px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input

                            defaultValue={get(smallMechano, 'smallmechano_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            {...register('smallmechano_name', {required: true})}
                            disabled={true}
                        />
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('smallmechano_owner', {required: true})}

                        />

                    </div>

                    {/* Material tavsifi */}
                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Mahsulot tavsifi</h4>
                        <textarea {...register('smallmechano_description')} rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>


                    {/* Material narxi */}
                    <div className={'col-span-6 '}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot narxi</h4>
                        <div className={'flex items-center rounded-[5px]'}>
                            <input placeholder={''} type={'number'}
                                   {...register('smallmechano_rent_price', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl  my-[10px]'}
                                   required={true}
                            />

                            <select className={'p-[16px]'} {...register('smallmechano_rent_price_currency')}>
                                <option>UZS</option>
                                <option>USD</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>


                    {/* Material o'lchov birligi */}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot o’lchov birligi</h4>
                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               {...register('smallmechano_measure')}
                               defaultValue={get(smallMechano, 'smallmechano_measure')}
                               disabled={true}
                        />
                    </div>


                    {/*Material miqdori*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot miqdori</h4>
                        <input placeholder={'Kichik mexanizatsiya miqdori'} type={'number'}
                               {...register('smallmechano_amount', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />

                    </div>


                    {/*Material miqdor o’lchov birligi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot miqdor o’lchov birligi</h4>
                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               defaultValue={get(smallMechano, 'smallmechano_measure')}
                               {...register('smallmechano_amount_measure')}
                               disabled={true}
                        />
                    </div>


                    {/*Material rasmi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot rasmi</h4>
                        <label htmlFor="dropzone-file"
                               className={'shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white'}>
                            <Image src={'/icons/upload.svg'} alt={'upload'} width={48} height={48}/>
                            <p>yuklash</p>
                        </label>
                        <input id={"dropzone-file"} type={"file"} accept={"image/png, image/jpeg, image/jpg"}
                               onChange={handleChange}
                               {...register('smallmechano_image')}
                        />

                    </div>

                    <div className={'col-span-6'}>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati blank raqami</h4>
                            <input placeholder={'Mahsulot sertifikati blank raqami'}
                                   {...register('sertificate_blank_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                                   required={true}
                            />
                        </div>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati reestr raqami</h4>
                            <input placeholder={'Mahsulot sertifikati reestr raqami'}
                                   {...register('sertificate_reestr_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                                   required={true}
                            />
                        </div>
                    </div>

                    <button
                        className={'col-span-12 w-[170px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]'}>
                        <p>Saqlash</p>
                    </button>
                </form>
            </div>
        </Dashboard>
    );
};

export default Ads;

// converting money

// defaultValue={(value, set) => (value * get(currency, `data[${get(set, 'material_price_currency')}]`, 1) > 0)}