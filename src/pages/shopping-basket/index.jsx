import React, {useEffect, useRef, useState} from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import Link from "next/link";
import {useCounter} from "@/context/counter";
import {useRouter} from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {forEach, get, head, isEmpty, isNull, values} from "lodash";
import {last} from "lodash/array";
import {NumericFormat} from "react-number-format";
import Image from "next/image";
import Button from "@/components/button";
import {sum} from "lodash/math";
import Title from "@/components/title";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";
import {entries} from "lodash/object";
import {findCategoryName} from "@/utils";
import {ORDER_STATUS} from "@/constants/enums";

const Index = () => {
    const {state, dispatch} = useCounter();
    const {data: session} = useSession()
    const router = useRouter();
    const token = useSettingsStore(state => get(state, 'token', null))
    const [page, setPage] = useState(1);
    const [template, setTemplate] = useState('standard');

    const [isOpen, setIsOpen] = useState(false);
    const {stir} = router.query;


    const { data: currency } = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency,
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const selectTemplate = (temp) => {
        setTemplate(temp);
    }

    const {data: user} = useGetQuery({
        key: KEYS.getCustomer,
        url: URLS.getCustomer,
        headers: {token: token ?? `${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token') || token)
    })




    const {mutate: sendOrder, isLoading: isLoadingOrder} = usePostQuery({listKeyId: "order-one"})


    const handleIncrement = (product) => {
        dispatch({type: "INCREMENT", payload: JSON.stringify(product)});
    };

    const handleDecrement = (product) => {
        dispatch({type: "DECREMENT", payload: JSON.stringify(product)});
        if (state.count <= 0) {
            state.count = 0;
        }

    };
    const initialFormState = {
        customer: '',
        company_name: '',
        product_category: '',
        ad_id: '',
        company: '',
        product_code: '',
        product_name: '',
        phone: '',
        price: '',
        quantity: '',
    };

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        const savedFormState = localStorage.getItem('formState');
        if (savedFormState) {
            setFormState(JSON.stringify(savedFormState));
        }
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        forEach(entries(state), (item) => {
            const customer = parseInt(get(user, "data.id"), 10);
            const phone = get(user, "data.phone");

            const attributes = {
                customer: customer,
                company_name: get(JSON.parse(head(item)), 'company_name'),
                product_category: findCategoryName(JSON.parse(head(item))),
                ad_id: get(JSON.parse(head(item)), 'id'),
                company: get(JSON.parse(head(item)), 'company_stir'),
                product_code: get(JSON.parse(head(item)), `${findCategoryName(JSON.parse(head(item)))}_code`),
                product_name: get(JSON.parse(head(item)), `${findCategoryName(JSON.parse(head(item)))}_name`),
                phone: phone,
                price: get(JSON.parse(head(item)), `${findCategoryName(JSON.parse(head(item))) === 'mmechano' ? 'mmechano_rent' : findCategoryName(JSON.parse(head(item))) === "smallmechano" ? "smallmechano_rent" : findCategoryName(JSON.parse(head(item)))}_price`),
                order_status: ORDER_STATUS.new_order,
                quantity: parseInt(last(item))
            }

            if (!customer && !phone) {
                setIsOpen(true);
                return;
            }

            sendOrder({ url: URLS.sendOrders, attributes: attributes },
                {
                    onSuccess: () => {
                        toast.success("Jarayon muvafaqqiyatli yakunlandi!", {
                            position: "top-center",
                        });

                    },

                },
            )
        })



    }


    return (
        <Main>
            <Menu/>
            <Section>
                <main
                    className={" bg-white mt-[100px] rounded-[6px] p-[20px]"}
                >
                    <div className={"flex justify-between items-center mb-[50px]"}>
                        <h1 className={"text-3xl font-bold "}>Savat</h1>

                        <div className={"flex gap-x-4"}>
                            <button onClick={() => selectTemplate("standard")}>
                                <Image src={'/icons/menu-form1.svg'} alt={'icon'} width={30} height={30}
                                       className={`${template === "standard" ? "bg-[#D1E9FF]" : ""}`}/>
                            </button>

                            <button onClick={() => selectTemplate("table")}>
                                <Image src={'/icons/menu-form2.svg'} alt={'icon'} width={30} height={30}
                                       className={`${template === "table" ? "bg-[#D1E9FF]" : ""}`}/>
                            </button>
                        </div>
                    </div>
                    {template === "table" && <div>
                        {Object.entries(state).map((item, index) => (
                            <div key={index} className={"grid grid-cols-12 gap-x-2"}>
                                <div className={"col-span-12"}>
                                    <Title>
                                        {get(JSON.parse(head(item)), "company_name")}

                                    </Title>
                                </div>
                                <div className={'col-span-3'}>

                                    {get(JSON.parse(head(item)), "material_image") ? <Image
                                        className={"mx-auto"}
                                        width={149}
                                        height={105}
                                        loader={() => get(JSON.parse(head(item)), "material_image")}
                                        src={get(JSON.parse(head(item)), "material_image")}
                                        alt={"logo"}
                                    /> : <Image
                                        className={"mx-auto"}
                                        width={149}
                                        height={105}
                                        src={"/images/company.png"}
                                        alt={"logo"}
                                    />}

                                </div>
                                <div className={"col-span-3"}>
                                    {/*<p>{get(JSON.parse(head(item)), "company_stir")}</p>*/}
                                    <p className={"bg-[#D1E9FF] text-sm text-[#28366D] inline-flex p-2 my-[10px]"}>#{get(JSON.parse(head(item)), "material_name")}</p>
                                    <p className={"text-base font-bold"}>{get(JSON.parse(head(item)), "material_description")}</p>
                                </div>

                                <div className={"col-span-3 text-center"}>
                                    <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulot miqdori</h1>
                                    <p className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}>x{last(item)}</p>
                                </div>
                                {/*<p>*/}
                                {/*{get(JSON.parse(head(item)), "material_price", 0) **/}
                                {/*    last(item)}*/}
                                {/*  {get(JSON.parse(head(item)), "material_price_currency")}*/}
                                {/*</p>*/}

                                <div className={"col-span-3 text-center"}>
                                    <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulotning umumiy
                                        narxi</h1>
                                    <NumericFormat
                                        displayType={"text"}
                                        thousandSeparator={" "}
                                        value={get(JSON.parse(head(item)), "material_price", 0) * last(item)}
                                        suffix={` / ${get(JSON.parse(head(item)), "material_measure")}`}
                                    />
                                </div>

                                <div className={'col-span-12 w-full h-[1px] bg-[#c5c5c5] my-[20px]'}></div>

                            </div>
                        ))}
                    </div>}
                    {
                        template === "standard" && <div>
                            {Object.entries(state).map((item, index) => (

                                <div>
                                    <div key={index}
                                         className={`grid grid-cols-12 gap-x-2 ${last(item) === 0 ? "hidden" : "visible"}`}>
                                        <div className={"col-span-12"}>
                                            <h1
                                                className={"mb-[30px] text-[#202B57] uppercase font-medium mobile:text-base tablet:text-lg laptop:text-xl desktop:text-2xl text-base "}>
                                                {get(JSON.parse(head(item)), "company_name")}
                                            </h1>
                                            <p
                                                className={'hidden'}>{get(JSON.parse(head(item)), "company_stir")}</p>
                                            <p
                                                className={'hidden'}>{get(JSON.parse(head(item)), "id")}</p>
                                            <p
                                                className={'hidden'}>{get(JSON.parse(head(item)), "material_code") ? "material" : get(JSON.parse(head(item)), "mmechano_code") ? "mmechano" : get(JSON.parse(head(item)), "techno_code") ? "techno" : get(JSON.parse(head(item)), "smallmechano_code") ? "smallmechano" : get(JSON.parse(head(item)), "work_code") ? "work" : ""}</p>
                                        </div>


                                        <div className={`col-span-4 `}>
                                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "material_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "material_code")}</p>
                                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "smallmechano_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "smallmechano_code")}</p>
                                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "mmechano_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "mmechano_code")}</p>
                                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "techno_code")) ? "hidden" : "visible"} text-sm text-[#28366D]  inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "techno_code")}</p>
                                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "work_code")) ? "hidden" : "visible"} text-sm text-[#28366D]  inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "work_code")}</p>

                                            {/* Product Name */}
                                            <p className={`text-base font-bold ${isEmpty(get(JSON.parse(head(item)), "material_name")) ? "hidden" : "visible"}`}>{get(JSON.parse(head(item)), "material_name")}</p>
                                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "smallmechano_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "smallmechano_name")}</p>
                                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "techno_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "techno_name")}</p>
                                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "work_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "work_name")}</p>
                                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "mmechano_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "mmechano_name")}</p>
                                        </div>

                                        <div className={"col-span-4 text-center"}>
                                            <h1 className={"text-base font-bold mb-[20px]"}>Tanlangan mahsulot
                                                miqdori</h1>
                                            <button
                                                className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}
                                                onClick={() => handleDecrement(JSON.parse(head(item)))}>-
                                            </button>
                                            <p
                                                className={"p-3  inline-flex  text-[#28366D]"}>{last(item)}</p>
                                            <button
                                                className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}
                                                onClick={() => handleIncrement(JSON.parse(head(item)))}>+
                                            </button>
                                        </div>


                                        <div className={"col-span-4 text-center"}>
                                            <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulotning umumiy
                                                narxi</h1>
                                            <p
                                                className={`${isEmpty(get(JSON.parse(head(item)), "material_name")) ? "hidden" : "visible"}`}>
                                                <NumericFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={(get(JSON.parse(head(item)), "material_price", 0) * last(item) * get(currency, `data[${get(JSON.parse(head(item)), "material_price_currency")}]`, 1,)).toFixed(2)}
                                                    suffix={` so'm / ${get(JSON.parse(head(item)), "material_measure")}`}
                                                />
                                            </p>
                                            <p className={`${isEmpty(get(JSON.parse(head(item)), "techno_name")) ? "hidden" : "visible"}`}>
                                                <NumericFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={(get(JSON.parse(head(item)), "techno_price", 0) * last(item) * get(currency, `data[${get(JSON.parse(head(item)), "techno_price_currency")}]`, 1,)).toFixed(2)}
                                                    suffix={` so'm / ${get(JSON.parse(head(item)), "techno_measure")}`}
                                                />
                                            </p>
                                            <p className={`${isEmpty(get(JSON.parse(head(item)), "mmechano_name")) ? "hidden" : "visible"}`}>
                                                <NumericFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={(get(JSON.parse(head(item)), "mmechano_rent_price", 0) * last(item) * get(currency, `data[${get(JSON.parse(head(item)), "mmechano_rent_price_currency")}]`, 1,)).toFixed(2)}
                                                    suffix={` so'm / ${get(JSON.parse(head(item)), "mmechano_measure")}`}
                                                />
                                            </p>
                                            <p className={`${isEmpty(get(JSON.parse(head(item)), "smallmechano_name")) ? "hidden" : "visible"}`}>
                                                <NumericFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={(get(JSON.parse(head(item)), "smallmechano_rent_price", 0) * last(item) * get(currency, `data[${get(JSON.parse(head(item)), "smallmechano_rent_price_currency")}]`, 1,)).toFixed(2)}
                                                    suffix={` so'm / ${get(JSON.parse(head(item)), "smallmechano_measure")}`}
                                                />
                                            </p>
                                            <p className={`${isEmpty(get(JSON.parse(head(item)), "work_name")) ? "hidden" : "visible"}`}>
                                                <NumericFormat
                                                    displayType={"text"}
                                                    thousandSeparator={" "}
                                                    value={(get(JSON.parse(head(item)), "work_price", 0) * last(item) * get(currency, `data[${get(JSON.parse(head(item)), "work_price_currency")}]`, 1,)).toFixed(2)}
                                                    suffix={` so'm / ${get(JSON.parse(head(item)), "work_measure")}`}
                                                />
                                            </p>
                                        </div>

                                        <div className={'col-span-12 w-full h-[1px] bg-[#c5c5c5] my-[20px]'}></div>

                                    </div>

                                    <div
                                        className={`w-1/2 mx-auto gap-x-8 flex justify-center  items-center ${last(item) === 0 ? " !visible" : "hidden"}`}>
                                        <div className={"flex gap-x-2 items-center"}>
                                            <Image src={"/images/warning.png"} alt={"warning"} width={30} height={30}/>
                                            <p className={"text-lg"}>Mahsulot savatdan yo'q qilindi</p>
                                        </div>
                                        <button onClick={() => handleIncrement(JSON.parse(head(item)))}
                                                className={"px-[30px]  py-3 rounded-[8px] hover:border-gray-500 border"}>Bekor
                                            qilish
                                        </button>
                                    </div>


                                </div>
                            ))}
                        </div>
                    }
                </main>
            </Section>
            <Section className="">
                <Button
                    handleClick={onSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Sotib olish
                </Button>

                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">

                        <div className="bg-white relative p-8 rounded shadow-md w-[500px] h-auto">
                            <div className={"absolute right-0 top-1 p-2"}>
                                <Image
                                    onClick={closeModal}
                                    src={"/icons/closeModal.svg"}
                                    alt={"modalcloser"}
                                    width={30}
                                    height={30}
                                    className={
                                        "float-right block cursor-pointer bg-white p-1 rounded-[2px]"
                                    }
                                />
                            </div>
                            <h1 className="text-xl mb-4">Shartnoma tuzilishidan oldin, siz ro'yxatdan o'tishingiz
                                lozim!</h1>
                            <p className="mb-4">Ro'yxatdan o'tish uchun pastdagi tugmani bosing</p>
                            <div className={"flex gap-x-2"}>
                                <Link href={"/auth/login"}

                                      className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Ro'yxatdan o'tish
                                </Link>


                            </div>
                        </div>
                    </div>
                )}

                {sum(values(state)) === 0 && isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="bg-white p-8 rounded shadow-md w-[500px] h-auto">
                            <h1 className="text-xl mb-4">Shartnoma tuzilishidan oldin, birinchi navbatda kamida
                                bitta
                                mahsulot
                                buyurtma qiling!</h1>

                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Yopish
                            </button>

                        </div>
                    </div>
                )}
            </Section>
        </Main>
    );
};

export default Index;
