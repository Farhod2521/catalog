import React from 'react';

const Search = ({classname}) => {
    return (
        <div className={classname}>
            <form className={'w-[370px] h-[40px] flex relative z-30'} >
                <input type="search"
                       placeholder={'Qidirish...'}
                       className="bg-white h-[40px] w-[370px] pl-[50px]  rounded-lg focus:outline-none hover:cursor-pointer"
                       name=""/>
                <span class="absolute top-2 left-0 pl-4 z-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <g clipPath="url(#clip0_1_1276)">
                                                        <rect width="24" height="24" fill="white"/>
                                                        <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#516164" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M21 21L15 15" stroke="#516164" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_1276">
                                                            <rect width="24" height="24" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                    </span>
            </form>
        </div>
    );
};

export default Search;