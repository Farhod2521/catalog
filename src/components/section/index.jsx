import React from 'react';
import clsx from "clsx";

const Section = ({children,className=''}) => {
    return (
        <div className={clsx('bg-[#F4F8FA] py-[30px]',className)}>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Section;