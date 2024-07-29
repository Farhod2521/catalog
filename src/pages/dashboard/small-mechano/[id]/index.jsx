import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import usePutQuery from "@/hooks/api/usePutQuery";
import { debounce, find, get, head, isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import Subheader from "@/layouts/dashboard/components/subheader";
import { OverlayLoader } from "@/components/loader";
import Dashboard from "@/layouts/dashboard";
import useGetOneQuery from "@/hooks/api/useGetOneQuery";

const Index = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState();
    const [smallMechano, setSmallMechano] = useState({});
    const [smallMechanoValue, setSmallMechanoValue] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ values: smallMechano });
    const router = useRouter();
    const { id } = router.query;

    const { data: oldData } = useGetOneQuery({
        key: "small-mechano-one",
        url: URLS.updateSmallMechano,
        id: `${id}/`,
        enabled: !!id,
    });

    const { data: smallMechanos, isLoadingSmallMechano } = useGetQuery({
        key: KEYS.smallMechanos,
        url: URLS.smallMechanos,
        params: {
            key: "name",
            value: search,
            page_size: 100,
        },
        enabled: !!search,
    });

    const { mutate: editAdds, isLoading } = usePutQuery({
        listKeyId: "small-mechano-one",
    });

    useEffect(() => {
        if (!isEmpty(head(get(smallMechanos, 'data.results', [])))) {
            setSmallMechano(find(get(smallMechanos, 'data.results', []), ({smallmechano_csr_code}) => smallmechano_csr_code === smallMechanoValue))
        }
    }, [smallMechanos, smallMechanoValue])

    useEffect(() => {
        if (get(oldData, "data") && !isEmpty(get(oldData, "data"))) {
            setSmallMechano(get(oldData, "data"));
            setSearch(get(oldData, "data.smallmechano_name"));
        }
    }, [oldData]);

    const onSubmit = ({

                          smallmechano_description,
                          smallmechano_rent_price,
                          smallmechano_rent_price_currency,
                          smallmechano_amount,
                          sertificate_blank_num,
                          sertificate_reestr_num,
                          smallmechano_measure,
                          smallmechano_owner

                      }) => {
        let formData = new FormData();

        formData.append("smallmechano_description", smallmechano_description);
        formData.append("smallmechano_rent_price", smallmechano_rent_price);
        formData.append("smallmechano_rent_price_currency", smallmechano_rent_price_currency);

        formData.append("smallmechano_amount", smallmechano_amount);
        formData.append("sertificate_blank_num", sertificate_blank_num);
        formData.append("sertificate_reestr_num", sertificate_reestr_num);

        formData.append("smallmechano_amount", smallmechano_amount);
        formData.append("smallmechano_measure", smallmechano_measure);
        formData.append("smallmechano_owner", smallmechano_owner)
        editAdds(
            {
                url: `${URLS.updateSmallMechano}${id}/`,
                attributes: formData,
            },
            {
                onSuccess: () => {
                    toast.success("E'lon muvaffaqiyatli tahrirlandi", {
                        position: "top-center",
                    });
                    router.push("/dashboard/small-mechano");
                },
                onError: (error) => {
                    toast.error(`Error is ${error}`, { position: "top-right" });
                },
            },
        );
    };

    const updateData = (_id) => {
        if (_id) {
            updateData({
                url: URLS.updateSmallMechano,
                attributes: {
                    id: _id,
                },
            });
        }
    };



    return (
        <Dashboard>
            <Subheader title={"Kichik mexanizmlar bo'limiga qo'shilgan e'lonni tahrirlash"} />
            <div className={"p-7"}>
                {(isLoadingSmallMechano || isLoading) && <OverlayLoader />}
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
                            Mahsulot tavsifi
                        </h4>
                        <textarea
                            {...register("smallmechano_description")}
                            defaultValue={get(oldData, "data.smallmechano_description")}
                            rows={5}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                        ></textarea>

                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('smallmechano_owner', {required: true})}

                        />
                    </div>

                    {/* Material narxi */}
                    <div className={"col-span-6 "}>
                        <h4 className={"text-[#28366D] text-base "}>Mahsulot narxi</h4>
                        <div className={"flex items-center rounded-[5px]"}>
                            <input
                                placeholder={""}
                                type={"number"}
                                defaultValue={get(oldData, "data.smallmechano_rent_price")}
                                {...register("smallmechano_rent_price", { required: true })}
                                className={"py-[15px] px-[20px] w-full shadow-xl  my-[10px]"}
                                required={true}
                            />

                            <select
                                className={"p-[16px]"}
                                defaultValue={get(oldData, "data.smallmechano_rent_price_currency")}
                                {...register("smallmechano_rent_price_currency")}
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
                            Mahsulot o’lchov birligi
                        </h4>
                        <input
                            placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                            {...register("smallmechano_measure")}
                            defaultValue={get(oldData, "data.smallmechano_measure")}
                            disabled={true}
                        />
                    </div>

                    {/*Material miqdori*/}
                    <div className={"col-span-6"}>
                        <h4 className={"text-[#28366D] text-base "}>Mahsulot miqdori</h4>
                        <input
                            placeholder={"Mahsulot miqdori"}
                            type={"number"}
                            defaultValue={get(oldData, "data.smallmechano_amount")}
                            {...register("smallmechano_amount", { required: true })}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                        />
                    </div>

                    {/*Material miqdor o’lchov birligi*/}
                    <div className={"col-span-6"}>
                        <h4 className={"text-[#28366D] text-base "}>
                            Mahsulot miqdor o’lchov birligi
                        </h4>
                        <input
                            placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
                            className={
                                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
                            }
                            defaultValue={get(oldData, "data.smallmechano_measure")}
                            {...register("smallmechano_measure")}
                            disabled={true}
                        />

                    </div>



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
