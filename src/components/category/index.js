import React from "react";
import Image from "next/image";
import { get } from "lodash";
import Link from "next/link";

const Category = ({
  data,
  url = "materials/volume",
  name = "volume_name",
  logo_url = "volume_logo",
}) => {
  return (
    <Link
      href={`/${url}/${get(data, "id")}`}
      className={
        "rounded-[5px] transition-all laptop:p-2.5 tablet:p-2 p-1.5  bg-white drop-shadow-category flex items-start min-h-full border border-transparent hover:border-[#017EFA]"
      }
    >
      <Image
        height={38}
        width={38}
        src={get(data, logo_url)}
        loader={() => get(data, logo_url)}
        alt={"category"}
        className={
          "laptop:w-[38px] laptop:h-[38px] tablet:w-[34px] tablet:h-[34px] w-[30px] h-[30px]"
        }

      />
      <h4 className={"ml-3 laptop:text-sm tablet:text-xs text-[10px]"}>
        {get(data, name)}
      </h4>
    </Link>
  );
};

export default Category;
