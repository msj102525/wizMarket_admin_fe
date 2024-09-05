import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';

const LocInfoListSearchForm = ({ onSearch }) => {  // onSearch를 props로 받음
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [sub_district, setsub_district] = useState('');
    const [move_popMin, setmove_popMin] = useState('');
    const [move_popMax, setmove_popMax] = useState('');
    const [houseMin, sethouseMin] = useState('');
    const [houseMax, sethouseMax] = useState('');

    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(city && { city }),
            ...(district && { district }),
            ...(sub_district && { sub_district }),
            ...(move_popMin && { move_popMin: move_popMin ? Number(move_popMin) : null }),
            ...(move_popMax && { move_popMax: move_popMax ? Number(move_popMax) : null }),
            ...(houseMin && { houseMin: houseMin ? Number(houseMin) : null }),
            ...(houseMax && { houseMax: houseMax ? Number(houseMax) : null }),
        };

        onSearch(filters);  // 부모 컴포넌트에서 전달받은 onSearch 호출
    };

    const handleReset = () => {
        setCity('');
        setDistrict('');
        setsub_district('');
        setmove_popMin('');
        setmove_popMax('');
        sethouseMin('');
        sethouseMax('');
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
                        <option>qwe</option>
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

            {/* 검색 및 초기화 버튼 */}
            <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
        </div>
    );
};

export default LocInfoListSearchForm;
