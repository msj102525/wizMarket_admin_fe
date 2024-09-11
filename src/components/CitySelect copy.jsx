import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setDistrict, setSubDistrict } from '../stores/addressSlice';
const CitySelect = ({
    cities,
    districts,
    subDistricts
}) => {
    const dispatch = useDispatch();
    const { city, district, subDistrict } = useSelector(state => state.address);

    const handleCityChange = (e) => {
        dispatch(setCity(e.target.value));
    };

    const handleDistrictChange = (e) => {
        dispatch(setDistrict(e.target.value));
    };

    const handleSubDistrictChange = (e) => {
        dispatch(setSubDistrict(e.target.value));
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