import { useEffect, useRef } from 'react';

export const useKakaoAddressUpdate = ({
    kakaoAddressResult,
    cities,
    districts,
    subDistricts,
    setCity,
    setDistrict,
    setSubDistrict,
}) => {
    const prevKakaoAddressResult = useRef(null);

    useEffect(() => {
        const updateCity = async () => {
            if (!kakaoAddressResult) return;

            const { region_1depth_name: newCity, region_2depth_name: fullDistrict, region_3depth_name: newSubDistrict } = kakaoAddressResult;
            const newDistrict = fullDistrict.split(' ')[0];

            const cityId = cities.find(c => c[1] === newCity)?.[0];
            const districtId = districts.find(d => d[2] === newDistrict && d[1] === Number(cityId))?.[0];
            const subDistrictId = subDistricts.find(sd => sd[3] === newSubDistrict && sd[1] === Number(districtId))?.[0];

            setCity(cityId);
            setDistrict(districtId);
            setSubDistrict(subDistrictId);
        };

        if (
            !prevKakaoAddressResult.current ||
            prevKakaoAddressResult.current.region_3depth_name !== kakaoAddressResult.region_3depth_name ||
            prevKakaoAddressResult.current.x !== kakaoAddressResult.x ||
            prevKakaoAddressResult.current.y !== kakaoAddressResult.y
        ) {
            updateCity();
        }

        prevKakaoAddressResult.current = kakaoAddressResult;
    }, [kakaoAddressResult, cities, districts, subDistricts, setCity, setDistrict, setSubDistrict]);
};
