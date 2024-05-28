import React from "react";
import { get } from "lodash";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const GridBody = ({
  hasActionColumn = false,
  eyeUrl,
  columns = [],
  rows = [],
  pageSize = 24,
  page = 1,
  handleSort = () => {},
}) => {
  return (
    <div className={"overflow-x-scroll laptop:overflow-x-auto"}>
      <table className={"bg-white w-full overflow-x-scroll  mb-8 align-middle"}>
        <thead className={"font-medium text-black text-left align-middle"}>
          <tr className={"align-middle"}>
            {columns &&
              columns.map((th) => (
                <th
                  className={clsx("py-2.5 px-5", get(th, "classnames", ""))}
                  key={get(th, "id")}
                >
                  <div className="inline-flex items-center">
                    <span className={"laptop:text-base tablet:text-sm text-xs"}>
                      {get(th, "title")}
                    </span>
                    {get(th, "sorter") && (
                      <div className="inline-flex flex-col ml-1">
                        <Image
                          onClick={() => handleSort(get(th, "key"))}
                          className={"cursor-pointer mb-[3px] max-w-none"}
                          width={10}
                          height={6}
                          src={"/icons/sort-up.svg"}
                          alt={"up"}
                        />
                        <Image
                          onClick={() => handleSort(`-${get(th, "key")}`)}
                          className={"cursor-pointer max-w-none"}
                          width={10}
                          height={6}
                          src={"/icons/sort-down.svg"}
                          alt={"up"}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            {hasActionColumn && <th className={"py-2.5 px-5"}>Action</th>}
          </tr>
        </thead>
        <tbody
          className={
            "text-[#212529] overflow-x-scroll laptop:text-sm tablet:text-xs text-[10px] align-middle"
          }
        >
          {rows &&
            rows.map((tr, index) => {
              return (
                <>
                  <tr
                    className={"even:bg-white odd:bg-[#FBFBFC] align-middle"}
                    key={get(tr, get(columns, "[0].key"))}
                  >
                    {columns.map((th) => (
                      <td
                        className={clsx(
                          "py-2.5 px-5 align-middle",
                          get(th, "classnames", ""),
                        )}
                      >
                        {get(th, "render")
                          ? get(
                              th,
                              "render",
                            )({
                              value: get(tr, get(th, "key")),
                              row: tr,
                              index: index + (page - 1) * pageSize + 1,
                            })
                          : get(tr, get(th, "key"))}
                      </td>
                    ))}
                    {hasActionColumn && (
                      <td
                        className={
                          "align-middle py-2.5 px-5 text-center inline-flex"
                        }
                      >
                        <Link href={eyeUrl} className={"mr-1.5 inline"}>
                          {" "}
                          <Image
                            className={"inline"}
                            width={20}
                            height={20}
                            src={"/icons/eye-icon.svg"}
                            alt={"eye"}
                          />
                        </Link>
                        {/*<Link href={'#'} className={'inline'}> <Image className={'inline'} width={20} height={20} src={'/icons/edit-icon.svg'}*/}
                        {/*                         alt={'edit'}/></Link>*/}
                        <Link href={"#"} className={"ml-1.5 inline"}>
                          {" "}
                          <Image
                            className={"inline"}
                            width={20}
                            height={20}
                            src={"/icons/trash-icon.svg"}
                            alt={"trash"}
                          />
                        </Link>
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GridBody;
