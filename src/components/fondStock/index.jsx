import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, head } from "lodash";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const FondStock = () => {
  const [open, setOpen] = useState(false);
  const { data: birja, isLoading } = useGetQuery({
    key: KEYS.apiBirja,
    url: URLS.apiBirja,
  });

  const Collapse = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className={"text-center bg-[#202B57] cursor-pointer py-3"}
        onClick={Collapse}
      >
        <h3
          className={
            "!text-[#fff] tracking-normal hover:tracking-wide transition-all duration-500  hover:underline"
          }
        >
          Tovar-xom ashyo birjasi
        </h3>

        {head(
          get(birja, "data")?.map((item) => (
            <p key={get(item, "id")} className={"text-[#fff] text-sm"}>
              ({dayjs(get(item, "startdate")).format("DD.MM.YYYY")} -
              {dayjs(get(item, "enddate")).format("DD.MM.YYYY")})
            </p>
          )),
        )}
      </div>
      <div
        className={`${
          !open ? "opacity-0 hidden" : "opacity-100"
        }  bg-[#475ADC] transition-all duration-500`}
      >
        <motion.div>
          <Marquee autoFill={true} pauseOnClick={true} direction={"right"}>
            {get(birja, "data", []).map((item, index) => (
              <div
                key={index}
                className={
                  "px-[5px] py-[8px] border border-[#c5c5c5] w-[180px] "
                }
              >
                <div className={"grid grid-rows-6"}>
                  <h4
                    className={
                      "line-clamp-3 row-span-4 text-[14px] text-[#F0F3F5]"
                    }
                  >
                    {get(item, "name")}
                  </h4>
                  <p className={"text-xs  row-span-1  neon float-right"}>
                    {Number(get(item, "price")).toFixed(2)}
                  </p>
                  <div
                    className={
                      "flex items-center justify-end float-right row-span-1"
                    }
                  >
                    {Number(get(item, "changeSum")) > 0 ? (
                      <Image
                        src={"/images/increase.png"}
                        alt={"increase"}
                        width={20}
                        height={20}
                      />
                    ) : Number(get(item, "changeSum")) < 0 ? (
                      <Image
                        src={"/images/decrease.png"}
                        alt={"decrease"}
                        width={20}
                        height={20}
                      />
                    ) : (
                      ""
                    )}

                    <span
                      className={`${
                        Number(get(item, "changeSum")) > 0
                          ? "text-green-500"
                          : Number(get(item, "changeSum")) < 0
                          ? "text-red-500"
                          : "text-[#DE9C00]"
                      }  row-span-1  text-sm `}
                    >
                      {Number(get(item, "changeSum")).toFixed(2)}(
                      {get(item, "changePresent")})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </>
  );
};

export default FondStock;
