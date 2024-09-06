import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap';
import Header from '../../components/Header'; // Header 컴포넌트
import Aside from '../../components/Aside';   // Aside 컴포넌트
import SectionHeader from '../../components/SectionHeader'; // SectionHeader 컴포넌트
import PopulationSearchForm from './components/PopulationSearchForm'
import axios from 'axios';
import PopulationList from './components/PopulationList'
import Pagination from '../../components/Pagination';

const Population = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isList, setIsList] = useState(false);

  // 페이지네이션을 위한 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20; // 한 페이지에 표시할 항목 수

  const handleToggle = () => {
    setIsList(!isList);
  };


  // 숫자형 데이터를 합산하고 그 외 필드는 첫 번째 데이터 유지
  const mergeDataPairs = (data) => {
    const mergedData = [];

    for (let i = 0; i < data.length; i += 2) {
      const first = data[i];
      const second = data[i + 1] || {}; // 두 번째 데이터가 없을 경우 빈 객체로 처리

      console.log(first)

      const merged = {
        pop_id: first.pop_id, // 첫 번째 데이터의 pop_id 사용
        city_name: first.city_name, // 첫 번째 데이터의 지역명 사용
        district_name: first.district_name,
        subdistrict_name: first.subdistrict_name,
        reference_date: first.reference_date, // 월 정보도 첫 번째 데이터로 유지

        // 숫자형 데이터는 합산
        male_percentage: (first.male_percentage || 0) + (second.male_percentage || 0),
        female_percentage: (first.female_percentage || 0) + (second.female_percentage || 0),
        under_10: (first.under_10 || 0) + (second.under_10 || 0),
        age_10s: (first.age_10s || 0) + (second.age_10s || 0),
        age_20s: (first.age_20s || 0) + (second.age_20s || 0),
        age_30s: (first.age_30s || 0) + (second.age_30s || 0),
        age_40s: (first.age_40s || 0) + (second.age_40s || 0),
        age_50s: (first.age_50s || 0) + (second.age_50s || 0),
        age_60_plus: (first.age_60_plus || 0) + (second.age_60_plus || 0)
      };

      mergedData.push(merged);
    }

    return mergedData;
  };

  // 필터를 사용해 서버에 검색 요청을 보내는 함수
  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FASTAPI_BASE_URL}/population/select_population`,
        filters,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const mergedResults = mergeDataPairs(response.data.filtered_data); // 짝수 데이터 합치기
      setSearchResults(mergedResults); // 병합된 데이터를 상태로 저장
    } catch (err) {
      console.error('검색 오류:', err);
      setError('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };


  // 현재 페이지에 해당하는 데이터 슬라이싱
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      <Header />
      <div className="flex">
        <Aside />
        <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
          <section>
            <SectionHeader title="전국 인구 정보" isList={isList} handleToggle={handleToggle} />
          </section>
          {/* 상단 지도와 검색 폼 */}
          <section className="flex gap-4  py-4">
            {!isList && (
              <div className='flex-1'>
                <KakaoMap />
              </div>
            )}
            <div className='flex-1'>
              <PopulationSearchForm onSearch={handleSearch} isList={isList} />
            </div>
          </section>

          <section className="w-full">
            {loading && <p>검색 결과가 없습니다.</p>}  {/* 로딩 상태 처리 */}
            {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}  {/* 오류 상태 처리 */}

            {/* 데이터가 있으면 리스트 출력 */}
            {!loading && !error && <PopulationList data={currentResults} />}
          </section>
          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(searchResults.length / resultsPerPage)}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
};

export default Population;
