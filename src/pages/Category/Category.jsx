import React, { useState } from 'react';
// import axios from 'axios';
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
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            console.log(mainCategory)
            console.log(subCategory)
            console.log(detailCategory)

            console.log(setData)

            // try {
            //     const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/rising/rb`, {
            //         headers: {
            //             'Content-Type': 'application/json; charset=UTF-8',
            //         },
            //     });
            //     setData(response.data);
            // } catch (error) {
            //     console.error('Error fetching data from FastAPI', error);
            //     setError('Failed to fetch data');
            // } finally {
            //     setLoading(false);
            // }
        };

        fetchData();
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
