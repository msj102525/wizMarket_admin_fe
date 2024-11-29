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
                                {dataDate?.map((date) => (
                                    <option key={date.ref_date} value={date.ref_date}>
                                        {date.ref_date.substring(0, 7)}
                                    </option>
                                ))}
                            </select>~
                            <select
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 border border-[#DDDDDD] rounded w-1/6"
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
