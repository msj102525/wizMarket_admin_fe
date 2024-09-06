import React from 'react';

const CitySelect = ({
    cities,
    districts,
    subDistricts,
    city,
    district,
    subDistrict,
    setCity,
    setDistrict,
    setSubDistrict
}) => {

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setDistrict(''); // 도시 변경 시 구역 초기화
        setSubDistrict(''); // 도시 변경 시 동 초기화
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
        setSubDistrict(''); // 구역 변경 시 동 초기화
    };

    return (
        <div className="flex gap-4 w-full rounded-lg">
            <select
                value={city || ""}
                onChange={handleCityChange}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block bg-white"
            >
                <option value="">시/도</option>
                {cities.map((c) => (
                    <option key={c[0]} value={c[0]}>
                        {c[1]}
                    </option>
                ))}
            </select>

            <select
                value={district || ""}
                onChange={handleDistrictChange}
                disabled={!city}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block bg-white"
            >
                <option value="">군/구</option>
                {districts.map((d) => (
                    <option key={d[0]} value={d[0]}>
                        {d[2]}
                    </option>
                ))}
            </select>

            <select
                value={subDistrict || ""}
                onChange={(e) => setSubDistrict(e.target.value)}
                disabled={!district}
                className="p-2 border border-[#DDDDDD] rounded flex-1 block bg-white"
            >
                <option value="">읍/면/동</option>
                {subDistricts.map((sd) => (
                    <option key={sd[0]} value={sd[0]}>
                        {sd[3]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CitySelect;
