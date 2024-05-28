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
import Select from "react-select";
import useGetOneQuery from "@/hooks/api/useGetOneQuery";
import usePutQuery from "@/hooks/api/usePutQuery";

const Index = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('')
    const [work, setWork] = useState({})
    const [workValue, setWorkValue] = useState(null)
    const {register, handleSubmit, formState: {errors}} = useForm({values: work})
    const router = useRouter();
    const { id } = router.query;



    const { data: oldData } = useGetOneQuery({
        key: "work-one",
        url: URLS.updateWork,
        id: `${id}/`,
        enabled: !!id,
    });


    const {data: works, isLoadingWork} = useGetQuery({
        key: KEYS.works,
        url: URLS.works,
        params: {
            key: 'name',
            value: search,
            page_size: 100
        },
        enabled: !!(search)
    })

    const { mutate: editAdds, isLoading } = usePutQuery({
        listKeyId: "work-one",
    });





    useEffect(() => {
        if (!isEmpty(head(get(works, 'data.results', [])))) {
            setWork(find(get(works, 'data.results', []), ({work_csr_code}) => work_csr_code === workValue))
        }
    }, [works, workValue])

    useEffect(() => {
        if (get(oldData, "data") && !isEmpty(get(oldData, "data"))) {
            setWork(get(oldData, "data"));
            setSearch(get(oldData, "data.work_name"));
        }
    }, [oldData]);

    const onSubmit = ({
                          work_description,
                          work_rent_price,
                          work_rent_price_currency,
                          work_amount,
                          sertificate_blank_num,
                          sertificate_reestr_num,
                          work_owner,
                          work_measure
                      }) => {
        let formData = new FormData();
        formData.append('work_description', work_description)
        formData.append('work_rent_price', work_rent_price)
        formData.append('work_rent_price_currency', work_rent_price_currency)
        formData.append('work_amount', work_amount)
        formData.append('sertificate_blank_num', sertificate_blank_num)
        formData.append('sertificate_reestr_num', sertificate_reestr_num)
        formData.append('work_owner', work_owner)
        formData.append('work_measure', work_measure)
        editAdds({
                url: `${URLS.updateWork}${id}/`,
                attributes: formData
            },
            {
                onSuccess: () => {
                    toast.success("E'lon muvaffaqiyatli joylandi", {position: 'top-center'});
                    router.push('/dashboard/works');
                },
                onError: (error) => {
                    toast.error(`Error is ${error}`, {position: 'top-right'})
                }
            }
        )


    }

    const updateData = (_id) => {
        if (_id) {
            updateData({
                url: URLS.updateWork,
                attributes: {
                    id: _id,
                },
            });
        }
    };



    return (
        <Dashboard>
            <Subheader title={"Mashina va Mexanizmlarda qo'shilgan e'lonni tahrirlash"} />
            <div className={"p-7"}>
                {(isLoadingWork || isLoading) && <OverlayLoader />}
                <form
                    className={"grid grid-cols-12 gap-x-[30px]"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/*<div className={"col-span-12 mb-[10px]"}>*/}
                    {/*  <h4 className={"text-[#28366D] text-base"}>Qidiruv</h4>*/}
                    {/*</div>*/}

                    {/*<div className={"col-span-12  gap-x-[30px]"}>*/}
                    {/*  <Select*/}
                    {/*    isClearable*/}
                    {/*    placeholder={"nomni rus tilida kiriting"}*/}
                    {/*    defaultValue={{*/}
                    {/*      value: get(material, "material_csr_code"),*/}
                    {/*      label: get(material, "material_name"),*/}
                    {/*    }}*/}
                    {/*    options={get(materials, "data.results", []).map((_material) => ({*/}
                    {/*      value: get(_material, "material_csr_code"),*/}
                    {/*      label: get(_material, "material_name"),*/}
                    {/*    }))}*/}
                    {/*    onKeyDown={debounce(function (e) {*/}
                    {/*      if (e.target.value.length > 3) {*/}
                    {/*        setSearch(e.target.value);*/}
                    {/*      }*/}
                    {/*    })}*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*  material nomi  */}

                    {/*<div className={"col-span-12  gap-x-[30px]"}>*/}
                    {/*  <h4 className={"text-[#28366D] text-base"}>Material nomi</h4>*/}
                    {/*  <p className={"text-[12px] text-[#516164]"}>*/}
                    {/*    *qidiruv natijasiga ko’ra avtomatik to’ldiriladi*/}
                    {/*  </p>*/}
                    {/*  <input*/}
                    {/*    defaultValue={get(oldData, "data.material_сsr_code")}*/}
                    {/*    placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}*/}
                    {/*    className={*/}
                    {/*      "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"*/}
                    {/*    }*/}
                    {/*    */}
                    {/*    disabled={true}*/}
                    {/*  />*/}
                    {/*  <input*/}
                    {/*    placeholder={*/}
                    {/*      "Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта"*/}
                    {/*    }*/}
                    {/*    className={"hidden"}*/}
                    {/*    value={1}*/}
                    {/*    {...register("material_owner", { required: true })}*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/* Material tavsifi */}
                    <div className={"col-span-12 gap-x-[30px]"}>
                        <h4 className={"text-[#28366D] text-base my-[10px]"}>
                            Qurilish ishlari tavsifi
                        </h4>
                        <textarea
                            {...register("work_description")}
                            defaultValue={get(oldData, "data.work_description")}
                            rows={5}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                        ></textarea>

                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('work_owner', {required: true})}

                        />
                    </div>

                    {/* Material narxi */}
                    <div className={"col-span-6 "}>
                        <h4 className={"text-[#28366D] text-base "}>Mahsulot narxi</h4>
                        <div className={"flex items-center rounded-[5px]"}>
                            <input
                                placeholder={""}
                                type={"number"}
                                defaultValue={get(oldData, "data.work_rent_price")}
                                {...register("work_rent_price", { required: true })}
                                className={"py-[15px] px-[20px] w-full shadow-xl  my-[10px]"}
                                required={true}
                            />

                            <select
                                className={"p-[16px]"}
                                defaultValue={get(oldData, "data.work_rent_price_currency")}
                                {...register("work_rent_price_currency")}
                            >
                                <option>UZS</option>
                                <option>USD</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>

                    {/* Material o'lchov birligi */}
                    <div className={"col-span-6"}>
                        <h4 className={"text-[#28366D] text-base "}>
                            Material o’lchov birligi
                        </h4>
                        <input
                            placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                            {...register("work_measure")}
                            defaultValue={get(oldData, "data.work_measure")}
                            disabled={true}
                        />
                    </div>

                    {/*Material miqdori*/}
                    <div className={"col-span-6"}>
                        <h4 className={"text-[#28366D] text-base "}>Mashina va mexanizmlar miqdori</h4>
                        <input
                            placeholder={"Material miqdori"}
                            type={"number"}
                            defaultValue={get(oldData, "data.work_amount")}
                            {...register("work_amount", { required: true })}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                        />
                    </div>

                    {/*Material miqdor o’lchov birligi*/}
                    <div className={"col-span-6"}>
                        <h4 className={"text-[#28366D] text-base "}>
                            Material miqdor o’lchov birligi
                        </h4>
                        <input
                            placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                            defaultValue={get(oldData, "data.work_measure")}
                            {...register("work_measure")}
                            disabled={true}
                        />

                    </div>

                    {/*Material rasmi*/}
                    {/*<div className={"col-span-6"}>*/}
                    {/*    <h4 className={"text-[#28366D] text-base "}>Material rasmi</h4>*/}
                    {/*    <label*/}
                    {/*        htmlFor="dropzone-file"*/}
                    {/*        className={*/}
                    {/*            "shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white"*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <Image*/}
                    {/*            src={"/icons/upload.svg"}*/}
                    {/*            alt={"upload"}*/}
                    {/*            width={48}*/}
                    {/*            height={48}*/}
                    {/*        />*/}
                    {/*        <p>yuklash</p>*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        id={"dropzone-file"}*/}
                    {/*        type={"file"}*/}
                    {/*        defaultValue={get(oldData, "data.mmechano_image")}*/}
                    {/*        accept={"image/png, image/jpeg, image/jpg"}*/}
                    {/*        {...register("material_image")}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className={"col-span-6"}>
                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={"text-[#28366D] text-base "}>
                                Mahsulot sertifikati blank raqami
                            </h4>
                            <input
                                placeholder={"Mahsulot sertifikati blank raqami"}
                                defaultValue={get(oldData, "data.sertificate_blank_num")}
                                {...register("sertificate_blank_num", { required: true })}
                                className={
                                    "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                                }
                                required={true}
                            />
                        </div>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={"text-[#28366D] text-base "}>
                                Mahsulot sertifikati reestr raqami
                            </h4>
                            <input
                                placeholder={"Mahsulot sertifikati reestr raqami"}
                                {...register("sertificate_reestr_num", { required: true })}
                                defaultValue={get(oldData, "data.sertificate_reestr_num")}
                                className={
                                    "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <button
                        className={
                            "col-span-12 w-[190px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]"
                        }
                    >
                        <p>Tahrirlash</p>
                    </button>
                </form>
            </div>
        </Dashboard>
    );
};

export default Index;
