import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import CommercialDistrictList2 from './components/CommercialDistrictList2'; // 리스트 컴포넌트 가져오기

const CommercialDistrict2 = () => {
    const roadAddress = useSelector((state) => state.address.roadAddress)
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult)
    const prevKakaoAddressResult = useRef(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            if (!kakaoAddressResult) return;

            setLoading(true);
            setError(null);

            const { region_1depth_name: city, region_2depth_name: district, region_3depth_name: sub_district } = kakaoAddressResult;

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/commercial`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: { city, district, sub_district },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (
            !prevKakaoAddressResult.current ||
            prevKakaoAddressResult.current.region_3depth_name !== kakaoAddressResult.region_3depth_name ||
            prevKakaoAddressResult.current.x !== kakaoAddressResult.x ||
            prevKakaoAddressResult.current.y !== kakaoAddressResult.y
        ) {
            fetchData();
        }

        prevKakaoAddressResult.current = kakaoAddressResult;
    }, [kakaoAddressResult]);

    return (
        <div>
            <Header />
            <div className="px-6">
                <div>도로명 주소: {roadAddress}</div>
                <div>행정동 주소: {kakaoAddressResult.region_1depth_name} {kakaoAddressResult.region_2depth_name} {kakaoAddressResult.region_3depth_name}</div>

                <div className="flex gap-2">
                    <div className="">
                        <KakaoMap />
                    </div>
                    <div className="">
                        <p>지도중심기준 상권분석</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <CommercialDistrictList2 data={data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommercialDistrict2;
