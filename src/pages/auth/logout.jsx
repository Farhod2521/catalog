import React from 'react';
import AuthLayout from "../../layouts/auth";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {signIn} from "next-auth/react";

const Login = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = async ({email, password}) => {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/dashboard"
        })
    };
    return (
        <AuthLayout>
            <h2 className={'text-center mb-7 text-2xl font-medium'}>Kirish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={'text-left'}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Login</label>
                    <input {...register("email", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Parol</label>
                    <input {...register("password", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="password"/>
                    {errors.password && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>
                <div className="mb-8">
                    <Link className={'text-[#525D89] text-sm'} href={'/auth/reset-password'}>Parolni unitdingizmi</Link>
                </div>

                <div className="text-center">
                    <button
                        className={'bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7'}>Kirish
                    </button>
                </div>
                <div className="mt-5 text-center">
                    <Link className={'text-[#525D89] text-sm underline'} href={'/auth/signup'}>Ro’yhatdan
                        o’tmaganmisiz?</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;