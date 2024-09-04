import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import KakaoMap from '../../../components/KakaoMap';
import axios from 'axios';
import LocInfoTable from './LocInfoTable';

const LocInfo = () => {
    useSelector((state) => state.address.roadAddress);
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const prevKakaoAddressResult = useRef(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!kakaoAddressResult) return;

            setLoading(true);
            setError(null);

            const { region_1depth_name: city_name, region_2depth_name: fullDistrict, region_3depth_name: sub_district_name } = kakaoAddressResult;
            const district_name = fullDistrict.split(' ')[0];
            console.log(city_name);
            console.log(district_name);
            console.log(sub_district_name);

            try {
                const response = await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/loc_info/get_loc_info`, {
                    city_name, 
                    district_name, 
                    sub_district_name
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setData(response.data);
                console.log(response.data)
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
            
            <div className="px-6 flex justify-center items-center mt-12">
                <div className="w-full max-w-4xl flex gap-2 justify-center">
                    <div className="">
                        
                        <KakaoMap />
                    </div>
                    <div className="">
                        <p>지도 중심 기준 상권 분석</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <LocInfoTable data={data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocInfo;
