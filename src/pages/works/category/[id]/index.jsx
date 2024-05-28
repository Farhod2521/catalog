import React, {useState} from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu, {menuData} from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import {get, isEqual} from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {ContentLoader, OverlayLoader} from "@/components/loader";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import {useRouter} from "next/router";
import {getDefaultValue, getOptionList} from "@/utils";
import Pagination from "@/components/pagination";
import {useTranslation} from "react-i18next";
import Template from "@/components/template";

const Index = () => {
    const router = useRouter();
    const {t} = useTranslation()
    const {id} = router.query;
    const [page, setPage] = useState(1);
    const [isActive, setIsActive] = useState(0);


    const handleClickFormat = (type) => {
        setIsActive(type)
    }
    const [groupId, setGroupId] = useState(null)
    const {data: materials, isLoading, isError: isErrorMaterials, isFetching} = useGetQuery({
        key: KEYS.works,
        url: URLS.works,
        params: {
            page,
            key: groupId ? 'group' : 'category',
            value: groupId ? groupId : id,
        },
        enabled: !!(id)
    });
    const {
        data: categories,
        isLoading: isLoadingCategory,
        isError: isErrorCategory
    } = useGetQuery({key: KEYS.categories, url: URLS.categories, params: {key: KEYS.works}});


    const {
        data: groups,
    } = useGetQuery({
        key: [KEYS.groups, id],
        url: URLS.groups,
        params: {key: KEYS.works, parent: id},
        enabled: !!(id)
    });

    if (isErrorCategory || isErrorMaterials) {
        return <ErrorPage/>
    }

    if (isLoading || isLoadingCategory) {
        return <Main><ContentLoader/></Main>;
    }


    return (
        <Main>
            {isFetching && <OverlayLoader/>}
            <Menu active={3}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>{t("Qurilish ishlari")}</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            name={'material'}
                            defaultValue={getDefaultValue(getOptionList(menuData, 'filterUrl', 'title', true), '/works/category')}
                            getValue={(val) => {
                                if (get(val, 'value') && !isEqual(get(val, 'value'), '/works/category')) {
                                    router.push(get(val, 'value'))
                                }
                            }}
                            options={getOptionList(menuData, 'filterUrl', 'title', true)}
                            label={'Tanlangan mahsulot turi'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            name={`volume-${id}`}
                            getValue={(val) => {
                                if (get(val, 'value')) {
                                    setPage(1)
                                    setGroupId(null);
                                    router.push(`/works/category/${get(val, 'value')}`)
                                }
                            }}
                            defaultValue={getDefaultValue(getOptionList(get(categories, 'data.results', []), 'id', 'category_name'), id)}
                            options={getOptionList(get(categories, 'data.results', []), 'id', 'category_name')}
                            label={'Tanlangan kategoriya'}/>
                    </div>

                    <div className="col-span-12 mb-5">
                        <Select name={`group-${groupId}`} getValue={(val) => setGroupId(get(val, 'value'))}
                                options={getOptionList(get(groups, 'data.results', []), 'id', 'group_name')}
                                label={'Tanlangan guruh'}/>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-8  min-h-fit">
                    <div className="col-span-12">
                        <Title>mahsulotlar</Title>

                        <Template active={isActive} handleClickFormat={setIsActive}/>
                    </div>
                    {
                        get(materials, 'data.results', []).map(material => <div
                            key={get(material, 'work_csr_code')}
                            className={`${isActive === 1 && isActive === 2 && 'col-span-3'} ${isActive === 0 && 'col-span-6'} col-span-3 mb-[30px] `}>
                            <Product template={(isActive == 0 || isActive == 2) ? 'list' : 'card'}  name={'work_name'} code={'work_csr_code'}img={'work_image'} data={material} viewUrl={'works'}/>
                        </div>)
                    }
                    <div className={'col-span-12'}>
                        <Pagination page={page} setPage={setPage} pageCount={get(materials, 'data.total_pages', 0)}/>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;