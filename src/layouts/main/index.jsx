// import React from "react";
// import Header from "@/components/header";
// import Wrapper from "@/components/wrapper";
// import Footer from "@/components/footer";
// import { useTranslation } from "react-i18next";
// import Link from "next/link";
// import FondStock from "../../components/fondStock/index";

// const Main = ({ children }) => {
//   const { t } = useTranslation();
//   return (
//     <Wrapper>
//       <FondStock />

//       <Header />
//       <main className={""}>
//         {children}
//         <Link
//           className={""}
//           href={
//             "https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
//           }
//         >
//           <button
//             className={
//               "fixed  laptop:-right-[140px] tablet:-right-[135px] mobile:-right-[130px] -right-[130px] py-[7px] px-[73px] rounded-t-[5px] top-[494px] laptop:hover:py-[20px] laptop:hover:text-lg   transition-all duration-400 laptop:text-base tablet:text-sm mobile:text-xs text-xs bg-[#017EFA] z-50 text-white -rotate-90"
//             }
//           >
//             Tizim bo‘yicha qo‘llanma
//           </button>
//         </Link>
//       </main>
//       <Footer />
//     </Wrapper>
//   );
// };

// export default Main;


import React from "react";
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import FondStock from "../../components/fondStock/index";
import Image from "next/image";
const Main = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <FondStock />

      <Header />
      <main className={""}>
        {children}
<div className=" ">
  <Link href="https://t.me/tmsiti_bot"
  className="fixed right-0 top-[300px]">
    <button className=" transition-all duration-400 laptop:text-base tablet:text-sm mobile:text-xs text-xs text-white  hover:w-[300px] hover:bg-blue-600 flex items-center  group hover-effect-1">
      <img src="/images/bot.png" alt="" width={60} height={50} className="mr-2 " />
      <span className="hidden group-hover:inline-block overflow-hidden whitespace-nowrap transition-opacity duration-2000 ml-2 text-balance">
        Savol va murojaatlaringizni 
        bot orqali yuboring
      </span>
    </button>
  </Link>

  <Link href=""
  className="fixed right-0 top-[375px]">
    <button className=" transition-all duration-400 laptop:text-base tablet:text-sm mobile:text-xs text-xs text-white  hover:w-[300px] hover:bg-blue-600 flex items-center  group hover-effect-1">
      <img src="/images/call.png" alt="" width={60} height={50} className="mr-2"  />
      <span className="hidden group-hover:inline-block overflow-hidden whitespace-nowrap transition-opacity duration-2000 ml-2 text-balance">
        Call Markaz <br />
        +998 94 733 34 33
      </span>
    </button>
  </Link>

  <Link href="https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
  className="fixed right-0 top-[450px]">
    <button className=" transition-all duration-400 laptop:text-base tablet:text-sm mobile:text-xs text-xs text-white  hover:w-[300px] hover:bg-blue-600 flex items-center  group hover-effect-1">
      <img src="/images/book.png" alt="" width={60} height={50} className="mr-2 " />
      <span className="hidden group-hover:inline-block overflow-hidden whitespace-nowrap transition-opacity duration-2000 ml-2">
        Tizim uchun qo'llanma
      </span>
    </button>
  </Link>
</div>

        
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Main;



