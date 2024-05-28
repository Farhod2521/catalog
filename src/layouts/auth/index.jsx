import React from 'react';
import Header from "./components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";

const AuthLayout = ({children}) => {
    return (
        <Wrapper>
            <Header/>
            <main
                className={"py-10 min-h-[75vh] flex justify-center items-center bg-no-repeat bg-cover bg-center bg-[url('/images/auth_bg.png')]"}>
                <div className="container text-center">
                    <div className="bg-[#FBFBFC] px-14 py-12 inline-block mx-auto rounded w-[570px]">
                        {children}
                    </div>
                </div>
            </main>
            <Footer/>
        </Wrapper>
    );
};

export default AuthLayout;