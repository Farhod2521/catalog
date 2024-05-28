import React, { useEffect, useState } from "react";
import RSelect, { components } from "react-select";
import Image from "next/image";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Image
          width={12}
          height={6}
          src={"/icons/arrow-down-dark"}
          alt={"arrow"}
        />
      </components.DropdownIndicator>
    )
  );
};
const customStyles = (sm = false) => ({
  control: (base, state, error) => ({
    ...base,
    background: "#fff",
    borderColor: "transparent",
    borderRadius: "5px",
    outline: "none",
    boxShadow: "none",
    color: "#7E7E7E",
    display: "flex",
    overflow: "hidden",
    padding: sm ? "0px" : "4px 12px",
    width: "100%",
    minWidth: "230px",
    minHeight: sm ? "30px" : "40px",
    fontSize: sm ? "14px" : "16px",
    fontWeight: "400",
    "&:hover": {
      borderColor: "#202B57",
      outline: "none",
    },
    "&:focus": {
      borderColor: "#13D6D1",
      outline: "none",
    },
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: "none",
  }),
});
const Select = ({
  name = "",
  defaultValue = null,
  sm = false,
  label = "",
  getValue = () => {},
  options = [],
  placeholder = "select",
  isClearable = false,
}) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  useEffect(() => {
    getValue(selectedOption);
  }, [selectedOption]);

  return (
    <div
      className={clsx({
        "flex laptop:flex-row flex-col laptop:items-center ": sm,
      })}
    >
      <label
        className={clsx("mb-2 inline-block ", {
          "text-sm !mb-0 mr-3": sm,
        })}
        htmlFor={label}
      >
        {label}
      </label>
      <RSelect
        isClearable={isClearable}
        name={name}
        className={"laptop:text-base tablet:text-sm text-xs"}
        defaultValue={defaultValue}
        clearIndicator={true}
        styles={customStyles(sm)}
        id={label}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={t(placeholder)}
        noOptionsMessage={() => t("No options")}
      />
    </div>
  );
};

export default Select;
