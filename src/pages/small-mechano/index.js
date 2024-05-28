import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import { getMostOrdered, getCategories } from "@/api";
import { KEYS } from "@/constants/key";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ContentLoader } from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import { get, isEmpty } from "lodash";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import { URLS } from "@/constants/url";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Template from "@/components/template";

export default function SmallMechanos() {
  const [pageSize, setPageSize] = useState(24);
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(0);

  const handleClickFormat = (type) => {
    setIsActive(type);
  };

  const {
    data: volumes,
    isError,
    isLoading,
    isFetching,
    error,
  } = useQuery([KEYS.categories], () =>
    getCategories({
      url: URLS.categories,
      params: { key: KEYS.smallMechanos },
    }),
  );
  const {
    data: items,
    isLoading: machineLoading,
    isError: machineError,
  } = useQuery([KEYS.smallMechanos, pageSize], () =>
    getMostOrdered({
      url: URLS.smallMechanos,
      params: { key: KEYS.viewCounts, page_size: pageSize },
    }),
  );
  if (isError || machineError) {
    return <ErrorPage />;
  }
  if (isLoading || machineLoading || isFetching) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }
  return (
    <Main>
      <Menu active={4} />
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
                <Category
                  logo_url={"category_logo"}
                  name={"category_name"}
                  url={"small-mechano/category"}
                  data={volume}
                />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 mt-[30px] min-h-fit">
          <div className="col-span-12">
            <Title>Ko‘p ko‘rilganlar</Title>
          </div>

          <Template active={isActive} handleClickFormat={setIsActive} />

          {get(items, "results", []).map((item) => (
            <div
              key={get(item, "material_csr_code")}
              className={`${isActive === 1 && isActive === 2 && "col-span-3"} ${
                isActive === 0 && "col-span-6"
              } col-span-3 mb-[30px] `}
            >
              <Product
                template={isActive === 0 || isActive === 2 ? "list" : "card"}
                viewUrl={"small-mechano"}
                name={"smallmechano_name"}
                code={"smallmechano_csr_code"}
                img={"smallmechano_image"}
                data={item}
              />
            </div>
          ))}
          <div className="col-span-12 text-center">
            <span
              className={
                "cursor-pointer underline laptop:text-base tablet:text-sm text-xs"
              }
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

  await queryClient.prefetchQuery([KEYS.categories], () =>
    getCategories({
      url: URLS.categories,
      params: { key: KEYS.smallMechanos },
    }),
  );
  await queryClient.prefetchQuery([KEYS.smallMechanos], () =>
    getMostOrdered({
      url: URLS.smallMechanos,
      params: { key: KEYS.viewCounts },
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
