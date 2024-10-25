import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap';
import Header from '../../components/Header'; // Header 컴포넌트
import Aside from '../../components/Aside';   // Aside 컴포넌트
import SectionHeader from '../../components/SectionHeader'; // SectionHeader 컴포넌트
import PopulationSearchForm from './components/PopulationSearchForm';
import axios from 'axios';
import PopulationList from './components/PopulationList';


const Population = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isList, setIsList] = useState(false);

  // 연령대 필터를 위한 상태
  const [ageFilter, setAgeFilter] = useState({ ageGroupMin: null, ageGroupMax: null });
  const [filters, setFilters] = useState({});  // 필터 상태

  const handleToggle = () => {
    setIsList(!isList);
  };

  // 숫자형 데이터를 합산하고 그 외 필드는 첫 번째 데이터 유지
  const mergeDataPairs = (data) => {
    const mergedData = [];

    for (let i = 0; i < data.length; i += 2) {
      const first = data[i];
      const second = data[i + 1] || {}; // 두 번째 데이터가 없을 경우 빈 객체로 처리
      const totalPopulationSum = (first.total_population || 0) + (second.total_population || 0);

       // 남자와 여자의 비율 계산
       const male_population = first.total_population

      const female_population = second.total_population

      const db_age_under_10 = (first.age_under_10 || 0) + (second.age_under_10 || 0)
      const db_age_10s = (first.age_10s || 0) + (second.age_10s || 0)
      const db_age_20s = (first.age_20s || 0) + (second.age_20s || 0)
      const db_age_30s = (first.age_30s || 0) + (second.age_30s || 0)
      const db_age_40s = (first.age_40s || 0) + (second.age_40s || 0)
      const db_age_50s = (first.age_50s || 0) + (second.age_50s || 0)
      const db_age_60_plus = (first.age_60_plus || 0) + (second.age_60_plus || 0)

      const merged = {
        pop_id: first.pop_id, // 첫 번째 데이터의 pop_id 사용
        city_name: first.city_name, // 첫 번째 데이터의 지역명 사용
        district_name: first.district_name,
        sub_district_name: first.sub_district_name,
        reference_date: first.reference_date, // 월 정보도 첫 번째 데이터로 유지
        total_population: totalPopulationSum,
        male_population: male_population,  // 계산된 남자 비율
        female_population: female_population,  // 계산된 여자 비율
        age_under_10: db_age_under_10,
        age_10s: db_age_10s,
        age_20s: db_age_20s,
        age_30s: db_age_30s,
        age_40s: db_age_40s,
        age_50s: db_age_50s,
        age_60_plus: db_age_60_plus,
      };
      mergedData.push(merged);
    }

    return mergedData;
  };

  // 엑셀 다운로드 처리 함수
  const handleDownloadExcel = async (filters) => {
    try {
      // POST 요청으로 필터 값과 함께 엑셀 다운로드 요청
      const response = await axios.post(
        `${process.env.REACT_APP_FASTAPI_BASE_URL}/population/download`,
        { ...filters },  // 필터 값만 전송
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',  // 엑셀 파일을 Blob으로 받기 위해 설정
        }
      );

      // Blob 데이터로부터 파일 URL 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // 임시 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'population_data.xlsx'); // 파일명 설정
      document.body.appendChild(link);
      link.click();  // 링크 클릭하여 다운로드 실행
      link.remove(); // 다운로드 완료 후 링크 제거
    } catch (error) {
      console.error('엑셀 다운로드 오류:', error);
    }
  };


  // 필터를 사용해 서버에 검색 요청을 보내는 함수
  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

    setFilters(filters);

    // 연령대 필터 상태 설정
    setAgeFilter({ ageGroupMin: filters.ageGroupMin, ageGroupMax: filters.ageGroupMax });

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
      // 성별 필터가 있는 경우 데이터를 합치지 않고 그대로 보여줌
      const hasGenderFilter = filters.gender === '1' || filters.gender === '2';

      // 성별 필터가 없으면 데이터를 합침
      const mergedResults = hasGenderFilter ? response.data.filtered_data : mergeDataPairs(response.data.filtered_data);

      setSearchResults(mergedResults); // 병합된 데이터를 상태로 저장
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
            <SectionHeader title="전국 인구 정보" isList={isList} handleToggle={handleToggle} />
          </section>
          {/* 상단 지도와 검색 폼 */}
          <section className="flex gap-4 py-4">
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
            <div className="flex justify-between items-center mb-4">
              <p>총 <span className="text-red-500">{searchResults.length}</span> 개</p>
              <button
                onClick={() => handleDownloadExcel(filters)}
                className="px-4 py-2 bg-white text-black rounded border border-black"
              >
                엑셀 다운로드
              </button>
            </div>

            {loading && <p>검색 결과가 없습니다.</p>}
            {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}

            {!loading && !error && (
              <PopulationList data={searchResults} ageFilter={ageFilter} />
            )}
          </section>
          
        </main>
      </div>
    </div>
  );
};

export default Population;
