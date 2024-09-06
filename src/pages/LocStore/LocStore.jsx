import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap';
import Header from '../../components/Header'; // Header 컴포넌트
import Aside from '../../components/Aside';   // Aside 컴포넌트
import SectionHeader from '../../components/SectionHeader'; // SectionHeader 컴포넌트
import LocStoreListSearchForm from './components/LocStoreListSearchForm.jsx';

const LocStore = () => {

  const [isList, setIsList] = useState(false);
  const handleToggle = () => {
    setIsList(!isList);
  };

  const handleSearch = (filters) => {
    console.log('Filters applied: ', filters);
    // API 요청 또는 다른 검색 로직 추가
  };
  


  return (
    <div>
      <Header />
      <div className="flex">
        <Aside />
        <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
          <section>
            <SectionHeader title="매장 정보" isList={isList} handleToggle={handleToggle} />
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

          {/* SectionHeader 섹션 */}

        </main>
      </div>
    </div>
  );
};

export default LocStore;
