import React, {useEffect, useState} from "react";
import Image from "next/image";
import Brand from "../brand";
import Link from "next/link";
import {useSession, signIn, signOut} from "next-auth/react";
import {get, values} from "lodash";
import useGetQuery from "../../hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import dynamic from "next/dynamic";
import {useTranslation} from "react-i18next";
import Search from "@/components/search";
import {useRouter} from "next/router";
import {useCounter} from "@/context/counter";
import {sum} from "lodash/math";
import {useSettingsStore} from "@/store";

const Lang = dynamic(() => import("@/components/lang"), {ssr: false});
const Header = (toggleMenu) => {
    const [openMenu, setOpenMenu] = useState(false);
    const {data: session} = useSession();
    const {data: sessionCustomer } = useSession();
    const {t} = useTranslation();
    const router = useRouter();
    const {state} = useCounter();
    const token = useSettingsStore(state => get(state, 'token', null))
    const {data: user} = useGetQuery({
        key: KEYS.getMe,
        url: URLS.getMe,
        headers: {token: token ?? `${get(session, "user.token")}`},
        enabled: !!(get(session, 'user.token') && get(session, 'user.role') === 'company'),
    });


    const { data: customer } = useGetQuery({
      key: KEYS.getCustomer,
      url: URLS.getCustomer,
      headers: {token: token ?? `${get(sessionCustomer, "user.token")}`},
      enabled: !!(get(session, 'user.token') && get(session, 'user.role') === 'customer'),
    })

    const handleLogout = async () => {

        await signOut({ callbackUrl: "/" });


        localStorage.clear();
        sessionStorage.clear();
    };

    return (
        <header>
            <div className={" bg-[#182041]  py-2 relative"}>
                <div className={"container text-white text-sm"}>
                    <marquee className="absolute top-0 pt-1 text-red-600">
           
                    </marquee>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex "}>
                            <Image
                                width={10}
                                height={12.5}
                                alt={"map"}
                                src={"/icons/map.svg"}
                            />
                            <span className={"ml-1.5 mr-1 cursor-pointer inline-block"}>
                Toshkent
              </span>
                            <Image
                                width={9}
                                height={6}
                                alt={"map"}
                                src={"/icons/arrow-down.svg"}
                            />
                        </div>
                        <div className={"flex items-center gap-x-[30px] z-50"}>
                            <Link
                                href={
                                    "https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
                                }
                                className={"cursor-pointer"}
                            >
                                Yo‘riqnoma
                            </Link>
                            <Lang/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"bg-[#202B57]  py-4 "}>
                <div
                    className={
                        "container text-white text-sm grid grid-cols-12 justify-center items-center"
                    }
                >
                    <div className="laptop:col-span-6 col-span-12 laptop:mb-0 mb-[10px]">
                        <Brand/>
                    </div>
                    <div className="laptop:col-span-6 col-span-12 ">
                        <div className="flex justify-end items-center">
                            <Search/>
                            <Link
                                href={"/selected"}
                                className={"hidden tablet:block relative ml-6 cursor-pointer"}
                            >
                                <Image
                                    width={36}
                                    height={36}
                                    alt={"map"}
                                    src={"/icons/pin.svg"}
                                />
                                <span
                                    className={
                                        "absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]"
                                    }
                                >
                  3
                </span>
                            </Link>
                            <Link
                                href={"/shopping-basket"}
                                className={" tablet:block relative ml-6 cursor-pointer"}
                            >
                                <Image
                                    width={36}
                                    height={36}
                                    alt={"map"}
                                    src={"/images/shop-basket.png"}
                                />
                                <span
                                    className={
                                        "absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]"
                                    }
                                >
                  {sum(values(state))}
                </span>
                            </Link>
                            <div className={"ml-6 flex items-center"}>
                                <Image
                                    className={
                                        "mr-1 w-[20px] h-[20px] laptop:w-[36px] laptop:h-[36px]"
                                    }
                                    width={36}
                                    height={36}
                                    alt={"map"}
                                    src={"/icons/user.svg"}
                                />
                                {/*<button className={"block text-base bg-transparent"}>*/}
                                {/*  <Link href={"/dashboard"}>sign in</Link>*/}
                                {/*</button>*/}


                                {!get(session, "user.token") ? <button className={"text-lg"}>
                                    <Link href={"/select-position"}>Ro'yxatdan o'tish</Link>
                                </button> : get(session, "user.role") === "company" ?
                                    <div>
                                        <button
                                            onClick={() => router.push("/dashboard")}
                                            className={"block text-base bg-transparent"}
                                        >

                                            Kabinetga kirish
                                        </button>
                                        <button
                                            className={"block text-base"}
                                            onClick={() => signOut({callbackUrl: "/"})}
                                        >
                                            {t("Logout")}
                                        </button>
                                    </div> : <div>
                                        <button
                                            onClick={() => router.push("/dashboard/customer/my-orders")}
                                            className={"block text-base bg-transparent"}
                                        >

                                            Kabinetga kirish
                                        </button>
                                        <button
                                            className={"block text-base"}
                                            onClick={handleLogout}
                                        >
                                            {t("Logout")}
                                        </button>
                                    </div>}


                                {/*{*/}
                                {/*    get(session, "user.role") === "company" ? <div>*/}
                                {/*        <button*/}
                                {/*            onClick={() => router.push("/dashboard")}*/}
                                {/*            className={"block text-base bg-transparent"}*/}
                                {/*        >*/}

                                {/*            {get(user, "data.company_name")}*/}
                                {/*        </button>*/}
                                {/*        <button*/}
                                {/*            className={"block text-base"}*/}
                                {/*            onClick={() => signOut()}*/}
                                {/*        >*/}
                                {/*            {t("Logout")}*/}
                                {/*        </button>*/}
                                {/*    </div> : get(sessionCustomer, "role") === "customer" ? <div>*/}
                                {/*        <button*/}
                                {/*            onClick={() => router.push("/dashboard/customer/my-orders")}*/}
                                {/*            className={"block text-base bg-transparent"}*/}
                                {/*        >*/}

                                {/*            {get(userLogin, "data.email")}*/}
                                {/*        </button>*/}
                                {/*        <button*/}
                                {/*            className={"block text-base"}*/}
                                {/*            onClick={() => signOut()}*/}
                                {/*        >*/}
                                {/*            {t("Logout")}*/}
                                {/*        </button>*/}
                                {/*    </div> : <button className={"text-lg"}>*/}
                                {/*        <Link href={"/select-position"}>Ro'yxatdan o'tish</Link>*/}
                                {/*    </button>*/}
                                {/*}*/}
                                {/*{!get(session, "user.token") ? (*/}
                                {/*    <div>*/}
                                {/*      <button*/}
                                {/*          className={*/}
                                {/*            "block laptop:text-base text-xs bg-transparent"*/}
                                {/*          }*/}
                                {/*          onClick={() => signIn()}*/}
                                {/*      >*/}
                                {/*        {t("signin")}*/}
                                {/*      </button>*/}
                                {/*      /!*<Link className={'block text-base'} href={'/auth/signup'}>*!/*/}
                                {/*      /!*    {t("signup")}*!/*/}
                                {/*      /!*</Link>*!/*/}
                                {/*  </div>*/}
                                {/*) : (*/}
                                {/*  <div>*/}
                                {/*    <button*/}
                                {/*      onClick={() => router.push("/dashboard")}*/}
                                {/*      className={"block text-base bg-transparent"}*/}
                                {/*    >*/}
                                {/*      {get(user, "data.email")}*/}
                                {/*    </button>*/}
                                {/*    <button*/}
                                {/*      className={"block text-base"}*/}
                                {/*      onClick={() => signOut()}*/}
                                {/*    >*/}
                                {/*      {t("Logout")}*/}
                                {/*    </button>*/}
                                {/*  </div>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
