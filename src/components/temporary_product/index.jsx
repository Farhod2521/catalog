import React from "react";
import Image from "next/image";
import { get, isNil } from "lodash";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";
import { useSession, signIn } from "next-auth/react";
import clsx from "clsx";
import Link from "next/link";

const TemporaryProduct = ({
  template = "card",
  data,
  name = "material_name",
  code = "material_code",
  img = "material_image",
  viewUrl = "materials",
  classNames = "",
}) => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const addCart = () => {};
  return (
    <>
      {template === "list" ? (
        <Link href={`/${viewUrl}/${get(data, code)}`}>
          <div
            className={clsx(
              "drop-shadow-category bg-white p-2.5 rounded-[5px] border border-transparent hover:border-[#017EFA] pb-12 min-h-full",
            )}
          >
            <div className={"flex justify-between mb-2.5"}>
              <span
                className={
                  "mobile:text-xs text-[10px] mobile:py-[5px] py-[3px] mobile:px-2.5 px-1.5  bg-[#D1E9FF] text-[#28366D] font-medium"
                }
              >
                #{get(data, code)}
              </span>
              <Image
                className={"cursor-pointer"}
                width={10}
                height={16}
                src={"/icons/label.svg"}
                alt={"label"}
              />
            </div>
            <h2
              className={
                "text-[#28366D] font-medium mobile:text-sm text-[11px]"
              }
            >
              {get(data, name)}
            </h2>
          </div>
        </Link>
      ) : (
        <div
          className={clsx(
            "drop-shadow-category bg-white p-2.5 rounded-[5px] border border-transparent hover:border-[#017EFA] pb-12 min-h-full",
          )}
        >
          <div className={"relative h-[170px] rounded overflow-hidden mb-2.5"}>
            {isNil(get(data, img)) ? (
              <Image
                layout={"fill"}
                objectFit={"cover"}
                src={"/images/material.png"}
              />
            ) : (
              <Image
                layout={"fill"}
                objectFit={"cover"}
                src={get(data, img)}
                loader={() => get(data, img)}
              />
            )}
          </div>
          <div className={"flex justify-between mb-2.5"}>
            <span
              className={
                "text-xs py-[5px] px-2.5 bg-[#D1E9FF] text-[#28366D] font-medium"
              }
            >
              #{get(data, code)}
            </span>
            <Image
              className={"cursor-pointer"}
              width={10}
              height={16}
              src={"/icons/label.svg"}
              alt={"label"}
            />
          </div>
          <h2 className={"text-[#28366D] font-medium text-sm  mb-5"}>
            {get(data, name)}
          </h2>
          <div className="flex justify-between absolute bottom-2.5 left-2.5 right-2.5">
            <Button url={`/${viewUrl}/${get(data, code)}`}>{t("see")}</Button>
            <Button
              handleClick={
                get(session, "user.key")
                  ? () => addCart(get(data, code))
                  : () => signIn()
              }
              className={"min-w-[48px] group "}
            >
              <svg
                className={"fill-[#28366D] group-hover:fill-white "}
                width={25}
                height={25}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1611_1155)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 12.1337C12.6989 12.1337 12.8897 12.2127 13.0303 12.3533C13.171 12.494 13.25 12.6848 13.25 12.8837V15.1337H15.5C15.6989 15.1337 15.8897 15.2127 16.0303 15.3533C16.171 15.494 16.25 15.6848 16.25 15.8837C16.25 16.0826 16.171 16.2733 16.0303 16.414C15.8897 16.5546 15.6989 16.6337 15.5 16.6337H13.25V18.8837C13.25 19.0826 13.171 19.2733 13.0303 19.414C12.8897 19.5546 12.6989 19.6337 12.5 19.6337C12.3011 19.6337 12.1103 19.5546 11.9697 19.414C11.829 19.2733 11.75 19.0826 11.75 18.8837V16.6337H9.5C9.30109 16.6337 9.11032 16.5546 8.96967 16.414C8.82902 16.2733 8.75 16.0826 8.75 15.8837C8.75 15.6848 8.82902 15.494 8.96967 15.3533C9.11032 15.2127 9.30109 15.1337 9.5 15.1337H11.75V12.8837C11.75 12.6848 11.829 12.494 11.9697 12.3533C12.1103 12.2127 12.3011 12.1337 12.5 12.1337Z"
                  />
                  <path d="M12.5 2.38367C13.4946 2.38367 14.4484 2.77876 15.1517 3.48202C15.8549 4.18528 16.25 5.13911 16.25 6.13367V6.88367H8.75V6.13367C8.75 5.13911 9.14509 4.18528 9.84835 3.48202C10.5516 2.77876 11.5054 2.38367 12.5 2.38367ZM17.75 6.88367V6.13367C17.75 4.74128 17.1969 3.40592 16.2123 2.42136C15.2277 1.43679 13.8924 0.883667 12.5 0.883667C11.1076 0.883667 9.77226 1.43679 8.78769 2.42136C7.80312 3.40592 7.25 4.74128 7.25 6.13367V6.88367H2V21.8837C2 22.6793 2.31607 23.4424 2.87868 24.005C3.44129 24.5676 4.20435 24.8837 5 24.8837H20C20.7956 24.8837 21.5587 24.5676 22.1213 24.005C22.6839 23.4424 23 22.6793 23 21.8837V6.88367H17.75ZM3.5 8.38367H21.5V21.8837C21.5 22.2815 21.342 22.663 21.0607 22.9443C20.7794 23.2256 20.3978 23.3837 20 23.3837H5C4.60218 23.3837 4.22064 23.2256 3.93934 22.9443C3.65804 22.663 3.5 22.2815 3.5 21.8837V8.38367Z" />
                </g>
                <defs>
                  <clipPath id="clip0_1611_1155">
                    <rect
                      width={24}
                      height={24}
                      fill="white"
                      transform="translate(0.5 0.883667)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TemporaryProduct;
