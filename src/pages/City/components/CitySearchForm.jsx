import React from 'react';

const CitySearchForm = ({ cities, districts, subDistricts, city, district, subDistrict, setCity, setDistrict, setSubDistrict, onSearch  }) => {
    
    const handleCityChange = (e) => {
        setCity(e.target.value);
        setDistrict(''); // 시/군/구 초기화
        setSubDistrict(''); // 읍/면/동 초기화
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
        setSubDistrict(''); // 읍/면/동 초기화
    };

    const handleSubDistrictChange = (e) => {
        setSubDistrict(e.target.value);
    };

    const handleSearch = () => {
        onSearch(city, district, subDistrict);  // 부모 컴포넌트로 선택한 값들을 전달
    };

    return (
        <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-md">
            <label className="text-m text-bold font-bold mr-8">검색</label>
            <select className="border px-4 py-2" value={city} onChange={handleCityChange}>
                <option value="">시/도</option>
                {cities.map((c) => <option key={c[0]} value={c[0]}>{c[1]}</option>)}
            </select>

            <select className="border px-4 py-2" value={district} onChange={handleDistrictChange} disabled={!city}>
                <option value="">군/구</option>
                {districts.map((d) => <option key={d[0]} value={d[0]}>{d[2]}</option>)}
            </select>

            <select className="border px-4 py-2" value={subDistrict} onChange={handleSubDistrictChange} disabled={!district}>
                <option value="">읍/면/동</option>
                {subDistricts.map((sd) => <option key={sd[0]} value={sd[0]}>{sd[3]}</option>)}
            </select>

            <button className="bg-black text-white px-4 py-2" onClick={handleSearch}>
                검색
            </button>
        </div>
    );
};

export default CitySearchForm;
