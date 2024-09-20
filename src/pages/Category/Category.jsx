import React, { useState } from 'react';
import axios from 'axios';
import { useCategories } from '../../hooks/useCategories';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import SectionHeader from '../../components/SectionHeader';
import CateogoryForm from './component/CateogoryForm';
import CategoryList from './component/CategoryList';

const Category = () => {

    const [isList, setIsList] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const handleToggle = () => {
        setIsList(!isList);
    };

    const handleSearch = () => {
        console.log(mainCategory)
        console.log(subCategory)
        console.log(detailCategory)
        setLoading(true);
        setError(null);

        const fetchBizCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/category/biz`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        main_category_id: mainCategory && !isNaN(parseInt(mainCategory)) && parseInt(mainCategory) !== 0 ? parseInt(mainCategory) : undefined,
                        sub_category_id: subCategory && !isNaN(parseInt(subCategory)) && parseInt(subCategory) !== 0 ? parseInt(subCategory) : undefined,
                        detail_category_id: detailCategory && !isNaN(parseInt(detailCategory)) && parseInt(detailCategory) !== 0 ? parseInt(detailCategory) : undefined,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        const fetchClassificationCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/category/classification`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        main_category_code: mainCategory !== '0' && mainCategory !== '대분류' && mainCategory !== 0 ? mainCategory : undefined,
                        sub_category_code: subCategory && !isNaN(parseInt(subCategory)) && parseInt(subCategory) !== 0 ? parseInt(subCategory) : undefined,
                        detail_category_code: detailCategory && !isNaN(parseInt(detailCategory)) && parseInt(detailCategory) !== 0 ? parseInt(detailCategory) : undefined,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        const fetchBCACategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/category/business_area_category`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        main_category_code: mainCategory !== '0' && mainCategory !== '대분류' && mainCategory !== 0 ? mainCategory : undefined,
                        sub_category_code: subCategory !== '0' && subCategory !== '중분류' && subCategory !== 0 ? subCategory : undefined,
                        detail_category_code: detailCategory !== '0' && detailCategory !== '소분류' && detailCategory !== 0 ? detailCategory : undefined,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        switch (reference) {
            case 1:
                fetchBizCategories();
                break;
            case 2:
                fetchClassificationCategories();
                break;
            case 3:
                fetchBCACategories();
                break;
            default:
                return;
        }
    };

    const handleReset = () => {
        setReference('출처');
        setMainCategory('대분류');
        setSubCategory('중분류');
        setDetailCategory('소분류');
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <section>
                        <SectionHeader title="업종 분류" handleToggle={handleToggle} isList={isList} mapDisable={true} />
                    </section>
                    <section className="bg-white p-4">
                        <CateogoryForm
                            reference={reference}
                            setReference={setReference}
                            references={references}
                            mainCategory={mainCategory}
                            setMainCategory={setMainCategory}
                            mainCategories={mainCategories}
                            subCategory={subCategory}
                            setSubCategory={setSubCategory}
                            subCategories={subCategories}
                            detailCategory={detailCategory}
                            setDetailCategory={setDetailCategory}
                            detailCategories={detailCategories}
                            handleSearch={handleSearch}
                            handleReset={handleReset}
                        />
                    </section>
                    <section className="pb-10">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <CategoryList data={data} />
                        )}
                    </section>

                </main>
            </div>
        </div>
    );
};

export default Category;
