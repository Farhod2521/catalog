import React from 'react';
import AuthLayout from "../../layouts/auth";
import {useForm} from "react-hook-form";
import usePostQuery from "../../hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {OverlayLoader} from "../../components/loader";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"
import {useRouter} from "next/router";

const Signup = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {mutate: signupRequest, isLoading} = usePostQuery({listKeyId: KEYS.signup})
    const onSubmit = (data) => {
        signupRequest({
                url: URLS.signup,
                attributes: {...data}
            },
            {
                onSuccess: () => {
                    toast.success('We have sent confirmation code to your email address', {position: 'top-right'})
                    signIn()
                }
            })
        router.push("/auth/login")
    };
    return (
        <AuthLayout>
            {isLoading && <OverlayLoader/>}
            <h2 className={'text-center mb-7 text-2xl font-medium'}>Ro’yhatdan o’tish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={'text-left'}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Email*</label>
                    <input {...register("email", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Ism*</label>
                    <input {...register("first_name", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Familiya*</label>
                    <input {...register("last_name", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>


                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Parol*</label>
                    <input {...register("password", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="password"/>
                    {errors.password && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">INN*</label>
                    <input {...register("company", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.company && <span className={'text-xs text-red-500'}>This field is required</span>}
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

export default Signup;