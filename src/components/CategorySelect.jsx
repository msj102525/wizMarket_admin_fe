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
    // 출처 선택 시 하위 카테고리 모두 초기화
    const handleReferenceChange = (newReference) => {
        setReference(newReference);
        // 출처 선택 시 대분류, 중분류, 소분류 모두 초기화
        setMainCategory('0');  // '대분류'로 초기화
        setSubCategory('0');   // '중분류'로 초기화
        setDetailCategory('0'); // '소분류'로 초기화
    };

    // 대분류 선택 시 중분류와 소분류 초기화
    const handleMainCategoryChange = (newMainCategory) => {
        setMainCategory(newMainCategory);
        setSubCategory('0');   // '중분류'로 초기화
        setDetailCategory('0'); // '소분류'로 초기화
    };

    // 중분류 선택 시 소분류 초기화
    const handleSubCategoryChange = (newSubCategory) => {
        setSubCategory(newSubCategory);
        setDetailCategory('0'); // '소분류'로 초기화
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
        <div className="flex gap-4 w-full">
            <CustomSelect
                options={refOption}
                value={reference}
                onChange={handleReferenceChange}  // 출처 변경 시 모든 카테고리 초기화
                placeholder="출처"
            />
            <CustomSelect
                options={mainOptions}
                value={mainCategory}
                onChange={handleMainCategoryChange}  // 대분류 변경 시 중분류와 소분류 초기화
                placeholder="대분류"
                disabled={reference === '0'}  // '출처'가 선택되지 않았을 때 비활성화
            />
            <CustomSelect
                options={subOptions}
                value={subCategory}
                onChange={handleSubCategoryChange}  // 중분류 변경 시 소분류 초기화
                placeholder="중분류"
                disabled={mainCategory === '0'}  // '대분류'가 선택되지 않았을 때 비활성화
            />
            <CustomSelect
                options={detailOptions}
                value={detailCategory}
                onChange={setDetailCategory}  // 소분류는 초기화만 적용
                placeholder="소분류"
                disabled={subCategory === '0'}  // '중분류'가 선택되지 않았을 때 비활성화
            />
        </div>
    );
};

export default CategorySelect;