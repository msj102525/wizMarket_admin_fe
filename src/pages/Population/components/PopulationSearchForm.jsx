import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import { useCities } from '../../../hooks/useCities';
import CitySelect from '../../../components/CitySelect';

const PopulationSearchForm = ({ onSearch, isList }) => {
    const {
        cities,
        districts,
        subDistricts,
        city,
        district,
        subDistrict,
        setCity,
        setDistrict,
        setSubDistrict,
    } = useCities(); // useCities 훅 사용

    // 성별 및 연령대 상태 추가
    const [gender, setGender] = useState('');
    const [ageGroupMin, setAgeGroupMin] = useState('');
    const [ageGroupMax, setAgeGroupMax] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(city && city !== 0 && { city }),              // city가 0이 아니면 추가
            ...(district && district !== 0 && { district }),  // district가 0이 아니면 추가
            ...(subDistrict && subDistrict !== 0 && { subDistrict }),  // subDistrict가 0이 아니면 추가
            ...(gender && gender !== 0 && { gender }),  // gender가 0이 아니면 추가
            ...(ageGroupMin && { ageGroupMin }),              // ageGroup은 문자열이므로 빈 값만 체크
            ...(ageGroupMax && { ageGroupMax }),              // ageGroup은 문자열이므로 빈 값만 체크
            ...(startDate && { startDate }),              // ageGroup은 문자열이므로 빈 값만 체크
            ...(endDate && { endDate }),              // ageGroup은 문자열이므로 빈 값만 체크
        };

        onSearch(filters);  // 부모 컴포넌트에서 전달받은 onSearch 호출
    };

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setGender('');
        setAgeGroupMin('');
        setAgeGroupMax('');
        setStartDate('');
        setEndDate('');
    };

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
                            <label className="block mb-1 font-extrabold">성별</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            >
                                <option value="">전체</option>
                                <option value="1">남성</option>
                                <option value="2">여성</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                    {/* 연령대 선택 */}
                <div className={`gap-4 ${isList ? 'grid grid-cols-2' : ''}`}>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">연령대</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <select
                                value={ageGroupMin}
                                onChange={(e) => setAgeGroupMin(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            >
                                <option value="">이상</option>
                                <option value="age_under_10s">10대 미만</option>
                                <option value="age_10s">10대</option>
                                <option value="age_20s">20대</option>
                                <option value="age_30s">30대</option>
                                <option value="age_40s">40대</option>
                                <option value="age_50s">50대</option>
                                <option value="age_plus_60s">60대 이상</option>
                            </select>~
                            {/* 최대 연령대 선택 (이하) */}
                            <select
                                value={ageGroupMax}
                                onChange={(e) => setAgeGroupMax(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            >
                                <option value="">이하</option>
                                <option value="age_under_10s">10대 미만</option>
                                <option value="age_10s">10대</option>
                                <option value="age_20s">20대</option>
                                <option value="age_30s">30대</option>
                                <option value="age_40s">40대</option>
                                <option value="age_50s">50대</option>
                                <option value="age_plus_60s">60대 이상</option>
                            </select>
                        </div>
                    </div>
                    {/* 기간 조회 */}
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">기준 년월</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <select
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            >
                                <option value="">이상</option>
                                <option value="2024-01-31">24년 1월</option>
                                <option value="2024-02-29">24년 2월</option>
                                <option value="2024-03-31">24년 3월</option>
                                <option value="2024-04-30">24년 4월</option>
                                <option value="2024-05-31">24년 5월</option>
                                <option value="2024-06-30">24년 6월</option>
                                <option value="2024-07-31">24년 7월</option>
                                <option value="2024-08-31">24년 8월</option>
                                <option value="2024-09-30">24년 9월</option>
                            </select>~

                            <select
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
                            >
                                <option value="">이하</option>
                                <option value="2024-01-31">24년 1월</option>
                                <option value="2024-02-29">24년 2월</option>
                                <option value="2024-03-31">24년 3월</option>
                                <option value="2024-04-30">24년 4월</option>
                                <option value="2024-05-31">24년 5월</option>
                                <option value="2024-06-30">24년 6월</option>
                                <option value="2024-07-31">24년 7월</option>
                                <option value="2024-08-31">24년 8월</option>
                                <option value="2024-09-30">24년 9월</option>
                            </select>
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

export default PopulationSearchForm;
