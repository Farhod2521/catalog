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
import Template from "@/components/template";

const Index = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [isActive, setIsActive] = useState(0);


    const handleClickFormat = (type) => {
        setIsActive(type)
    }
    const {data: materials, isLoading, isError: isErrorMaterials, isFetching} = useGetQuery({
        key: KEYS.machinesMechanos,
        url: URLS.machinesMechanos,
        params: {
            page,
            key: KEYS.viewCounts,
        },
    });
    const {
        data: categories,
        isLoading: isLoadingCategory,
        isError: isErrorCategory
    } = useGetQuery({key: KEYS.categories, url: URLS.categories, params: {key: KEYS.machinesMechanos}});




    if (isErrorCategory || isErrorMaterials) {
        return <ErrorPage/>
    }

    if (isLoading || isLoadingCategory) {
        return <Main><ContentLoader/></Main>;
    }


    return (
        <Main>
            {isFetching && <OverlayLoader/>}
            <Menu active={2}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Mashina mexanizmlar</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            name={'material'}
                            defaultValue={getDefaultValue(getOptionList(menuData, 'filterUrl', 'title', true), '/machine-mechano/category')}
                            getValue={(val) => {
                                if (get(val, 'value') && !isEqual(get(val, 'value'), '/machine-mechano/category')) {
                                    router.push(get(val, 'value'))
                                }
                            }}
                            options={getOptionList(menuData, 'filterUrl', 'title', true)}
                            label={'Tanlangan mahsulot turi'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            getValue={(val) => {
                                if (get(val, 'value')) {
                                    setPage(1)
                                    router.push(`/machine-mechano/category/${get(val, 'value')}`)
                                }
                            }}
                            options={getOptionList(get(categories, 'data.results', []), 'id', 'category_name')}
                            label={'Tanlangan kategoriya'}/>
                    </div>

                    <div className="col-span-12 mb-5">
                        <Select
                                options={[]}
                                label={'Tanlangan guruh'}/>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-8 items-start">
                    <div className="col-span-12">
                        <Title>mahsulotlar</Title>

                        <Template active={isActive} handleClickFormat={setIsActive}/>
                    </div>
                    {
                        get(materials, 'data.results', []).map(material => <div key={get(material, 'mmechano_csr_code')}
                                                                                className={`${isActive === 1 && isActive === 2 && 'col-span-3'} ${isActive === 0 && 'col-span-6'} col-span-3 mb-[30px] `}>
                            <Product template={(isActive == 0 || isActive == 2) ? 'list' : 'card'}  viewUrl={'machine-mechano'} img={'mmechano_image'} code={'mmechano_csr_code'} name={'mmechano_name'} data={material}/>
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