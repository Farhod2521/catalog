import React from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import {URLS} from "@/constants/url";

const columns = [
    {
        title: "№",
        key: "id",
        render: ({ index }) => <span>{index}</span>,
    },
    {
        title: "Kodi",
        key: "material_code",
        render: ({ value, row }) => (
            <Link
                className={"underline"}
                href={`/materials/${get(row, "material_code")}`}
            >
                <span className={"text-[#28366D]"}>{value}</span>
            </Link>
        ),
    },
    {
        title: "Nomi",
        key: "material_name",
    },
    {
        title: "Narxi",
        key: "material_price",
        render: ({ value, row }) =>
            value *
            get(currency, `data[${get(row, "material_price_currency")}]`, 1) >
            0 ? (
                <NumericFormat
                    displayType={"text"}
                    className={"text-center bg-transparent"}
                    thousandSeparator={" "}
                    value={(
                        value *
                        get(currency, `data[${get(row, "material_price_currency")}]`, 1)
                    ).toFixed(2)}
                />
            ) : (
                t("by_order")
            ),
        classnames: "text-center",
    },
    {
        title: "Miqdori",
        key: "material_measure",
        classnames: "text-center",
    },
    {
        title: "Joylangan vaqti",
        key: "material_updated_date",
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
                        href={`/materials/${get(row, "material_code")}`}
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
                    <Link href={`${URLS.materials}/${row.id}`}>
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

const Index = () => {
    return (
        <Dashboard>
            <Subheader title={'Mening buyurtmalarim'} />
            <div className="p-7">
                
            </div>
        </Dashboard>
    );
};

export default Index;