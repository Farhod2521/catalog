import React, {useRef, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get, head, parseInt} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import {URLS} from "@/constants/url";
import GridView from "@/containers/grid-view";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import usePostQuery from "@/hooks/api/usePostQuery";
import {useSettingsStore} from "@/store";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import StarRating from "@/components/stars/star-rating";
import starRating from "@/components/stars/star-rating";
import Title from "@/components/title";
import Star from "@/components/stars/star";
import {last} from "lodash/array";







const Index = () => {
    const [pageSize, setPageSize] = useState(48);
    const [selectedStars, setSelectedStars] = useState(0);
    const [comments, setComments] = useState({});
    const [isOpen, setIsOpen] = useState(false)
    const {data: session} = useSession();
    const productCategoryRef = useRef(null);
    const companyStirRef = useRef(null);
    const ratingValueRef = useRef(null);
    const companyRatingValueRef = useRef(null);
    const commentRef = useRef(null);
    const productIdRef = useRef(null);
    const token = useSettingsStore(state => get(state, 'token', null))
    const [rating, setRating] = useState(0);
    const [ratingCompany, setRatingCompany] = useState(0);
    const [hover, setHover] = useState(0);
    const [hoverRatingCompany, setHoverRatingCompany] = useState(0);

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        ratingValue = ratingValueRef.current?.value;
    };

    const handleRatingCompany = (ratingValue) => {
        setRatingCompany(ratingValue);
        ratingValue = companyRatingValueRef.current?.value;
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);



    const {data: orderListCustomer} = useGetQuery({
        key: KEYS.orderListCustomer,
        url: URLS.orderListCustomer
    })




    const {data: user} = useGetQuery({
        key: KEYS.getCustomer,
        url: URLS.getCustomer,
        headers: {token: token ?? `${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token') || token)
    })


    const { mutate: sendOrderStatus, isLoading } = usePostQuery({
        listKeyId: "customer-info-one",
    });



    const handleSendOrderStatus = (id, selectStatus) => {
        const selectedId = +id
        sendOrderStatus({
            url: `${URLS.sendOrderStatus}${selectedId}/`,
            attributes: {
                "order_status": `${selectStatus}`
            }
        })

    }

    const {mutate: sendComment, isLoadingComment} = usePostQuery({
        listKeyId: "comment-one",
    });

    const handleSendComment = (row) => {
        console.log(row,"ROEw")
        const enteredProductCategory = row?.product_category;
        const selectedStars = rating
        const enteredComment = commentRef.current?.value;
        const customer = parseInt(get(user, "data.id"));
        const productId = parseInt(row?.ad_id);
        const enteredRatingCompany = ratingCompany
        const enteredCompanyStir = parseInt(row?.company)

        const commentInfo = {
            product_category: enteredProductCategory,
            ad_id: productId,
            comment: enteredComment,
            rating: selectedStars,
            customer: customer,
            company_stir: enteredCompanyStir,
            rating_company: enteredRatingCompany
        }



        setComments(commentInfo)

        sendComment({
                url: URLS.sendComment,
                attributes: commentInfo
            },
            {
                    onSuccess: () => {
                        toast.success('Siz bergan izoh va baho yetkazib beruvchiga yuborildi', {position: 'top-right'})
                    }
            }
            )
        setIsOpen(false);
    }


    const columns = [
            {
                title: "№",
                key: "id",
                render: ({index}) => <span>{index}</span>,
            },
            {
                title: "Mahsulot turi",
                key: "product_category",
                classnames: "hidden"
            },
            {
                title: "Mahsulot turi",
                key: "ad_id",
                classnames: "hidden"
            },

            {
                title: "Yetkazib beruvchi",
                key: "company_name",
            },
            {
                title: "Kodi",
                key: "product_code",
            },
            {
                title: "Nomi",
                key: "product_name",
            },

            {
                title: "Narxi",
                key: "price",
                classnames: "text-center",
            },
            {
                title: "Vaqti",
                key: "create_at",
                render: ({ value }) =>
                    dayjs(value).format("DD.MM.YYYY HH:mm ", "Asia/Tashkent"),
            },
            {
                title: "Miqdori",
                key: "quantity",
                classnames: "text-center",
            },
        {
            title: "Buyurtmaning holati",
            key: "order_status",
            render: ({row}) =>
                get(row, "order_status") === "new_order" ?
                    <div className={"flex flex-col gap-y-2"}>
                        <button onClick={() => handleSendOrderStatus(get(row, "id"), "customer_canceled")}
                                className={"bg-red-600 hover:bg-red-700 active:bg-red-500 text-white py-2 px-8 rounded-[6px]"}>
                            Bekor qilish
                        </button>
                    </div>
                    : get(row, "order_status") === "accepted" ?
                        <div>
                            <p className={"bg-green-600 hover:bg-green-700 text-center active:bg-green-500 text-white py-2 px-8 rounded-[6px]"}>Buyurtma
                                qabul qilindi</p>
                        </div> : get(row, "order_status") === "sent" ?
                            <div className={"rounded-[6px]"}>
                                <div
                                    className={"flex bg-yellow-600 text-white mb-[10px] justify-center py-2 px-2 rounded-[6px] items-center gap-x-2"}>
                                    <p>Mahsulot yo'lda</p>
                                </div>
                                <button onClick={() => handleSendOrderStatus(get(row, "id"), "customer_accepted")}
                                        className={"bg-green-600 w-full text-center hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"}>
                                    Mahsulotni qabul qilish
                                </button>
                            </div> : get(row, "order_status") === "customer_canceled" ?
                                <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                    <p>Buyurtmani bekor qildingiz</p>
                                    <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                </div> : get(row, "order_status") === "canceled" ?
                                    <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                        <p>Yetkazib beruvchi mahsulotni bekor qildi</p>
                                        <Image src={"/images/error.png"} alt={"error"} width={22} height={22}/>
                                    </div> : get(row, "order_status") === "on_way" ?
                                        <div className={"text-center w-full mb-[15px]"}>
                                            <p>Mahsulot yo'lda</p>
                                            <Image src={"/images/on_way.png"} alt={"success"} width={22} height={22}/>
                                        </div> : get(row, "order_status") === "customer_accepted" ?
                                            <div className={"text-center w-full mb-[15px]"}>
                                                <p>Mahsulot qabul qilindi</p>
                                            </div> : ""

            ,

        },
        {
            title: "Sharh qoldirish",
            key: "",
            render: ({row, index}) => <div key={index} className={""}>
                <button onClick={()=>{
                    setIsOpen(row)
                }} className={"text-center"}>
                    Sharh qoldirish
                </button>

                {Boolean(isOpen) &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="bg-white p-8 rounded shadow-md w-[700px] h-auto flex flex-col">
                            <div className={"flex justify-between items-center "}>
                                <Title>Mahsulotni baholash</Title>

                                <Image onClick={closeModal} className={"cursor-pointer"} src={"/icons/closeModal.svg"}
                                       alt={"close"} width={30} height={30}/>

                            </div>
                            <p className={"text-lg mb-[15px]"}>Mahsulot borasida o'z izohingizni qoldiring.</p>
                            <textarea ref={commentRef} rows={10} placeholder={"Izoh qoldirish"}
                                      className={"border p-3 shadow-lg rounded-[6px] mb-[20px] "}>

                            </textarea>

                            <p className={"text-lg mb-[15px]"}>Mahsulotni baholang</p>
                            <div className={"mb-[30px]"} style={{display: 'flex', flexDirection: 'row'}}>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;

                                    return (
                                        <label key={index} style={{display: 'inline-block'}}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => handleClick(ratingValue)}
                                                style={{display: 'none'}}
                                            />
                                            <svg
                                                className="star"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 24 24"
                                                fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                                                fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                            >
                                                <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/>
                                            </svg>
                                        </label>
                                    );
                                })}
                            </div>

                            <p className={"text-lg mb-[15px]"}>Yetkazib beruvchini baholang</p>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                {[...Array(5)].map((star, index) => {
                                    const companyRatingValue = index + 1;

                                    return (
                                        <label key={index} style={{display: 'inline-block'}}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={companyRatingValue}
                                                onClick={() => handleRatingCompany(companyRatingValue)}
                                                style={{display: 'none'}}
                                            />
                                            <svg
                                                className="star"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 24 24"
                                                fill={companyRatingValue <= (hoverRatingCompany || ratingCompany) ? "#ffd700" : "#ccc"}
                                                fill={companyRatingValue <= (hoverRatingCompany || ratingCompany) ? "#ffd700" : "#ccc"}
                                                onMouseEnter={() => setHoverRatingCompany(companyRatingValue)}
                                                onMouseLeave={() => setHoverRatingCompany(0)}
                                            >
                                                <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/>
                                            </svg>
                                        </label>
                                    );
                                })}
                            </div>

                            <button
                                className={"bg-blue-500 hover:bg-blue-600 active:bg-blue-400 mt-[30px] text-white w-full text-lg py-2 rounded-[6px]"}
                                onClick={() => handleSendComment(isOpen)}>Yuborish
                            </button>
                        </div>
                    </div>
                }
            </div>,

        },

    ];


    return (
        <Dashboard>
            <Subheader title={'Mening buyurtmalarim'}/>
            <div className="p-7">
                <GridView columns={columns} key={KEYS.orderListCustomer} url={URLS.orderListCustomer}
                          defaultPageSize={pageSize}/>
            </div>

        </Dashboard>
    )

}

export default Index;