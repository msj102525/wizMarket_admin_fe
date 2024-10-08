import React, { useState } from 'react';

const CustomSelect = ({ options, value, onChange, placeholder, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex-1">
            <div
                className={`p-2 border rounded cursor-pointer ${disabled ? 'bg-[#EDEDED] border-[#DDDDDD]' : 'bg-[#FFFFFF] border-[#DDDDDD]'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center">
                    <span>{value === '0' ? placeholder : options.find(opt => opt.value === value)?.label || placeholder}</span>
                    <div className="w-[11px]">
                        <img className="block w-full h-auto" src={require("../assets/form/dropdownArrow.png")} alt="Dropdown Arrow" />
                    </div>
                </div>
            </div>
            {isOpen && !disabled && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow-lg">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer border mb:text-4xl"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                            {option.count ? "(" + option.count + ")" : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CategorySelect = ({
    reference, setReference, references,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories
}) => {
    const handleReferenceChange = (newReference) => {
        setReference(newReference);
        setMainCategory('0');
        setSubCategory('0');
        setDetailCategory('0');
    };


    const handleMainCategoryChange = (newMainCategory) => {
        setMainCategory(newMainCategory);
        setSubCategory('0');
        setDetailCategory('0');
    };

    const handleSubCategoryChange = (newSubCategory) => {
        setSubCategory(newSubCategory);
        setDetailCategory('0');
    };

    const refOption = [
        { value: '0', label: '출처' },
        ...references.map(ref => ({ value: ref.reference_id, label: ref.reference_name }))
    ];
    const mainOptions = [
        { value: '0', label: '대분류' },
        ...mainCategories.map(cat => ({ value: cat.biz_main_category_id, label: cat.biz_main_category_name, count: cat.biz_sub_category_count }))
    ];

    const filteredSubCategories = reference === 3
        ? subCategories.filter(cat => typeof cat.biz_sub_category_id === 'string' && cat.biz_sub_category_id.startsWith(mainCategory))
        : subCategories;

    const subOptions = [
        { value: '0', label: '중분류' },
        ...filteredSubCategories.map(cat => ({ value: cat.biz_sub_category_id, label: cat.biz_sub_category_name, count: cat.biz_detail_cateogry_count }))
    ];

    const filteredDetailCategories = reference === 3
        ? detailCategories.filter(cat => typeof cat.biz_detail_category_id === 'string' && cat.biz_detail_category_id.startsWith(subCategory))  // 서브 카테고리 코드에 맞는 디테일 카테고리 필터링
        : detailCategories;

    const detailOptions = [
        { value: '0', label: '소분류' },
        ...filteredDetailCategories.map(cat => ({ value: cat.biz_detail_category_id, label: cat.biz_detail_category_name }))
    ];

    return (
        <div className="flex gap-4 w-full flex-wrap mb:text-4xl">
            <CustomSelect
                options={refOption}
                value={reference}
                onChange={handleReferenceChange}
                placeholder="출처"
            />
            <CustomSelect
                options={mainOptions}
                value={mainCategory}
                onChange={handleMainCategoryChange}
                placeholder="대분류"
                disabled={reference === '0' || reference === '출처'}
            />
            <CustomSelect
                options={subOptions}
                value={subCategory}
                onChange={handleSubCategoryChange}
                placeholder="중분류"
                disabled={mainCategory === '0' || reference === '출처'}
            />
            <CustomSelect
                options={detailOptions}
                value={detailCategory}
                onChange={setDetailCategory}
                placeholder="소분류"
                disabled={subCategory === '0' || reference === '출처'}
            />
        </div>
    );
};

export default CategorySelect;