import Main from "@/layouts/main";
import Menu from "../components/menu";
import Section from "../components/section";
import { getMostOrdered, getVolumes } from "@/api";
import { KEYS } from "@/constants/key";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ContentLoader } from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import { get, isEmpty } from "lodash";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import { URLS } from "../constants/url";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { OverlayLoader } from "../components/loader";
import Template from "@/components/template";
import Pagination from "@/components/pagination";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [pageSize, setPageSize] = useState(24);
  const [isActive, setIsActive] = useState(0);

  const handleClickFormat = (type) => {
    setIsActive(type);
  };

  const { t } = useTranslation();
  const {
    data: volumes,
    isError,
    isLoading,
    isFetching,
    error,
  } = useQuery([KEYS.volumes], () =>
    getVolumes({ url: URLS.volumes, params: { key: KEYS.materials } }),
  );
  // REAL MATERIALS API
  const {
    data: materials,
    isLoading: materialLoading,
    isError: materialError,
    isFetching: isFetchingMaterials,
  } = useQuery([KEYS.materials, pageSize], () =>
    getMostOrdered({
      url: URLS.materials,
      params: { key: KEYS.viewCounts, page_size: pageSize },
    }),
  );

  if (isError || materialError) {
    return <ErrorPage />;
  }
  if (isLoading || materialLoading || isFetching) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }
  return (
    <Main>
      <Menu active={1} />
      <Section>
        <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
          {!isEmpty(get(volumes, "results", [])) &&
            get(volumes, "results", []).map((volume) => (
              <div
                key={get(volume, "id")}
                className={
                  "desktop:col-span-3 mobile:col-span-12 tablet:col-span-6 laptop:col-span-4 col-span-12 mb-5"
                }
              >
                <Category logo_url={"volume_logo"} data={volume} />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 mt-[30px] min-h-fit">
          <div className="col-span-12">
            <Title>{t("most_seen")}</Title>
          </div>

          <Template active={isActive} handleClickFormat={setIsActive} />

          {isFetchingMaterials && <OverlayLoader />}
          {get(materials, "results", []).map((material) => (
            <div
              key={get(material, "material_csr_code")}
              className={` ${
                isActive === 1 && isActive === 2 && "col-span-3"
              } ${isActive === 0 && "col-span-6"} col-span-3 mb-[30px] `}
            >
              <Product
                template={isActive === 0 || isActive === 2 ? "list" : "card"}
                data={material}
              />
            </div>
          ))}
          <div className="col-span-12 text-center">
            <span
              className={"cursor-pointer underline laptop:text-base text-sm"}
              onClick={() => setPageSize((prev) => prev + 24)}
            >
              {t("Barcha mahsulotlarni ko’rish")}
            </span>
          </div>
        </div>
      </Section>
    </Main>
  );
}

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([KEYS.volumes], () =>
    getVolumes({ url: URLS.volumes, params: { key: KEYS.materials } }),
  );
  await queryClient.prefetchQuery([KEYS.materials], () =>
    getMostOrdered({ url: URLS.materials, params: { key: KEYS.viewCounts } }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
