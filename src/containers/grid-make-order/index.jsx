import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCounter } from "@/context/counter";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import { get } from "lodash";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";

const GridMakeOrder = () => {
  const { state, dispatch } = useCounter();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(48);
  const [sort, setSort] = useState(undefined);
  const { stir } = router.query;

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.companyAds,
    url: `${URLS.companyAds}${stir}/`,
    params: {
      page,
      sort_by: sort,
      page_size: pageSize,
    },
  });

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "DECREMENT", payload: JSON.stringify(product) });
    if (state.count <= 0) {
      state.count = 0;
    }
  };

  return (
    <div className={"col-span-12"}>
      <h1 className={"text-2xl mb-[20px] font-bold"}>
        Buyurtma qilmoqchimisiz? <br /> Unda "Buyurtma qilish" tugmasini bosing
      </h1>
      <ul className={"grid grid-cols-12 gap-x-8 gap-y-8"}>
        {get(data, "data.results", []).map((card) => (
          <li
            className={
              "col-span-3 bg-white p-4 cursor-pointer border-[#c5c5c5] rounded-[10px] hover:border-blue-400 border-[2px] flex flex-col items-center flex-grow transition-all duration-500"
            }
            key={get(card, "id")}
          >
            <Image
              src={"/images/material.png"}
              alt={"material"}
              width={250}
              height={80}
              className={"shadow-xl mb-[20px]"}
            />

            <div className={"text-lg mb-[10px] flex gap-x-2"}>
              <p>Kodi:</p>
              <Link
                href={`${get(card, "material_url", "#")}`}
                className={"font-bold underline"}
              >
                {get(card, "material_name")}
              </Link>
            </div>

            <div></div>

            <div
              className={
                "border-[#c5c5c5] border-[2px] p-3 rounded-[10px] my-[10px] flex flex-col flex-grow "
              }
            >
              <h4 className={"text-xl font-bold "}>Resurs turi</h4>

              <p className={"text-lg mb-[15px]"}>
                {get(card, "material_type")}
              </p>

              <h2 className={"text-xl font-bold "}>E'lon tavsifi</h2>

              <p className={"text-lg"}>{get(card, "material_description")}</p>
            </div>

            <p className={"text-[22px] my-[30px]"}>
              Narxi :{" "}
              <span className={"font-bold"}>
                <NumericFormat
                  displayType={"text"}
                  thousandSeparator={" "}
                  value={get(card, "material_price")}
                  suffix={` (${get(card, "material_measure")})`}
                />
              </span>
            </p>

            {Object.keys(state).includes(JSON.stringify(card)) ? (
              <div className={"button-container "}>
                <button
                  className={
                    "p-[20px] bg-[#4A64CA] text-white text-lg rounded-[15px]"
                  }
                  onClick={() => handleDecrement(card)}
                >
                  <p>-</p>
                </button>

                <p className={"value"}>
                  <span>{state[JSON.stringify(card)] ?? 0}</span>
                </p>

                <button
                  className={
                    "p-[20px] bg-[#4A64CA] text-white text-lg rounded-[15px]"
                  }
                  onClick={() => handleIncrement(card)}
                >
                  <p>+</p>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleIncrement(card)}
                className={
                  "flex px-[40px] py-4  gap-x-4 rounded-[10px] border bg-white hover:bg-[#4A64CA] text-[#4A64CA] hover:text-white transition-all duration-500"
                }
              >
                <p className={"text-xl"}>Buyurtma qilish</p>
              </button>
            )}
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        setPage={setPage}
        pageCount={get(data, "data.total_pages", 0)}
      />
    </div>
  );
};

export default GridMakeOrder;
