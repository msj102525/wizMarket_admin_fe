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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(20);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);
    const [totalItemsCount, setTotalItemsCount] = useState(0); // 총 데이터 수
    const [filters, setFilters] = useState({}); // 필터 값 상태
    const [storeName, setStoreName] = useState(null);
    const [isLikeSearch, setIsLikeSearch] = useState(null);


    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);

    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    useEffect(() => {
        setReference(3);  // reference를 3으로 설정
    }, [setReference]);

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
        setReference('');
    };

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

        // 페이지 값이 변경되었을 경우 currentPage를 업데이트
        if (!isPageChange) {
            setCurrentPage(1);
        }

        const convertToValue = (value, defaultValue = null, isNumeric = false) => {
            const defaultCategories = ['대분류', '중분류', '소분류'];

            if (value === '0') return defaultValue;  // '0'인 경우는 기본값(null)으로 처리
            if (value && isNumeric) {
                const numValue = parseInt(value, 10);
                return isNaN(numValue) ? defaultValue : numValue;
            }
            return (value && !defaultCategories.includes(value)) ? value : defaultValue;
        };

        filters = {
            city: convertToValue(city),
            district: convertToValue(district),
            subDistrict: convertToValue(subDistrict),
            storeName: convertToValue(storeName),
            mainCategory: convertToValue(mainCategory),
            subCategory: convertToValue(subCategory),
            detailCategory: convertToValue(detailCategory),
        };

        const matchType = isLikeSearch ? '=' : 'LIKE';  // isIncludeMatch가 체크되었는지에 따라 결정
        
        setFilters(filters);  // 검색 시 필터 값을 상태에 저장
        const pagingInfo = {
            page,    // 현재 페이지, currentPage 대신 page 인자를 사용
            page_size: pageSize,  // 페이지당 항목 수
        };
        console.log(matchType)
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc_store/select_loc_store`,
                { ...filters, matchType, ...pagingInfo },  // 필터 + 페이지 정보
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: abortControllerRef.current.signal,   // 새로운 AbortController의 signal 전달
                }
            );
            setSearchResults(response.data.filtered_data);  // 검색 결과를 상태로 저장
            if (!isPageChange) {
                setTotalItemsCount(response.data.total_items);  // 총 데이터 수를 첫 검색 후에만 받아옴
            }

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



    // 이전 페이지 버튼
    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);  // currentPage를 새 페이지로 설정
            handleSearch(filters, newPage, true);  // 새 페이지로 검색
        }
    };

    // 다음 페이지 버튼
    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItemsCount / pageSize);  // 총 페이지 수
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);  // currentPage를 새 페이지로 설정
            handleSearch(filters, newPage, true);  // 새 페이지로 검색
        }
    };

    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);  // currentPage 상태를 업데이트
        handleSearch(filters, pageNumber, true);  // 페이지 변경 시 해당 페이지로 검색
    };

    // 페이징 처리 로직
    const renderPagination = () => {
        const totalPages = Math.ceil(totalItemsCount / pageSize);  // 총 페이지 수
        const pageGroupSize = 10;  // 페이지 그룹당 10개의 페이지 번호를 보여줄 예정
        const currentPageGroup = Math.ceil(currentPage / pageGroupSize);  // 현재 페이지 그룹

        // 현재 페이지 그룹의 시작 페이지와 끝 페이지 계산
        const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
        const endPage = Math.min(currentPageGroup * pageGroupSize, totalPages);

        return (
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    이전
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`px-3 py-1 mx-1 border border-gray-300 rounded ${currentPage === pageNumber ? 'bg-gray-300 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    다음
                </button>
            </div>
        );
    };




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
                    <section className="flex gap-4 py-4 mb:flex-col mb:h-[450px]">
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
                            />
                        </div>
                    </section>
                    {/* 갯수 및 엑셀 다운 */}
                    <section className="w-full mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                총 <span className="text-red-500">{totalItemsCount.toLocaleString()}</span> 개
                            </div>

                        </div>
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
                        <div className="w-full overflow-x-auto">
                            {!loading && !error && <LocStoreList data={searchResults} />}
                        </div>

                        {/* 페이징 처리 */}
                        <div className="w-full">
                            {!loading && !error && renderPagination()}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocStore;
