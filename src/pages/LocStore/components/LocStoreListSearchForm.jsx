import React from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CitySelect from '../../../components/CitySelect';
import CategorySelect from '../../../components/CategorySelect';

const LocStoreListSearchForm = ({
    city, district, subDistrict, cities, districts, subDistricts, setCity, setDistrict, setSubDistrict,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories,
    reference, references, setReference,
    storeName, setStoreName,
    isLikeSearch, setIsLikeSearch,
    handleSearch, handleReset
}) => {
    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full">
            <div className="p-4 bg-[#F3F5F7]">
                {/* 상호 검색 */}
                <div className="mb-4 flex flex-col mb:flex-row gap-4 items-center">
                    <div className="w-full mb:w-1/6 text-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-3xl">상호 검색</label>
                    </div>
                    <div className="w-full flex flex-col mb:flex-row gap-4 items-center">
                        <input
                            type="text"
                            value={storeName || ""}
                            onChange={(e) => setStoreName(e.target.value)}
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
                            <label htmlFor="includeSearch" className="text-sm mb:text-base">포함 검색</label>
                        </div>
                    </div>
                </div>

                {/* 카테고리 검색 */}
                <div className="mb-4 flex flex-col mb:flex-row gap-4">
                    <div className="w-full mb:w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-3xl">카테고리 검색</label>
                    </div>
                    <div className="w-full">
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
                            detailCategories={detailCategories} />
                    </div>
                </div>

                {/* 지역 검색 */}
                <div className="mb-4 flex flex-col mb:flex-row gap-4">
                    <div className="w-full mb:w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-3xl">지역 검색</label>
                    </div>
                    <div className="w-full">
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

                <p className="text-xs mb:text-sm text-gray-500">
                    * 데이터 양이 많아 원활한 검색을 위해 가능한 많은 조건, 좁은 조건을 추가해주세요.
                </p>
            </div>

            {/* 검색 및 초기화 버튼 */}
            <div className="py-2">
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        </div>
    );
};

export default LocStoreListSearchForm;