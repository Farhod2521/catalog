import React from 'react';
import AuthLayout from "../../layouts/auth";
import {useForm} from "react-hook-form";
import Link from "next/link";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

const Login = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {mutate: changePassword, isLoading} = usePostQuery({listKeyId: KEYS.changePassword})
    const router = useRouter();
    const onSubmit = (data) => {
        changePassword({
                url: URLS.changePassword,
                attributes: {...data}
            },
            {
                onSuccess: () => {
                    toast.success('Parol o\'zgartirildi', {position: 'top-right'})
                    router.push('/dashboard')
                }
            })

    };
    return (
        <AuthLayout>
            <h2 className={'text-center mb-7 text-2xl font-medium'}>Parolni o'zgartirish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={'text-left'}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Eski parol</label>
                    <input {...register("old_password", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Yangi Parol</label>
                    <input {...register("new_password", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.password && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>


                <div className="text-center">
                    <button
                        className={'bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7'}>Yuborish
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
};

export default Login;