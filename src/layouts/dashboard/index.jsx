import React, { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import clsx from "clsx";

const Dashboard = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className={"flex"}>
      <Sidebar openSidebar={openSidebar} />
      <main
        className={clsx(
          openSidebar ? "w-[calc(100%-350px)] ml-[350px]" : "w-full",
        )}
      >
        <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        <section className={"bg-[#F4F8FA] min-h-screen"}>{children}</section>
      </main>
    </div>
  );
};

export default Dashboard;
