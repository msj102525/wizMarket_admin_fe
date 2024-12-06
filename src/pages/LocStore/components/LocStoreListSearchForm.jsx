import React, { useState, useEffect } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CitySelect from '../../../components/CitySelect';
import CategorySelect from '../../../components/CategorySelect';
import LocStoreDropDown from './LocStoreDropDown'

const LocStoreListSearchForm = ({
    city, district, subDistrict, cities, districts, subDistricts, setCity, setDistrict, setSubDistrict,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories,
    reference, references, setReference,
    storeName, setStoreName,
    isLikeSearch, setIsLikeSearch,
    handleSearch, handleReset,
    selectedOptions, setSelectedOptions,
}) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecent, setShowRecent] = useState(false); // 최근 검색어 표시 상태

    const options = ["JSAM", "KT_MYSHOP", "OTHER_OPTION"];

    // Load recent searches from localStorage
    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(savedSearches);
    }, []);

    // Update recent searches in localStorage
    const saveSearchTerm = (term) => {
        const updatedSearches = [term, ...recentSearches.filter((item) => item !== term)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleSearchClick = () => {
        if (storeName && storeName.trim() !== "") {
            saveSearchTerm(storeName); // 검색어가 비어있지 않을 때만 저장
        }
        handleSearch(); // 검색 실행
    };
    

    const handleDeleteSearchTerm = (term) => {
        const updatedSearches = recentSearches.filter((item) => item !== term);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleDeleteAll = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <div className="relative border border-[#DDDDDD] rounded-lg shadow-md w-full">
            <div className="p-4 bg-[#F3F5F7]">
                {/* 상호 검색 */}
                <div className="mb-4 flex gap-4 mb:flex-row">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-4xl">상호 검색</label>
                    </div>
                    <div className="relative w-full">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={storeName || ""}
                                onChange={(e) => setStoreName(e.target.value)}
                                onFocus={() => setShowRecent(true)} // 포커스 시 최근 검색어 표시
                                onBlur={() => setTimeout(() => setShowRecent(false), 200)} // 포커스 해제 시 숨기기
                                placeholder="상호명을 입력하세요"
                                className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                            <div className="flex items-center gap-2 w-full mb:w-1/6">
                                <input
                                    type="checkbox"
                                    id="includeSearch"
                                    checked={isLikeSearch}
                                    onChange={(e) => setIsLikeSearch(e.target.checked)}
                                />
                                <label htmlFor="includeSearch" className="text-sm mb:text-4xl">직접 검색</label>
                            </div>
                        </div>
                        {/* 최근 검색어 */}
                        {showRecent && (
                            <div className="absolute top-full left-0 w-1/2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <div className="flex justify-between p-2">
                                    <span className="font-bold text-gray-700">최근 검색어</span>
                                    <button
                                        className="text-sm text-red-500"
                                        onClick={handleDeleteAll}
                                    >
                                        전체 삭제
                                    </button>
                                </div>
                                <ul>
                                    {recentSearches.map((term, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setStoreName(term); // 검색어 입력란에 설정
                                            }}
                                        >
                                            <span>{term}</span>
                                            <button
                                                className="text-sm text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 부모 클릭 이벤트 차단
                                                    handleDeleteSearchTerm(term);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* 카테고리 검색 */}
                <div className="mb-4 flex gap-4 mb:flex-row">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-4xl">카테고리 검색</label>
                    </div>
                    <div className="w-full flex gap-4">
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
                </div>

                {/* 지역 검색 */}
                <div className="mb-4 flex gap-4 mb:flex-row">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-4xl">지역 검색</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <CitySelect
                            reference={reference}
                            city={city}
                            district={district}
                            subDistrict={subDistrict}
                            cities={cities}
                            districts={districts}
                            subDistricts={subDistricts}
                            setCity={setCity}
                            setDistrict={setDistrict}
                            setSubDistrict={setSubDistrict}
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4 mb:flex-row">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-4xl">제휴사 검색</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <LocStoreDropDown
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            options={options}
                        />
                    </div>
                </div>

                <p className="text-s mb:text-sm text-gray-500">
                    * 나이스 비즈맵의 경우 시간 소요가 더 오래 걸립니다.
                </p>
                <p className="text-s mb:text-sm text-gray-500">
                    * 데이터 양이 많아 원활한 검색을 위해 가능한 많은 조건, 좁은 조건을 추가해주세요.
                </p>
            </div>

            {/* 검색 및 초기화 버튼 */}
            <div className="py-2">
                <SearchResetButtons onSearch={handleSearchClick} onReset={handleReset} />
            </div>
        </div>
    );
};

export default LocStoreListSearchForm;
