"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Brand = () => {
  const { t } = useTranslation();
  return (
    <Link className={"flex items-center"} href={"/"}>
      <Image
        className={"mr-5 tablet:w-[56px] tablet:h-[60px] w-[40px] h-[40px]"}
        width={56}
        height={60}
        src={"/images/logo.svg"}
        alt={"image"}
      />
      <span className={"font-bold tablet:text-base text-xs w-auto"}>
        {t("name")}
      </span>
    </Link>
  );

  return (
    <Link className={"flex items-center"} href={"/"}>
      <Image
        className={"mr-5"}
        width={56}
        height={60}
        src={"/images/logo.svg"}
        alt={"image"}
      />
      <span className={"font-bold text-base w-auto"}>{t("name")}</span>
    </Link>
  );
};

export default Brand;
