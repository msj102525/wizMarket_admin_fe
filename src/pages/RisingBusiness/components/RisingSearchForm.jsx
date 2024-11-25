import React from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CategorySelect from '../../../components/CategorySelect';
import CitySelect from '../../../components/CitySelect';

const RisingSearchForm = ({
    searchCate, setSearchCate,
    reference, references, setReference,
    mainCategory, mainCategories, subCategory, subCategories, detailCategory, detailCategories,
    city, district, subDistrict, cities, districts, subDistricts, setMainCategory, setSubCategory, setDetailCategory,
    setCity, setDistrict, setSubDistrict,
    increaseRateMin, increaseRateMax, rankMin, rankMax,
    setIncreaseRateMin, setIncreaseRateMax, setRankMin, setRankMax,
    handleSearch, handleReset,
    dataDate, setRefDate
}) => {
    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full ">
            <div className="p-4 bg-[#F3F5F7]">
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">뜨는 업종</label>
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder='소분류 검색'
                            value={searchCate || ""}
                            onChange={(e) => setSearchCate(e.target.value)}
                            className="w-full p-2 border border-[#DDDDDD] rounded"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">업종 검색</label>
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

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">지역 검색</label>
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

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">증가율</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={increaseRateMin || ""}
                            onChange={(e) => setIncreaseRateMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            max={9999}
                            min={0}
                        />
                        <p className='content-center'>~</p>
                        <input
                            type="number"
                            value={increaseRateMax || ""}
                            onChange={(e) => setIncreaseRateMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            max={9999}
                            min={0}
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">순위</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={rankMin || ""}
                            onChange={(e) => setRankMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            max={5}
                            min={1}
                        />
                        <p className='content-center'>~</p>
                        <input
                            type="number"
                            value={rankMax || ""}
                            onChange={(e) => setRankMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            max={5}
                            min={1}
                        />

                    </div>
                </div>
                {/* 기준 날짜 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">기준 날짜</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <select
                            className='p-2 border border-[#DDDDDD] rounded w-1/6'
                            onChange={(e) => setRefDate(e.target.value)}
                        >
                            {dataDate && dataDate.length > 0 ? (
                                dataDate.slice().reverse().map((item, index) => (
                                    <option key={index} value={item.y_m}>
                                        {item.y_m}
                                    </option>
                                ))
                            )
                                : (
                                    <option value="-">-</option>
                                )}
                            <option value="">-</option>
                        </select>
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
