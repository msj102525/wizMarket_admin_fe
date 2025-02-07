import React, { useState, useEffect } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import { useCities } from '../../../hooks/useCities';
import CitySelect from '../../../components/CitySelect';

const PopulationSearchForm = ({ onSearch, isList, dataDate }) => {
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
    } = useCities();

    const [gender, setGender] = useState('');
    const [ageGroupMin, setAgeGroupMin] = useState('');
    const [ageGroupMax, setAgeGroupMax] = useState('');

    // 기준 년월 초기값 설정
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // dataDate가 로드되면 startDate와 endDate를 마지막 날짜로 설정
        if (dataDate?.length > 0) {
            const lastDate = dataDate[dataDate.length - 1].ref_date;
            setStartDate(lastDate);
            setEndDate(lastDate);
        }
    }, [dataDate]);


    const handleSearch = () => {
        const filters = {
            ...(city && city !== 0 && { city }),
            ...(district && district !== 0 && { district }),
            ...(subDistrict && subDistrict !== 0 && { subDistrict }),
            ...(gender && gender !== 0 && { gender }),
            ...(ageGroupMin && { ageGroupMin }),
            ...(ageGroupMax && { ageGroupMax }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        };
        onSearch(filters);
    };

    const handleReset = () => {
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setGender('');
        setAgeGroupMin('');
        setAgeGroupMax('');
        setStartDate(dataDate?.[dataDate.length - 1]?.ref_date || '');
        setEndDate(dataDate?.[dataDate.length - 1]?.ref_date || '');
    };

    const ageGroups = [
        { value: "age_under_10s", label: "10대 미만" },
        { value: "age_10s", label: "10대" },
        { value: "age_20s", label: "20대" },
        { value: "age_30s", label: "30대" },
        { value: "age_40s", label: "40대" },
        { value: "age_50s", label: "50대" },
        { value: "age_plus_60s", label: "60대 이상" },
    ];

    // 연령대 인덱스 찾기 함수
    const getAgeIndex = (value) => ageGroups.findIndex((age) => age.value === value);

    const handleMinChange = (e) => {
        const newMin = e.target.value;
        setAgeGroupMin(newMin);

        // 현재 선택된 최대값이 최소값보다 작다면 자동으로 최소값과 동일하게 설정
        if (ageGroupMax && getAgeIndex(ageGroupMax) < getAgeIndex(newMin)) {
            setAgeGroupMax(newMin);
        }
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
                </div>

                <div className={`gap-4 ${isList ? 'grid grid-cols-2' : ''}`}>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">연령대</label>
                        </div>
                        <div className="w-full flex gap-4">
                            {/* 최소 연령 선택 */}
                            <select
                                value={ageGroupMin}
                                onChange={handleMinChange}
                                className="p-2 border border-[#DDDDDD] rounded w-1/5"
                            >
                                <option value="">이상</option>
                                {ageGroups.map((age) => (
                                    <option key={age.value} value={age.value}>
                                        {age.label}
                                    </option>
                                ))}
                            </select>
                            ~
                            {/* 최대 연령 선택 */}
                            <select
                                value={ageGroupMax}
                                onChange={(e) => setAgeGroupMax(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/5"

                            >
                                <option value="">이하</option>
                                {ageGroups
                                    .filter((age) => !ageGroupMin || getAgeIndex(age.value) >= getAgeIndex(ageGroupMin))
                                    .map((age) => (
                                        <option key={age.value} value={age.value}>
                                            {age.label}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold">기준 년월</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <select
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/5"
                            >
                                <option value="">이상</option>
                                {dataDate?.map((date) => (
                                    <option key={date.ref_date} value={date.ref_date}>
                                        {date.ref_date.substring(0, 7)}
                                    </option>
                                ))}
                            </select>~
                            <select
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/5"
                            >
                                <option value="">이하</option>
                                {dataDate?.map((date) => (
                                    <option key={date.ref_date} value={date.ref_date}>
                                        {date.ref_date.substring(0, 7)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2 ">
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        </div>
    );
};

export default PopulationSearchForm;
