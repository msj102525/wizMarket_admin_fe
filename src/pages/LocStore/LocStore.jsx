import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import LocStoreListSearchForm from './components/LocStoreListSearchForm';
import LocStoreList from './components/LocStoreList';
import SectionHeader from '../../components/SectionHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useCategories } from '../../hooks/useCategories';
import { useCities } from '../../hooks/useCities';
import { useKakaoAddressUpdate } from '../../hooks/useKakaoAddressUpdate';

const LocStore = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(true);
    const [storeName, setStoreName] = useState(null);
    const [isLikeSearch, setIsLikeSearch] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

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

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setStoreName('');
        setMainCategory('');
        setSubCategory('');
        setDetailCategory('');
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setIsLikeSearch('');
        setReference(3);
    };

    useEffect(() => {
        setReference(3)
    }, [setReference])

    const handleToggle = () => {
        setIsList(!isList);
    };

    const abortControllerRef = useRef(null);  // 초기에는 null

    const handleSearch = async (filters, page = 1, isPageChange = false) => {
        // 이전 요청을 중단하고 새로운 요청을 위해 AbortController 생성
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();  // 이전 요청 취소
        }
        abortControllerRef.current = new AbortController();  // 새로운 AbortController 생성
        setLoading(true);
        setError(null);

        const convertToValue = (value, defaultValue = null, isCategory = false) => {
            const defaultCategories = ['대분류', '중분류', '소분류'];

            if (value === '0' || defaultCategories.includes(value)) {
                return defaultValue; // 기본값(null)으로 처리
            }
            // 카테고리 값은 문자열로 변환
            if (isCategory) {
                return value ? String(value) : defaultValue; // 값이 존재하면 문자열로 변환, 없으면 기본값
            }
            // 일반 숫자 필터는 기본값 유지
            return (value && !defaultCategories.includes(value)) ? value : defaultValue;
        };

        filters = {
            city: convertToValue(city, null), // 일반 필터 그대로 사용
            district: convertToValue(district, null), // 일반 필터 그대로 사용
            subDistrict: convertToValue(subDistrict, null), // 일반 필터 그대로 사용
            reference: convertToValue(reference, null), // 일반 필터 그대로 사용
            storeName: convertToValue(storeName), // 문자열 그대로 사용
            mainCategory: convertToValue(mainCategory, null, true), // 문자열로 변환
            subCategory: convertToValue(subCategory, null, true), // 문자열로 변환
            detailCategory: convertToValue(detailCategory, null, true), // 문자열로 변환
            selectedOptions: selectedOptions || [],
        };

        // 조건 체크: storeName이 있고, mainCategory와 city가 null인 경우
        if (filters.storeName && !filters.mainCategory && !filters.city) {
            alert('지역 혹은 카테고리를 선택해주세요');
            setLoading(false); // 로딩 상태 초기화
            return; // 함수 종료
        }

        const matchType = isLikeSearch ? '=' : 'LIKE';  // isIncludeMatch가 체크되었는지에 따라 결정
        // console.log(filters)
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc/store/select/store/list`,
                { ...filters, matchType },  // 필터 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: abortControllerRef.current.signal,   // 새로운 AbortController의 signal 전달
                }
            );
            const modifiedData = response.data.filtered_data.map(item => ({
                ...item,
                source: filters.reference, // reference 값에 따라 source 설정
            }));

            setSearchResults(modifiedData);  // 검색 결과를 상태로 저장
            setReference(reference)

        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else {
                setError('검색 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();  // 컴포넌트 언마운트 시 요청 중단
            }
        };
    }, []);  // 빈 의존성 배열



    return (
        <div>
            <Header />
            <div className="flex">
                <dir className="mb:hidden">
                    <Aside />
                </dir>
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4 overflow-x-hidden">
                    <section>
                        <SectionHeader title="매장 정보" isList={isList} handleToggle={handleToggle} />
                    </section>

                    {/* 상단 지도와 검색 폼 */}
                    <section className={`flex gap-4 py-4 mb:flex-col ${!isList ? 'mb:h-[550px]' : ''}`}>
                        {!isList && (
                            <div className='flex-1'>
                                <KakaoMap />
                            </div>
                        )}
                        <div className='flex-1'>
                            <LocStoreListSearchForm
                                city={city}
                                district={district}
                                subDistrict={subDistrict}
                                cities={cities}
                                districts={districts}
                                subDistricts={subDistricts}
                                setCity={setCity}
                                setDistrict={setDistrict}
                                setSubDistrict={setSubDistrict}
                                mainCategory={mainCategory}
                                setMainCategory={setMainCategory}
                                mainCategories={mainCategories}
                                subCategory={subCategory}
                                setSubCategory={setSubCategory}
                                subCategories={subCategories}
                                detailCategory={detailCategory}
                                setDetailCategory={setDetailCategory}
                                detailCategories={detailCategories}
                                reference={reference}
                                references={references}
                                setReference={setReference}
                                storeName={storeName}
                                setStoreName={setStoreName}
                                isLikeSearch={isLikeSearch}
                                setIsLikeSearch={setIsLikeSearch}
                                handleSearch={handleSearch}
                                handleReset={handleReset}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                            />
                        </div>
                    </section>
                    {/* 갯수 및 엑셀 다운 */}
                    <section className="w-full mb-4">

                    </section>
                    {/* 하단 리스트 */}
                    <section className="w-full">
                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}  {/* 오류 상태 처리 */}

                        {/* 데이터가 있으면 리스트 출력 */}
                        <div className="w-full overflow-x-auto pt-32 sm:pt-0">
                            {!loading && !error && <LocStoreList data={searchResults} />}
                        </div>

                    </section>
                </main>
            </div>
        </div >
    );
};

export default LocStore;
