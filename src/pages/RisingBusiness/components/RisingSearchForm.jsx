import React, { useEffect } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CategorySelect from '../../../components/CategorySelect';

const RisingSearchForm = ({
    searchCate,
    mainCategory, mainCategories, subCategory, subCategories, detailCategory, detailCategories,
    city, district, subDistrict,
    increaseRateMin, increaseRateMax, rankMin, rankMax,
    setSearchCate, setMainCategory, setSubCategory, setDetailCategory, setCity,
    setDistrict, setSubDistrict, setIncreaseRateMin, setIncreaseRateMax, setRankMin, setRankMax,
    handleSearch, handleReset
}) => {

    useEffect(() => {
        console.log(`data: ${mainCategories}`);
    }, [mainCategories]);

    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full ">
            <div className="p-4 bg-[#EDEDED]">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">업종명을 입력해주세요.</label>
                    <input
                        type="text"
                        value={searchCate}
                        onChange={(e) => setSearchCate(e.target.value)}
                        className="w-full p-2 border border-[#DDDDDD] rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">업종 검색</label>
                    <CategorySelect
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

                <div className="mb-4">
                    <label className="block mb-1 font-medium">지역 검색</label>
                    <div className="flex gap-4">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        >
                            <option>시/도</option>
                        </select>
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        >
                            <option>군/구</option>
                        </select>
                        <select
                            value={subDistrict}
                            onChange={(e) => setSubDistrict(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        >
                            <option>읍/면/동</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">증가율</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={increaseRateMin}
                            onChange={(e) => setIncreaseRateMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={increaseRateMax}
                            onChange={(e) => setIncreaseRateMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">순위</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={rankMin}
                            onChange={(e) => setRankMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={rankMax}
                            onChange={(e) => setRankMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="py-2">
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        </div>
    );
};

export default RisingSearchForm;
