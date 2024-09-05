import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitySearchForm = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');

    // 데이터 로드
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/city/locations`);
            setCities(response.data.cities);
            setDistricts(response.data.districts);
            setSubDistricts(response.data.sub_districts);
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    // 선택된 시/도를 기반으로 하위 시/군/구 필터링
    const filteredDistricts = districts.filter(district => district[1] === Number(selectedCity));
    const filteredSubDistricts = subDistricts.filter(subDistrict => subDistrict[1] === Number(selectedDistrict));

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedDistrict('');  // 시/군/구 초기화
        setSelectedSubDistrict('');  // 읍/면/동 초기화
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedSubDistrict('');  // 읍/면/동 초기화
    };

    const handleSearch = () => {
        // 검색 로직 추가 가능
        console.log('Selected City:', selectedCity);
        console.log('Selected District:', selectedDistrict);
        console.log('Selected SubDistrict:', selectedSubDistrict);
    };

    return (
        <div className="flex items-center p-4 bg-gray-100 rounded-lg space-x-2">
            <label className="text-lg font-semibold mr-4">검색</label>

            <select
                value={selectedCity}
                onChange={handleCityChange}
                className="p-2 border rounded w-32 bg-white"
            >
                <option value="">시/도</option>
                {cities.map((city) => (
                    <option key={city[0]} value={city[0]}>
                        {city[1]}
                    </option>
                ))}
            </select>

            <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedCity}
                className="p-2 border rounded w-32 bg-white"
            >
                <option value="">군/구</option>
                {filteredDistricts.map((district) => (
                    <option key={district[0]} value={district[0]}>
                        {district[2]}
                    </option>
                ))}
            </select>

            <select
                value={selectedSubDistrict}
                onChange={(e) => setSelectedSubDistrict(e.target.value)}
                disabled={!selectedDistrict}
                className="p-2 border rounded w-32 bg-white"
            >
                <option value="">읍/면/동</option>
                    {filteredSubDistricts.map((subDistrict) => (
                        <option key={subDistrict[0]} value={subDistrict[0]}>
                            {subDistrict[3]} {/* SUB_DISTRICT_NAME */}
                        </option>
                    ))}
            </select>

            <button
                onClick={handleSearch}
                className="p-2 bg-black text-white rounded-lg px-4"
            >
                검색
            </button>
        </div>
    );
};

export default CitySearchForm;
