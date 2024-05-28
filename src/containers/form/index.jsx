import React from 'react';
import {useForm} from "react-hook-form";

const Form = ({defaultValues, children, onSubmit}) => {
    const methods = useForm({defaultValues});
    const {handleSubmit, formState: {errors}, setError, clearErrors, reset} = methods;
    const onSubmitRequest = (data) => {
        onSubmit({data, setError, clearErrors, reset})
    }
    return (
        <form onSubmit={handleSubmit(onSubmitRequest)}>
            {React.Children.map(children, child => {
                return child.props.name
                    ? React.createElement(child.type, {
                        ...{
                            ...child.props,
                            control: methods.control,
                            setValue: methods.setValue,
                            register: methods.register,
                            key: child.props.name,
                            errors: errors
                        }
                    })
                    : child;
            })}
        </form>
    );
};

export default Form;