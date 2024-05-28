import React, { useState } from "react";
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu, { menuData } from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import { get, isEqual } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { ContentLoader, OverlayLoader } from "@/components/loader";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import { useRouter } from "next/router";
import { getDefaultValue, getOptionList } from "@/utils";
import Pagination from "@/components/pagination";
import { useTranslation } from "react-i18next";
import Template from "@/components/template";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [isActive, setIsActive] = useState(0);

  const handleClickFormat = (type) => {
    setIsActive(type);
  };
  const {
    data: materials,
    isLoading,
    isError: isErrorMaterials,
    isFetching,
  } = useGetQuery({
    key: KEYS.materials,
    url: URLS.materials,
    params: {
      page,
      key: groupId ? "group" : categoryId ? "category" : "volume",
      value: groupId ? groupId : categoryId ? categoryId : id,
    },
    enabled: !!id,
  });
  const {
    data: volumes,
    isLoading: isLoadingVolumes,
    isError: isErrorVolumes,
  } = useGetQuery({
    key: KEYS.volumes,
    url: URLS.volumes,
    params: { key: KEYS.materials },
  });
  const { data: categories } = useGetQuery({
    key: [KEYS.categories, id],
    url: URLS.categories,
    params: { key: KEYS.materials, parent: id },
    enabled: !!id,
  });

  const { data: groups } = useGetQuery({
    key: [KEYS.groups, id, categoryId],
    url: URLS.groups,
    params: { key: KEYS.materials, parent: categoryId },
    enabled: !!categoryId,
  });

  if (isErrorVolumes || isErrorMaterials) {
    return <ErrorPage />;
  }

  if (isLoading || isLoadingVolumes) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }

  return (
    <Main>
      {isFetching && <OverlayLoader />}
      <Menu active={1} />
      <Section>
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center mt-5">
            <Title center>Materiallar va buyumlar</Title>
          </div>
          <div className="col-span-12 mb-5">
            <Select
              name={"material"}
              defaultValue={getDefaultValue(
                getOptionList(menuData, "filterUrl", "title", true),
                "/materials/volume",
              )}
              getValue={(val) => {
                if (
                  get(val, "value") &&
                  !isEqual(get(val, "value"), "/materials/volume")
                ) {
                  router.push(get(val, "value"));
                }
              }}
              options={getOptionList(menuData, "filterUrl", "title", true)}
              label={"Tanlangan mahsulot turi"}
            />
          </div>
          <div className="col-span-12 mb-5">
            <Select
              name={`volume-${id}`}
              getValue={(val) => {
                if (get(val, "value")) {
                  setPage(1);
                  setCategoryId(null);
                  setGroupId(null);
                  router.push(`/materials/volume/${get(val, "value")}`);
                }
              }}
              defaultValue={getDefaultValue(
                getOptionList(
                  get(volumes, "data.results", []),
                  "id",
                  "volume_name",
                ),
                id,
              )}
              options={getOptionList(
                get(volumes, "data.results", []),
                "id",
                "volume_name",
              )}
              label={"Tanlangan bo‘lim"}
            />
          </div>
          <div className="col-span-12 mb-5">
            <Select
              name={`category-${categoryId}`}
              defaultValue={null}
              getValue={(val) => {
                setGroupId(null);
                setCategoryId(get(val, "value"));
              }}
              options={getOptionList(
                get(categories, "data.results", []),
                "id",
                "category_name",
              )}
              label={"Tanlangan kategoriya"}
            />
          </div>
          <div className="col-span-12 mb-5">
            <Select
              name={`group-${groupId}`}
              getValue={(val) => setGroupId(get(val, "value"))}
              options={getOptionList(
                get(groups, "data.results", []),
                "id",
                "group_name",
              )}
              label={"Tanlangan guruh"}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 mt-8 min-h-fit">
          <div className="col-span-12">
            <Title>mahsulotlar</Title>

            <Template active={isActive} handleClickFormat={setIsActive} />
          </div>

          {get(materials, "data.results", []).map((material) => (
            <div
              key={get(material, "material_csr_code")}
              className={`${isActive === 1 && isActive === 2 && "col-span-3"} ${
                isActive === 0 && "col-span-6"
              } col-span-3 mb-[30px] `}
            >
              <Product
                template={isActive == 0 || isActive == 2 ? "list" : "card"}
                data={material}
              />
            </div>
          ))}
          <div className={"col-span-12"}>
            <Pagination
              page={page}
              setPage={setPage}
              pageCount={get(materials, "data.total_pages", 0)}
            />
          </div>
        </div>
      </Section>
    </Main>
  );
};

export default Index;
