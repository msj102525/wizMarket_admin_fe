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
                            className="p-2 hover:bg-gray-100 cursor-pointer border"
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
    const refOption = [
        { value: '0', label: '출처' },
        ...references.map(ref => ({ value: ref.reference_id, label: ref.reference_name }))
    ];
    const mainOptions = [
        { value: '0', label: '대분류' },
        ...mainCategories.map(cat => ({ value: cat.biz_main_category_id, label: cat.biz_main_category_name, count: cat.biz_sub_category_count }))
    ];

    const subOptions = [
        { value: '0', label: '중분류' },
        ...subCategories.map(cat => ({ value: cat.biz_sub_category_id, label: cat.biz_sub_category_name, count: cat.biz_detail_cateogry_count }))
    ];

    const detailOptions = [
        { value: '0', label: '소분류' },
        ...detailCategories.map(cat => ({ value: cat.biz_detail_category_id, label: cat.biz_detail_categoty_name }))
    ];


    return (
        <div className="flex gap-4 w-full">
            <CustomSelect
                options={refOption}
                value={reference}
                onChange={setReference}
                placeholder="출처"
            />
            <CustomSelect
                options={mainOptions}
                value={mainCategory}
                onChange={setMainCategory}
                placeholder="대분류"
                disabled={reference === '출처'}
            />
            <CustomSelect
                options={subOptions}
                value={subCategory}
                onChange={setSubCategory}
                placeholder="중분류"
                disabled={mainCategory === '대분류'}
            />
            <CustomSelect
                options={detailOptions}
                value={detailCategory}
                onChange={setDetailCategory}
                placeholder="소분류"
                disabled={subCategory === '중분류'}
            />
        </div>
    );
};

export default CategorySelect;
