import React, {useState} from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import Link from "next/link";
import {get, isNil} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import Button from "@/components/button";
import GridView from "@/containers/grid-view";
import {toast} from "react-hot-toast";
import usePutQuery from "@/hooks/api/usePutQuery";

const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(20);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [itemId, setItemId] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const { data: currency } = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency,
    });

    const { mutate: deactivateRequest, isLoading: isLoadingDeActivate } =
        usePutQuery({
            listKeyId: KEYS.myWork,
        });

    const deActivate = (_id) => {
        if (_id) {
            deactivateRequest(
                {
                    url: URLS.deactivateWork,
                    attributes: {
                        id: _id,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("E‘lon muvaffaqiyatli o‘chirildi!", {
                            position: "top-center",
                        });
                        setItemId(null);
                    },
                },
            );
        }
    };


    const columns = [
        {
            title: "№",
            key: "id",
            render: ({ index }) => <span>{index}</span>,
        },
        {
            title: "Kodi",
            key: "work_code",
            render: ({ value, row }) => (
                <Link
                    className={"underline"}
                    href={`/works/${get(row, "work_code")}`}
                >
                    <span className={"text-[#28366D]"}>{value}</span>
                </Link>
            ),
        },
        {
            title: "Nomi",
            key: "work_name",
        },
        {
            title: "Narxi",
            key: "work_rent_price",
            render: ({ value, row }) =>
                value *
                get(currency, `data[${get(row, "work_rent_price_currency")}]`, 1) >
                0 ? (
                    <NumericFormat
                        displayType={"text"}
                        className={"text-center bg-transparent"}
                        thousandSeparator={" "}
                        value={(
                            value *
                            get(currency, `data[${get(row, "work_rent_price_currency")}]`, 1)
                        ).toFixed(2)}
                    />
                ) : (
                    t("by_order")
                ),
            classnames: "text-center",
        },
        {
            title: "Miqdori",
            key: "work_amount",
            classnames: "text-center",
        },
        {
            title: "Joylangan vaqti",
            key: "work_updated_date",
            render: ({ value }) =>
                dayjs(value).format("DD.MM.YYYY HH:mm ", "Asia/Tashkent"),
            classnames: "text-center",
        },
        {
            title: "Action",
            key: "action",
            render: ({ row }) => {
                return (
                    <div className={"flex"}>
                        <Link
                            href={`/works/${get(row, "work_code")}`}
                            className={"mr-1.5 inline"}
                        >
                            <Image
                                className={"inline"}
                                width={20}
                                height={20}
                                src={"/icons/eye-icon.svg"}
                                alt={"eye"}
                            />
                        </Link>
                        <Link href={`${URLS.works}${row.id}`}>
                            <Image
                                src={"/icons/edit-icon.svg"}
                                className={"mr-1.5 inline"}
                                width={20}
                                height={20}
                                alt={"edit"}
                            />
                        </Link>
                        <div className={"cursor-pointer"}>
                            <Image
                                className={"inline"}
                                width={20}
                                height={20}
                                src={"/icons/trash-icon.svg"}
                                onClick={() => setItemId(get(row, "id"))}
                                alt={"trash"}
                            />
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <Dashboard>
            <Subheader title={'Qurilish ishlari'}/>
            <div className="p-7">

                <div className="grid grid-cols-12">
                    <div
                        className={
                            "col-span-12 flex items-center justify-between mb-[30px]"
                        }
                    >

                        <Button
                            url={"/dashboard/works/add-ads"}
                            className={
                                "bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center"
                            }
                        >
                            <Image
                                className={"mr-1.5"}
                                width={20}
                                height={40}
                                src={"/icons/plus.svg"}
                                alt={"plus"}
                            />
                            {t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className={"col-span-12 mb-[10px]"}>
                        <p className={"text-sm text-[#516164]"}>
                            *
                            <NumericFormat
                                value={count}
                                displayType={"text"}
                                thousandSeparator={" "}
                            />{" "}
                            ta natija mavjud
                        </p>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            getCount={setCount}
                            url={URLS.myWork}
                            key={KEYS.myWork}
                            columns={columns}
                            defaultPageSize={pageSize}
                            params={{value: search, key: "all"}}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 bg-black bg-opacity-75  z-50  flex justify-center items-center ${
                    isNil(itemId) ? "hidden" : "visible"
                }`}
            >
                <div className={"w-[550px] p-[30px] rounded-[5px] bg-white"}>
                    <div>
                        <Image
                            onClick={() => setItemId(null)}
                            src={"/icons/closeModal.svg"}
                            alt={"modalcloser"}
                            width={24}
                            height={24}
                            className={"float-right block cursor-pointer"}
                        />
                    </div>
                    <br/>

                    <div className={"flex items-center gap-x-[15px]"}>
                        <div
                            className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <Image
                                src={"/images/warning.png"}
                                alt={"warning"}
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6  md:text-left">
                            <p className="font-bold">E'lonni o‘chirmoqchimisiz?</p>
                            <p className="text-sm text-gray-700 mt-1">
                                O'chirish tugmasi bosilganidan so‘ng siz tanlagan e'lon
                                o‘chiriladi.
                            </p>
                        </div>
                    </div>

                    <div
                        className={"text-center flex items-center gap-x-[20px] mt-[20px]"}
                    >
                        <button
                            onClick={() => deActivate(itemId)}
                            className={
                                "block w-full px-4 py-3 md:py-2 bg-red-200 hover:bg-red-400 duration-300 transition-all text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                            }
                        >
                            O'chirish
                        </button>
                        <button
                            onClick={() => setItemId(null)}
                            className={
                                "block w-full  md:w-auto px-4 py-3 md:py-2 bg-gray-200 hover:bg-gray-400 transition-all duration-300 rounded-lg font-semibold text-sm  md:mt-0 md:order-1"
                            }
                        >
                            Bekor qilish
                        </button>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Index;