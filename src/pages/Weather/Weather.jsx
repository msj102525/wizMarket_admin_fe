import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import WeatherList from './components/WeatherList';
import dfs_xy_conv from '../../utils/transCoordinateKMA';
import getCurrentDate from '../../utils/getCurrentDate';
import CAIApiList from './components/CAIApiList';

const Weather = () => {
    const [weahterData, setWeatherData] = useState(null);
    const [caiData, setCaiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevKakaoAddressResult = useRef(null);

    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    useEffect(() => {
        const fetchWeaherData = async () => {
            if (!kakaoAddressResult) return;

            const { x, y } = kakaoAddressResult;
            const rs = dfs_xy_conv("toXY", y, x);
            const formaCurrentDate = getCurrentDate();
            const weatherApiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_DATA_GO_KR_API_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${formaCurrentDate}&base_time=0200&nx=${rs.x}&ny=${rs.y}`;

            try {
                const response = await axios.get(weatherApiUrl);
                console.log(response);
                setWeatherData(response.data.response.body.items.item);
            } catch (error) {
                console.error('Error fetching weather data', error);
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        const fetchCAIData = async () => {
            if (!kakaoAddressResult) return;

            let caseCity = kakaoAddressResult.region_1depth_name;

            switch (caseCity) {
                case '서울특별시':
                    caseCity = '서울';
                    break;
                case '부산광역시':
                    caseCity = '부산';
                    break;
                case '대구광역시':
                    caseCity = '대구';
                    break;
                case '인천광역시':
                    caseCity = '인천';
                    break;
                case '광주광역시':
                    caseCity = '광주';
                    break;
                case '대전광역시':
                    caseCity = '대전';
                    break;
                case '울산광역시':
                    caseCity = '울산';
                    break;
                case '세종특별자치시':
                    caseCity = '세종';
                    break;
                case '경기도':
                    caseCity = '경기';
                    break;
                case '충청북도':
                    caseCity = '충북';
                    break;
                case '충청남도':
                    caseCity = '충남';
                    break;
                case '전라남도':
                    caseCity = '전남';
                    break;
                case '경상북도':
                    caseCity = '경북';
                    break;
                case '경상남도':
                    caseCity = '경남';
                    break;
                case '제주특별자치도':
                    caseCity = '제주';
                    break;
                case '강원특별자치도':
                    caseCity = '강원';
                    break;
                case '전북특별자치도':
                    caseCity = '전북';
                    break;
                default:
                    caseCity = '시도명err';
                    break;
            }

            const caiApiUrl = `${process.env.REACT_APP_FASTAPI_BASE_URL}/cai?city=${caseCity}`;

            try {
                const response = await axios.get(caiApiUrl);
                // console.log(`CAI` + JSON.stringify(response.data.response.body.items));
                setCaiData(response.data.response.body.items)
            } catch (error) {
                console.error('Error fetching CAI data', error);
                setError('Failed to fetch CAI data');
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
            fetchWeaherData();
        }

        if (
            !prevKakaoAddressResult.current ||
            prevKakaoAddressResult.current.region_1depth_name !== kakaoAddressResult.region_1depth_name
        ) {
            fetchCAIData();
        }

        prevKakaoAddressResult.current = kakaoAddressResult;

    }, [kakaoAddressResult]);

    return (
        <div>
            <Header />
            <div className='flex gap-10 p-4'>
                <div className='1/3'>
                    <KakaoMap />
                </div>
                <div className='w-1/3'>
                    <div className="pb-10">
                        <p className="text-lg font-semibold mb-4">지도 중심 기준 날씨</p>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {weahterData && !loading && !error && (
                            <WeatherList weahterData={weahterData} />
                        )}
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className="pb-10">
                        <p className="text-lg font-semibold mb-4">시/도 CAI 데이터</p>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {weahterData && !loading && !error && (
                            <CAIApiList caiData={caiData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
