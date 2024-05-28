import React, {useEffect} from 'react';
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";
import {get} from "lodash"
import {useTranslation} from "react-i18next";
import useGetQuery from "../../../hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";

const Pofile = () => {
    const {data: session} = useSession()
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))
    const token = useSettingsStore(state => get(state,'token',null))
    const {t} = useTranslation()
    const {data: user} = useGetQuery({
        key: KEYS.getMe,
        url: URLS.getMe,
        headers: {token: token ??`${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token') || token)
    })
    useEffect(() => {
        if (get(session, 'user.token')) {
            setToken(get(session, 'user.token'));
        }
    }, [session])
    // user = {companyName,Inn,Ceo}  delivery
    // user = {email,firstName,lastName,Inn,token}  customer
    //user?.token ? 'customer' : 'delivery'
    console.log('session',session)
    console.log('user',user)
    return (
        <div className={'inline-flex items-center gap-x-[5px]'}>

            <div>
                <span className={'mr-3'}>{get(user,'data.email')}</span>
                <button className={'block text-base'} onClick={() => signOut({callbackUrl: "/"})}>
                    {t('Logout')}
                </button>
            </div>
            <Image width={48} height={48} className={'rounded-full'} src={'/images/avatar.png'} alt={'avatar'}/>
        </div>
    );
};

export default Pofile;