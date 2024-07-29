import React, { useState } from "react";
import Modal from 'react-modal';
import Main from "../../layouts/main";
import Menu from "../../components/menu";
import Section from "../../components/section";
import Title from "../../components/title";
import useGetQuery from "../../hooks/api/useGetQuery";
import { KEYS } from "../../constants/key";
import { URLS } from "../../constants/url";
import { ContentLoader } from "../../components/loader";
import { get, debounce } from "lodash";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import GridView from "../../containers/grid-view";
import Link from "next/link";
Modal.setAppElement('#__next');
const columns = [
  {
    title: "№",
    key: "id",
    render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
    classnames: "text-sm",
  },
  {
    title: "Resurs kodi",
    key: "resource_code",
    sorter: true,
    classnames: "min-w-[175px] text-sm ",
    render: ({ value, row }) => (
      <Link
        className={"whitespace-nowrap text-[#1890FF]"}
        href={get(row, "resource_type")}
      >
        {value}
      </Link>
    ),
  },
  {
    title: "Resurs nomi",
    key: "resource_name",
    sorter: true,
    classnames: "text-sm",
  },
  {
    title: "O’lchov birligi",
    key: "resource_measure",
    classnames: "text-center text-sm",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className={"flex items-center"}>
        <Image
          className={"mx-auto cursor-pointer"}
          width={24}
          height={24}
          src={"/icons/stick.svg"}
          alt={"certificate"}
        />
      </div>
    ),
    classnames: "text-center text-sm",
  },
];
const Classifier = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [volumeId, setVolumeId] = useState(null);
  const [partId, setPartId] = useState(null);
  const [chapterId, setChapterId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const { data: volumes, isLoading: isLoadingVolumes } = useGetQuery({
    key: KEYS.classifier,
    url: URLS.classifier,
    params: {
      key: "volumes",
    },
  });
  const {
    data: parts,
    isLoading: isLoadingParts,
    isFetching: isFetchingParts,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId],
    url: URLS.classifier,
    params: {
      key: "parts",
      parent: volumeId,
    },
    enabled: !!volumeId,
  });
  const {
    data: chapters,
    isLoading: isLoadingChapters,
    isFetching: isFetchingChapters,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId, partId],
    url: URLS.classifier,
    params: {
      key: "chapters",
      parent: partId,
    },
    enabled: !!partId,
  });
  const {
    data: groups,
    isLoading: isLoadingGroups,
    isFetching: isFetchingGroups,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId, partId, chapterId],
    url: URLS.classifier,
    params: {
      key: "groups",
      parent: chapterId,
    },
    enabled: !!chapterId,
  });

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isLoadingVolumes) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }

  return (
    <Main>
      <Menu active={6} />
      <Section>
        <div className="grid grid-cols-12 tablet:gap-x-8 mobile:gap-x-4 gap-x-2 min-h-full">
          <div className="col-span-12 text-center mt-5">
            <Title center>Qurilish resurslari Klassifikatori</Title>
          </div>
          <div className={"col-span-12 "}>
            <div className={"mb-5"}>
              <div className={"mb-2.5"}>
                <label className={" font-medium text-primary"} htmlFor="#">
                  Qidiruv
                </label>
                <p className={"text-sm text-[#516164]"}>
                  *
                  <NumericFormat
                    value={count}
                    displayType={"text"}
                    thousandSeparator={" "}
                  />{" "}
                  natija topildi
                </p>
              </div>
              <input
                onChange={debounce(function (e) {
                  setSearch(e.target.value);
                }, 500)}
                placeholder={"Kerakli mahsulot nomini yozing"}
                className={
                  "border border-transparent w-full px-5 py-2.5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                }
                type="text"
              />
              {search && search.length < 4 && (
                <span className={"text-red-500 text-xs font-light"}>
                  Kamida 4 ta belgi kiriting
                </span>
              )}
            </div>
          </div>
          <div className=" tablet:col-span-5 laptop:col-span-4 desktop:col-span-3  col-span-12 overflow-y-auto max-h-[200vh]">
            <ul className={"bg-white shadow-category p-2"}>
              {get(volumes, "data.results", []).map((volume, i) => (
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setGroupId(null);
                    setChapterId(null);
                    setPartId(null);
                    setVolumeId(get(volume, "id"));
                  }}
                  className={clsx(
                    "p-1.5 transition cursor-pointer mb-3 hover:bg-[#C7E3FC]",
                    {
                      "text-[#1B41C6] font-medium hover:bg-transparent":
                        get(volume, "id") == volumeId,
                      "!mb-0":
                        get(volumes, "data.results", [])?.length == i + 1,
                    },
                  )}
                  key={get(volume, "id")}
                >
                  <div className={"flex items-start"}>
                    <motion.div
                      className={"mr-2 flex-none"}
                      animate={{
                        rotate: get(volume, "id") == volumeId ? 180 : 0,
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          get(volume, "id") == volumeId
                            ? "/icons/arrow-down-category-active.svg"
                            : "/icons/arrow-down-category.svg"
                        }
                        alt={"arrow"}
                      />
                    </motion.div>
                    <span>{get(volume, "volume_name")}</span>
                  </div>
                  {get(volume, "id") == volumeId &&
                    (isLoadingParts || isFetchingParts ? (
                      <ContentLoader
                        classNames={"!bg-transparent min-h-[25vh]"}
                      />
                    ) : (
                      <ul className={"pl-3 py-1.5"}>
                        {get(parts, "data.results", []).map((part, j) => (
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setGroupId(null);
                              setChapterId(null);
                              setPartId(get(part, "id"));
                            }}
                            className={clsx(
                              " transition cursor-pointer mb-2  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                              {
                                "!text-[#017EFA] !font-medium":
                                  get(part, "id") == partId,
                                "!mb-0":
                                  get(parts, "data.results", [])?.length ==
                                  j + 1,
                              },
                            )}
                            key={get(part, "id")}
                          >
                            <div className={"flex items-start"}>
                              <motion.div
                                className={"mr-2 flex-none "}
                                animate={{
                                  rotate: get(part, "id") == partId ? 90 : 0,
                                }}
                              >
                                <Image
                                  width={18}
                                  height={18}
                                  src={
                                    get(part, "id") == partId
                                      ? "/icons/arrow-down-category-active.svg"
                                      : "/icons/arrow-down-category.svg"
                                  }
                                  alt={"arrow"}
                                />
                              </motion.div>
                              <span>{get(part, "part_name")}</span>
                            </div>
                            {get(part, "id") == partId &&
                              (isLoadingChapters || isFetchingChapters ? (
                                <ContentLoader
                                  classNames={"!bg-transparent min-h-[25vh]"}
                                />
                              ) : (
                                <ul className={"pl-5 py-1.5"}>
                                  {get(chapters, "data.results", []).map(
                                    (chapter, k) => (
                                      <li
                                        className={clsx(
                                          " transition cursor-pointer mb-1.5  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                          {
                                            "!text-[#017EFA] !font-medium":
                                              get(chapter, "id") == chapterId,
                                            "!mb-0":
                                              get(chapters, "data.results", [])
                                                ?.length ==
                                              k + 1,
                                          },
                                        )}
                                        key={get(chapter, "id")}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setGroupId(null);
                                          setChapterId(get(chapter, "id"));
                                        }}
                                      >
                                        <div className={"flex items-start"}>
                                          <motion.div
                                            className={"mr-2 flex-none "}
                                            animate={{
                                              rotate:
                                                get(chapter, "id") == chapterId
                                                  ? 90
                                                  : 0,
                                            }}
                                          >
                                            <Image
                                              width={12}
                                              height={12}
                                              src={
                                                get(chapter, "id") == chapterId
                                                  ? "/icons/arrow-down-category-active.svg"
                                                  : "/icons/arrow-down-category.svg"
                                              }
                                              alt={"arrow"}
                                            />
                                          </motion.div>
                                          <span>
                                            {get(chapter, "chapter_name")}
                                          </span>
                                        </div>
                                        {get(chapter, "id") == chapterId &&
                                          (isLoadingGroups ||
                                          isFetchingGroups ? (
                                            <ContentLoader
                                              classNames={
                                                "!bg-transparent min-h-[25vh]"
                                              }
                                            />
                                          ) : (
                                            <ul className={"pl-3 py-1.5"}>
                                              {get(
                                                groups,
                                                "data.results",
                                                [],
                                              ).map((group, l) => (
                                                <li
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setGroupId(
                                                      get(group, "id"),
                                                    );
                                                  }}
                                                  className={clsx(
                                                    " transition cursor-pointer mb-2  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                                    {
                                                      "!text-[#017EFA] !font-medium":
                                                        get(group, "id") ==
                                                        groupId,
                                                      "!mb-0":
                                                        get(
                                                          groups,
                                                          "data.results",
                                                        [])?.length ==
                                                        l + 1,
                                                    },
                                                  )}
                                                  key={get(group, "id")}
                                                >
                                                  <div
                                                    className={"flex items-start"}
                                                  >
                                                    <motion.div
                                                      className={
                                                        "mr-2 flex-none "
                                                      }
                                                      animate={{
                                                        rotate:
                                                          get(group, "id") ==
                                                          groupId
                                                            ? 90
                                                            : 0,
                                                      }}
                                                    >
                                                      <Image
                                                        width={12}
                                                        height={12}
                                                        src={
                                                          get(group, "id") ==
                                                          groupId
                                                            ? "/icons/arrow-down-category-active.svg"
                                                            : "/icons/arrow-down-category.svg"
                                                        }
                                                        alt={"arrow"}
                                                      />
                                                    </motion.div>
                                                    <span>
                                                      {get(group, "group_name")}
                                                    </span>
                                                  </div>
                                                </li>
                                              ))}
                                            </ul>
                                          ))}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              ))}
                          </li>
                        ))}
                      </ul>
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <div className="tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 col-span-12 mt-3 tablet:mt-0">
            <GridView
              endpoint={"/grid-resources"}
              columns={columns}
              search={search}
              onSearchCountChange={(count) => setCount(count)}
            />
          </div>
        </div>
      </Section>
      <Modal
      className={"bg-blue-500"}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            maxWidth: '900px',
            maxHeight: "500px",
            width: '100%',
            borderRadius: '8px',
            color: "white",
            backgroundColor: 'rgb(40, 54, 109)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {/* <button onClick={closeModal} className="text-end ">X</button> */}
        <h1 className="text-center text-wrap text-3xl">QURILISH RESURSLARI MILLIY KLASSIFIKATORI</h1>
        
        <div className="mt-10">
        <div className="col-span-12 flex ">

        <div className="col-span-4 m-10 ">
              <div className="drop-shadow-2xl  items-center justify-center ">
                <div className="relative">
              
                <div className="w-40 h-60 bg-white transform rotate-60 flex items-center justify-center ml-12 rounded bg-[url('/images/shnk.png')]">
      <div className="relative w-[170px] h-[500px]">
        <Image
          src={"/images/tmsiti.png"}
          alt={"stock-market"}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
                  <a href="https://tmsiti.uz/"><h3 className="text-xl mt-4 text-center" >Texnik me’yorlash va standartlashtirish ilmiy-tadqiqot instituti </h3></a>
                </div>
                
            </div>
        </div>
        <div className="col-span-4 m-10  ">
              <div className="drop-shadow-2xl  items-center justify-center   ">
                <div className="relative">
              
                  <div className="w-40 h-60 bg-white transform  flex items-center justify-center ml-5 rounded  bg-[url('/images/shnk.png')]">
                  <Image
                src={"/images/shnk.png"}
                alt={"stock-market"}
                width={110}
                height={110}
            />
                 
                  </div>
                  <a href="https://play.google.com/store/apps/details?id=uz.tmsiti.shnq&hl=en"><h3 className="text-xl mt-4 text-center" >Shaharsozlik normalari <p className="text-center">(mobil ilovasi)</p></h3></a>
                </div>
                
            </div>
        </div>

        <div className="col-span-4 m-10 ">
              <div className="drop-shadow-2xl  items-center justify-center ">
                <div className="relative">
              
                <div className="w-40 h-60 bg-white transform  flex items-center justify-center ml-5 rounded  bg-[url('/images/shnk.png')]">
                  <Image
                src={"/images/lbt.png"}
                alt={"stock-market"}
                width={300}
                height={120}
            />
                 
                  </div>
                  <h3 className="text-xl mt-4 text-center" >Kompleks sinov labaratoryasi. <p className="text-center"></p></h3>
                </div>
                
            </div>
        </div>




  

 </div>
          
          
        </div> 
      </Modal>
    </Main>
  );
};

export default Classifier;