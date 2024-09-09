import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategorySelect from '../../components/CategorySelect';


const Category = () => {

    const {
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    return (
        <div>
            <CategorySelect
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
    );
};

export default Category;