import React from "react";
import clsx from "clsx";

const Title = ({ center = false, children, classNames = "" }) => {
  return (
    <h2
      className={clsx(
        "inline-block mb-[30px] text-[#202B57] uppercase relative font-medium mobile:text-base tablet:text-lg laptop:text-xl desktop:text-2xl text-base after:absolute after:w-[60%] after:bg-[#1890FF] after:h-[3px] after:left-0 after:bottom-0",
        classNames,
        {
          "after:left-1/2 after:-translate-x-1/2": center,
        },
      )}
    >
      {children}
    </h2>
  );
};

export default Title;
