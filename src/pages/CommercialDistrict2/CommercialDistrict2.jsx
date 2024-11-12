import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import SectionHeader from '../../components/SectionHeader';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import CommercialDistrictList2 from './components/CommercialDistrictList2';
import CommercialDistrict2SearchForm from './components/CommercialDistrict2SearchForm';
import { useCategories } from '../../hooks/useCategories';
import { useCities } from '../../hooks/useCities';
import { useKakaoAddressUpdate } from '../../hooks/useKakaoAddressUpdate';
import { useCommercialDistrictDataDate } from '../../hooks/useCommercialDistrictDataDate';


const CommercialDistrict2 = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    const [isList, setIsList] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [marketSizeMax, setMarketSizeMax] = useState("");
    const [marketSizeMin, setMarketSizeMin] = useState("");
    const [avgSalesMax, setAvgSalesMax] = useState("");
    const [avgSalesMin, setAvgSalesMin] = useState("");
    const [foodCostMax, setFoodCostMax] = useState("");
    const [foodCostMin, setFoodCostMin] = useState("");
    const [empCostMax, setEmpCostMax] = useState(""); // 인건비X -> 평균 결제
    const [empCostMin, setEmpCostMin] = useState(""); // 인건비X -> 평균 결제
    const [rentalCostMax, setRentalCostMax] = useState("");
    const [rentalCostMin, setRentalCostMin] = useState("");
    const [avgProfitMax, setAvgProfitMax] = useState("");
    const [avgProfitMin, setAvgProfitMin] = useState("");
    const [refDate, setRefDate] = useState([]);

    const { dataDate } = useCommercialDistrictDataDate();


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
        if (dataDate && dataDate.length > 0) {
            setRefDate(dataDate.slice().reverse()[0].y_m);
        }
    }, [setReference, dataDate])


    const handleToggle = () => {
        setIsList(!isList);
    };

    const handleSearch = () => {

        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/commercial/cd`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        city_id: parseInt(city) || undefined,
                        district_id: parseInt(district) || undefined,
                        sub_district_id: parseInt(subDistrict) || undefined,
                        biz_main_category_id: parseInt(mainCategory) || undefined,
                        biz_sub_category_id: parseInt(subCategory) || undefined,
                        biz_detail_category_id: parseInt(detailCategory) || undefined,
                        market_size_min: parseInt(marketSizeMin) || undefined,
                        market_size_max: parseInt(marketSizeMax) || undefined,
                        avg_sales_min: parseInt(avgSalesMin) || undefined,
                        avg_sales_max: parseInt(avgSalesMax) || undefined,
                        food_cost_min: parseInt(foodCostMin) || undefined,
                        food_cost_max: parseInt(foodCostMax) || undefined,
                        employee_cost_min: parseInt(empCostMin) || undefined,
                        employee_cost_max: parseInt(empCostMax) || undefined,
                        rental_cost_min: parseInt(rentalCostMin) || undefined,
                        rental_cost_max: parseInt(rentalCostMax) || undefined,
                        avg_profit_min: parseInt(avgProfitMin) || undefined,
                        avg_profit_max: parseInt(avgProfitMax) || undefined,
                        y_m: refDate || undefined,
                    },
                });
                // console.log(response.data)
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
        setReference('출처');
        setMainCategory('대분류');
        setSubCategory('중분류');
        setDetailCategory('소분류');
        setCity("");
        setDistrict("");
        setSubDistrict("");
        setMarketSizeMax("");
        setAvgSalesMax("");
        setMarketSizeMin("");
        setAvgSalesMin("");
        setFoodCostMax("");
        setFoodCostMin("");
        setEmpCostMax("");
        setEmpCostMin("");
        setRentalCostMax("");
        setRentalCostMin("");
        setAvgProfitMax("");
        setAvgProfitMin("");
        setRefDate(dataDate);
    };



    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="gap-2 pr-10 w-full">
                    <section>
                        <SectionHeader title="상권 분석" isList={isList} handleToggle={handleToggle} />
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
                            <CommercialDistrict2SearchForm
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
                                setReference={setReference}
                                setMainCategory={setMainCategory}
                                setSubCategory={setSubCategory}
                                setDetailCategory={setDetailCategory}
                                setCity={setCity}
                                setDistrict={setDistrict}
                                setSubDistrict={setSubDistrict}
                                marketSizeMax={marketSizeMax}
                                marketSizeMin={marketSizeMin}
                                avgSalesMax={avgSalesMax}
                                avgSalesMin={avgSalesMin}
                                foodCostMax={foodCostMax}
                                foodCostMin={foodCostMin}
                                empCostMax={empCostMax}
                                empCostMin={empCostMin}
                                rentalCostMax={rentalCostMax}
                                rentalCostMin={rentalCostMin}
                                avgProfitMax={avgProfitMax}
                                avgProfitMin={avgProfitMin}
                                handleSearch={handleSearch}
                                handleReset={handleReset}
                                setMarketSizeMax={setMarketSizeMax}
                                setMarketSizeMin={setMarketSizeMin}
                                setAvgSalesMax={setAvgSalesMax}
                                setAvgSalesMin={setAvgSalesMin}
                                setFoodCostMax={setFoodCostMax}
                                setFoodCostMin={setFoodCostMin}
                                setEmpCostMax={setEmpCostMax}
                                setEmpCostMin={setEmpCostMin}
                                setRentalCostMax={setRentalCostMax}
                                setRentalCostMin={setRentalCostMin}
                                setAvgProfitMax={setAvgProfitMax}
                                setAvgProfitMin={setAvgProfitMin}
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
                            <CommercialDistrictList2 data2={data} />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CommercialDistrict2;
