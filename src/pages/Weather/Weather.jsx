import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Weather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    useEffect(() => {
        const fetchData = async () => {
            if (!kakaoAddressResult) return;

            setLoading(true);
            setError(null);

            // const { lon, lat } = kakaoAddressResult;

            // API URL 및 파라미터 설정
            // const apiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
            const apiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=dhpm4WohQbiHxw1ohB5lcjV0cLv%2F7SvJ86NTOy4fN%2FGFCwgNhlmj3Hbq%2B2Q7slHN70mQ4DzvKPz9FV4pQr8Ryg%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=20240827&base_time=0630&nx=55&ny=127';
            // const params = {
            //     serviceKey: 'dhpm4WohQbiHxw1ohB5lcjV0cLv%2F7SvJ86NTOy4fN%2FGFCwgNhlmj3Hbq%2B2Q7slHN70mQ4DzvKPz9FV4pQr8Ryg%3D%3D',
            //     numOfRows: 1000,
            //     pageNo: 1,
            //     dataType: 'json',
            //     base_date: '20240827',
            //     base_time: '0500',
            //     nx: 55,
            //     ny: 127
            // };


            try {
                // const response = await axios.get(apiUrl, { params });
                const response = await axios.get(apiUrl);
                console.log(response.data); // 응답 데이터 확인
                setData(response.data);
            } catch (error) {
                console.error('Error fetching weather data', error);
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [kakaoAddressResult]);

    // 데이터 가공 및 표시
    const renderWeatherData = () => {
        if (!data) return null;

        // API 응답 구조에 맞게 데이터 가공
        const weatherItems = data.response?.body?.items?.item || [];
        return (
            <div>
                {weatherItems.map((item, index) => (
                    <div key={index}>
                        <p>Category: {item.category}</p>
                        <p>Value: {item.obsrValue}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div>
                <KakaoMap />
            </div>
            <div>
                {loading && <p>Loading weather data...</p>}
                {error && <p>Error: {error}</p>}
                {renderWeatherData()}
            </div>
        </div>
    );
};

export default Weather;
