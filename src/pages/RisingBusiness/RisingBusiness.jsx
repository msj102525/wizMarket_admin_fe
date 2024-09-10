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
import { useCities } from '../../hooks/useCities';

const RisingBusiness = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const prevKakaoAddressResult = useRef(null);

    const [searchCate, setSearchCate] = useState(null);

    const [increaseRateMin, setIncreaseRateMin] = useState(null);
    const [increaseRateMax, setIncreaseRateMax] = useState(null);
    const [rankMin, setRankMin] = useState(null);
    const [rankMax, setRankMax] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);

    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const {
        cities,
        districts,
        subDistricts,
        city,
        district,
        subDistrict,
        setCity,
        setDistrict,
        setSubDistrict
    } = useCities();

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
            console.log(fetchData)
            prevKakaoAddressResult.current = kakaoAddressResult;
        }
    }, [kakaoAddressResult]);

    const handleSearch = () => {

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/rising/rb`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        search_cate: searchCate || undefined,
                        city_id: parseInt(city) || undefined,
                        district_id: parseInt(district) || undefined,
                        sub_district_id: parseInt(subDistrict) || undefined,
                        biz_main_category_id: parseInt(mainCategory) || undefined,
                        biz_sub_category_id: parseInt(subCategory) || undefined,
                        biz_detail_category_id: parseInt(detailCategory) || undefined,
                        growth_rate_min: parseFloat(increaseRateMin) || undefined,
                        growth_rate_max: parseFloat(increaseRateMax) || undefined,
                        rank_min: parseInt(rankMin) || undefined,
                        rank_max: parseInt(rankMax) || undefined
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

        fetchData();
    };

    const handleReset = () => {
        setSearchCate(null);
        setReference('출처');
        setMainCategory('대분류');
        setSubCategory('중분류');
        setDetailCategory('소분류');
        setCity(null);
        setDistrict(null);
        setSubDistrict(null);
        setIncreaseRateMin(null);
        setIncreaseRateMax(null);
        setRankMin(null);
        setRankMax(null);
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="gap-2 pr-10 w-full">
                    <section>
                        <SectionHeader title="뜨는 업종" isList={isList} handleToggle={handleToggle} />
                    </section>
                    <section className="flex gap-4 py-4">
                        {!isList && (
                            <div className='flex-1'>
                                <div className="min-w-full h-full">
                                    <KakaoMap />
                                </div>
                            </div>
                        )}
                        <div className='flex-1'>
                            <RisingSearchForm
                                searchCate={searchCate}

                                reference={reference}
                                references={references}

                                mainCategory={mainCategory}
                                mainCategories={mainCategories}

                                subCategory={subCategory}
                                subCategories={subCategories}

                                detailCategory={detailCategory}
                                detailCategories={detailCategories}

                                city={city}
                                district={district}
                                subDistrict={subDistrict}

                                cities={cities}
                                districts={districts}
                                subDistricts={subDistricts}

                                increaseRateMin={increaseRateMin}
                                increaseRateMax={increaseRateMax}
                                rankMin={rankMin}
                                rankMax={rankMax}

                                setSearchCate={setSearchCate}
                                setReference={setReference}
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
                    <section className="pb-10">
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
