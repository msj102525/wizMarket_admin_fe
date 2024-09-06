import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import { useCities } from '../../../hooks/useCities';

const LocStoreListSearchForm = ({ onSearch, isList }) => {
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

    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(city && city !== 0 && { city }),              // city가 0이 아니면 추가
            ...(district && district !== 0 && { district }),  // district가 0이 아니면 추가
            ...(subDistrict && subDistrict !== 0 && { subDistrict }),  // subDistrict가 0이 아니면 추가
            ...(gender && gender !== 0 && { gender }),  // gender가 0이 아니면 추가
            ...(ageGroupMin && { ageGroupMin }),              // ageGroup은 문자열이므로 빈 값만 체크
            ...(ageGroupMax && { ageGroupMax }),              // ageGroup은 문자열이므로 빈 값만 체크
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
    };

    return (
        <div className="p-4 border border-[#DDDDDD] rounded-lg shadow-md w-full bg-[#EDEDED]">
            <div className="mb-4">
                {/* 지역 선택 */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <label className="font-medium w-1/2">지역 선택</label>
                    {/* 시/도 선택 */}
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">시/도 선택</option>
                        {cities.map((c) => (
                            <option key={c[0]} value={c[0]}>
                                {c[1]}
                            </option>
                        ))}
                    </select>

                    {/* 군/구 선택 */}
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!city}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">군/구 선택</option>
                        {districts.map((d) => (
                            <option key={d[0]} value={d[0]}>
                                {d[2]}
                            </option>
                        ))}
                    </select>

                    {/* 읍/면/동 선택 */}
                    <select
                        value={subDistrict}
                        onChange={(e) => setSubDistrict(e.target.value)}
                        disabled={!district}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">읍/면/동 선택</option>
                        {subDistricts.map((sd) => (
                            <option key={sd[0]} value={sd[0]}>
                                {sd[3]}
                            </option>
                        ))}
                    </select>
                </div>
                {/* 성별 선택 */}
                <div className={`grid ${isList ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-4`}>
                    <div className="flex items-center">
                        <label className="font-medium mr-4 w-1/4">성별 선택</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-3/4"
                        >
                            <option value="">성별 선택</option>
                            <option value="1">남성</option>
                            <option value="2">여성</option>
                        </select>
                    </div>

                    {/* 연령대 선택 */}
                    <div className="flex items-center">
                        <label className="font-medium mr-4 w-1/4">연령대 선택</label>
                        <div className="flex w-3/4 gap-2">
                            {/* 최소 연령대 선택 (이상) */}
                            <select
                                value={ageGroupMin}
                                onChange={(e) => setAgeGroupMin(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/2"
                            >
                                <option value="">이상</option>
                                <option value="under_10">10대 미만</option>
                                <option value="10s">10대</option>
                                <option value="20s">20대</option>
                                <option value="30s">30대</option>
                                <option value="40s">40대</option>
                                <option value="50s">50대</option>
                                <option value="60_plus">60대 이상</option>
                            </select>~

                            {/* 최대 연령대 선택 (이하) */}
                            <select
                                value={ageGroupMax}
                                onChange={(e) => setAgeGroupMax(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/2"
                            >
                                <option value="">이하</option>
                                <option value="under_10">10대 미만</option>
                                <option value="10s">10대</option>
                                <option value="20s">20대</option>
                                <option value="30s">30대</option>
                                <option value="40s">40대</option>
                                <option value="50s">50대</option>
                                <option value="60_plus">60대 이상</option>
                            </select>
                        </div>
                    </div>
                </div>


            </div>

            {/* 검색 및 초기화 버튼 */}
            <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
        </div>
    );
};

export default LocStoreListSearchForm;
