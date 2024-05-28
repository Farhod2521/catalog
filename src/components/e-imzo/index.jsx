import React, {useEffect, useState} from 'react';
import {ReactEIMZO} from "@/services/e-imzo";
import {get, isArray, isEmpty, isEqual} from "lodash";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import Button from "@/components/button";
import Link from "next/link";
import {ContentLoader} from "@/components/loader";
import {toast} from "react-hot-toast";

const ESIGN = ({
                   setOpen = () => {
                   },
                   open = false,
                   eSign = () => {
                   },
                   ...rest
               }) => {

    const {t} = useTranslation()
    const [error, setError] = useState(null)
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        initEIMZO();
    }, [])
    const initEIMZO = async () => {
        try {
            await ReactEIMZO.install();
            try {
                const allKeys = await ReactEIMZO.listAllUserKeys();
                await setKeys(allKeys);
                setLoading(false);
            } catch (e) {
                setError('KEY_NOT_FOUND')
                setLoading(false);
            }
        } catch (e) {
            setError('NOT_INSTALLED');
            setLoading(false);
        }
    }

    const handleOk = async (key) => {
        try {
            let res = await ReactEIMZO.signPkcs7(key, 'Hello world');
            eSign(res, key);
        } catch (e) {
            toast.error(t('Incorrect password'), {position: 'top-right'})
        }
    }
    return (
        <>
            {
                loading && <ContentLoader classNames={'!bg-white !min-h-[25vh]'}/>
            }

            {
                isArray(keys) && !isEmpty(keys) && <>
                    <div className={'!text-start !font-semibold mb-[20px]'}>
                        <h4 className={'text-base'}>ERI kalit tanlang.</h4>
                    </div>
                    {keys.map((key, i) =>
                        <div key={i} onClick={() => handleOk(key)}
                             className={'p-[30px] grid grid-cols-12 gap-x-[20px] container mx-auto !text-start rounded-[5px] border-[1px] border-transparent cursor-pointer hover:border-[1px] hover:border-[#017EFA]  text-base bg-[#fff] transition-all duration-300'}>
                            <h3 className={'col-span-12 mb-[10px] font-semibold'}>{get(key, 'CN', '-')}</h3>
                            <div className={'col-span-12 flex gap-x-[20px] flex-wrap'}>
                                <div className={''}>
                                    <h4 className={'text-sm'}>JSHSHIR:</h4>
                                    <p className={'font-medium'}>{get(key, 'PINFL', '-')}</p>
                                </div>

                                <div className={''}>
                                    <h4 className={'text-sm'}>STIR:</h4>
                                    <p className={'font-medium'}>{get(key, 'TIN', '-')}</p>
                                </div>

                                <div className={''}>
                                    <h4 className={'text-sm'}>Mulkchilik turi:</h4>
                                    <p className={'font-medium'}>{get(key, 'O') ? 'Yuridik shaxs' : 'Jismoniy shaxs'}</p>
                                </div>
                            </div>

                            <div className={'col-span-12 my-[10px]'}>
                                <h4 className={'text-sm'}>Tashkilot:</h4>
                                <p className={'font-medium'}>{get(key, 'O', '-')}</p>
                            </div>

                            <div className={'col-span-12 flex justify-between'}>
                                <div className={''}>
                                    <h4 className={'text-sm'}>Sertifikat raqami:</h4>
                                    <p className={'font-medium'}>{get(key, 'serialNumber', '-')}</p>
                                </div>

                                <div className={''}>
                                    <h4 className={'text-sm'}>Sertifikatning amal qilish muddati:</h4>
                                    <p className={'font-medium'}>{dayjs(get(key, 'validFrom', '-')).format("DD.MM.YYYY")} - {dayjs(get(key, 'validTo', '-')).format("DD.MM.YYYY")}</p>
                                </div>
                            </div>

                        </div>)
                    }
                </>
            }

            {isEqual(error, 'NOT_INSTALLED') ?
                <>
                    <div className={'!text-start !font-semibold mb-[20px]'}>
                        <h4 className={'text-base'}>ERI urnatilmagan.</h4>

                    </div>
                    <div className={'!text-start text-sm '}>
                        <p>
                            Xatoni hal qilish uchun quyidagilarni bajaring:
                        </p>

                        <ol className={'list-decimal ml-[20px]'}>
                            <li>
                                ERI kalitlari C:\DSKEYS yoki D:\DSKEYS manzilida joylashganligini hamda ushbu
                                kalitlar
                                aynan
                                sizga tegishligini tekshiring
                            </li>

                            <li>
                                Antivirus dasturi kalitlardan foydalanishni ta'qiqlamayotganligini tekshiring
                            </li>

                            <li>
                                Korporativ kompyuterlarni ko'llash holatida tashkilot siyosati sizga ERI
                                kalitlaridan
                                foydalanishga ruxsat berayotganiga ishonch hosil qiling
                            </li>
                        </ol>

                        <p className={"mt-[20px] text-[#525D8A]"}>E-Imzo modulini o'rnatish bo'yicha yo'riqnoma va
                            yuzaga
                            kelishi mumkin bo'lgan muammolar bilan <Link href={'https://e-imzo.uz/#instructions'}
                                                                         className={'text-[#017EFA] underline'}>shu
                                yerda</Link> tanishishingiz mumkin</p>
                    </div>
                </>
                : isEqual(error, 'KEY_NOT_FOUND') ?
                    <>
                        <div className={'!text-start !font-semibold mb-[20px]'}>
                            <h4 className={'text-base'}>ERI urnatilgan lekin kalit topilmadi.</h4>

                        </div>
                        <div className={'!text-start text-sm '}>
                            <p>
                                Xatoni hal qilish uchun quyidagilarni bajaring:
                            </p>

                            <ol className={'list-decimal ml-[20px]'}>
                                <li>
                                    ERI kalitlari C:\DSKEYS yoki D:\DSKEYS manzilida joylashganligini hamda ushbu
                                    kalitlar aynan
                                    sizga tegishligini tekshiring
                                </li>
                                <li>
                                    Antivirus dasturi kalitlardan foydalanishni ta'qiqlamayotganligini tekshiring
                                </li>

                                <li>
                                    Korporativ kompyuterlarni ko'llash holatida tashkilot siyosati sizga ERI
                                    kalitlaridan
                                    foydalanishga ruxsat berayotganiga ishonch hosil qiling
                                </li>
                            </ol>

                            <p className={"mt-[20px] text-[#525D8A]"}>E-Imzo modulini o'rnatish bo'yicha yo'riqnoma
                                va
                                yuzaga
                                kelishi mumkin bo'lgan muammolar bilan <Link
                                    href={'https://e-imzo.uz/#instructions'}
                                    className={'text-[#017EFA] underline'}>shu
                                    yerda</Link> tanishishingiz mumkin</p>
                        </div>
                    </> : ''
            }
            {!loading &&
                <Button handleClick={() => {
                    initEIMZO();
                    setKeys([]);
                    setError(null);
                    setLoading(true);
                }} className={'mt-[30px]'}>Yangilash</Button>
            }
        </>)
};

export default ESIGN;