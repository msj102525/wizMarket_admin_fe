import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import RisingBusinessList from './components/RisingBusinessList';
import RisingSearchForm from './components/RisingSearchForm';
import SectionHeader from '../../components/SectionHeader';
import { useCategories } from '../../hooks/useCategories';

const RisingBusiness = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const prevKakaoAddressResult = useRef(null);

    const [searchCate, setSearchCate] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [increaseRateMin, setIncreaseRateMin] = useState('');
    const [increaseRateMax, setIncreaseRateMax] = useState('');
    const [rankMin, setRankMin] = useState('');
    const [rankMax, setRankMax] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);

    const {
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const handleToggle = () => {
        setIsList(!isList);
    };

    // 기존 뜨는 업종 데이터 fetch
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

    const handleSearch = () => {
        console.log('Searching for:', {
            searchCate,
            mainCategory,
            subCategory,
            detailCategory,
            city,
            district,
            subDistrict,
            increaseRateMin,
            increaseRateMax,
            rankMin,
            rankMax
        });
    };

    const handleReset = () => {
        setSearchCate('');
        setMainCategory('대분류');
        setSubCategory('중분류');
        setDetailCategory('소분류');
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setIncreaseRateMin('');
        setIncreaseRateMax('');
        setRankMin('');
        setRankMax('');
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="gap-2 pr-10">
                    <section>
                        <SectionHeader title="상권분석" isList={isList} handleToggle={handleToggle} />
                    </section>
                    <section className="flex gap-4 py-4">
                        {!isList && (
                            <div className='flex-1'>
                                <KakaoMap />
                            </div>
                        )}
                        <div className='flex-1'>
                            <RisingSearchForm
                                searchCate={searchCate}

                                mainCategory={mainCategory}
                                mainCategories={mainCategories}

                                subCategory={subCategory}
                                subCategories={subCategories}

                                detailCategory={detailCategory}
                                detailCategories={detailCategories}

                                city={city}
                                district={district}
                                subDistrict={subDistrict}
                                increaseRateMin={increaseRateMin}
                                increaseRateMax={increaseRateMax}
                                rankMin={rankMin}
                                rankMax={rankMax}
                                setSearchCate={setSearchCate}
                                setMainCategory={setMainCategory}
                                setSubCategory={setSubCategory}
                                setDetailCategory={setDetailCategory}
                                setCity={setCity}
                                setDistrict={setDistrict}
                                setSubDistrict={setSubDistrict}
                                setIncreaseRateMin={setIncreaseRateMin}
                                setIncreaseRateMax={setIncreaseRateMax}
                                setRankMin={setRankMin}
                                setRankMax={setRankMax}
                                handleSearch={handleSearch}
                                handleReset={handleReset}
                            />
                        </div>
                    </section>
                    <section className="">
                        <p>지도중심기준 지역 뜨는 업종</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <RisingBusinessList data={data} />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default RisingBusiness;
