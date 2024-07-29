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
import {OverlayLoader} from "@/components/loader";
import { useRouter } from 'next/navigation';
import materials from "@/pages/dashboard/materials";
import {motion} from "framer-motion";
import Select from "react-select";

const Ads = () => {
    const {t} = useTranslation();
    const [search, setSearch] = useState('')
    const [warning, setWarning] = useState(false)
    const [technoValue, setTechnoValue] = useState(null)
    const [techno, setTechno] = useState({})

    const {register, handleSubmit, formState: {errors}} = useForm({values:techno})
    const router = useRouter();
    const {data: technos, isLoadingTechno} = useGetQuery({
        key: KEYS.technos,
        url: URLS.technos,
        params: {
            key: 'name',
            value: search,
            page_size: 100
        },
        enabled: !!(search)
    })



    const {mutate: addAds, isLoading} = usePostQuery({listKeyId: KEYS.myTechnos})



    useEffect(() => {
        if (!isEmpty(head(get(technos, 'data.results', [])))) {
            setTechno(find(get(technos, 'data.results', []), ({techno_csr_code}) => techno_csr_code === technoValue))
        }
    }, [technos, technoValue])

    const onSubmit = ({
                          techno_csr_code,
                          techno_description,
                          techno_price,
                          techno_price_currency,
                          techno_image,
                          techno_amount,
                          sertificate_blank_num,
                          sertificate_reestr_num,
                          techno_owner,
                          techno_measure
                      }) => {
        let formData = new FormData();
        formData.append('techno_name',techno_csr_code)
        formData.append('techno_description',techno_description)
        formData.append('techno_price',techno_price)
        formData.append('techno_price_currency', techno_price_currency)
        formData.append('techno_image', techno_image[0])
        formData.append('techno_amount',techno_amount)
        formData.append('sertificate_blank_num',sertificate_blank_num)
        formData.append('sertificate_reestr_num',sertificate_reestr_num)
        formData.append('techno_owner',techno_owner)
        formData.append('techno_amount_measure',techno_measure)
        formData.append('techno_measure',techno_measure)
        addAds({
                url: URLS.technoAddAds,
                attributes:formData
            },
            {
                onSuccess: () => {
                    toast.success("E'lon muvaffaqiyatli joylandi", {position: 'top-center'});
                    router.push('/dashboard/technos');
                },
                onError: (error) => {
                    toast.error(`Error is ${error},`, {position: 'top-right'})
                }
            }
        )
    }

    console.log('techno', techno)
    console.log('errors', errors)

    return (
        <Dashboard>
            <Subheader title={'Uskuna va qurilmalar bo\'limiga e’lon qo’shish'}/>
            <div className="p-7">
                {(isLoadingTechno || isLoading) && <OverlayLoader/>}
                <form className={'grid grid-cols-12 gap-x-[30px]'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'col-span-12 mb-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Qidiruv</h4>
                    </div>

                    <div className={'col-span-12  gap-x-[30px]'}>


                        <Select
                            isClearable
                            placeholder={'nomni rus tilida kiriting'}
                            options={get(technos, 'data.results', []).map(techno => ({
                                value: get(techno, 'techno_csr_code'),
                                label: get(techno, 'techno_name')
                            }))}
                            defaultValue={search}
                            onChange={(val) => setTechnoValue(get(val, 'value'))}
                            onKeyDown={debounce(function (e)  {
                                if(e.target.value.length > 3) {
                                    setSearch(e.target.value)
                                    setWarning(false)
                                } else {
                                    setWarning(true)
                                }
                            }, 500)}
                        />
                    </div>

                    {/*  techno bo'limi  */}
                    <div className={'col-span-12  gap-x-[30px] mt-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot bo’limi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input defaultValue={get(techno, 'techno_volume_name')}
                               placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  techno kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(techno, 'techno_category_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            disabled={true}
                        />
                    </div>

                    {/*  techno guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Mahsulot guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               defaultValue={get(techno, 'techno_group_name')}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  techno nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(techno, 'techno_name', )}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            {...register('techno_name', {required: true})}
                            disabled={true}
                        />
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('techno_owner', {required: true})}
                        />

                    </div>

                    {/* Uskuna/qurilma tavsifi */}
                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Mahsulot tavsifi</h4>
                        <textarea {...register('techno_description')} rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>


                    {/* Uskuna/qurilma narxi */}
                    <div className={'col-span-6 '}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot narxi</h4>
                        <div className={'flex items-center rounded-[5px]'}>
                            <input placeholder={'Uskuna/qurilma narxi'} type={'number'}
                                   {...register('techno_price', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl  my-[10px]'}
                                   required={true}
                            />

                            <select className={'p-[16px]'} {...register('techno_price_currency')}>
                                <option>UZS</option>
                                <option>USD</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>


                    {/* Uskuna/qurilma o'lchov birligi */}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot o’lchov birligi</h4>
                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               {...register('techno_measure')}
                               defaultValue={get(techno, 'techno_measure')}
                               disabled={true}
                        />
                    </div>


                    {/*Uskuna/qurilma miqdori*/}
                    <div className={'col-span-6 mt-[15px]'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot miqdori</h4>
                        <input placeholder={'Uskuna/qurilma miqdori'} type={'number'}
                               {...register('techno_amount', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />

                    </div>


                    {/*Uskuna/qurilma miqdor o’lchov birligi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base mt-[15px]'}>Mahsulot miqdor o’lchov birligi</h4>
                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               defaultValue={get(techno, 'techno_measure')}
                               {...register('techno_amount_measure')}
                               disabled={true}
                        />
                    </div>


                    {/*Uskuna/qurilma rasmi*/}
                    <div className={'col-span-6 mt-[15px]'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot rasmi</h4>
                        <label for="dropzone-file"
                               className={`shadow-2xl py-[20px] px-[30px] my-[10px] bg-${get(techno, 'techno_image')} rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] `}>
                                <Image src={'/icons/upload.svg'} alt={'upload'} width={48} height={48}/>
                                <p>yuklash</p>
                        </label>
                        <input id={"dropzone-file"}  type={"file"} accept={"image/png, image/jpeg, image/jpg"}
                               {...register('techno_image')}
                        />
                    </div>

                    <div className={'col-span-6 mt-[15px]'}>

                        {/*Uskuna/qurilma sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati blank raqami</h4>
                            <input placeholder={'Uskuna/qurilma sertifikati blank raqami'}
                                   {...register('sertificate_blank_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                                   required={true}
                            />
                        </div>

                        {/*Uskuna/qurilma sertifikati reestr raqami*/}
                        <div className={"mt-[15px]"}>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati reestr raqami</h4>
                            <input placeholder={'Uskuna/qurilma sertifikati reestr raqami'}
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

// defaultValue={(value, set) => (value * get(currency, `data[${get(set, 'techno_price_currency')}]`, 1) > 0)}