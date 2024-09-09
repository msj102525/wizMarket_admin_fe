import React, { useState } from 'react';
import KakaoMap from '../../components/KakaoMap';
import Header from '../../components/Header'; // Header 컴포넌트
import Aside from '../../components/Aside';   // Aside 컴포넌트
import SectionHeader from '../../components/SectionHeader'; // SectionHeader 컴포넌트
import PopulationSearchForm from './components/PopulationSearchForm';
import axios from 'axios';
import PopulationList from './components/PopulationList';
import Pagination from '../../components/Pagination';
import * as XLSX from 'xlsx'; // 엑셀 파일 생성 라이브러리

const Population = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isList, setIsList] = useState(false);

  // 연령대 필터를 위한 상태
  const [ageFilter, setAgeFilter] = useState({ ageGroupMin: null, ageGroupMax: null });

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

// 엑셀 다운로드 처리 함수
const handleDownloadExcel = () => {
  if (!searchResults.length) return;

  // 선택된 연령대 필터에 따른 동적 헤더 구성
  const baseHeaders = ['번호', '시/도', '시/군', '읍/면/동', '남자(%)', '여자(%)', '월'];
  const dynamicHeaders = [];

  // 나이대 필터에 맞는 헤더 추가
  if (ageFilter.ageGroupMin || ageFilter.ageGroupMax) {
    const filterOrder = ['under_10', 'age_10s', 'age_20s', 'age_30s', 'age_40s', 'age_50s', 'age_60_plus'];
    const headerLabels = ['10대 미만', '10대', '20대', '30대', '40대', '50대', '60대 이상'];

    const minIndex = ageFilter.ageGroupMin ? filterOrder.indexOf(ageFilter.ageGroupMin) : 0;
    const maxIndex = ageFilter.ageGroupMax ? filterOrder.indexOf(ageFilter.ageGroupMax) : filterOrder.length - 1;

    // 선택된 나이대 범위만 동적으로 추가
    dynamicHeaders.push(...headerLabels.slice(minIndex, maxIndex + 1));
  }

  // 최종 헤더 구성
  const headers = [...baseHeaders, ...dynamicHeaders];

  // 엑셀 데이터에 넣을 본문 구성
  const excelData = [
    headers, // 첫 번째 행은 헤더
    ...searchResults.map(item => {
      const row = [
        item.pop_id,
        item.city_name,
        item.district_name,
        item.subdistrict_name,
        item.male_percentage,
        item.female_percentage,
        item.reference_date
      ];

      // 동적으로 나이대 데이터 추가
      if (ageFilter.ageGroupMin || ageFilter.ageGroupMax) {
        const filterOrder = ['under_10', 'age_10s', 'age_20s', 'age_30s', 'age_40s', 'age_50s', 'age_60_plus'];
        
        const minIndex = ageFilter.ageGroupMin ? filterOrder.indexOf(ageFilter.ageGroupMin) : 0;
        const maxIndex = ageFilter.ageGroupMax ? filterOrder.indexOf(ageFilter.ageGroupMax) : filterOrder.length - 1;

        row.push(...filterOrder.slice(minIndex, maxIndex + 1).map(ageKey => item[ageKey]));
      }

      return row;
    })
  ];

  // 2차원 배열을 엑셀 시트로 변환
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'PopulationData');
  XLSX.writeFile(workbook, 'population_data.xlsx'); // 엑셀 파일 이름
};


  // 필터를 사용해 서버에 검색 요청을 보내는 함수
  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

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
                onClick={handleDownloadExcel}
                className="px-4 py-2 bg-white text-black rounded border border-black"
              >
                엑셀 다운로드
              </button>
            </div>

            {loading && <p>검색 결과가 없습니다.</p>}
            {error && <p className="text-red-500">오류가 발생했습니다: {error}</p>}
            
            {!loading && !error && (
              <PopulationList data={currentResults} ageFilter={ageFilter} />
            )}
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
