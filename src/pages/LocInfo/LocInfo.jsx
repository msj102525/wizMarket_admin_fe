import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import LocInfoList from './components/LocInfoList';
import LocInfoListSearchForm from './components/LocInfoListSearchForm';
import SectionHeader from '../../components/SectionHeader';


const RisingBusiness = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const prevKakaoAddressResult = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);

    const handleToggle = () => {
        setIsList(!isList);
    };

    useEffect(() => {
        console.log('Fetched data:', data); // 나중에 사용할 수 있도록 콘솔에 출력
    }, [data]);


    // 필터를 사용해 서버에 검색 요청을 보내는 함수
    const handleSearch = async (filters) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc_info/select_loc_info`,
                filters,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSearchResults(response.data.filtered_data); // 검색 결과를 상태로 저장
            console.log(response.data.filtered_data)
            console.log(typeof(response.data.filtered_data))
        } catch (err) {
            console.error('검색 오류:', err);
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            if (!kakaoAddressResult) return;

            setLoading(true);
            setError(null);

            const { region_1depth_name: city, region_2depth_name: fullDistrict, region_3depth_name: subDistrict } = kakaoAddressResult;
            const district = fullDistrict.split(' ')[0];

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/rising`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        city: city,
                        district: district,
                        sub_district: subDistrict,
                    },
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
            prevKakaoAddressResult.current = kakaoAddressResult;
        }
    }, [kakaoAddressResult]);


    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <section>
                        <SectionHeader title="입지분석" isList={isList} handleToggle={handleToggle} />
                    </section>

                    {/* 상단 지도와 검색 폼 */}
                    <section className="flex gap-4  py-4">
                        {!isList && (
                            <div className='flex-1'>
                                <KakaoMap />
                            </div>
                        )}
                        <div className='flex-1'>
                            <LocInfoListSearchForm onSearch={handleSearch} />
                        </div>
                    </section>
                    {/* 하단 리스트 */}
                    <section className="w-full">
                        {loading && <p>데이터를 불러오는 중입니다...</p>}  {/* 로딩 상태 처리 */}
                        {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}  {/* 오류 상태 처리 */}

                        {/* 데이터가 있으면 리스트 출력 */}
                        {!loading && !error && <LocInfoList data={searchResults} />}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default RisingBusiness;
