import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategorySelect from '../../components/CategorySelect';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import SectionHeader from '../../components/SectionHeader';

import { useState } from 'react';

const Category = () => {

    const [isList, setIsList] = useState(false);
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const handleToggle = () => {
        setIsList(!isList);
    };

    return (

        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="gap-2 pr-10 w-full">
                    <section>
                        <SectionHeader title="업종 분석" isList={isList} handleToggle={handleToggle} />
                    </section>
                    <section>
                        <div>
                            <CategorySelect
                                reference={reference}
                                references={references}
                                setReference={setReference}
                                mainCategory={mainCategory}
                                setMainCategory={setMainCategory}
                                mainCategories={mainCategories}
                                subCategory={subCategory}
                                setSubCategory={setSubCategory}
                                subCategories={subCategories}
                                detailCategory={detailCategory}
                                setDetailCategory={setDetailCategory}
                                detailCategories={detailCategories}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>

    );
};

export default Category;