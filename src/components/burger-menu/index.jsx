import React, { useState } from "react";

const burgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`tablet:hidden  burger-menu gap-y-[4px] ${
        isOpen ? "open" : ""
      } `}
      onClick={toggleMenu}
    >
      <div className={"bar1"}></div>
      <div className={"bar2"}></div>
      <div className={"bar3"}></div>
    </div>
  );
};

export default burgerMenu;
