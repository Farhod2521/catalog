import React from 'react';
import RSelect, {components} from 'react-select';
import clsx from "clsx";
import arrowIcon from "public/icons/arrow-down-category.svg";
import {Controller} from "react-hook-form";
import {get, hasIn} from "lodash";

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <img src={arrowIcon} alt={'arrow'}/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = (hasError = false) => ({
    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: hasError ? "red" : "rgba(0, 0, 0, 0.1)",
        borderRadius: '8px',
        outline: "none",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 12px',
        width: '100%',
        minWidth: '200px',
        minHeight: '48px',
        fontSize: '16px',
        fontWeight: '400',
        "&:hover": {
            borderColor: '#006D85',
            outline: "none",
        },
        "&:focus": {
            borderColor: '#006D85',
            outline: "none",
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
});
const Select = ({
                    control, name, errors, placeholder = 'Не выбран', params, label = '', options = []
                }) => {

    return (
        <div className={clsx(`form-group`)}>
            {label && <label className={clsx('form-label')}
                             htmlFor={label}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={params}
                render={({field}) => <RSelect
                    {...field}
                    clearIndicator={true}
                    styles={customStyles(hasIn(errors, name))}
                    id={label}
                    options={options}
                    components={{DropdownIndicator}}
                    placeholder={placeholder}
                />}
            />
            {errors[name]?.type == 'required' &&
                <span className={'text-red-600 text-xs'}>This field is required</span>}
            {errors[name]?.type == 'validation' &&
                <span className={'text-red-600 text-xs'}>{get(errors, `${name}.message`)}</span>}
        </div>
    );
};

export default Select;