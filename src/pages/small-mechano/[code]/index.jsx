import React, {useRef} from "react";
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
import {get, parseInt, values} from "lodash";
import Select from "@/components/select";
import GridView from "@/containers/grid-view";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getOptionList } from "@/utils";
import Link from "next/link";
import {useCounter} from "@/context/counter";
import {sum} from "lodash/math";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";
import Title from "@/components/title";
import {config} from "@/config";

const ViewPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const {data: session} = useSession();
  const inputRef = useRef(null);
  const [comments, setComments] = useState([])
  const token = useSettingsStore(state => get(state, 'token', null))
  const { t } = useTranslation();
  const [regionId, setRegionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [inn, setInn] = useState(false);
  const { state, dispatch } = useCounter();

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
    toast.success('Tanlagan mahsulotingiz savatchaga qo\'shildi!', {
      duration: 3000,
      position: "top-left"
    });

  };

  const handleSendCertificate = async (inn, certificate_number) => {
    try {
      const response = await fetch(`${config.API_URL}${URLS.certificate}`, {
        method: "POST",
        body: JSON.stringify({
          inn: inn,
          certificate_number: certificate_number,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const jsonObject = JSON.parse(data)

      const getPDF = jsonObject.pdf;
      const getInn = jsonObject.inn;

      setPdf(getPDF);
      setInn(getInn);

      console.log(getPDF, getInn)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { data: customer } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: {token: token ??`${get(session, 'user.token')}`},
    enabled: !!(get(session, 'user.token') || token)
  })




  const {data: smallMechanoAds, isLoading: isLoadingMaterialAds} = useGetQuery({
    key: KEYS.smallMechanosAds,
    url: `${URLS.smallMechanosAds}${code}/`,

  })
  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });
  const {
    data: material,
    isLoading,
    isError,
  } = useGetQuery({
    key: [KEYS.smallMechanos, code],
    url: `${URLS.smallMechanos}${code}/`,
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

  const totalPrice = get(smallMechanoAds, "data.results", []).reduce((sumResult, price) => sumResult + (price["smallmechano_rent_price"] * get(currency, `data[${price["smallmechano_rent_price_currency"]}]`, 1)), 0)
  const averagePrice = +(totalPrice / get(smallMechanoAds, "data.results", []).length).toFixed(2)

  const maxPrice = get(smallMechanoAds, "data.results", []).reduce((max, obj) => {
    return obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) > max ? obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) : max
  }, 0)

  const minPrice = get(smallMechanoAds, "data.results", []).reduce((min, obj) => {
    return obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) < min ? obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) : min
  }, Infinity)


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
          className={"underline text-[#146BBC]"}
        >
          {value}
        </Link>
      ),
      classnames: "text-center, ",
      sorter: true,
    },
    {
      title: t("Mahsulot tavsifi"),
      key: "smallmechano_description",
    },
    {
      title: t("Sertifikat"),
      key: "sertificate_blank_num",
      render: ({ row }) => (
          <div className={"group relative inline-block cursor-pointer"}>
            <abbr title="bosing">
              <Image
                  className={
                    "mx-auto laptop:w-[24px] laptop:h-[24px] tablet:w-[21px] tablet:h-[21px] w-[18px] h-[18px] "
                  }
                  width={24}
                  height={24}
                  src={"/images/certificate.png"}
                  alt={"certificate"}
                  onClick={() => handleSendCertificate(parseInt(get(row, "sertificate_reestr_num")), parseInt(get(row, "sertificate_blank_num")))}
              />
            </abbr>
            {pdf ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
              <div className="bg-white p-8 rounded shadow-md w-[700px] h-auto flex  flex-col">
                <div>
                  <button onClick={() => setPdf(null)} className={"float-right mb-[20px]"}>
                    <Image

                        src={"/icons/closeModal.svg"}
                        alt={"modalcloser"}
                        width={30}
                        height={30}
                        className={
                          "float-right  cursor-pointer bg-white  rounded-[2px]"
                        }
                    />
                  </button>
                </div>


                <Link className={" bg-blue-500 w-full text-white py-2 px-4 rounded-[6px] "}
                      href={`${pdf}`}>Ko'rish</Link>


              </div>
            </div> : ""}

          </div>
      ),
      classnames: "text-center",
    },
    {
      title: t("Narxi(so`m)"),
      key: "smallmechano_rent_price",
      render: ({ value, row }) =>
          (value *
              get(
                  currency,
                  `data[${get(row, "smallmechano_rent_price_currency")}]`,
                  1,
              )).toFixed(2) >
        0 ? (
          <NumericFormat
            displayType={"text"}
            className={"text-center bg-transparent"}
            thousandSeparator={" "}
            value={
              (value *
              get(
                currency,
                `data[${get(row, "smallmechano_rent_price_currency")}]`,
                1,
              )).toFixed(2)
            }
            suffix={` (${get(row, "smallmechano_measure")})`}
          />
        ) : (
          t("by_order")
        ),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Kompaniya telefon raqami"),
      key: "phone_number",
      render: ({ value }) => (
        <Link href={`tel:${value}`} className={"text-[#146BBC]"}>
          {value}
        </Link>
      ),
      classnames: "text-center",
    },
    {
      title: t("Oxirgi o’zgarish"),
      key: "smallmechano_updated_date",
      render: ({ value }) => dayjs(value).format("DD.MM.YYYY HH:mm"),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Sotib olish"),
      key: "action",
      render: ({row}) => (
          <div className={"flex items-center justify-between gap-x-4 relative"}>
            <Image
                onClick={() => handleIncrement(row)}
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
    return <ErrorPage/>;
  }

  if (isLoading) {
    return (
        <Main>
          <ContentLoader/>
        </Main>
    );
  }

  return (
      <>
        <Main>
          <Menu active={4}/>
          <Section className={"!bg-white"}>
            <div className="grid grid-cols-12">
              <div
                  className="tablet:col-span-5 col-span-12  items-center flex justify-center tablet:items-start tablet:justify-start relative h-64">
                {get(material, "data.smallmechano_image") ? (
                    <Image
                        className={"mr-2"}
                        layout={"fill"}
                        objectFit={"contain"}
                        loader={() => get(material, "data.smallmechano_image")}
                        src={get(material, "data.smallmechano_image")}
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
                    #{get(material, "data.smallmechano_csr_code")}
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
                    {get(material, "data.material_views_count", 0)}
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
                      "my-3 laptop:text-xl tablet:tex-lg text-base tablet:text-start  text-center  font-semibold"
                    }
                >
                  {get(material, "data.smallmechano_name")}
                </h2>
                {/*<div className="flex mb-5 ">*/}
                {/*    <div className={'inline-flex mr-20'}>*/}
                {/*        <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha narx: </strong><span*/}
                {/*        className={'text-[#4B5055]'}> 504 000 so’m</span>*/}
                {/*    </div>*/}
                {/*    <div className={'inline-flex'}>*/}
                {/*        <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha joriy narx: </strong><span*/}
                {/*        className={'text-[#4B5055]'}> 504 000 so’m</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <p className={"text-[#4B5055] text-sm"}>
                  {get(material, "data.material_desc", "")}
                </p>
              </div>
            </div>

            <div className={"grid-cols-12 grid mt-[20px] tablet:gap-x-4 gap-y-8 "}>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Davlat soliq qo'mitasi</h4>
                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'tgan oydagi savdolar soni:</p>
                  <span className={"text-sm"}>20</span>
                </div>

                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'rtacha narx:</p>
                  <span className={"text-sm"}>20</span>
                </div>
              </div>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Tovar xom-ashyo birjasi</h4>
                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'tgan oydagi savdolar hajmi(4 hafta):</p>
                  <span className={"text-sm"}>20</span>
                </div>

                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'rtacha narx:</p>
                  <span className={"text-sm"}>20</span>
                </div>
              </div>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Maksimal narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={maxPrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>O'rtacha narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={averagePrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Minimum narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={minPrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <div className="grid grid-cols-12">
              <div className="col-span-12 ">
                <GridView
                    HeaderBody={
                      <div className="flex tablet:flex-row  flex-col mb-5">
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
                        <div className="tablet:ml-8 tablet:mt-0 mt-[15px]   ">
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
                    url={`${URLS.smallMechanosAds}${code}/`}
                    key={KEYS.smallMechanosAds}
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
