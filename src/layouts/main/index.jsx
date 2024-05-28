import React from "react";
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import FondStock from "../../components/fondStock/index";

const Main = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <FondStock />

      <Header />
      <main className={""}>
        {children}
        <Link
          className={""}
          href={
            "https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
          }
        >
          <button
            className={
              "fixed  laptop:-right-[140px] tablet:-right-[135px] mobile:-right-[130px] -right-[130px] py-[7px] px-[73px] rounded-t-[5px] top-[494px] laptop:hover:py-[20px] laptop:hover:text-lg   transition-all duration-400 laptop:text-base tablet:text-sm mobile:text-xs text-xs bg-[#017EFA] z-50 text-white -rotate-90"
            }
          >
            Tizim bo‘yicha qo‘llanma
          </button>
        </Link>
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Main;
