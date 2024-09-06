import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import * as XLSX from 'xlsx';

const LocInfoList = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);  // 현재 페이지에 표시할 데이터

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 정렬 함수
    const sortedData = [...currentData].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
            if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
            return 0;
        }
        return currentData;  // 정렬 상태 없으면 그대로 반환
    });

    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleExcelDownload = () => {
        // 테이블 헤더 설정 (한글 컬럼명으로 설정)
        const headers = [
            "번호", 
            "코드", 
            "시/도", 
            "시/군/구", 
            "읍/면/동", 
            "업소 (개)", 
            "유동인구", 
            "매출", 
            "직장인구", 
            "소득", 
            "소비", 
            "세대수", 
            "주거인구"
        ];
    
        
        const tableData = data.map((item, index) => [
            indexOfFirstItem + index + 1,  // 번호
            item.LOC_INFO_ID,              // 코드
            item.city_name,                // 시/도
            item.district_name,            // 시/군/구
            item.sub_district_name,        // 읍/면/동
            item.SHOP,                     // 업소 (개)
            item.MOVE_POP,                 // 유동인구
            item.SALES,                    // 매출
            item.WORK_POP,                 // 직장인구
            item.INCOME,                   // 소득
            item.SPEND,                    // 소비
            item.HOUSE,                    // 세대수
            item.RESIDENT                  // 주거인구
        ]);
    
        // 헤더와 데이터를 결합 (헤더 + 데이터 배열)
        const worksheetData = [headers, ...tableData];
    
        // 엑셀 시트 생성
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, 'table_data.xlsx');
    };
    

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <p>
                    총 <span className="text-red-500">{data.length.toLocaleString()}</span>개
                </p>
                <button
                    className="px-4 py-2 bg-white text-black rounded border border-black"
                    onClick={handleExcelDownload}
                >
                    엑셀 다운로드
                </button>
            </div>
            

            {currentData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full bg-white border-collapse border border-gray-200">
                        <thead className="bg-gray-200"> 
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">번호</th>
                                <th className="border border-gray-300 px-4 py-2">코드</th>
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
                                        업소 (개)
                                        <button onClick={() => handleSort('SHOP')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        유동인구
                                        <button onClick={() => handleSort('MOVE_POP')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        매출
                                        <button onClick={() => handleSort('SALES')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        직장인구
                                        <button onClick={() => handleSort('WORK_POP')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        소득
                                        <button onClick={() => handleSort('INCOME')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        소비
                                        <button onClick={() => handleSort('SPEND')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        세대수
                                        <button onClick={() => handleSort('HOUSE')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        주거인구
                                        <button onClick={() => handleSort('RESIDENT')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item, index) => (
                                <tr key={item.LOC_INFO_ID}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.LOC_INFO_ID}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SHOP}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.MOVE_POP}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SALES}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.WORK_POP}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.INCOME}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SPEND}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.HOUSE}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.RESIDENT}</td>
                                </tr>
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