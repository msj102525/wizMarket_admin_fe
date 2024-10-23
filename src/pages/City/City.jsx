import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header'; // Header 컴포넌트
import Aside from '../../components/Aside';   // Aside 컴포넌트
import SectionHeader from '../../components/SectionHeader'; // SectionHeader 컴포넌트
import CitySearchForm from './components/CitySearchForm'; // LocationSearchForm 컴포넌트
import CityCountAllForm from './components/CityCountAllForm.jsx'; // LocationSearchForm 컴포넌트
import CityCountSearchForm from './components/CityCountSearchForm.jsx';
import CitySearchList from './components/CitySearchList.jsx';
import { useCities } from '../../hooks/useCities';
import Pagination from '../../components/Pagination.jsx';
import { utils, writeFile } from 'xlsx';

const PageComponent = () => {
    const [isList, setIsList] = useState(true); // 예시 상태, 필요에 따라 설정하세요
    const handleToggle = () => setIsList(!isList); // 예시 토글 함수, 필요에 맞게 설정
    const [cityCounts, setCityCounts] = useState({ cities: 0, districts: 0, subDistricts: 0 });
    const [filteredResults, setFilteredResults] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
    const [resultsPerPage] = useState(20);  // 페이지당 표시할 결과 수

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

    // 페이지 로드 시 전체 갯수 계산
    useEffect(() => {
        const fetchCityCounts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/city/locations`);
                setCityCounts({
                    cities: response.data.cities.length,
                    districts: response.data.districts.length,
                    subDistricts: response.data.sub_districts.length,
                });
            } catch (error) {
                console.error('Failed to fetch city counts:', error);
            }
        };

        fetchCityCounts();
    }, []);

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);


    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 검색 결과에 해당하게끔 엑셀 다운
    const handleExcelDownload = () => {
        // 필드에 따라 동적으로 헤더 설정
        const headers = ['번호', '코드'];  // 기본 헤더에 '코드' 항목 추가
    
        // 결과 데이터에 따른 동적 헤더 구성
        if (filteredResults.length > 0) {
            // City Name이 있는지 확인하고 추가
            if (filteredResults[0].hasOwnProperty('city_name')) {
                headers.push('시/도');
            }
            // District Name이 있는지 확인하고 추가
            if (filteredResults[0].hasOwnProperty('district_name')) {
                headers.push('시/군/구');
            }
            // SubDistrict Name이 있는지 확인하고 추가
            if (filteredResults[0].hasOwnProperty('sub_district_name')) {
                headers.push('읍/면/동');
            }
        }
    
        // 데이터에 맞게 결과 데이터를 배열로 변환
        const dataWithHeaders = [
            headers,  // 첫 줄에 헤더
            ...filteredResults.map(item => {
                const row = [item.number];  // 기본적으로 번호 추가
                
                // '코드'에 city_id, district_id, sub_district_id 중 적절한 값 추가
                if (item.hasOwnProperty('sub_district_id')) {
                    row.push(item.sub_district_id);
                } else if (item.hasOwnProperty('district_id')) {
                    row.push(item.district_id);
                } else if (item.hasOwnProperty('city_id')) {
                    row.push(item.city_id);
                } else {
                    row.push('');  // 해당하는 코드가 없을 경우 빈 값 처리
                }
    
                // City Name이 있으면 추가
                if (item.hasOwnProperty('city_name')) {
                    row.push(item.city_name);
                }
                // District Name이 있으면 추가
                if (item.hasOwnProperty('district_name')) {
                    row.push(item.district_name);
                }
                // SubDistrict Name이 있으면 추가
                if (item.hasOwnProperty('sub_district_name')) {
                    row.push(item.sub_district_name);
                }
    
                return row;
            })
        ];
    
        // 엑셀 워크시트 생성
        const worksheet = utils.aoa_to_sheet(dataWithHeaders);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "SearchResults");
    
        // 엑셀 파일 다운로드
        writeFile(workbook, "search_results.xlsx");
    };


    
    // 조건 별 검색 함수
    const handleSearch = (city, district, subDistrict) => {
    
        // 아무 값도 선택하지 않은 경우: 전체 시/도 목록을 표시
        if (!city && !district && !subDistrict) {
            const results = cities.map((cityItem, index) => ({
                number: index + 1,
                city_id: cityItem[0],  // 시/도 ID
                city_name: cityItem[1],  // 시/도 이름
            }));
    

            setFilteredResults(results);
            setCurrentPage(1);
            return;
        }
    
        // city만 선택된 경우: 해당 시/군/구 목록을 출력
        if (city && !district && !subDistrict) {
            const filteredDistricts = districts.filter(d => d[1] === Number(city));
            const results = filteredDistricts.map((districtItem, index) => ({
                number: index + 1,
                district_id: districtItem[0],  // 군/구 ID
                city_name: cities.find(c => c[0] === Number(city))?.[1],  // 시/도 이름
                district_name: districtItem[2],  // 군/구 이름
            }));
    
            setFilteredResults(results);
            setCurrentPage(1);
            return;
        }
    
        // city와 district가 선택된 경우: 해당 군/구에 속하는 읍/면/동 목록을 출력
        if (city && district && !subDistrict) {
            const filteredSubDistricts = subDistricts.filter(sd => sd[1] === Number(district));
            const city_name = cities.find(c => c[0] === Number(city))?.[1];
            const results = filteredSubDistricts.map((subDistrictItem, index) => ({
                number: index + 1,
                sub_district_id: subDistrictItem[0],  // 읍/면/동 ID
                city_name: city_name,
                district_name: districts.find(d => d[0] === Number(district))?.[2],  // 군/구 이름
                sub_district_name: subDistrictItem[3],  // 읍/면/동 이름
            }));
    
            setFilteredResults(results);
            setCurrentPage(1);
            return;
        }

        // city, district, sub_district가 모두 선택된 경우: 해당 sub_district만 출력
        if (city && district && subDistrict) {
            const filteredSubDistricts = subDistricts.filter(sd => sd[0] === Number(subDistrict));
            
            // city_name과 district_name을 찾아서 추가
            const city_name = cities.find(c => c[0] === Number(city))?.[1];
            const district_name = districts.find(d => d[0] === Number(district))?.[2];

            const results = filteredSubDistricts.map((subDistrictItem, index) => ({
                number: index + 1,
                sub_district_id: subDistrictItem[0], // 읍/면/동 ID
                city_name: city_name,  // 시/도 이름
                district_name: district_name,  // 군/구 이름
                sub_district_name: subDistrictItem[3],  // 읍/면/동 이름
            }));

            setFilteredResults(results);
            setCurrentPage(1);
            return;
        }
        

    };
    
    

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    
                    {/* SectionHeader 섹션 */}
                    <section>
                        <SectionHeader title="Address Table" isList={isList} handleToggle={handleToggle} />
                    </section>

                    {/* 지역 검색 폼 섹션 */}
                    <section className="bg-white p-4">
                        <CitySearchForm 
                            cities={cities} 
                            districts={districts} 
                            subDistricts={subDistricts} 
                            city={city} 
                            district={district} 
                            subDistrict={subDistrict} 
                            setCity={setCity} 
                            setDistrict={setDistrict} 
                            setSubDistrict={setSubDistrict}
                            onSearch={handleSearch}
                        />
                        
                    </section>

                    {/* 모든 지역 카운트 */}
                    <section className="bg-white px-4 pb-4">
                        <CityCountAllForm cityCounts={cityCounts} />
                    </section>

                    {/* 지역 검색 카운트 */}
                    <section className="bg-white px-4 pb-4 flex justify-between items-center">
                        <CityCountSearchForm 
                            cities={cities} 
                            districts={districts} 
                            subDistricts={subDistricts} 
                        />
                        <button
                            className="px-4 py-2 bg-white text-black rounded border"
                            onClick={handleExcelDownload}
                        >
                            엑셀 다운로드
                        </button>
                    </section>

                    {/* 지역 검색 리스트 */}
                    <section className="bg-white px-4 pb-4">
                        <CitySearchList results={currentResults} />
                    </section>

                    {/* 페이징 */}
                    <section className="bg-white px-4 pb-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredResults.length / resultsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PageComponent;
