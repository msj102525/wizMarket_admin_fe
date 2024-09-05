import React from 'react';

const CategorySelect = ({
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories
}) => {
    return (
        <div className="flex gap-4 w-full">
            <select
                className="p-2 border border-[#DDDDDD] rounded flex-1 block"
            >
                <option value="0">출처</option>
                <option value="biz">나이스비즈맵</option>

            </select>
            <select
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block"
            >
                <option value="0">대분류</option>
                {mainCategories.map((mainCate, idx) => (
                    <option key={idx} value={mainCate.biz_main_category_id}>
                        {mainCate.biz_main_category_name}
                    </option>
                ))}
            </select>

            <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block"
            >
                <option value="0">중분류</option>
                {subCategories.map((subCate, idx) => (
                    <option key={idx} value={subCate.biz_sub_category_id}>
                        {subCate.biz_sub_category_name}
                    </option>
                ))}
            </select>

            <select
                value={detailCategory}
                onChange={(e) => setDetailCategory(e.target.value)}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block"
            >
                <option value="0">소분류</option>
                {detailCategories.map((detailCate, idx) => (
                    <option key={idx} value={detailCate.biz_detail_category_id}>
                        {detailCate.biz_detail_categoty_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
