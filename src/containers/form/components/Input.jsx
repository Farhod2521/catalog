import React from 'react';
import clsx from "clsx";
import {get, hasIn} from "lodash";

const Input = ({register = ()=> {}, name, errors, property, params, label = '', ...rest}) => {
    return (
        <>
            <div className="form-group">
                <label className={'form-label'} htmlFor="#">{label}</label>
                <input  {...register(name, {...params})} {...rest}
                        className={clsx('placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]', {'border-red-600': hasIn(errors, name)})}
                        type={get(property, 'type', "text")}  disabled={get(property, 'disabled', false)} step={get(property, "step", "any")}/>
                {errors?.[name]?.type == 'required' &&
                    <span className={'text-red-600 text-xs'}>This field is required</span>}
                {errors?.[name]?.type == 'validation' &&
                    <span className={'text-red-600 text-xs'}>{get(errors, `${name}.message`)}</span>}
            </div>
        </>
    );
};

export default Input;