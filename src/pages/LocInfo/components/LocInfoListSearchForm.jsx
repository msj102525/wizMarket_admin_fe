import React from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CitySelect from '../../../components/CitySelect';
import LocInfoDropDown from './LocInfoDropDown';

const LocInfoListSearchForm = ({
    city, district, subDistrict, cities, districts, subDistricts, setCity, setDistrict, setSubDistrict,
    shopMin, move_popMin, salesMin, work_popMin, incomeMin, spendMin, houseMin, residentMin,
    shopMax, move_popMax, salesMax, work_popMax, incomeMax, spendMax, houseMax, residentMax,
    setshopMin, setmove_popMin, setsalesMin, setwork_popMin, setincomeMin, setspendMin, sethouseMin,
    setresidentMin, setshopMax, setmove_popMax, setsalesMax, setwork_popMax, setincomeMax, setspendMax, sethouseMax, setresidentMax,
    selectedOptions, setSelectedOptions,
    handleSearch, handleReset, isList
}) => {


    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full ">
            <div className="p-4 bg-[#F3F5F7]">
                <div className={`gap-4 ${isList ? 'grid grid-cols-2' : ''}`}>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">지역 검색</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <CitySelect
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
                            <label className="block mb-1 font-extrabold">기준 년월</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <LocInfoDropDown
                                selectedOptions = {selectedOptions}
                                setSelectedOptions = {setSelectedOptions}
                            />
                        </div>
                    </div>
                </div>

                <div className={`gap-4 ${isList ? 'grid grid-cols-2' : ''}`}>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">업소 (개)</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={shopMin || ""}
                                onChange={(e) => setshopMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={shopMax || ""}
                                onChange={(e) => setshopMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">유동인구</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={move_popMin || ""}
                                onChange={(e) => setmove_popMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={move_popMax || ""}
                                onChange={(e) => setmove_popMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">매출</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={salesMin || ""}
                                onChange={(e) => setsalesMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={salesMax || ""}
                                onChange={(e) => setsalesMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">직장인구</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={work_popMin || ""}
                                onChange={(e) => setwork_popMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={work_popMax || ""}
                                onChange={(e) => setwork_popMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">소득</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={incomeMin || ""}
                                onChange={(e) => setincomeMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={incomeMax || ""}
                                onChange={(e) => setincomeMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">소비</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={spendMin || ""}
                                onChange={(e) => setspendMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={spendMax || ""}
                                onChange={(e) => setspendMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">세대수</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={houseMin || ""}
                                onChange={(e) => sethouseMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={houseMax || ""}
                                onChange={(e) => sethouseMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">주거인구</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <input
                                type="number"
                                value={residentMin || ""}
                                onChange={(e) => setresidentMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                            <p className='content-center'>~</p>
                            <input
                                type="number"
                                value={residentMax || ""}
                                onChange={(e) => setresidentMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                                max={9999}
                                min={0}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* 검색 및 초기화 버튼 */}
            <div className="py-2 ">
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        </div>


    );
};



export default LocInfoListSearchForm;
