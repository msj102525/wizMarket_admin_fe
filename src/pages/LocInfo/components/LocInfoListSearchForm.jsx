import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';

const LocInfoListSearchForm = ({ onSearch }) => {  // onSearch를 props로 받음
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [sub_district, setsub_district] = useState('');   

    const [shopMin, setshopMin] = useState('');
    const [move_popMin, setmove_popMin] = useState('');
    const [salesMin, setsalesMin] = useState('');
    const [work_popMin, setwork_popMin] = useState('');
    const [incomeMin, setincomeMin] = useState('');
    const [spendMin, setspendMin] = useState('');
    const [houseMin, sethouseMin] = useState('');
    const [residentMin, setresidentMin] = useState('');
    

    const [shopMax, setshopMax] = useState('');
    const [move_popMax, setmove_popMax] = useState('');
    const [salesMax, setsalesMax] = useState('');
    const [work_popMax, setwork_popMax] = useState('');
    const [incomeMax, setincomeMax] = useState('');
    const [spendMax, setspendMax] = useState('');
    const [houseMax, sethouseMax] = useState('');
    const [residentMax, setresidentMax] = useState('');


    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(city && { city }),
            ...(district && { district }),
            ...(sub_district && { sub_district }),

            ...(shopMin && { shopMin: shopMin ? Number(shopMin) : null }),
            ...(move_popMin && { move_popMin: move_popMin ? Number(move_popMin) : null }),
            ...(salesMin && { salesMin: salesMin ? Number(salesMin) : null }),
            ...(work_popMin && { work_popMin: work_popMin ? Number(work_popMin) : null }),
            ...(incomeMin && { incomeMin: incomeMin ? Number(incomeMin) : null }),
            ...(spendMin && { spendMin: spendMin ? Number(spendMin) : null }),
            ...(houseMin && { houseMin: houseMin ? Number(houseMin) : null }),
            ...(residentMin && { residentMin: residentMin ? Number(residentMin) : null }),

            ...(shopMax && { shopMax: shopMax ? Number(shopMax) : null }),
            ...(move_popMax && { move_popMax: move_popMax ? Number(move_popMax) : null }),
            ...(salesMax && { salesMax: salesMax ? Number(salesMax) : null }),
            ...(work_popMax && { work_popMax: work_popMax ? Number(work_popMax) : null }),
            ...(incomeMax && { incomeMax: incomeMax ? Number(incomeMax) : null }),
            ...(spendMax && { spendMax: spendMax ? Number(spendMax) : null }),
            ...(houseMax && { houseMax: houseMax ? Number(houseMax) : null }),
            ...(residentMax && { residentMax: residentMax ? Number(residentMax) : null }),
            
        };

        onSearch(filters);  // 부모 컴포넌트에서 전달받은 onSearch 호출
    };

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setCity('');
        setDistrict('');
        setsub_district('');
    
        setshopMin('');
        setmove_popMin('');
        setsalesMin('');
        setwork_popMin('');
        setincomeMin('');
        setspendMin('');
        sethouseMin('');
        setresidentMin('');
    
        setshopMax('');
        setmove_popMax('');
        setsalesMax('');
        setwork_popMax('');
        setincomeMax('');
        setspendMax('');
        sethouseMax('');
        setresidentMax('');
    };

    return (
        <div className="p-4 border border-[#DDDDDD] rounded-lg shadow-md w-full bg-[#EDEDED]">
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
                        value={sub_district}
                        onChange={(e) => setsub_district(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>읍/면/동</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">업소(개)</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={shopMin}
                            onChange={(e) => setshopMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={shopMax}
                            onChange={(e) => setshopMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">유동인구</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={move_popMin}
                            onChange={(e) => setmove_popMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={move_popMax}
                            onChange={(e) => setmove_popMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">매출</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={salesMin}
                            onChange={(e) => setsalesMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={salesMax}
                            onChange={(e) => setsalesMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">직장인구</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={work_popMin}
                            onChange={(e) => setwork_popMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={work_popMax}
                            onChange={(e) => setwork_popMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">소득</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={incomeMin}
                            onChange={(e) => setincomeMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={incomeMax}
                            onChange={(e) => setincomeMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">소비</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={spendMin}
                            onChange={(e) => setspendMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                        <input
                            type="number"
                            value={spendMax}
                            onChange={(e) => setspendMax(e.target.value)}
                            placeholder="이하"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">세대수</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={houseMin}
                            onChange={(e) => sethouseMin(e.target.value)}
                            placeholder="이상"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                            <input
                                type="number"
                                value={houseMax}
                                onChange={(e) => sethouseMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                        </div>
                    </div>
    
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">주거인구</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                value={residentMin}
                                onChange={(e) => setresidentMin(e.target.value)}
                                placeholder="이상"
                                className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                            <input
                                type="number"
                                value={residentMax}
                                onChange={(e) => setresidentMax(e.target.value)}
                                placeholder="이하"
                                className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                        </div>
                    </div>
                </div>
    
                {/* 검색 및 초기화 버튼 */}
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        );
    };
    


export default LocInfoListSearchForm;
