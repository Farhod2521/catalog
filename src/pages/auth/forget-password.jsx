import React, {useEffect, useState} from "react";
import AuthLayout from "../../layouts/auth";
import { useForm } from "react-hook-form";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {OverlayLoader} from "@/components/loader";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {mutate: forgetPassword, isLoading} = usePostQuery({listKeyId: KEYS.forgetPassword})





    const onSubmit = (data) => {
        forgetPassword({
                url: URLS.forgetPassword,
                attributes: {...data}
            },
            {
                onSuccess: () => {
                    toast.success('Muvaqqiyatli yakunlandi', {position: 'top-right'})
                    router.push("/auth/confirm-code")
                }
            })

    };



    return (
        <AuthLayout>
            {isLoading && <OverlayLoader />}
            <h2 className={"text-center mb-7 text-2xl font-medium"}>Parolni tiklash</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>

                <p className={"block mb-2"} htmlFor="#">
                    Elektron pochtangizni kiriting
                </p>
                <div className={"flex gap-x-8 mb-[30px]  items-center"}>
                    <div className={" relative w-full"}>


                        <input
                            {...register("email", {required: true})}
                            className={
                                "w-full shadow-input  h-12 rounded-[5px] outline-none px-3"
                            }
                            type={'email'}
                        />

                        {errors.password && (
                            <span className={"text-xs text-red-500"}>
                            {t("Ushbu qator to'ldirilishi shart")}
                        </span>
                        )}
                    </div>

                </div>


                <div className="text-center">
                    <button
                        className={
                            "bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7"
                        }
                    >
                        {t("Yuborish")}
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
};

export default ForgetPassword;
