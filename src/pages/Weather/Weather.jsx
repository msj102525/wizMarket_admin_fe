import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import WeatherList from './components/WeatherList';
import dfs_xy_conv from '../../utils/transCoordinateKMA';
import getCurrentDate from '../../utils/getCurrentDate';

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

            const { x, y } = kakaoAddressResult;
            const rs = dfs_xy_conv("toXY", y, x);
            // console.log(rs)

            const formaCurrentDate = getCurrentDate();
            const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_DATA_GO_KR_API_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${formaCurrentDate}&base_time=0200&nx=${rs.x}&ny=${rs.y}`;

            try {
                const response = await axios.get(apiUrl);
                console.log(response)
                setData(response.data.response.body.items.item);
            } catch (error) {
                console.error('Error fetching weather data', error);
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [kakaoAddressResult]);

    return (
        <div>
            <Header />
            <div className='flex gap-10 p-4'>
                <div className='1/3'>
                    <KakaoMap />
                </div>
                <div className='w-2/3'>
                    <p className="text-lg font-semibold mb-4">지도 중심 기준 날씨</p>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {data && !loading && !error && (
                        <WeatherList data={data} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
