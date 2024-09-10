import React, {  useState } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import LocInfoList from './components/LocInfoList';
import LocInfoListSearchForm from './components/LocInfoListSearchForm';
import SectionHeader from '../../components/SectionHeader';


const LocInfo = () => {
    
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isList, setIsList] = useState(false);
    const handleToggle = () => {
        setIsList(!isList);
    };


    // 필터를 사용해 서버에 검색 요청을 보내는 함수
    const handleSearch = async (filters) => {
        setLoading(true);
        setError(null);

        console.log(filters)

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
            
        } catch (err) {
            console.error('검색 오류:', err);
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
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
                            <LocInfoListSearchForm onSearch={handleSearch} isList={isList} /> 
                        </div>
                    </section>
                    {/* 하단 리스트 */}
                    <section className="w-full">
                        {loading && <p>검색 결과가 없습니다.</p>}  {/* 로딩 상태 처리 */}
                        {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}  {/* 오류 상태 처리 */}

                        {/* 데이터가 있으면 리스트 출력 */}
                        {!loading && !error && <LocInfoList data={searchResults} />}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocInfo;
