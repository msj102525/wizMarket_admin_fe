import React, { useState } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import LocStoreListSearchForm from './components/LocStoreListSearchForm';
import LocStoreList from './components/LocStoreList';
import SectionHeader from '../../components/SectionHeader';
import axios from 'axios';
import * as XLSX from 'xlsx';
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
    const [totalItems, setTotalItems] = useState(0); // 총 데이터 수
    const [filters, setFilters] = useState({}); // 필터 값 상태
    const [excelItems, setExcelItems] = useState(0); // 총 데이터 수
    const [storeName,setStoreName] = useState(null)
    const [selectedQuarterMin,setSelectedQuarterMin] = useState(null)
    const [selectedQuarterMax,setSelectedQuarterMax] = useState(null)

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
        setSelectedQuarterMin('');
        setSelectedQuarterMax('');
        setReference('');
    };

    const handleToggle = () => {
        setIsList(!isList);
    };

    const handleSearch = async (filters, isPageChange = false) => {
        setLoading(true);
        setError(null);

        const convertToValue = (value, defaultValue = null) => {
            const defaultCategories = ['대분류', '중분류', '소분류'];
            return (value && !defaultCategories.includes(value)) ? value : defaultValue;
        };

        filters = {
            city: convertToValue(city),
            district: convertToValue(district),
            subDistrict: convertToValue(subDistrict),
            storeName: convertToValue(storeName),
            selectedQuarterMin: convertToValue(selectedQuarterMin),
            selectedQuarterMax: convertToValue(selectedQuarterMax),
            mainCategory: convertToValue(mainCategory),
            subCategory: convertToValue(subCategory),
            detailCategory: convertToValue(detailCategory),
        };

        setFilters(filters); // 검색 시 필터 값을 상태에 저장

        const pagingInfo = {
            page: currentPage,    // 현재 페이지
            page_size: pageSize,  // 페이지당 항목 수
        };

        console.log(pagingInfo)

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc_store/select_loc_store`,
                { ...filters, ...pagingInfo }, // 필터 + 페이지 정보
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSearchResults(response.data.filtered_data); // 검색 결과를 상태로 저장

            // 검색 후 처음 로드할 때만 totalItems 설정
            if (!isPageChange) {
                setTotalItems(response.data.total_items.length); // 총 데이터 수를 첫 검색 후에만 받아옴
                setExcelItems(response.data.total_items); // 엑셀 다운로드를 위해 전체 데이터 저장
            }
            
            console.log(response.data.total_items.length, '테스트')

        } catch (err) {
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    
    
    // 엑셀 다운
    const handleExcelDownload = () => {

        const worksheet = XLSX.utils.json_to_sheet(excelItems); // 전체 데이터를 시트로 변환
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'LocStoreData'); // 시트 이름을 지정
        XLSX.writeFile(workbook, 'loc_store_data.xlsx'); // 엑셀 파일로 저장
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        console.log(page, '페이지')
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        
        console.log(currentPage, '지금')

        // 페이지 이동 시 기존 필터 값 유지하여 검색, totalItems는 다시 받지 않음
        handleSearch(filters, true);
    };

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalItems / pageSize);

    // 페이지네이션 버튼 생성
    const renderPagination = () => {
        const maxPagesToShow = 10;  // 한 번에 보여줄 최대 페이지 수
        const pages = [];

        // 시작 페이지와 끝 페이지 계산
        const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        // 페이지 버튼 생성
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-2 py-1 border ${currentPage === i ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex justify-center gap-2 mt-4">
                {/* 이전 버튼 */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border bg-white text-black"
                >
                    이전
                </button>

                {/* 페이지 번호 */}
                {pages}

                {/* 다음 버튼 */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border bg-white text-black"
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
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4 overflow-x-hidden">
                    <section>
                        <SectionHeader title="매장분석" isList={isList} handleToggle={handleToggle} />
                    </section>

                    {/* 상단 지도와 검색 폼 */}
                    <section className="flex gap-4 py-4">
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
                                selectedQuarterMin={selectedQuarterMin}
                                setSelectedQuarterMin={setSelectedQuarterMin}
                                selectedQuarterMax={selectedQuarterMax}
                                setSelectedQuarterMax={setSelectedQuarterMax}
                                handleSearch={handleSearch}
                                handleReset={handleReset}
                            />
                        </div>
                    </section>
                    {/* 갯수 및 엑셀 다운 */}
                    <section className="w-full mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                총 <span className="text-red-500">{totalItems.toLocaleString()}</span> 개
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 bg-white text-black rounded border border-black"
                                    onClick={handleExcelDownload}>
                                    엑셀 다운로드
                                </button>
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
                        {!loading && !error && renderPagination()}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocStore;
