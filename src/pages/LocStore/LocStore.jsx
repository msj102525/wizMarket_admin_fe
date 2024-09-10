import React, { useState } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import LocStoreListSearchForm from './components/LocStoreListSearchForm';
import LocStoreList from './components/LocStoreList';
import SectionHeader from '../../components/SectionHeader';
import axios from 'axios';

const LocStore = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(20);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);
    const [totalItems, setTotalItems] = useState(0); // 총 데이터 수
    const [filters, setFilters] = useState({}); // 필터 값 상태

    const handleToggle = () => {
        setIsList(!isList);
    };

    // 검색 핸들러에서 페이지 정보 추가
    const handleSearch = async (filters) => {
        setLoading(true);
        setError(null);
        setFilters(filters); // 검색 시 필터 값을 상태에 저장

        console.log(filters)

        const pagingInfo = {
            page: currentPage,    // 현재 페이지
            page_size: pageSize,  // 페이지당 항목 수
        };

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
            setTotalItems(response.data.total_items); // 서버에서 총 데이터 수를 받아옴

            console.log(response.data.total_items)
            
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);

        // 페이지 이동 시 기존 필터 값 유지하여 검색
        handleSearch(filters);  

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
                            <LocStoreListSearchForm onSearch={handleSearch} isList={isList} />
                        </div>
                    </section>
                    
                    {/* 하단 리스트 */}
                    <section className="w-full">
                        {loading && <p>검색 결과가 없습니다.</p>}  {/* 로딩 상태 처리 */}
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
