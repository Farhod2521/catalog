import React from "react";
import AuthLayout from "@/layouts/auth";
import dynamic from "next/dynamic";
import { signIn } from "next-auth/react";
import { get } from "lodash";
import { toast } from "react-hot-toast";

const ESIGN = dynamic(() => import("../../components/e-imzo"), { ssr: false });

const EimzoLogin = () => {
  const loginWithKey = async (data, key) => {
    if (get(key, "O")) {
      const result = await signIn("eimzo", {
        company_name: get(key, "O"),
        company_stir: get(key, "TIN"),
        company_ceo: get(key, "CN"),
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } else {
      toast.error("Jismoniy shaxs kalitida tizimga kirish mumkin emas", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <h2 className={"text-center mb-[50px] text-2xl font-medium"}>
          Tizimga ERI orqali kirish
        </h2>
        <ESIGN open={true} setOpen={() => {}} eSign={loginWithKey} />
      </AuthLayout>
    </>
  );
};

export default EimzoLogin;
