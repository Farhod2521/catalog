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
import Select from "react-select";
import Image from "next/image";
import Dashboard from "@/layouts/dashboard";
import useGetOneQuery from "@/hooks/api/useGetOneQuery";

const Index = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState();
  const [material, setMaterial] = useState({});
  const [materialValue, setMaterialValue] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: material });
  const router = useRouter();
  const { id } = router.query;

  const { data: oldData } = useGetOneQuery({
    key: "material-one",
    url: URLS.updateMaterial,
    id: `${id}/`,
    enabled: !!id,
  });

  const { data: materials, isLoadingMaterial } = useGetQuery({
    key: KEYS.materials,
    url: URLS.materials,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    enabled: !!search,
  });

  const { mutate: editAdds, isLoading } = usePutQuery({
    listKeyId: "material-one",
  });

  useEffect(() => {
    if (!isEmpty(head(get(materials, "data.results", [])))) {
      setMaterial(
        find(
          get(materials, "data.results", []),
          ({ material_csr_code }) => material_csr_code === materialValue,
        ),
      );
    }
  }, [materials, materialValue]);

  useEffect(() => {
    if (get(oldData, "data") && !isEmpty(get(oldData, "data"))) {
      setMaterial(get(oldData, "data"));
      setSearch(get(oldData, "data.material_name"));
    }
  }, [oldData]);

  const onSubmit = ({

    material_description,
    material_price,
    material_price_currency,

    material_amount,
    sertificate_blank_num,
    sertificate_reestr_num,

    material_measure,
  }) => {
    let formData = new FormData();

    formData.append("material_description", material_description);
    formData.append("material_price", material_price);
    formData.append("material_price_currency", material_price_currency);

    formData.append("material_amount", material_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);

    formData.append("material_amount_measure", material_measure);
    formData.append("material_measure", material_measure);
    editAdds(
      {
        url: `${URLS.updateMaterial}${id}/`,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli tahrirlandi", {
            position: "top-center",
          });
          router.push("/dashboard/materials");
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
        url: URLS.updateMaterial,
        attributes: {
          id: _id,
        },
      });
    }
  };



  return (
    <Dashboard>
      <Subheader title={"Qurilish materiallari va buyumlarini tahrirlash"} />
      <div className={"p-7"}>
        {(isLoadingMaterial || isLoading) && <OverlayLoader />}
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
              Material tavsifi
            </h4>
            <textarea
              {...register("material_description")}
              defaultValue={get(oldData, "data.material_description")}
              rows={5}
              className={
                "py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]"
              }
            ></textarea>
          </div>

          {/* Material narxi */}
          <div className={"col-span-6 "}>
            <h4 className={"text-[#28366D] text-base "}>Material narxi</h4>
            <div className={"flex items-center rounded-[5px]"}>
              <input
                placeholder={""}
                type={"number"}
                defaultValue={get(oldData, "data.material_price")}
                {...register("material_price", { required: true })}
                className={"py-[15px] px-[20px] w-full shadow-xl  my-[10px]"}
                required={true}
              />

              <select
                className={"p-[16px]"}
                defaultValue={get(oldData, "data.material_price_currency")}
                {...register("material_price_currency")}
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
              {...register("material_measure")}
              defaultValue={get(oldData, "data.material_measure")}
              disabled={true}
            />
          </div>

          {/*Material miqdori*/}
          <div className={"col-span-6"}>
            <h4 className={"text-[#28366D] text-base "}>Material miqdori</h4>
            <input
              placeholder={"Material miqdori"}
              type={"number"}
              defaultValue={get(oldData, "data.material_amount")}
              {...register("material_amount", { required: true })}
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
              defaultValue={get(oldData, "data.material_measure")}
              {...register("material_amount_measure")}
              disabled={true}
            />
          </div>

          {/*Material rasmi*/}
          {/*<div className={"col-span-6"}>*/}
          {/*  <h4 className={"text-[#28366D] text-base "}>Material rasmi</h4>*/}
          {/*  <label*/}
          {/*    htmlFor="dropzone-file"*/}
          {/*    className={*/}
          {/*      "shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <Image*/}
          {/*      src={"/icons/upload.svg"}*/}
          {/*      alt={"upload"}*/}
          {/*      width={48}*/}
          {/*      height={48}*/}
          {/*    />*/}
          {/*    <p>yuklash</p>*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    id={"dropzone-file"}*/}
          {/*    type={"file"}*/}
          {/*    defaultValue={get(oldData, "data.material_image")}*/}
          {/*    accept={"image/png, image/jpeg, image/jpg"}*/}
          {/*    {...register("material_image")}*/}
          {/*  />*/}
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
