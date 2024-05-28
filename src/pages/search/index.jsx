import React, { useState } from "react";
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import { debounce, get, split } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { ContentLoader, OverlayLoader } from "@/components/loader";
import Product from "@/components/product";
import { useRouter } from "next/router";
// import {getDefaultValue, getOptionList} from "../../../../tmsiti.uz/src/utils";
import { getDefaultValue, getOptionList } from "@/utils";
import Pagination from "@/components/pagination";
import { searchKeyList } from "@/constants";
import { NumericFormat } from "react-number-format";
import Template from "@/components/template";

const Index = () => {
  const router = useRouter();
  const { query = "", category = "all" } = router.query;
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(0);

  const handleClickFormat = (type) => {
    setIsActive(type);
  };

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.search,
    url: URLS.search,
    params: {
      key: category,
      value: query,
      page,
    },
  });

  if (isLoading) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }
  return (
    <Main>
      {isFetching && <OverlayLoader />}
      <Menu />
      <Section>
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center mt-5">
            <Title center>Qidiruv</Title>
          </div>
          <div className="col-span-12 mb-5">
            <label className={"block mb-1.5 text-[#202B57]"} htmlFor="#">
              Qidiruv maydoni
            </label>
            <input
              defaultValue={query}
              onChange={debounce(function (e) {
                router.push(
                  `/search?query=${e.target.value}&category=${category}`,
                );
              }, 500)}
              className={"w-full h-11  rounded-[5px] outline-none px-3"}
              type="text"
            />
          </div>
          <div className="col-span-12 mb-5">
            <Select
              name={"material"}
              defaultValue={getDefaultValue(
                getOptionList(searchKeyList, "key", "title"),
                category,
              )}
              getValue={(val) => {
                router.push(
                  `/search?query=${query}&category=${get(val, "value")}`,
                );
              }}
              options={getOptionList(searchKeyList, "key", "title")}
              label={"Tanlangan mahsulot turi"}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 mt-8 min-h-fit">
          <div className="col-span-12 mb-7">
            <Title classNames={"!mb-0"}>Qidiruv natijalari</Title>
            <p className={"mt-2.5 text-[#4B5055] text-sm"}>
              <NumericFormat
                displayType={"text"}
                value={get(data, "data.count", 0)}
                thousandSeparator={" "}
              />{" "}
              natija topildi
            </p>
          </div>

          <Template active={isActive} handleClickFormat={setIsActive} />

          {get(data, "data.results", [])?.length == 0 ? (
            <div className={"col-span-12 mb-5 text-[#515D89] text-xl"}>
              Sizning so’rovingizga mos natija topilmadi
            </div>
          ) : (
            get(data, "data.results", []).map((material) => (
              <div
                key={get(material, "resource_code")}
                className={`${
                  isActive === 1 && isActive === 2 && "col-span-3"
                } ${isActive === 0 && "col-span-6"} col-span-3 mb-[30px] `}
              >
                <Product
                  template={isActive == 0 || isActive == 2 ? "list" : "card"}
                  viewUrl={get(
                    split(get(material, "resource_url"), "/"),
                    "[1]",
                  )}
                  img={"resource_image"}
                  code={"resource_code"}
                  name={"resource_name"}
                  data={material}
                />
              </div>
            ))
          )}
          <div className={"col-span-12"}>
            {get(data, "data.total_pages", 0) > 0 && (
              <Pagination
                page={page}
                setPage={setPage}
                pageCount={get(data, "data.total_pages", 0)}
              />
            )}
          </div>
        </div>
      </Section>
    </Main>
  );
};

export default Index;
