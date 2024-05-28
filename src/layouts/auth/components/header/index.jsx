import React from 'react';
import Image from "next/image";
import Brand from "@/components/brand";

const Header = () => {

    return (
        <header>
            <div className={' bg-[#182041]  py-2 '}>
                <div className={'container text-white text-sm'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'flex '}>
                            <Image width={10} height={12.5} alt={'map'} src={'/icons/map.svg'}/>
                            <span className={'ml-1.5 mr-1 cursor-pointer inline-block'}>Toshkent</span>
                            <Image width={9} height={6} alt={'map'} src={'/icons/arrow-down.svg'}/>
                        </div>
                        <div className={'flex '}>
                            <span className={'ml-1.5 mr-1 cursor-pointer inline-block'}>Uz</span>
                            <Image width={9} height={6} alt={'map'} src={'/icons/arrow-down.svg'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'bg-[#202B57]  py-4 '}>
                <div className={'container text-white text-sm grid grid-cols-12 items-center'}>
                    <div className="col-span-12">
                        <Brand/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;