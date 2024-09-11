import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useKakaoLocationName = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const { region_1depth_name: cityName, region_2depth_name: fullDistrict, region_3depth_name: subDistrictName } = kakaoAddressResult;

    const [KakaoCityName, setKakaoCityName] = useState('');
    const [KakaoDistrictName, setKakaoDistrictName] = useState('');
    const [KakaoSubDistrictName, setKakaoSubDistrictName] = useState('');

    useEffect(() => {
        if (cityName) {
            setKakaoCityName(cityName);
        }

        if (fullDistrict) {
            const districtName = fullDistrict.split(' ')[0];
            setKakaoDistrictName(districtName);
        }

        if (subDistrictName) {
            setKakaoSubDistrictName(subDistrictName);
        }
    }, [cityName, fullDistrict, subDistrictName]);

    return { KakaoCityName, KakaoDistrictName, KakaoSubDistrictName };
};

export default useKakaoLocationName;
