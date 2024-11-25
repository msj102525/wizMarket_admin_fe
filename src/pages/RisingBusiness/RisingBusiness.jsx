import React, { useEffect, useState } from 'react';
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
import { useKakaoAddressUpdate } from '../../hooks/useKakaoAddressUpdate';
import { useRisingBusinessDataDate } from '../../hooks/useCommercialDistrictDataDate';

const RisingBusiness = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    const [searchCate, setSearchCate] = useState(null);

    const [increaseRateMin, setIncreaseRateMin] = useState(null);
    const [increaseRateMax, setIncreaseRateMax] = useState(null);
    const [rankMin, setRankMin] = useState(null);
    const [rankMax, setRankMax] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(true);
    const [refDate, setRefDate] = useState([]);

    const { dataDate } = useRisingBusinessDataDate();

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

    useKakaoAddressUpdate({
        kakaoAddressResult,
        cities,
        districts,
        subDistricts,
        setCity,
        setDistrict,
        setSubDistrict,
    });

    useEffect(() => {
        setReference(1)
        // console.log(refDate)
        if (dataDate && dataDate.length > 0) {
            setRefDate(dataDate.slice().reverse()[0].y_m);
        }
    }, [setReference, dataDate])

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
                        rank_max: parseInt(rankMax) || undefined,
                        y_m: refDate || undefined,
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
        setRefDate(dataDate);
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
                                dataDate={dataDate}
                                refDate={refDate}
                                setRefDate={setRefDate}
                            />
                        </div>
                    </section>
                    <section className="pb-10">
                        {loading &&
                            <div className="flex h-64">
                                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        }
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
