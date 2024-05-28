import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion"
import clsx from "clsx";

const ContentLoader = ({classNames=''}) => {
    return (
        <div className={clsx('flex min-h-[75vh] bg-[#F4F8FA] justify-center items-center',classNames)}>
            <motion.div  transition={{ repeat: Infinity, repeatDelay: 0.25 }}  animate={{
                scale: [1, 1, 1, 1, 1],
                rotate: [0, 0, 270, 270, 0],
            }}><Image width={125} height={125} src={'/images/loader.png'} priority={true} alt={'loader'}/></motion.div>
        </div>
    );
};

export default ContentLoader;