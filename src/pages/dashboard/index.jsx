import React, {useState} from 'react';
import Dashboard from "../../layouts/dashboard";
import Subheader from "../../layouts/dashboard/components/subheader";
import {useTranslation} from "react-i18next";
import {get} from 'lodash';
import PopChart from "@/layouts/dashboard/components/chart";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";
import Link from "next/link";

export const menuData = [
    {
        id: 1,
        title: 'Qurilish materiallari va buyumlari',
        color: '#FFD615',
        quantity: 0,
        ads:'materials-ads'
    },
    {
        id: 2,
        title: 'Mashina va mexanizmlar',
        color: '#08BFC1',
        quantity: 0,
        ads:'machine-mechanos-ads'
    },
    {
        id: 3,
        title: 'Qurilish ishlari',
        color: '#43DB57',
        quantity: 0,
        ads:'works-ads'
    },
    {
        id: 4,
        title: 'Kichik mexanizatsiya',
        color: '#8A7FE2',
        quantity: 0,
        ads:'small-mechanos-ads'
    },
    {
        id: 5,
        title: 'Uskuna va qurilmalar',
        color: '#95B36E',
        quantity: 0,
        ads:'technos-ads'
    },


]

const Index = () => {
    const {t} = useTranslation();
    const {data: session} = useSession();
    const setToken = useSettingsStore(state => get(state, 'setToken', ()=>{}))
    const [isActive, setIsActive] = useState(3);
    const [statistics, setStatistics] = useState(1)
    const Viewed = () => {
        setStatistics(1)
    };
    const Sold = ()  => {
        setStatistics(2)
    }

    const Activate1 = () => {
        setIsActive(3)
    }

    const Activate2 = () => {
        setIsActive(4);
    }
    const Activate3 = () => {
        setIsActive(5);
    }

    const {data: userStat} = useGetQuery({
        key: KEYS.userStat,
        url: URLS.userStat,

    })


    const {data: userTopAds} = useGetQuery({
        key: KEYS.userTopAds,
        url: URLS.userTopAds,
    })
    console.log('userStat',userStat)
    return (
        <Dashboard>
                <Subheader title={'Statistik ma’lumotlar'} />
                <div className={'grid grid-cols-12 gap-x-[30px] p-[30px]'}>
                    <div className={'col-span-4 bg-white mt-[30px] p-[30px]'}>
                        <h2 className={'text-xl text-[#000] font-bold mb-[18px]'}>Yuklangan e’lonlar</h2>

                        <ul className={'text-[#000]'}>

                            {
                                menuData.map(item =>
                                    <li key={get(item, 'id')} className={'flex justify-between mb-[11px]'}>
                                        <div className={'flex gap-[10px]'}>
                                            <div style={{backgroundColor:`${(get(item, 'color'))}`}} className={`w-[20px] h-[20px] ]`}></div>

                                            <h3>{get(item, 'title')}</h3>
                                        </div>

                                        <span>{get(userStat, `data.${get(item,'ads')}`, 0)}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className={'col-span-8 bg-white mt-[30px] p-[30px]'}>
                        <div className={'flex items-center gap-x-[30px] mb-[19px]'}>
                            <h2 className={'text-xl text-[#000] font-bold'}>Top mahsulotlar</h2>

                            <div className={'flex gap-x-[5px]'}>
                                <button onClick={Viewed} className={`text-xs  ${statistics === 1 ? "text-[#017EFA]" : "text-[#697299]"}`}>
                                    Ko'rilganlar
                                </button>

                                <div className={`h-[auto] w-[1px] ${statistics === 1 ? 'bg-[#017EFA]' : "bg-[#697299]"}`}></div>

                                <button onClick={Sold} className={`text-xs  ${statistics === 2 ? "text-[#017EFA]" : "text-[#697299]"}`}>
                                    Sotilganlar
                                </button>
                            </div>
                        </div>

                        <div>
                            {statistics === 1 &&
                                <div>
                                    <ul>
                                        {get(userTopAds, 'data', []).map(item =>
                                            <li className={'flex justify-between'}>
                                                <span className={'text-[#28366D] text-xs'}>#{get(item, 'material_name')}</span>
                                                <Link href={`${get(item, 'material_url')}`} >
                                                    <p>{get(item, 'material_type')}</p>
                                                </Link>
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            }
                            {statistics === 2 && <p>Sotilgan mahsulotlar  mavjud emas</p>}

                        </div>
                    </div>

                    <div className={'col-span-12 mt-[30px] bg-[#fff]'}>
                        <div className={'p-[30px] flex justify-between '}>
                            <h2 className={'text-xl text-[#000] font-bold mb-[18px]'}>Tizimda mavjud e’lonlarni ko’rish dinamikasi </h2>
                            <div className={'flex gap-x-[5px]'}>
                                <button onClick={Activate1} className={`px-[15px] py-[15px] rounded-[6px] ${isActive === 3 ? "bg-[#017EFA] text-[#fff]" : "bg-transparent text-[#017EFA]"}`}>
                                    Kunlik
                                </button>
                                <button onClick={Activate2} className={`px-[15px] py-[15px] rounded-[6px] ${isActive === 4 ? "bg-[#017EFA] text-[#fff]" : "bg-transparent text-[#017EFA]"}`}>
                                    Haftalik
                                </button>
                                <button onClick={Activate3} className={`px-[15px] py-[15px] rounded-[6px] ${isActive === 5 ? "bg-[#017EFA] text-[#fff]" : "bg-transparent text-[#017EFA]"}`}>
                                    Oylik
                                </button>
                            </div>


                        </div>
                        <PopChart/>
                    </div>
                </div>
        </Dashboard>
    );
};

export default Index;