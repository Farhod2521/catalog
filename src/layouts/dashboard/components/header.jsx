import React from "react";
import Image from "next/image";
import Lang from "../../../components/lang";

const Header = ({ setOpenSidebar, openSidebar }) => {
  return (
    <header
      className={
        "bg-[#202B57] py-4 px-7 text-white flex justify-between sticky top-0 z-50"
      }
    >
      <button onClick={() => setOpenSidebar(!openSidebar)}>
        <Image
          className={"cursor-pointer"}
          width={22}
          height={14}
          src={"/icons/menu.svg"}
          alt={"menu"}
        />
      </button>
      <div className={"flex"}>
        <div className={"flex mr-6"}>
          <Image width={10} height={12.5} alt={"map"} src={"/icons/map.svg"} />
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
        <Lang />
      </div>
    </header>
  );
};

export default Header;
