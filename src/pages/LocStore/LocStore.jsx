import React, {  useState } from 'react';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import LocStoreListSearchForm from './components/LocStoreListSearchForm';
import SectionHeader from '../../components/SectionHeader';


const LocInfo = () => {
    
    const [isList, setIsList] = useState(false);
    const handleToggle = () => {
        setIsList(!isList);
    };


    // 필터를 사용해 서버에 검색 요청을 보내는 함수
    const handleSearch = async (filters) => {
        console.log('dqw')
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <section>
                        <SectionHeader title="매징분석" isList={isList} handleToggle={handleToggle} />
                    </section>

                    {/* 상단 지도와 검색 폼 */}
                    <section className="flex gap-4  py-4">
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
                    
                </main>
            </div>
        </div>
    );
};

export default LocInfo;
