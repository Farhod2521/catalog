import React from 'react';
import Profile from "./pofile"

const Subheader = ({title = ''}) => {
    return (
        <div className={'bg-white py-4 px-7 flex justify-between items-center'}>
            <h2 className={'text-[#313B3D] text-xl font-medium'}>{title}</h2>
            <Profile/>
        </div>
    );
};

export default Subheader;