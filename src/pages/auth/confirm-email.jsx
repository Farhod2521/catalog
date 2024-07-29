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

const ConfirmEmail = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { email } = router.query;
    const [showPassword, setShowPassword] = useState(false);
    const [seconds, setSeconds] = useState(105);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    console.log(email)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    const {mutate: verifying, isLoading} = usePostQuery({listKeyId: KEYS.verifyEmail})
    // const {mutate: resendCode, isLoading} = usePostQuery({listKeyId: KEYS.resendVerificationCode})

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setIsButtonDisabled(false);
        }
    }, [seconds]);


    useEffect(() => {
        if (!email) {
            // Redirect back to signup page if no email is found in query params
            router.push("/auth/signup");
        } else {
            // Set the email in the form's default values
            setValue('email', email);
        }
    }, [email, router, setValue]);

    const onSubmit = (data) => {
        verifying({
                url: URLS.verifyEmail,
                attributes: {
                    email: email,
                    verification_code: parseInt(data.password)
                }
            },
            {
                onSuccess: () => {
                    toast.success('Muvaqqiyatli yakunlandi', {position: 'top-right'})
                    router.push("/auth/login")
                }
            })

    };
    //
    // const resendCode = (data) => {
    //     verifying({
    //             url: URLS.resendVerificationCode,
    //             attributes: {...data}
    //         },
    //         {
    //             onSuccess: () => {
    //                 toast.success('Muvaqqiyatli yuborildi', {position: 'top-right'})
    //
    //             }
    //         })
    // }


    return (
        <AuthLayout>
            {isLoading && <OverlayLoader />}
            <h2 className={"text-center mb-7 text-2xl font-medium"}>Elektron pochtani tasdiqlash</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>

                <p className={"block mb-2"} htmlFor="#">
                    Elektron pochtaga kelgan kodni kiriting
                </p>
                <div className={"flex gap-x-8 mb-[30px]  items-center"}>
                    <div className={" relative w-2/3"}>
                        <input
                            className={
                                "w-full hidden shadow-input h-12 rounded-[5px] mb-[20px] outline-none px-3 "
                            }
                            defaultValue={email}
                        />


                        <input
                            {...register("password", {required: true})}
                            className={
                                "w-full shadow-input  h-12 rounded-[5px] outline-none px-3"
                            }
                            type={showPassword ? "text" : "password"}
                        />
                        <button
                            type="button"
                            className={`absolute  px-3 bottom-0 right-0 ${errors.password ? "-top-[20px]" : 'top-0'} flex items-center`}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🔒' : '👁️'}
                        </button>
                        {errors.password && (
                            <span className={"text-xs text-red-500"}>
                            {t("Ushbu qator to'ldirilishi shart")}
                        </span>
                        )}
                    </div>
                    {seconds === 0 ? <button
                        className={"text-start text-sm bg-[#62B3FF] hover:bg-[#53ACFF] active:bg-[#3EA2FF] text-white rounded py-2 px-[10px]"}>Qayta
                        jo'natish</button> : <div className={"w-1/3"}>
                        <p>{Math.floor(seconds / 60)} : {('0' + (seconds % 60)).slice(-2)}</p>
                    </div>}
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

export default ConfirmEmail;
