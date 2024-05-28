import React from "react";
import Brand from "@/components/brand";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={"bg-[#28366D]  py-8 "}>
      <div className={"container text-white"}>
        <div className="grid grid-cols-12">
          <div className=" laptop:col-span-4 tablet:col-span-6  col-span-12 mobile:col-span-12 mobile:text-center laptop:text-start text-center">
            <Brand />
            <p className={"my-5"}>{t("footer_desc")}</p>
            <h4 className={"font-medium"}>{t("social_media")}</h4>
            <ul
              className={
                "flex laptop:justify-start laptop:items-start  justify-center my-2.5"
              }
            >
              <li className={"mr-3"}>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/facebook.svg"}
                    alt={"facebook"}
                  />
                </Link>
              </li>
              <li className={"mr-3"}>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/telegram.svg"}
                    alt={"telegram"}
                  />
                </Link>
              </li>
              <li className={"mr-3"}>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/youtube.svg"}
                    alt={"youtube"}
                  />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/instagram.svg"}
                    alt={"instagram"}
                  />
                </Link>
              </li>
            </ul>
            <span className={"text-sm font-light"}>
              {t("All rights reserved")} © {dayjs().format("YYYY")}
            </span>
          </div>
          <div className="laptop:col-span-4 tablet:col-span-6  col-span-12 mobile:col-span-12 mobile:text-center laptop:text-start text-center">
            <h4 className={"text-xl font-bold mb-2.5"}>
              {t("footer_menu_title")}
            </h4>
            <ul>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"/"}>{t("materials")}</Link>
              </li>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"/machine-mechano"}>{t("machine_mechanos")}</Link>
              </li>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"/works"}>{t("works")}</Link>
              </li>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"#"}>{t("companies")}</Link>
              </li>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"/classifier"}>{t("csr")}</Link>
              </li>
              <li className={"mb-2 hover:text-[#1890FF]"}>
                <Link href={"#"}>{t("news")}</Link>
              </li>
              <li className={"hover:text-[#1890FF]"}>
                <Link href={"#"}>{t("contacts")}</Link>
              </li>
            </ul>
          </div>
          <div className="laptop:col-span-4 tablet:col-span-6  col-span-12 mobile:col-span-12 laptop:text-center mobile:text-center text-center">
            <h4 className={"mt-16 "}>{t("subscription")}</h4>
            <p className={"text-sm mb-5"}>{t("subscription_mail")}</p>
            <form action="#">
              <input
                placeholder={t("enter_email")}
                className={
                  "laptop:w-[270px] w-auto rounded-[5px] laptop:text-base tablet:text-sm text-xs p-2.5 text-center placeholder:text-[#28366D] text-[#28366D]"
                }
              />
              <Button
                className={
                  "bg-[#1890FF] !text-white !block mx-auto laptop:w-[270px] laptop:text-base tablet:text-sm text-xs  mt-2.5"
                }
              >
                {t("subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
