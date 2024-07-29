import Main from "@/layouts/main";
import Menu from "../../components/menu";
import Section from "../../components/section";
import { getMostOrdered, getVolumes } from "@/api";
import { KEYS } from "@/constants/key";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ContentLoader } from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import {get, head, isEmpty, parseInt} from "lodash";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";
import React, {useEffect, useState} from "react";
import { OverlayLoader } from "../../components/loader";
import Template from "@/components/template";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";
import TemporaryProduct from "@/components/temporary_product";
import {debounce } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import GridView from "@/containers/grid-view";
import {NumericFormat} from "react-number-format";
import Pagination from "@/components/pagination";
import clsx from "clsx";
import { motion } from "framer-motion";
export default function Home() {
  const router = useRouter();
  const { region_name } = router.query;
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(24);
  const [isActive, setIsActive] = useState(0);

  //Qoshildi
  const [dataStock, setDataStock] = useState([]);
  
  const [volumeId, setVolumeId] = useState(null);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const { data: volumes, isLoading: isLoadingVolumes } = useGetQuery({
    key: KEYS.classifier,
    url: URLS.classifier,
    params: {
      key: "volumes",
    },
  });
  
  const { data: cmt = {}, isLoading: isLoadingCmt } = useGetQuery({
    url: URLS.cmt,
  });
  
  const data = cmt.data?.results || [];
  
 
  const columns = [
    {
      title: "№",
      key: "id",
      render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
      classnames: "text-sm",
    },
    {
      title: "Mahsulot nomi",
      key: "name",
      sorter: true,
      classnames: "min-w-[175px] text-sm ",
      render: ({ value, row }) => (
        <Link
          className={"whitespace-nowrap text-[#1890FF]"}
          href={get(row, "resource_type")}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "Mahsulot kodi",
      key: "code",
      sorter: true,
      classnames: "text-sm",
    },
    {
      title: "O’lchov birligi",
      key: "measure",
      classnames: "text-center text-sm",
    },

  ];


  const [tabs, setTabs] = useState(1);
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionName, setRegionName] = useState("");
  const [dataStatistics, setDataStatistics] = useState([]);
  // stock
  const [searchQuery, setSearchQuery] = useState('');


  const [dataCmt, setDataCmt] = useState([]);
  const [sortOrderStock, setSortOrderStock] = useState('asc');
  // ministry
  const [dataMinistry, setDataMinistry] = useState([])
  const [sortOrderMinistry, setSortOrderMinistry] = useState('asc');
  const [searchQueryMinistry, setSearchQueryMinistry] = useState('');
  // tax
  const [dataTax, setDataTax] = useState([])
  const [sortOrderTax, setSortOrderTax] = useState('asc');
  const [searchQueryTax, setSearchQueryTax] = useState('');
  // customs
  const [dataCustoms, setDataCustoms] = useState([])
  const [sortOrderCustoms, setSortOrderCustoms] = useState('asc');
  const [searchQueryCustoms, setSearchQueryCustoms] = useState('');
  // TSA
  const [dataTechnicTSA, setDataTechnicTSA] = useState([])
  const [sortOrderTechnicTSA, setSortOrderTechnicTSA] = useState('asc');
  const [searchQueryTechnicTSA, setSearchQueryTechnicTSA] = useState('');


  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });
  const currencyUSD = currency?.data?.USD;


  const handleRegionClick = (event) => {
    const regionId = event.target.id;
    setSelectedRegion(regionId);
    setRegionName(event.target.getAttribute("data-name"));
  };

  const {data: customs, isLoadingCustoms} = useGetQuery({
    key: KEYS.customs,
    url: URLS.customs
  })

  useEffect(() => {
    if(get(customs, "data.results", [])) {
      setDataCustoms(get(customs, "data.results", []))
    }
  }, [get(customs, "data.results", [])]);

  const sortDataCustoms = () => {
    const sortedData = [...get(customs, "data.results", [])].sort((a, b) => {
      if (sortOrderCustoms === 'asc') {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });

    setDataCustoms(sortedData)
    setSortOrderCustoms(sortOrderCustoms === 'asc' ? 'desc' : 'asc');

  };

  const handleSearchCustoms = (e) => {
    setSearchQueryCustoms(e.target.value);
  };

  const filteredDataCustoms = dataCustoms.filter((item) => {
    return (
        get(item, 'codeTiftn', '').toLowerCase().includes(searchQueryCustoms.toLowerCase()) ||
        get(item, 'netMass', '').toString().includes(searchQueryCustoms) ||
        get(item, 'codeName', '').toString().includes(searchQueryCustoms)
    );
  });








  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/statistics-json/statistics.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataStatistics(data[0]); // Adjust based on your JSON structure
      } catch (error) {
        console.error('Failed to fetch the JSON data:', error);
      }
    };


    fetchStatistics();
  }, []);



  const closeRegion = () => {

    setSelectedRegion(null);
  };

  const toggleTabs = (index) => {
    setTabs(index);
  };

  const {data: technicsTSA, isLoadingTSA} = useGetQuery({
    key: KEYS.technicTSA,
    url: URLS.technicTSA,
    params: {
      page,
      page_size: pageSize
    }
  })

  useEffect(() => {
    if(get(technicsTSA, "data.results", [])) {
      setDataTechnicTSA(get(technicsTSA, "data.results", []))
    }
  }, [get(technicsTSA, "data.results", [])]);

  const sortDataTechnicTSA = () => {
    const sortedData = [...get(technicsTSA, "data.results", [])].sort((a, b) => {
      if (sortOrderTechnicTSA === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setDataTechnicTSA(sortedData)
    setSortOrderTechnicTSA(sortOrderTechnicTSA === 'asc' ? 'desc' : 'asc');


  };

  const handleSearchTechnicTSA = (e) => {
    setSearchQueryTechnicTSA(e.target.value);
  };

  const filteredDataTechnicTSA = dataTechnicTSA.filter((item) => {
    return (
        get(item, 'name', '').toLowerCase().includes(searchQueryTechnicTSA.toLowerCase()) ||
        get(item, 'gost', '').toString().includes(searchQueryTechnicTSA) ||
        get(item, 'company_name', '').toString().includes(searchQueryTechnicTSA) ||
        get(item, 'price', '').toString().includes(searchQueryTechnicTSA) ||
        get(item, 'country', '').toString().includes(searchQueryTechnicTSA)
    );
  });



  const { data: ministry, isLoading: isLoadingMinistry } = useGetQuery({
    key: "ministry-key",
    url: "https://cs.egov.uz/apiPartner/Table/Get?accessToken=65f171e8d204616a6824dc91&name=039-3-002&limit=500&offset=0&lang=1"
  })

  useEffect(() => {
    if(get(ministry, "data.result.data", [])) {
      setDataMinistry(get(ministry, "data.result.data", []))
    }
  }, [get(ministry, "data.result.data", [])]);

  const sortDataMinistry = () => {
    const sortedData = [...get(ministry, "data.result.data", [])].sort((a, b) => {
      if (sortOrderMinistry === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setDataMinistry(sortedData)
    setSortOrderMinistry(sortOrderMinistry === 'asc' ? 'desc' : 'asc');


  };

  const handleSearchMinistry = (e) => {
    setSearchQueryMinistry(e.target.value);
  };

  const filteredDataMinistry = dataMinistry.filter((item) => {
    return (
        get(item, 'categoryCode', '').toLowerCase().includes(searchQueryMinistry.toLowerCase()) ||
        get(item, 'productCode', '').toString().includes(searchQueryMinistry) ||
        get(item, 'productName', '').toString().includes(searchQueryMinistry) ||
        get(item, 'fieldName', '').toString().includes(searchQueryMinistry) ||
        get(item, 'fieldValue', '').toString().includes(searchQueryMinistry)
    );
  });





  const {data: taxes, isLoadingTax} = useGetQuery({
    key: KEYS.tax,
    url: URLS.tax
  })

  useEffect(() => {
    if(get(taxes, "data.data", [])) {
      setDataTax(get(taxes, "data.data", []))
    }
  }, [get(taxes, "data.data", [])]);

  const sortDataTaxDelivery = () => {
    const sortedData = [...get(taxes, "data.data", [])].sort((a, b) => {
      if (sortOrderTax === 'asc') {
        return a.delivery_sum - b.delivery_sum;
      } else {
        return b.delivery_sum - a.delivery_sum;
      }
    });

    setDataTax(sortedData)
    setSortOrderTax(sortOrderTax === 'asc' ? 'desc' : 'asc');


  };

  const sortDataTaxQQS = () => {
    const sortedData = [...get(taxes, "data.data", [])].sort((a, b) => {
      if (sortOrderTax === 'asc') {
        return a.vat_sum - b.vat_sum;
      } else {
        return b.vat_sum - a.vat_sum;
      }
    });

    setDataTax(sortedData)
    setSortOrderTax(sortOrderTax === 'asc' ? 'desc' : 'asc');


  };

  const handleSearchTax = (e) => {
    setSearchQueryTax(e.target.value);
  };

  const filteredDataTax = dataTax.filter((item) => {
    return (
        get(item, 'mxik_code', '').toLowerCase().includes(searchQueryTax.toLowerCase()) ||
        get(item, 'unit_measurment', '').toString().includes(searchQueryTax) ||
        get(item, 'product_count', '').toString().includes(searchQueryTax)

    );
  });



  const { data: stock, isLoading: isLoadingStock } = useGetQuery({
    key: KEYS.apiBirja,
    url: URLS.apiBirja,
  });

  
  // useEffect(() => {
  //   if(get(cmt, "data", [])) {
  //     setDataStock(get(cmt, "data", []))
  //   }
  // }, [get(stock, "data", [])]);
  // useEffect(() => {
  //   if(get(stock, "data", [])) {
  //     setDataStock(get(stock, "data", []))
  //   }
  // }, [get(stock, "data", [])]);

  const sortData = () => {
    const sortedData = [...get(stock, "data", [])].sort((a, b) => {
      if (sortOrderStock === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setDataStock(sortedData)
    setSortOrderStock(sortOrderStock === 'asc' ? 'desc' : 'asc');


  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredDataCmeta = dataCmt.filter((CmtItem) => {
    return (
      get(CmtItem, 'rn', '').toString().includes(searchQuery) ||
        get(CmtItem, 'name', '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        get(CmtItem, 'code', '').toString().includes(searchQuery) ||
        get(CmtItem, 'measure', '').toString().includes(searchQuery) 

    );
  });

  const {
    data: region,
    isLoading: isLoadingRegion,
    isFetching: isFetchingRegion,
  } = useGetQuery({
    key: [KEYS.regionFilter, regionName],
    url: `${URLS.regionFilter}${regionName}/`,
    enabled: !!regionName,
    
  });




  return (
    <Main>
      <Menu active={7} />
      <Section>
        <div className={"grid grid-cols-12 gap-x-[30px]"}>
          
          <div
            className={
              "col-span-4 text-center relative flex justify-center items-start"
            }
          >
         

            {/* Modal */}
            {selectedRegion && (
              <div className="absolute top-[70px] right-0 transform  bg-[#F4F4F4] shadow-xl rounded-[8px] bg-opacity-75 text-black p-4 w-[500px] max-h-[500px] overflow-y-scroll">
                <div className={"flex justify-between "}>
                  <h1 className={"text-lg font-bold text-start p-2"}>
                    {regionName}
                  </h1>
                  <button onClick={closeRegion} className={""}>
                    {" "}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_717_3428)">
                        <path
                          d="M18 6L6 18"
                          stroke="#000"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6L18 18"
                          stroke="#000"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_717_3428">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
                <div className={"flex items-start"}>
                  <div>
                    {get(region, "data", []).map((item) => (
                      <div className={"flex items-start"}>
                        <Link href={`/company/${get(item, "company_stir")}`}>
                          <abbr
                            className={"no-underline"}
                            title={`Manzili: ${get(
                              item,
                              "company_address",
                            )} \n Telefon-raqami: ${get(
                              item,
                              "company_phone_main",
                            )}`}
                          >
                            <h1
                              className={
                                "text-sm py-1 hover:bg-[#E6E6E6] px-2 rounded-[2px] transition-all duration-400"
                              }
                            >
                              {get(item, "company_name")}
                            </h1>{" "}
                          </abbr>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={"grid grid-cols-12 mt-[30px] min-h-fit gap-x-[30px] gap-y-[30px]"}>
          <div
              onClick={() => toggleTabs(1)}
              className={
                `col-span-4 flex items-center ${tabs === 1 ? "bg-sky-700" : "bg-sky-500"} justify-center flex-col gap-y-[10px] border-[2px]  min-h-[150px] rounded-[8px] cursor-pointer  hover:bg-sky-600 transition-all duration-500 text-white`
              }
          >
            <Image
                src={"/images/kind.png"}
                alt={"stock-market"}
                width={70}
                height={70}
            />
            <h3>Bog'cha</h3>
          </div>
          <div
              onClick={() => toggleTabs(2)}
              className={
                `col-span-4 flex items-center ${tabs === 2 ? "bg-sky-700" : "bg-sky-500"} justify-center flex-col gap-y-[10px] border-[2px]  min-h-[150px] rounded-[8px] cursor-pointer  hover:bg-sky-600 transition-all duration-500 text-white`
              }
          >
            <Image
                src={"/images/school.png"}
                alt={"stock-market"}
                width={80}
                height={80}
            />
            <h3>Maktab </h3>

          </div>
          <div
              onClick={() => toggleTabs(3)}
              className={
                `col-span-4 flex items-center ${tabs === 3 ? "bg-sky-700" : "bg-sky-500"} justify-center flex-col gap-y-[10px] border-[2px]  min-h-[150px] rounded-[8px] cursor-pointer  hover:bg-sky-600 transition-all duration-500 text-white`
              }
          >
            <Image
                src={"/images/hos.png"}
                alt={"stock-market"}
                width={70}
                height={70}
            />
            <h3>Poliklinka</h3>
          </div>
        
        </div>

        {/*Tovar hom-ashyo birjasi*/}

        {tabs === 1 ? (
            <div className={"mt-[30px]"}>
              <Section>
        <div className="grid grid-cols-12 tablet:gap-x-8 mobile:gap-x-4 gap-x-2 min-h-full">
          <div className="col-span-12 text-center mt-5">
            <Title center>Bog'cha </Title>
          </div>
          <div className={"col-span-12 "}>
            <div className={"mb-5"}>
              <div className={"mb-2.5"}>
                <label className={" font-medium text-primary"} htmlFor="#">
                  Qidiruv
                </label>
                <p className={"text-sm text-[#516164]"}>
                  *
                  <NumericFormat
                    value={count}
                    displayType={"text"}
                    thousandSeparator={" "}
                  />{" "}
                  natija topildi
                </p>
              </div>
              <input
                    type="text"
                    placeholder="Kerakli mahsulotni qidiring..."
                    value={searchQuery}
                    onChange={handleSearch}
                    
                    className={
                      "border border-transparent w-full px-5 py-2.5 mb-5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                    }
                />
              {search && search.length < 4 && (
                <span className={"text-red-500 text-xs font-light"}>
                  Kamida 4 ta belgi kiriting
                </span>
              )}
            </div>
          </div>
          <div className=" tablet:col-span-5 laptop:col-span-4 desktop:col-span-3  col-span-12 overflow-y-auto max-h-[200vh]">
            <ul className={"bg-white shadow-category p-2"}>
              {get(volumes, "data.results", []).map((volume, i) => (
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setGroupId(null);
                    setChapterId(null);
                    setPartId(null);
                    setVolumeId(get(volume, "id"));
                  }}
                  className={clsx(
                    "p-1.5 transition cursor-pointer mb-3 hover:bg-[#C7E3FC]",
                    {
                      "text-[#1B41C6] font-medium hover:bg-transparent":
                        get(volume, "id") == volumeId,
                      "!mb-0":
                        get(volumes, "data.results", [])?.length == i + 1,
                    },
                  )}
                  key={get(volume, "id")}
                >
                  <div className={"flex items-start"}>
                    <motion.div
                      className={"mr-2 flex-none"}
                      animate={{
                        rotate: get(volume, "id") == volumeId ? 180 : 0,
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          get(volume, "id") == volumeId
                            ? "/icons/arrow-down-category-active.svg"
                            : "/icons/arrow-down-category.svg"
                        }
                        alt={"arrow"}
                      />
                    </motion.div>
                    <span>{get(volume, "volume_name")}</span>
                  </div>
                  {get(volume, "id") == volumeId &&
                    (isLoadingParts || isFetchingParts ? (
                      <ContentLoader
                        classNames={"!bg-transparent min-h-[25vh]"}
                      />
                    ) : (
                      <ul className={"pl-3 py-1.5"}>
                        {get(parts, "data.results", []).map((part, j) => (
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setGroupId(null);
                              setChapterId(null);
                              setPartId(get(part, "id"));
                            }}
                            className={clsx(
                              " transition cursor-pointer mb-2  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                              {
                                "!text-[#017EFA] !font-medium":
                                  get(part, "id") == partId,
                                "!mb-0":
                                  get(parts, "data.results", [])?.length ==
                                  j + 1,
                              },
                            )}
                            key={get(part, "id")}
                          >
                            <div className={"flex items-start"}>
                              <motion.div
                                className={"mr-2 flex-none "}
                                animate={{
                                  rotate: get(part, "id") == partId ? 90 : 0,
                                }}
                              >
                                <Image
                                  width={18}
                                  height={18}
                                  src={
                                    get(part, "id") == partId
                                      ? "/icons/arrow-down-category-active.svg"
                                      : "/icons/arrow-down-category.svg"
                                  }
                                  alt={"arrow"}
                                />
                              </motion.div>
                              <span>{get(part, "part_name")}</span>
                            </div>
                            {get(part, "id") == partId &&
                              (isLoadingChapters || isFetchingChapters ? (
                                <ContentLoader
                                  classNames={"!bg-transparent min-h-[25vh]"}
                                />
                              ) : (
                                <ul className={"pl-5 py-1.5"}>
                                  {get(chapters, "data.results", []).map(
                                    (chapter, k) => (
                                      <li
                                        className={clsx(
                                          " transition cursor-pointer mb-1.5  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                          {
                                            "!text-[#017EFA] !font-medium":
                                              get(chapter, "id") == chapterId,
                                            "!mb-0":
                                              get(chapters, "data.results", [])
                                                ?.length ==
                                              k + 1,
                                          },
                                        )}
                                        key={get(chapter, "id")}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setGroupId(null);
                                          setChapterId(get(chapter, "id"));
                                        }}
                                      >
                                        <div className={"flex items-start"}>
                                          <motion.div
                                            className={"mr-2 flex-none "}
                                            animate={{
                                              rotate:
                                                get(chapter, "id") == chapterId
                                                  ? 90
                                                  : 0,
                                            }}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={
                                                get(chapter, "id") == chapterId
                                                  ? "/icons/arrow-down-category-active.svg"
                                                  : "/icons/arrow-down-category.svg"
                                              }
                                              alt={"arrow"}
                                            />
                                          </motion.div>
                                          <span>
                                            {get(chapter, "chapter_name")}
                                          </span>
                                        </div>
                                        {get(chapter, "id") == chapterId &&
                                          (isLoadingGroups ||
                                          isFetchingGroups ? (
                                            <ContentLoader
                                              classNames={
                                                "!bg-transparent min-h-[25vh]"
                                              }
                                            />
                                          ) : (
                                            <ul className={"pl-9 py-1.5"}>
                                              {get(
                                                groups,
                                                "data.results",
                                                [],
                                              ).map((group, l) => (
                                                <li
                                                  key={get(group, "id")}
                                                  className={clsx(
                                                    " transition cursor-pointer mb-1.5  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                                    {
                                                      "!text-[#017EFA] !font-medium":
                                                        get(group, "id") ===
                                                        groupId,
                                                      "!mb-0":
                                                        get(
                                                          groups,
                                                          "data.results",
                                                          [],
                                                        )?.length ===
                                                        l + 1,
                                                    },
                                                  )}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setGroupId(
                                                      get(group, "id"),
                                                    );
                                                  }}
                                                >
                                                  {get(group, "group_name")}
                                                </li>
                                              ))}
                                            </ul>
                                          ))}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              ))}
                          </li>
                        ))}
                      </ul>
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
          <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
          <div className="col-span-12">
          <table className="table-auto w-full">
            
                <thead className="text-black text-center">
                <tr>
                  <th
                      className={
                        "px-4 py-2  bg-white  text-gray-900 uppercase font-bold text-sm"
                    }
                  >
                    №
                  </th>
                  <th className="px-4 py-2   text-start bg-white text-gray-900 uppercase font-bold text-sm">
                    Mahsulot nomi
                  </th>
                  <th className="px-4 py-2   bg-white text-gray-900 uppercase font-bold text-sm">
                    Mahsulot Kodi
                  </th>
                  <th className="px-4 py-2   bg-white text-gray-900 uppercase font-bold text-sm">
                    O'lchov Birligi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id || item.code}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {index + 1} {/* Counter */}
                    </td>
                    {columns.slice(1).map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item[col.key] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-800">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
            </table>
              </div>
          </div>
          </div>
        </div>
      </Section>
      <div className={"col-span-12 flex items-center gap-x-8"}>
                
             
              </div>
             
          </div>
        ) : (
          ""
        )}

        {/*Iqtisodiyot va moliya vazirligi*/}
        {tabs === 2 ? (
            <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 mt-[30px] min-h-fit">
              <div className="col-span-12">
                <Title>
                  Iqtisod va moliya vazirligi
                </Title>
              </div>

              <div className={"col-span-12 flex items-center gap-x-8"}>
                <input
                    type="text"
                    placeholder="Kerakli mahsulotni qidiring..."
                    value={searchQueryMinistry}
                    onChange={handleSearchMinistry}
                    className="border px-[10px] py-[10px]  w-2/3 rounded-[6px]"
                />
                <button onClick={sortDataMinistry} className={
                  "text-[#fff] inline-block text-sm laptop:text-base my-[20px] px-[10px] py-[10px] bg-blue-500 rounded-[5px]"
                }>
                  Narx bo'yicha tartiblash {sortOrderMinistry === "asc" ? "(max-min)" : "(min-max)"}
                </button>
              </div>

              <div className={"col-span-12"}>
                <table className="table-auto w-full mt-[20px]">
                  <thead>
                  <tr>
                    <th className={"px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"}>№</th>

                    <th
                        className={
                          "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                        }
                    >
                      Mahsulot kodi
                    </th>
                    <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                      Mahsulot nomi
                    </th>
                    <th
                        className={
                          "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                        }
                    >
                      Toifa kodi
                    </th>
                    <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                      Xususiyat nomi
                    </th>

                    <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                      Xususiyat qiymati
                    </th>

                    <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                      Narxi
                    </th>
                  </tr>
                  </thead>
                  {filteredDataMinistry.map((stockItem, index) => (
                      <tbody key={index} className={"even:bg-white odd:bg-[#FBFBFC] text-black"}>
                      <tr>
                        <td className="border px-4 py-2 text-center">{index + 1}</td>

                        <td className="border px-4 py-2 text-sm">
                          {get(stockItem, "productCode")}
                        </td>

                        <td className="border px-4 py-2 text-sm">
                          {get(stockItem, "productName")}
                        </td>

                        <td className="border px-4 py-2 text-sm">
                          {get(stockItem, "categoryCode")}
                        </td>

                        <td className="border px-4 py-2 text-sm">
                          {get(stockItem, "fieldName")}
                        </td>
                        <td className="border px-4 py-2 text-sm text-center">
                          {get(stockItem, "fieldValue")}
                        </td>


                        <td className="border px-4 py-2 text-center">
                          <NumericFormat value={0} suffix={".00 so'm"} className={"bg-transparent text-center"}/>
                        </td>
                      </tr>
                      </tbody>
                  ))}
                </table>
              </div>

            </div>
        ) : (
            ""
        )}


        
      </Section>
    </Main>
  );
}

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([KEYS.volumes], () =>
      getVolumes({url: URLS.volumes, params: {key: KEYS.materials}}),
  );
  await queryClient.prefetchQuery([KEYS.materials], () =>
      getMostOrdered({url: URLS.materials, params: {key: KEYS.viewCounts}}),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
