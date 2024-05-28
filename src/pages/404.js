import React from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import Title from "@/components/title";
import Button from "@/components/button";

const NotFoundPage = () => {
  return (
    <Main>
      <Menu active={0} />
      <Section>
        <div
          className={
            "relative desktop:w-[75%] laptop:w-[80%] tablet:w-[90%] w-full bg-white mx-auto my-28 p-24 drop-shadow-empty text-center"
          }
        >
          <h1
            className={
              "text-[#28366D] font-semibold mb-2.5   desktop:text-9xl laptop:text-7xl tablet:text-6xl text-5xl"
            }
          >
            404
          </h1>
          <Title center>sahifa topilmadi</Title>
          <p className={"laptop:text-base tablet:text-sm text-xs"}>
            Siz bosgan havola buzilgan, sahifa oʻchirilgan yoki <br /> nomi
            oʻzgartirilgan boʻlishi mumkin
          </p>
          <Button url={"/"} className={"mt-8"}>
            Bosh sahifa
          </Button>
        </div>
      </Section>
    </Main>
  );
};

export default NotFoundPage;
