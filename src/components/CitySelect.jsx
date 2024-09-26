import React from 'react';
import { useDispatch } from 'react-redux';
import { setCitySel, setDistrictSel, setSubDistrictSel } from '../stores/addressSlice';

const CitySelect = ({
    reference,
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

    const dispatch = useDispatch();


    const handleCityChange = (e) => {
        const cityCode = e.target.value;
        const selectedCity = cities.find(c => c[0].toString() === cityCode.toString());
        const cityName = selectedCity ? selectedCity[1] : '';
        setCity(cityCode);
        setDistrict('');
        setSubDistrict('');
        dispatch(setCitySel(cityName));
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        const selectedDistrict = districts.find(d => d[0].toString() === districtCode.toString());
        const districtName = selectedDistrict ? selectedDistrict[2] : '';
        setDistrict(districtCode);
        setSubDistrict('');
        dispatch(setDistrictSel(districtName));
    };

    const handleSubDistrictChange = (e) => {
        const subDistrictCode = e.target.value;
        const selectedSubDistrict = subDistricts.find(sd => sd[0].toString() === subDistrictCode.toString());
        const subDistrictName = selectedSubDistrict ? selectedSubDistrict[3] : '';
        setSubDistrict(subDistrictCode);
        dispatch(setSubDistrictSel(subDistrictName));
    };

    return (
        <div className="flex gap-4 w-full rounded-lg">
            <select
                value={city || ""}
                onChange={handleCityChange}
                disabled={reference === '출처'}
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
                onChange={handleSubDistrictChange}
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
