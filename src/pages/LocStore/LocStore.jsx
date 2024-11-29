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
import * as XLSX from 'xlsx';

const LocStore = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(20);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(true);
    const [totalItemsCount, setTotalItemsCount] = useState(0); // 총 데이터 수
    const [filters, setFilters] = useState({}); // 필터 값 상태
    const [storeName, setStoreName] = useState(null);
    const [isLikeSearch, setIsLikeSearch] = useState(null);
    const [dataForExcel, setDataForExcel] = useState([]); // 엑셀 다운로드 위한 데이터


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
        setReference('');
    };

    useEffect(() => {
        setReference(3);
    })

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

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc/store/select/store/list`,
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
                setTotalItemsCount(response.data.total_items.length);  // 총 데이터 수를 첫 검색 후에만 받아옴
                setDataForExcel(response.data.total_items)
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

    // 처음 페이지 버튼
    const handleFirstPage = () => {
        setCurrentPage(1);
        handleSearch(filters, 1, true);
    };

    // 끝 페이지 버튼
    const handleLastPage = () => {
        const totalPages = Math.ceil(totalItemsCount / pageSize);
        setCurrentPage(totalPages);
        handleSearch(filters, totalPages, true);
    };


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
        const totalPages = Math.ceil(totalItemsCount / pageSize);
        const pageGroupSize = 10;
        const currentPageGroup = Math.ceil(currentPage / pageGroupSize);
        const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
        const endPage = Math.min(currentPageGroup * pageGroupSize, totalPages);

        return (
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded mb:px-6 mb:py-3 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    처음
                </button>

                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded mb:px-6 mb:py-3 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    이전
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`px-3 py-1 mx-1 border border-gray-300 rounded mb:px-6 mb:py-3 ${currentPage === pageNumber ? 'bg-gray-300 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded mb:px-6 mb:py-3 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    다음
                </button>

                <button
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 mx-1 border border-gray-300 rounded mb:px-6 mb:py-3 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    끝
                </button>
            </div>
        );
    };


    const handleExcelDownload = () => {
        if (!dataForExcel || dataForExcel.length === 0) {
            alert("다운로드할 데이터가 없습니다.");
            return;
        }

        // 제외할 헤더 설정
        const excludeHeaders = [
            "city.CITY_ID", "CITY_NAME",
            "district.DISTRICT_ID", "district.CITY_ID", "district.DISTRICT_NAME",
            "sub_district.SUB_DISTRICT_ID", "sub_district.CITY_ID", "sub_district.DISTRICT_ID", "SUB_DISTRICT_NAME"
        ];

        // 헤더 매핑 (영문 -> 한글)
        const headerMapping = {
            "LOCAL_STORE_ID": "매장 ID",
            "CITY_ID": "시/도코드-DB",
            "DISTRICT_ID": "시/군/구코드-DB",
            "SUB_DISTRICT_ID": "읍/면/동코드-DB",
            "STORE_BUSINESS_NUMBER": "상가업소번호-코드정보",
            "STORE_NAME": "상호명",
            "BRANCH_NAME": "지점명",
            "LARGE_CATEGORY_CODE": "상권업종대분류코드",
            "LARGE_CATEGORY_NAME": "상권업종대분류명",
            "MEDIUM_CATEGORY_CODE": "상권업종중분류코드",
            "MEDIUM_CATEGORY_NAME": "상권업종중분류명",
            "SMALL_CATEGORY_CODE": "상권업종소분류코드",
            "SMALL_CATEGORY_NAME": "상권업종소분류명",
            "INDUSTRY_CODE": "표준산업분류코드",
            "INDUSTRY_NAME": "표준산업분류명",
            "PROVINCE_CODE": "시/도코드-기록용",
            "PROVINCE_NAME": "시/도명",
            "DISTRICT_CODE": "시/군/구코드-기록용",
            "DISTRICT_NAME": "시/군/구명",
            "ADMINISTRATIVE_DONG_CODE": "행정동코드",
            "ADMINISTRATIVE_DONG_NAME": "행정동명",
            "LEGAL_DONG_CODE": "법정동코드",
            "LEGAL_DONG_NAME": "법정동명",
            "LOT_NUMBER_CODE": "지번코드",
            "LAND_CATEGORY_CODE": "대지구분코드",
            "LAND_CATEGORY_NAME": "대지구분명",
            "LOT_MAIN_NUMBER": "지번본번지",
            "LOT_SUB_NUMBER": "지번부번지",
            "LOT_ADDRESS": "지번주소",
            "ROAD_NAME_CODE": "도로명코드",
            "ROAD_NAME": "도로명",
            "BUILDING_MAIN_NUMBER": "건물본번지",
            "BUILDING_SUB_NUMBER": "건물부번지",
            "BUILDING_MANAGEMENT_NUMBER": "건물관리번호",
            "BUILDING_NAME": "건물명",
            "ROAD_NAME_ADDRESS": "도로명주소",
            "OLD_POSTAL_CODE": "구우편주소",
            "NEW_POSTAL_CODE": "신우편주소",
            "DONG_INFO": "동정보",
            "FLOOR_INFO": "층정보",
            "UNIT_INFO": "호정보",
            "LONGITUDE": "경도",
            "LATITUDE": "위도",
            "IS_EXIST": "존재여부",
            "LOCAL_YEAR": "기준 년",
            "LOCAL_QUARTER": "기준 분기",
            "CREATED_AT": "생성일자",
            "UPDATED_AT": "수정일자",
            "REFERENCE_ID": "참조ID",
        };

        // 헤더 제외 및 매핑 데이터 생성
        const filteredData = dataForExcel.map(item => {
            const filteredItem = {};
            Object.keys(item).forEach(key => {
                if (!excludeHeaders.includes(key)) {
                    const mappedKey = headerMapping[key] || key; // 매핑된 키가 없으면 원래 키 사용
                    filteredItem[mappedKey] = item[key];
                }
            });
            return filteredItem;
        });

        // 데이터 배열을 엑셀 워크시트로 변환
        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        // 워크북 생성 및 워크시트 추가
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 동적 파일 이름 생성 (예: 매장 데이터_20241129.xlsx)
        const fileName = `매장 데이터_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`;

        // 엑셀 파일 생성 및 다운로드
        XLSX.writeFile(workbook, fileName);
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
                            />
                        </div>
                    </section>
                    {/* 갯수 및 엑셀 다운 */}
                    <section className="w-full mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                총 <span className="text-red-500">{(totalItemsCount ?? 0).toLocaleString()}</span> 개
                            </div>

                            <button
                                className="px-4 py-2 bg-white text-black rounded border border-black"
                                onClick={handleExcelDownload}
                            >
                                엑셀 다운로드
                            </button>

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
                        <div className="w-full mb:pb-40">
                            {!loading && !error && renderPagination()}
                        </div>
                    </section>
                </main>
            </div>
        </div >
    );
};

export default LocStore;
