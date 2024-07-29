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
import {useRouter} from 'next/router';
import {motion} from "framer-motion";
import {warn} from "next/dist/build/output/log";
import {getDefaultValue, getOptionList} from "@/utils";
import Select from "react-select";

const Ads = () => {
    const {t} = useTranslation();
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(10);
    const [machineMechano, setMachineMechano] = useState({})
    const [machineMechanoValue, setMachineMechanoValue] = useState(null)
    const [warning, setWarning] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({values: machineMechano})
    const router = useRouter();


    const [file, setFile] = useState();

    function handleChange(e) {
        if (!e) {
            console.error("Event object is undefined or null");
            return;
        }
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }



    const {data: machineMechanos, isLoadingMachineMechano} = useGetQuery({
        key: KEYS.machinesMechanos,
        url: URLS.machinesMechanos,
        params: {
            key: 'name',
            value: search,
            page_size: 100
        },
        enabled: !!(search)
    })


    const {mutate: addAds, isLoading} = usePostQuery({listKeyId: KEYS.myMachineMechano})


    useEffect(() => {
        if (!isEmpty(head(get(machineMechanos, 'data.results', [])))) {
            setMachineMechano(find(get(machineMechanos, 'data.results', []), ({mmechano_csr_code}) => mmechano_csr_code === machineMechanoValue))
        }
    }, [machineMechanos, machineMechanoValue])

    const onSubmit = ({
                          mmechano_csr_code,
                          mmechano_description,
                          mmechano_rent_price,
                          mmechano_rent_price_currency,
                          mmechano_image,
                          mmechano_amount,
                          sertificate_blank_num,
                          sertificate_reestr_num,
                          mmechano_owner,
                          mmechano_measure,
                      }) => {
        let formData = new FormData();
        formData.append('mmechano_name', mmechano_csr_code)
        formData.append('mmechano_description', mmechano_description)
        formData.append('mmechano_rent_price', mmechano_rent_price)
        formData.append('mmechano_rent_price_currency', mmechano_rent_price_currency)
        formData.append('mmechano_image', mmechano_image[0])
        formData.append('mmechano_amount', mmechano_amount)
        formData.append('sertificate_blank_num', sertificate_blank_num)
        formData.append('sertificate_reestr_num', sertificate_reestr_num)
        formData.append('mmechano_owner', mmechano_owner)
        formData.append('mmechano_measure', mmechano_measure)
        addAds({
                url: URLS.machineMechanoAddAds,
                attributes: formData
            },
            {
                onSuccess: () => {
                    toast.success("E'lon muvaffaqiyatli joylandi", {position: 'top-center'});
                    router.push('/dashboard/machine-mechano');
                },
                onError: (error) => {
                    toast.error(`Error is ${error}`, {position: 'top-right'})
                }
            }
        )


    }



    return (
        <Dashboard>
            <Subheader title={'Mashina va mexanizmlar bo\'limiga e’lon qo’shish'}/>
            <div className="p-7">
                {(isLoadingMachineMechano || isLoading) && <OverlayLoader/>}
                <form className={'grid grid-cols-12 gap-x-[30px]'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'col-span-12 mb-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Qidiruv</h4>
                    </div>

                    <div className={'col-span-12  gap-x-[30px]'}>
                        {/*<input list={'search-list'} defaultValue={search} placeholder={'nomni rus tilida kiriting'}*/}
                        {/*       onChange={debounce(function (e) {*/}
                        {/*           if (e.target.value.length > 3) {*/}
                        {/*               setSearch(e.target.value)*/}
                        {/*               setWarning(false)*/}

                        {/*           } else {*/}
                        {/*               setWarning(true)*/}
                        {/*           }*/}
                        {/*       }, 500)}*/}
                        {/*       className={'placeholder:italic py-[15px] px-[20px] w-full shadow-xl rounded-[5px] relative'}*/}
                        {/*/>*/}
                        {/*{warning === true && <motion.p initial={{opacity: 0}}*/}
                        {/*                               animate={{opacity: 1, marginTop: 100}}*/}
                        {/*                               className={'text-red-800 mt-[10px]'}>Iltimos kamida 4 ta belgi*/}
                        {/*    kiriting.</motion.p>}*/}

                        {/*<datalist id={'search-list'} className={'w-[1000px]'}*/}
                        {/*          onChange={(e) => setPageSize(e?.target?.value)}>*/}

                        {/*    {*/}
                        {/*        get(materials, 'data.results', []).map(item => <option*/}
                        {/*            value={get(item, 'material_name')}></option>)*/}
                        {/*    }*/}
                        {/*</datalist>*/}

                        <Select
                            isClearable
                            placeholder={'nomni rus tilida kiriting'}
                            options={get(machineMechanos, 'data.results', []).map(machine => ({
                                value: get(machine, 'mmechano_csr_code'),
                                label: get(machine, 'mmechano_name')
                            }))}
                            defaultValue={search}
                            onChange={(val)=>setMachineMechanoValue(get(val,'value'))}
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
                            defaultValue={get(machineMechano, 'mmechano_category_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            disabled={true}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Mahsulot guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               defaultValue={get(machineMechano, 'mmechano_group_name')}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Mahsulot nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input

                            defaultValue={get(machineMechano, 'mmechano_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            {...register('mmechano_name', {required: true})}
                            disabled={true}
                        />
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('mmechano_owner', {required: true})}

                        />

                    </div>

                    {/* Material tavsifi */}
                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Mahsulot tavsifi</h4>
                        <textarea {...register('mmechano_description')} rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>


                    {/* Material narxi */}
                    <div className={'col-span-6 '}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot narxi</h4>
                        <div className={'flex items-center rounded-[5px]'}>
                            <input placeholder={''} type={'number'}
                                   {...register('mmechano_rent_price', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl  my-[10px]'}
                                   required={true}
                            />

                            <select className={'p-[16px]'} {...register('mmechano_rent_price_currency')}>
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
                               {...register('mmechano_measure')}
                               defaultValue={get(machineMechano, 'mmechano_measure')}
                               disabled={true}
                        />
                    </div>


                    {/*Material miqdori*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot miqdori</h4>
                        <input placeholder={'Material miqdori'} type={'number'}
                               {...register('mmechano_amount', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />

                    </div>


                    {/*Material miqdor o’lchov birligi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Mahsulot miqdor o’lchov birligi</h4>
                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               defaultValue={get(machineMechano, 'mmechano_measure')}
                               {...register('mmechano_amount_measure')}
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
                               {...register('mmechano_image')}
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