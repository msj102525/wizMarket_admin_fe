import React from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CategorySelect from '../../../components/CategorySelect';
import CitySelect from '../../../components/CitySelect';

const CommercialDistrict2SearchForm = ({
    reference, references, setReference,
    mainCategory, mainCategories, subCategory, subCategories, detailCategory, detailCategories,
    city, district, subDistrict, cities, districts, subDistricts, setMainCategory, setSubCategory, setDetailCategory,
    setCity, setDistrict, setSubDistrict,
    marketSizeMax, marketSizeMin, setMarketSizeMax, setMarketSizeMin,
    avgSalseMax, avgSalseMin, setAvgSalseMax, setAvgSalseMin,
    foodCostMax, foodCostMin, setFoodCostMax, setFoodCostMin,
    empCostMax, empCostMin, setEmpCostMax, setEmpCostMin,
    rentalCostMax, rentalCostMin, setRentalCostMax, setRentalCostMin,
    avgProfitMax, avgProfitMin, setAvgProfitMax, setAvgProfitMin,
    handleSearch, handleReset,
    dataDate, setRefDate
}) => {
    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full">
            <div className="p-4 bg-[#EDEDED]">
                {/* 업종 검색 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
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
                            detailCategories={detailCategories}
                        />
                    </div>
                </div>

                {/* 지역 검색 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">지역 검색</label>
                    </div>
                    <div className="w-full">
                        <CitySelect
                            reference={reference}
                            city={city}
                            setCity={setCity}
                            district={district}
                            setDistrict={setDistrict}
                            subDistrict={subDistrict}
                            setSubDistrict={setSubDistrict}
                            cities={cities}
                            districts={districts}
                            subDistricts={subDistricts}
                        />
                    </div>
                </div>

                {/* 시장 규모 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">시장 규모</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={marketSizeMin || ""}
                            onChange={(e) => setMarketSizeMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={marketSizeMax || ""}
                            onChange={(e) => setMarketSizeMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                    </div>
                </div>

                {/* 평균 매출 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">평균 매출</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={avgSalseMin || ""}
                            onChange={(e) => setAvgSalseMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={avgSalseMax || ""}
                            onChange={(e) => setAvgSalseMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                    </div>
                </div>

                {/* 식재료비 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">식재료비</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={foodCostMin || ""}
                            onChange={(e) => setFoodCostMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={foodCostMax || ""}
                            onChange={(e) => setFoodCostMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                    </div>
                </div>

                {/* 인건비 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">평균 결제</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={empCostMin || ""}
                            onChange={(e) => setEmpCostMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={empCostMax || ""}
                            onChange={(e) => setEmpCostMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                    </div>
                </div>

                {/* 임차료 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">임차료</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={rentalCostMin || ""}
                            onChange={(e) => setRentalCostMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={rentalCostMax || ""}
                            onChange={(e) => setRentalCostMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                    </div>
                </div>

                {/* 영업 이익 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">영업 이익</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="number"
                            value={avgProfitMin || ""}
                            onChange={(e) => setAvgProfitMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
                        />
                        <p className="content-center">~</p>
                        <input
                            type="number"
                            value={avgProfitMax || ""}
                            onChange={(e) => setAvgProfitMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-1/6"
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

export default CommercialDistrict2SearchForm;
