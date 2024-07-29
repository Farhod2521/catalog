import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import { getMostOrdered, getCategories } from "@/api";
import { KEYS } from "@/constants/key";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ContentLoader } from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import { get, isEmpty } from "lodash";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Format1 from "@/components/product/format1";
import Template from "@/components/template";
import useGetQuery from "@/hooks/api/useGetQuery";

import {NumericFormat} from "react-number-format";
import axios from "axios";
export default function Works() {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(24);
  const [isActive, setIsActive] = useState(0);
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState(URLS.cmt);
  const [data, setData] = useState([]);

  const { data: cmt_category = {}, isLoading: isLoadingCmt_Category } = useGetQuery({
    url: URLS.cmt_category,
    key: KEYS.cmetaCategory,
  });


  const dataCategory = cmt_category.data?.results || [];
  const filteredDataCategory = dataCategory.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });




  const handleClick = async (id) => {
    try {
      const res = await axios.get(`https://backend-market.tmsiti.uz/cmeta/cmeta/${id}`);
      setData(res.data.results);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const data = cmt.data?.results || [];
  

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
  const CMT = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
 


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

 

  const handleClickFormat = (type) => {
    setIsActive(type);
  };

  const {
    data: volumes,
    isError,
    isLoading,
    isFetching,
  } = useQuery([KEYS.categories], () =>
    getCategories({ url: URLS.categories, params: { key: KEYS.works } }),
  );
  const {
    data: items,
    isLoading: machineLoading,
    isError: machineError,
  } = useQuery([KEYS.works, pageSize], () =>
    getMostOrdered({
      url: URLS.works,
      params: { key: KEYS.viewCounts, page_size: pageSize },
    }),
  );
  if (isError || machineError) {
    return <ErrorPage />;
  }
  if (isLoading || machineLoading || isFetching) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }

 

  // useEffect(() => {
  //   // tab data
  //   const { data: cmt_category_tab = {}, isLoading: isLoadingCmt_Category_tab } = useGetQuery({
  //     url: URLS.cmt_category_tab,
  //     key: KEYS.cmetaCategory_tab,
  //   });

  //  console.log(cmt_category_tab)
  // }, [tab])

  return (
    <Main>
      <Menu active={3} />
      <Section>
        <div className={"grid grid-cols-12 tablet:gap-x-8 gap-x-4"}>
          <div className={"col-span-12 flex justify-center items-center gap-x-8"}>
            <button onClick={() => setTab(1)}
                className={`${tab === 1 ? "bg-blue-500 text-white" :  "bg-white text-blue-500 border-blue-500 border-[1px]"}  py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}>
              Hajm usuli
            </button>
            <button onClick={() => setTab(100)}
                className={`bg-blue-500 ${tab === 100 ? "bg-blue-500 text-white" :  "bg-white text-blue-500 border-blue-500 border-[1px]"}  py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}>
              Resurs usuli
            </button>
          </div>
        </div>
      </Section>
      <Section>
    
          <div className="desktop:col-span-3 mobile:col-span-12 tablet:col-span-6 laptop:col-span-4 col-span-12 mb-5">
          {filteredDataCategory.length > 0 ? (
      filteredDataCategory.map((item, index) => {
        return (
          <button
            onClick={() => handleClick(item.id)}
            className={`bg-blue-500 ${tab === item.id ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-200"} m-5 py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}
            key={index}
          >
            {index + 1}. {item.name}
          </button>
        )
      })
    ) : (
      <h1>No data available</h1>
    )}
        

            
          </div>

      
          
          <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
          <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
          <div className="col-span-12">
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
              
            </div>
          </div>
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
    {CMT.length > 0 ? (
      CMT.map((item, index) => (
        <tr key={item.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {index + 1} 
          </td>
          {columns.slice(1).map((col) => {
          
            return (
              <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {item[col.key] || 'N/A'}
              </td>
            );
          })}
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
          
        {tab === 1 && <div><div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 ">

 

 
      
        </div> 
       
       
        </div>
        }
      </Section>

      <Section>
        {tab === 2 &&
            <div>
              <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 ">
                {!isEmpty(get(volumes, "results", [])) &&
                    get(volumes, "results", []).map((volume) => (
                        <div
                            key={get(volume, "id")}
                            className={
                              "desktop:col-span-3 mobile:col-span-12 tablet:col-span-6 laptop:col-span-4 col-span-12 mb-5"
                            }
                        >
                          <Category
                              url={"works/category"}
                              name={"category_name"}
                              logo_url={"category_logo"}
                              data={volume}
                          />
                        </div>
                    ))}
              </div>
            </div>}
      </Section>
    </Main>
  );
}

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([KEYS.categories], () =>
      getCategories({url: URLS.categories, params: {key: KEYS.works}}),
  );
  await queryClient.prefetchQuery([KEYS.works], () =>
      getMostOrdered({url: URLS.works, params: {key: KEYS.viewCounts}}),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
