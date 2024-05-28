import React, {useTransition} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {useTranslation} from "react-i18next";

const Index = () => {
    const { t } = useTranslation();

    const columns =[
        {
            title: "№",
            key: "id",
            render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
        },
        {
            title: t("Buyurtmachi ismi-sharifi"),
            key: "customer_name",
        },
        {
            title: t("Buyurtirilgan tovar nomi"),
            key: "customer_ordered_product",
        },
        {
            title: t("Buyurtirilgan tovar kodi"),
            key: "product_csr_code",
            render: ({ value, row }) => (
                <Link
                    href={`/company/${get(row, "company_stir")}`}
                    className={"underline text-[#146BBC]"}
                >
                    {value}
                </Link>
            ),
        },
        {
            title: t("Narxi"),
            key: "product_price"
        },
        {
            title: t("Miqdori"),
            key: "product_quantity"
        },
        {
            title: t("Umumiy narxi"),
            key: "product_summary_price"
        }
    ]

    return (
        <Dashboard>
            <Subheader title={"Buyurtmalar"}/>

        </Dashboard>
    );
};

export default Index;