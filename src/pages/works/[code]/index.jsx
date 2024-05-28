import React from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import { useRouter } from "next/router";
import ErrorPage from "@/pages/500";
import { ContentLoader } from "@/components/loader";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import { get } from "lodash";
import Select from "@/components/select";
import GridView from "@/containers/grid-view";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getOptionList } from "@/utils";
import Link from "next/link";

const ViewPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const { t } = useTranslation();
  const [regionId, setRegionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });
  const {
    data: material,
    isLoading,
    isError,
  } = useGetQuery({
    key: [KEYS.works, code],
    url: `${URLS.works}${code}/`,
    enabled: !!code,
  });
  const { data: regions, isLoading: isLoadingRegion } = useGetQuery({
    key: [KEYS.territories, "regions"],
    url: `${URLS.territories}`,
    params: {
      key: "regions",
    },
  });
  const { data: districts, isLoading: isLoadingDistrict } = useGetQuery({
    key: [KEYS.territories, regionId, "districts"],
    url: `${URLS.territories}`,
    params: {
      key: "districts",
      filter: regionId,
    },
    enable: !!regionId,
  });

  const columns = [
    {
      title: "№",
      key: "id",
      render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
    },
    {
      title: t("Logo"),
      key: "material_image",
      render: () => (
        <Image
          className={"mx-auto"}
          width={80}
          height={56}
          src={"/images/company.png"}
          alt={"logo"}
        />
      ),
      classnames: "text-center",
    },
    {
      title: t("Korxona nomi"),
      key: "company_name",
      render: ({ value, row }) => (
        <Link
          href={`/company/${get(row, "company_stir")}`}
          className={"underline"}
        >
          {value}
        </Link>
      ),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Mahsulot tavsifi"),
      key: "techno_description",
    },
    {
      title: t("Sertifikat"),
      key: "sertificate_blank_num",
      render: ({ row }) => (
        <div className={"group relative inline-block cursor-pointer"}>
          <Image
            className={"mx-auto"}
            width={24}
            height={24}
            src={"/images/certificate.png"}
            alt={"certificate"}
          />
          <ul className="text-left text-white hidden group-hover:block absolute left-full bottom-full p-2.5 bg-[#3D7AB6] w-[200px] rounded shadow-[5px_5px_15px_rgba(0, 0, 0, 0.1)]">
            {get(row, "sertificate_blank_num") &&
            get(row, "sertificate_reestr_num") &&
            get(row, "sertificate_reestr_num")?.length > 1 &&
            get(row, "sertificate_blank_num")?.length > 1 ? (
              <>
                <li>
                  {t("Blank raqami")}: {get(row, "sertificate_blank_num")}
                </li>
                <li>
                  {t("Reestr raqami")}: {get(row, "sertificate_reestr_num")}
                </li>
                <li className={"underline"}>
                  <a
                    target={"_blank"}
                    href={`http://sert2.standart.uz/site/register?Search[number_of_blank]=${get(
                      row,
                      "sertificate_blank_num",
                    )}&Search[gov_register]=${get(
                      row,
                      "sertificate_reestr_num",
                    )}`}
                  >
                    {t("Tekshirish")}
                  </a>
                </li>
              </>
            ) : (
              <li>{t("Ma’lumot mavjud emas")}</li>
            )}
          </ul>
        </div>
      ),
      classnames: "text-center",
    },
    {
      title: t("Narxi(so`m)"),
      key: "techno_price",
      render: ({ value, row }) =>
        value * get(currency, `data[${get(row, "techno_price_currency")}]`, 1) >
        0 ? (
          <NumericFormat
            displayType={"text"}
            className={"text-center bg-transparent"}
            thousandSeparator={" "}
            value={
              value *
              get(currency, `data[${get(row, "techno_price_currency")}]`, 1)
            }
            suffix={` (${get(row, "techno_measure")})`}
          />
        ) : (
          t("by_order")
        ),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Oxirgi o’zgarish"),
      key: "techno_updated_date",
      render: ({ value }) => dayjs(value).format("DD.MM.YYYY HH:mm"),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Action"),
      key: "action",
      render: () => (
        <div className={"flex items-center"}>
          <Image
            className={"mx-auto cursor-pointer"}
            width={24}
            height={24}
            src={"/images/shopping.png"}
            alt={"certificate"}
          />
          <Image
            className={"mx-auto cursor-pointer"}
            width={24}
            height={24}
            src={"/icons/stick.svg"}
            alt={"certificate"}
          />
        </div>
      ),
      classnames: "text-center",
    },
  ];

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }

  return (
    <>
      <Main>
        <Menu active={3} />
        <Section className={"!bg-white"}>
          <div className="grid grid-cols-12">
            <div className="tablet:col-span-5 col-span-12 items-center flex justify-center tablet:items-start tablet:justify-start relative h-64">
              {get(material, "data.work_image") ? (
                <Image
                  className={"mr-2"}
                  layout={"fill"}
                  objectFit={"contain"}
                  loader={() => get(material, "data.work_image")}
                  src={get(material, "data.work_image")}
                  alt={"code"}
                />
              ) : (
                <Image
                  className={
                    "laptop:w-[370px] laptop:h-[260px] tablet:w-[330px] tablet:h-[220px] w-[300px] h-[200px]"
                  }
                  width={370}
                  height={260}
                  src={"/images/material.png"}
                  alt={"company"}
                />
              )}
            </div>
            <div className="tablet:col-span-7 col-span-12">
              <div className="flex tablet:justify-start tablet:items-start justify-center items-center">
                <div className={"inline-flex mr-8"}>
                  <Image
                    className={
                      "mr-2 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                    }
                    width={24}
                    height={24}
                    src={"/icons/code.svg"}
                    alt={"code"}
                  />
                  <span
                    className={
                      "font-medium tablet:text-sm laptop:text-base text-xs"
                    }
                  >
                    #{get(material, "data.work_csr_code")}
                  </span>
                </div>
                <div className={"inline-flex mr-8"}>
                  <Image
                    className={
                      "mr-2 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                    }
                    width={24}
                    height={24}
                    src={"/icons/eye.svg"}
                    alt={"code"}
                  />
                  <span
                    className={
                      "font-medium tablet:text-sm laptop:text-base text-xs"
                    }
                  >
                    {get(material, "data.work_views_count", 0)}
                  </span>
                </div>
                <div className={"inline-flex mr-8 cursor-pointer"}>
                  <Image
                    className={
                      "mr-1.5 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                    }
                    width={24}
                    height={24}
                    src={"/icons/stick.svg"}
                    alt={"code"}
                  />
                  <span
                    className={
                      "font-medium tablet:text-sm laptop:text-base text-xs"
                    }
                  >
                    {t("Saqlash")}
                  </span>
                </div>
              </div>
              <h2
                className={
                  "my-3 laptop:text-xl tablet:tex-lg text-base tablet:text-start  text-center font-semibold "
                }
              >
                {get(material, "data.work_name")}
              </h2>
              <p className={"text-[#4B5055] text-sm"}>
                {get(material, "data.work_description", "")}
              </p>
            </div>
          </div>
        </Section>
        <Section>
          <div className="grid grid-cols-12">
            <div className="col-span-12 ">
              <GridView
                HeaderBody={
                  <div className="flex laptop:flex-row flex-col mb-5">
                    <Select
                      getValue={(val) => setRegionId(get(val, "value"))}
                      sm
                      label={t("region")}
                      options={getOptionList(
                        get(regions, "data.results", []),
                        "id",
                        "region_name",
                      )}
                    />
                    <div className=" tablet:ml-8 tablet:mt-0 mt-[15px]">
                      <Select
                        getValue={(val) => setDistrictId(get(val, "value"))}
                        sm
                        label={t("district")}
                        options={getOptionList(
                          get(districts, "data.results", []),
                          "id",
                          "district_name",
                        )}
                      />
                    </div>
                  </div>
                }
                url={`${URLS.worksAds}${code}/`}
                key={KEYS.worksAds}
                params={{
                  region: regionId,
                  district: districtId,
                }}
                columns={columns}
              />
            </div>
          </div>
        </Section>
      </Main>
    </>
  );
};

export default ViewPage;
