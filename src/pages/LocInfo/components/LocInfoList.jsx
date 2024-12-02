import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import ExpandedRow from './LocInfoListExpandedRow';
import * as XLSX from 'xlsx';


const LocInfoList = ({ searchData = [], nationJScore, filterCorrData, statDataByRegion, filterSet, baseData=[] }) => {
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리

    // 정렬 함수 (전체 데이터에 대해 적용)
    const sortedData = [...searchData].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;

            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (sortConfig.direction === 'asc') {
                // 오름차순: null -> 0 -> 값
                if (aValue === null && bValue !== null) return -1;
                if (aValue !== null && bValue === null) return 1;
                if (aValue === 0 && bValue !== 0) return -1;
                if (aValue !== 0 && bValue === 0) return 1;
            } else {
                // 내림차순: 값 -> 0 -> null
                if (aValue !== null && bValue === null) return -1;
                if (aValue === null && bValue !== null) return 1;
                if (aValue !== 0 && bValue === 0) return -1;
                if (aValue === 0 && bValue !== 0) return 1;
            }

            // 일반적인 값 비교
            if (aValue < bValue) return -1 * direction;
            if (aValue > bValue) return 1 * direction;
            return 0;
        }
        return 0;
    });


    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 페이징 처리
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

    const totalPages = Math.ceil(searchData.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 펼치기
    const [expandedRows, setExpandedRows] = useState([]);

    // 특정 row를 펼치고 닫는 toggle 함수
    const toggleExpand = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter(id => id !== rowId)); // 이미 확장된 경우 제거
        } else {
            setExpandedRows([...expandedRows, rowId]); // 확장되지 않은 경우 추가
        }
    };

    // 지역 필터값에 따른 j_score 찾기 함수
    const findJScoreByRegion = (searchData, targetItem, statDataByRegion) => {

        const stat = statDataByRegion.find(stat =>
            stat.ref_date === searchData.y_m &&
            stat.city_name === searchData.city_name &&
            stat.district_name === searchData.district_name &&
            stat.sub_district_name === searchData.sub_district_name &&
            stat.target_item === targetItem
        );

        // 조건에 맞는 stat이 있을 때 j_score 반환, 없으면 "-"
        return stat && stat.j_score !== null ? stat.j_score.toFixed(2) : "";
    };

    // 지역 필터값에 따른 j_score 찾기 함수
    const findJScoreByRegionNonOutliners = (searchData, targetItem, statDataByRegion) => {

        const stat = statDataByRegion.find(stat =>
            stat.ref_date === searchData.y_m &&
            stat.city_name === searchData.city_name &&
            stat.district_name === searchData.district_name &&
            stat.sub_district_name === searchData.sub_district_name &&
            stat.target_item === targetItem
        );

        // 조건에 맞는 stat이 있을 때 j_score 반환, 없으면 "-"
        return stat && stat.j_score_non_outliers !== null ? stat.j_score_non_outliers.toFixed(2) : "";
    };

    const handleExcelDownload = () => {
        // 필요한 컬럼만 포함된 데이터를 변환합니다.
        const filteredData = searchData.map(item => ({
            '시/도 명': item.city_name,
            '시/군/구 명': item.district_name,
            '읍/면/동 명': item.sub_district_name,
            '업소 수': item.shop,
            '업소 평균 매출': item.sales,
            '평균 소득': item.income,
            '평균 소비': item.spend,
            '유동 인구': item.move_pop,
            '직장 인구': item.work_pop,
            '주거 인구': item.resident,
            '세대 수': item.house,
            'Rank J-Score': item.j_score_rank,
            'Per J-Score(제거 전)': item.j_score_per,
            'Per J-Score(제거 후)': item.j_score_per_non_outliers,
            'J-Score(제거 전)': item.j_score,
            'J-Score(제거 후)': item.j_score_non_outliers,
            '기준년월': item.ref_date,
        }));

        // JSON 데이터를 엑셀 시트로 변환
        const worksheet = XLSX.utils.json_to_sheet([]);

        // 첫 행에 문구 삽입
        XLSX.utils.sheet_add_aoa(worksheet, [['* 이상치 제거 방법 : 항목별 내림차순 정렬 후 1번 값 - 2번 값 > 항목의 표준 편차 -> 이상치로 판단 후 제거']], { origin: 'A1' });

        // 2행에 헤더 수동으로 추가
        const headers = [
            '시/도 명', '시/군/구 명', '읍/면/동 명', '업소 수', '업소 평균 매출', '평균 소득',
            '평균 소비', '유동 인구', '직장 인구', '주거 인구', '세대 수', 'Rank J-Score',
            'Per J-Score(제거 전)', 'Per J-Score(제거 후)', 'J-Score(제거 전)', 'J-Score(제거 후)',
            '기준년월'
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A2' });

        // 데이터는 A3부터 삽입, 헤더 추가 방지를 위해 skipHeader: true 설정
        XLSX.utils.sheet_add_json(worksheet, filteredData, { origin: 'A3', skipHeader: true });

        // 엑셀 파일 생성 및 다운로드
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const today = new Date().toISOString().split('T')[0];
        XLSX.writeFile(workbook, `입지 정보_${today}.xlsx`);
    };

    const [isOpen, setIsOpen] = useState(false); // 테이블의 열림/닫힘 상태

    const toggleOpen = () => {
        setIsOpen(!isOpen); // 열고 닫는 상태를 반전시킴
    };



    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <p>
                    총 <span className="text-red-500">{searchData.length.toLocaleString()}</span>개
                </p>
                <button
                    className="px-4 py-2 bg-white text-black rounded border border-black"
                    onClick={handleExcelDownload}
                >
                    엑셀 다운로드
                </button>
            </div>
            <div className='p-2'>
                <p className="text-s mb:text-sm text-gray-500">
                    *기본 검색 시 괄호는 해당하는 항목에 대한 이상치 제거 전/후 J-Score
                </p>
                <p className="text-s mb:text-sm text-gray-500">
                    *기본 검색 시 J-Score는 검색한 지역 범위 내에서 점수
                </p>
                <p className="text-s mb:text-sm text-gray-500">
                    *확장 검색 시 괄호는 Rank 와 Per J-Score (Rank는 제거 사항 아님)
                </p>

            </div>
            <div className='p-2'>
                <button onClick={toggleOpen} className="text-s mb:text-sm text-gray-500 px-2 py-1 mb-1 border-2 border-gray-500 rounded">
                    {isOpen ? '가이드 닫기' : '이상치 가이드'}
                </button>
                {isOpen && (
                    <div className='mt-4 ml-4'>
                        <p className="text-s mb:text-sm text-gray-500">
                            1. 각 동마다 항목 별 값 내림차순 정렬
                        </p>
                        <p className="text-s mb:text-sm text-gray-500">2. 1번 값 - 2번 값이 항목의 표준편차 보다 클 경우 이상치로 판단 후 제거</p>
                        <p className="text-s mb:text-sm text-gray-500">3. 최대 3번까지 시행</p>
                        <p className="text-s mb:text-sm text-gray-500">4. 제거 된 이상치는 10점으로 계산</p>
                        <p className="text-s mb:text-sm text-gray-500">5. 이상치를 제외 후 최대 값 추출 후 Per J-Score 계산</p>
                        <p className="text-s mb:text-sm text-gray-500">6. 새로 계산된 Per J-Score와 기존의 Rank J-Score의 평균 &rarr; 최종 J-Score</p>
                    </div>
                )}
            </div>

            {baseData[0] && (
                <div>
                    <p className="mt-2 ml-4 text-lg text-gray-700">
                        기준 : {baseData[0].city_name} {baseData[0].district_name} {baseData[0].sub_district_name} - {(baseData[0].j_score_non_outliers).toFixed(2)}점
                    </p>
                    <p className="mt-2 ml-4 text-lg text-black">
                        범위 : 
                        {(baseData[0].j_score_non_outliers * 0.9).toFixed(2)} ~ 
                        {(baseData[0].j_score_non_outliers * 1.1).toFixed(2)} (±10%)
                    </p>
                </div>
            )}


            {currentData.length === 0 ? (
                <p className='mt-4 ml-4'>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full mt-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">상세</th>
                                <th className="border border-gray-300 px-4 py-2">IDX</th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    시/도
                                    <button onClick={() => handleSort('city_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    시/군/구
                                    <button onClick={() => handleSort('district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    읍/면/동
                                    <button onClick={() => handleSort('sub_district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    업소 수(J-Score)
                                    <button onClick={() => handleSort('shop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    업소 평균 매출
                                    <button onClick={() => handleSort('sales')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    평균소득
                                    <button onClick={() => handleSort('income')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    평균소비
                                    <button onClick={() => handleSort('spend')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    유동인구
                                    <button onClick={() => handleSort('move_pop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    직장인구
                                    <button onClick={() => handleSort('work_pop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    주거인구
                                    <button onClick={() => handleSort('resident')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    세대수
                                    <button onClick={() => handleSort('house')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    Rank/Per J-Score
                                    <button onClick={() => handleSort('j_score_rank')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    Per J-Score (이상치 제거)
                                    <button onClick={() => handleSort('j_score_per_non_outliers')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    J-Score
                                    <button onClick={() => handleSort('j_score')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    J-Score(이상치 제거)
                                    <button onClick={() => handleSort('j_score_non_outliers')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    기준년월
                                    <button onClick={() => handleSort('y_m')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="light-gray-text">
                            {currentData.map((item, index) => (
                                <React.Fragment key={item.loc_info_id}>
                                    {/* 기본 데이터 행 */}
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                className="text-gray-500 focus:outline-none"
                                                onClick={() => toggleExpand(item.loc_info_id)}
                                            >
                                                {/* 펼쳐졌을 때 아래 방향 화살표, 그렇지 않으면 오른쪽 방향 화살표 */}
                                                {expandedRows.includes(item.loc_info_id) ? (
                                                    <span>&#xFE3F;</span>  // 아래 방향 화살표 (유니코드: ▼)
                                                ) : (
                                                    <span>&#xFE40;</span>  // 오른쪽 방향 화살표 (유니코드: ▶)
                                                )}
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1 + (currentPage - 1) * pageSize}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.shop === null || item.shop === '-' ? '-' : `${item.shop.toLocaleString()}개 `}
                                            {findJScoreByRegion(item, 'shop', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'shop', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'shop', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'shop', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'shop', statDataByRegion) ? ")" : ""}
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.sales === null || item.sales === '-' ? '-' : `${Math.floor(item.sales / 10000).toLocaleString()}만원 `}
                                            {findJScoreByRegion(item, 'sales', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'sales', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'sales', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'sales', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'sales', statDataByRegion) ? ")" : ""}
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.income === null || item.income === '-' ? '-' : `${Math.floor(item.income / 10000).toLocaleString()}만원 `}
                                            {findJScoreByRegion(item, 'income', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'income', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'income', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'income', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'income', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.spend === null || item.spend === '-' ? '-' : `${Math.floor(item.spend / 10000).toLocaleString()}만원 `}
                                            {findJScoreByRegion(item, 'spend', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'spend', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'spend', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'spend', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'spend', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.move_pop === null || item.move_pop === '-' ? '-' : `${item.move_pop.toLocaleString()}명 `}
                                            {findJScoreByRegion(item, 'move_pop', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'move_pop', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'move_pop', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'move_pop', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'move_pop', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.work_pop === null || item.work_pop === '-' ? '-' : `${item.work_pop.toLocaleString()}명 `}
                                            {findJScoreByRegion(item, 'work_pop', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'work_pop', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'work_pop', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'work_pop', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'work_pop', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.resident === null || item.resident === '-' ? '-' : `${item.resident.toLocaleString()}명 `}
                                            {findJScoreByRegion(item, 'resident', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'resident', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'resident', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'resident', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'resident', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.house === null || item.house === '-' ? '-' : `${item.house.toLocaleString()}개 `}
                                            {findJScoreByRegion(item, 'house', statDataByRegion)
                                                ? `(${findJScoreByRegion(item, 'house', statDataByRegion)}/`
                                                : ""}
                                            {findJScoreByRegionNonOutliners(item, 'house', statDataByRegion) && (
                                                <strong>{findJScoreByRegionNonOutliners(item, 'house', statDataByRegion)}</strong>
                                            )}
                                            {findJScoreByRegion(item, 'house', statDataByRegion) ? ")" : ""}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score_rank === null || item.j_score_rank === '-' ? '-' : `${item.j_score_rank.toFixed(2)} `}/
                                            {item.j_score_per === null || item.j_score_per === '-' ? '-' : `${item.j_score_per.toFixed(2)} `}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score_per_non_outliers === null || item.j_score_per_non_outliers === '-'
                                                ? '-'
                                                : <strong>{item.j_score_per_non_outliers.toFixed(2)}</strong>
                                            }
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score === null || item.j_score === '-' ? '-' : `${item.j_score.toFixed(2)} `}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score_non_outliers === null || item.j_score_non_outliers === '-'
                                                ? '-'
                                                : <strong>{item.j_score_non_outliers.toFixed(2)}</strong>
                                            }
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.y_m}</td>
                                    </tr>

                                    {/* 확장된 데이터 행 */}
                                    {/* 확장된 데이터 행 */}
                                    {expandedRows.includes(item.loc_info_id) && (
                                        <ExpandedRow
                                            item={item}
                                            nationJScore={nationJScore}
                                            filterCorrData={filterCorrData}
                                            statDataByRegion={statDataByRegion}
                                            filterSet={filterSet}
                                            className="expanded-row-text"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* 페이지네이션 컴포넌트 */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default LocInfoList;
