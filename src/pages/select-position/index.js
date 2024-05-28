import React, { useState } from "react";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

const Index = () => {
  const [selectPosition, setSelectPosition] = useState("client");
  const [isScaled, setIsScaled] = useState(false);
  const { data: session } = useSession();
  const handleSelection = (select) => {
    setSelectPosition(select);
    setIsScaled(!isScaled);
  };

  const { data: user } = useGetQuery({
    key: KEYS.getMe,
    url: URLS.getMe,
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!get(session, "user.token"),
  });
  return (
    <div className={"flex relative"}>
      <div
        className={
          " w-1/2 h-screen flex items-center justify-center bg-[#202B57] "
        }
      >
        <div>
          <Image src={"/images/logo.svg"} alt={""} width={400} height={400} />
        </div>

        <button
          onClick={() => handleSelection("client")}
          className={`absolute ${
            isScaled ? "scale-110" : "scale-100"
          } transition-transform  duration-300 ease-in-out transform`}
        >
          <div
            className={`border-[2px] border-[#202B57] p-4 w-[300px] rounded-[6px] hover:border-white ${
              selectPosition === "client" ? "border-white" : ""
            } transition-all duration-400 cursor-pointer bg-[#202B57] shadow-transparent hover:shadow-white shadow-lg`}
          >
            <div className={" flex justify-between mb-[30px]"}>
              <Image
                src={"/images/client.png"}
                alt={""}
                width={50}
                height={50}
              />

              <div
                className={`rounded-full border-[2px] ${
                  selectPosition === "client" ? "bg-white" : "bg-[#202B57] "
                } w-[20px] h-[20px]`}
              ></div>
            </div>
            <div>
              <h1 className={"text-2xl text-white"}>
                Siz qurilish materiallarini buyurtma qiluvchi kompaniyasiz
              </h1>
            </div>
          </div>
        </button>

        {selectPosition === "client" && (
          <motion.button
            initial={{ opacity: 0, translateY: "40px" }}
            animate={{ opacity: 100, translateY: "0px" }}
            transition={{ duration: 0.1 }}
            className={
              "absolute bottom-[50px] text-lg text-[#202B57] bg-white hover:bg-[#E7E7E7] transition-all duration-500  p-4 rounded-[6px]"
            }
          >
            <Link href={"/auth/login"}>
              Buyurtmachi sifatida ro'yxatdan o'tish
            </Link>
          </motion.button>
        )}
      </div>

      <div
        className={
          " w-1/2 h-screen flex items-center justify-center bg-white relative"
        }
      >
        <div className={""}>
          <Image src={"/images/brand.svg"} alt={""} width={400} height={400} />
        </div>

        <button
          className={`absolute transition-transform ${
            !isScaled ? "scale-110" : "scale-100"
          }  duration-300 ease-in-out transform`}
          onClick={() => handleSelection("delivery")}
        >
          <div
            className={`border-[2px] p-4 w-[300px] rounded-[6px] hover:border-[#202B57] ${
              selectPosition === "delivery" ? "border-[#202B57]" : ""
            }  cursor-pointer shadow-transparent hover:shadow-[#202B57] shadow-lg  bg-white transition-all duration-400`}
          >
            <div className={" flex justify-between mb-[30px]"}>
              <Image
                src={"/images/delivery.png"}
                alt={""}
                width={50}
                height={50}
              />

              <div
                className={`rounded-full border-[2px] ${
                  selectPosition === "delivery"
                    ? "bg-[#202B57] "
                    : "bg-transparent "
                } w-[20px] h-[20px]`}
              ></div>
            </div>
            <div>
              <h1 className={"text-2xl"}>
                Siz qurilish materiallarini yetkazib beruvchi kompaniyasiz
              </h1>
            </div>
          </div>
        </button>

        {selectPosition === "delivery"  && (
          <motion.button
            initial={{ opacity: 0, translateY: "40px" }}
            animate={{ opacity: 100, translateY: "0px" }}
            transition={{ duration: 0.1 }}
            className={
              "absolute bottom-[50px] transition-all hover:bg-[#2F3F80] duration-500 text-white bg-[#202B57] p-4 text-lg rounded-[6px]"
            }
            onClick={() => signIn()}
          >
            Yetkazib beruvchi sifatida ro'yxatdan o'tish
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Index;
