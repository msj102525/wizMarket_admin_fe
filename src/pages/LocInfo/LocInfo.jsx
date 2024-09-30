import React, { useState } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import LocInfoList from './components/LocInfoList';
import LocInfoListSearchForm from './components/LocInfoListSearchForm';
import SectionHeader from '../../components/SectionHeader';
import { useCities } from '../../hooks/useCities';
import { useKakaoAddressUpdate } from '../../hooks/useKakaoAddressUpdate';
import { useSelector } from 'react-redux';


const LocInfo = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    const [searchResults, setSearchResults] = useState([]);
    const [statResults, setStatResults] = useState([]);
    const [allCorrResults, setAllCorrResults] = useState([]);
    const [filterCorrResults, setFilterCorrResults] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);


    const [shopMin, setshopMin] = useState('');
    const [move_popMin, setmove_popMin] = useState('');
    const [salesMin, setsalesMin] = useState('');
    const [work_popMin, setwork_popMin] = useState('');
    const [incomeMin, setincomeMin] = useState('');
    const [spendMin, setspendMin] = useState('');
    const [houseMin, sethouseMin] = useState('');
    const [residentMin, setresidentMin] = useState('');

    const [shopMax, setshopMax] = useState('');
    const [move_popMax, setmove_popMax] = useState('');
    const [salesMax, setsalesMax] = useState('');
    const [work_popMax, setwork_popMax] = useState('');
    const [incomeMax, setincomeMax] = useState('');
    const [spendMax, setspendMax] = useState('');
    const [houseMax, sethouseMax] = useState('');
    const [residentMax, setresidentMax] = useState('');

    const handleToggle = () => {
        setIsList(!isList);
    };

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


    // 필터를 사용해 서버에 검색 요청을 보내는 함수
    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        const convertToInt = (value) => value ? parseInt(value, 10) : null;

        const filters = {
            city: convertToInt(city),
            district: convertToInt(district),
            subDistrict: convertToInt(subDistrict),
            shopMin: convertToInt(shopMin),
            shopMax: convertToInt(shopMax),
            move_popMin: convertToInt(move_popMin),
            move_popMax: convertToInt(move_popMax),
            salesMin: convertToInt(salesMin),
            salesMax: convertToInt(salesMax),
            work_popMin: convertToInt(work_popMin),
            work_popMax: convertToInt(work_popMax),
            incomeMin: convertToInt(incomeMin),
            incomeMax: convertToInt(incomeMax),
            spendMin: convertToInt(spendMin),
            spendMax: convertToInt(spendMax),
            houseMin: convertToInt(houseMin),
            houseMax: convertToInt(houseMax),
            residentMin: convertToInt(residentMin),
            residentMax: convertToInt(residentMax),
        };

        console.log()

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
            setAllCorrResults(response.data.all_corr);
            setFilterCorrResults(response.data.filter_corr);
            console.log(response.data.filtered_data)
            console.log(response.data.filter_corr)

            // statistics/select_statistics에 대한 추가 요청
            const statResponse = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/statistics/select_statistics`,
                filters, // 동일한 필터로 요청
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // 통계 결과를 상태로 저장
            setStatResults(statResponse.data.statistics_data);

        } catch (err) {
            console.error('검색 오류:', err);
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };



    const handleReset = () => {
        // 모든 필터 값을 초기화
        setCity('');
        setDistrict('');
        setSubDistrict('');

        setshopMin('');
        setmove_popMin('');
        setsalesMin('');
        setwork_popMin('');
        setincomeMin('');
        setspendMin('');
        sethouseMin('');
        setresidentMin('');

        setshopMax('');
        setmove_popMax('');
        setsalesMax('');
        setwork_popMax('');
        setincomeMax('');
        setspendMax('');
        sethouseMax('');
        setresidentMax('');
    };

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
                            <LocInfoListSearchForm

                                city={city}
                                district={district}
                                subDistrict={subDistrict}

                                cities={cities}
                                districts={districts}
                                subDistricts={subDistricts}

                                shopMin={shopMin}
                                move_popMin={move_popMin}
                                salesMin={salesMin}
                                work_popMin={work_popMin}
                                incomeMin={incomeMin}
                                spendMin={spendMin}
                                houseMin={houseMin}
                                residentMin={residentMin}

                                shopMax={shopMax}
                                move_popMax={move_popMax}
                                salesMax={salesMax}
                                work_popMax={work_popMax}
                                incomeMax={incomeMax}
                                spendMax={spendMax}
                                houseMax={houseMax}
                                residentMax={residentMax}

                                setCity={setCity}
                                setDistrict={setDistrict}
                                setSubDistrict={setSubDistrict}

                                setshopMin={setshopMin}
                                setmove_popMin={setmove_popMin}
                                setsalesMin={setsalesMin}
                                setwork_popMin={setwork_popMin}
                                setincomeMin={setincomeMin}
                                setspendMin={setspendMin}
                                sethouseMin={sethouseMin}
                                setresidentMin={setresidentMin}

                                setshopMax={setshopMax}
                                setmove_popMax={setmove_popMax}
                                setsalesMax={setsalesMax}
                                setwork_popMax={setwork_popMax}
                                setincomeMax={setincomeMax}
                                setspendMax={setspendMax}
                                sethouseMax={sethouseMax}
                                setresidentMax={setresidentMax}

                                handleSearch={handleSearch}
                                handleReset={handleReset}
                                isList={isList} />
                        </div>
                    </section>
                    {/* 하단 리스트 */}
                    <section className="w-full">
                        {loading && <p>검색 결과가 없습니다.</p>}  {/* 로딩 상태 처리 */}
                        {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}  {/* 오류 상태 처리 */}

                        {/* 데이터가 있으면 리스트 출력 */}
                        {!loading && !error && <LocInfoList data={searchResults} statData={statResults} allCorrData = {allCorrResults} filterCorrData = {filterCorrResults}/>}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocInfo;
