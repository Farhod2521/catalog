import React from 'react';
import Image from 'next/image';
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Link from "next/link";

const Format1 = ({data, name = 'material_name', code = 'material_csr_code', viewUrl = 'materials', className = ''}) => {
    const {t} = useTranslation();
    const addCart = () => {

    }

    return (
        <Link href={`/${viewUrl}/${get(data, code)}`}>
            <div
                className={clsx('drop-shadow-category bg-white p-2.5 rounded-[5px] border border-transparent hover:border-[#017EFA] pb-12 min-h-full')}>
                <div className={'flex justify-between mb-2.5'}>
                <span className={'text-xs py-[5px] px-2.5 bg-[#D1E9FF] text-[#28366D] font-medium'}>
                    #{
                    get(data, code)
                }
                </span>
                    <Image className={'cursor-pointer'} width={10} height={16} src={'icons/label.svg'} alt={'label'}/>
                </div>
                <h2 className={'text-[#28366D] font-medium text-sm '}>
                    {
                        get(data, name)
                    }
                </h2>
            </div>
        </Link>
    )

}
export default Format1;