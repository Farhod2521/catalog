import React from 'react';
import Image from "next/image";
import Title from "../../../components/title";
import {useTranslation} from "react-i18next";
import Button from "../../../components/button";

const EmptyData = ({viewUrl}) => {
    const {t} = useTranslation()
    return (
        <div className={'h-[50vh] flex items-center justify-center'}>
            <div className={'flex flex-col justify-center items-center'}>
                <Image width={200} height={200} src={'/images/empty.png'} alt={'empty'}/>
                <Title classNames={'!mb-3'} center>{t("Ma’lumot Mavjud emas")}</Title>
                <p>{t("Ushbu bo’limda ma’lumot mavjud emas, kiritish tugmasini bosing")}</p>
                <Button url={`${viewUrl}/add`}
                        className={'bg-[#1890FF] text-white !border-[#1890FF] mt-6 inline-flex items-center'}><Image
                    className={'mr-1.5'} width={20} height={20} src={'/icons/plus.svg'}
                    alt={'plus'}/>{t("E’lon qo’shish")}</Button>
            </div>
        </div>
    );
};

export default EmptyData;