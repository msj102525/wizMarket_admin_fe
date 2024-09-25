import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';

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

    
    console.log(data)

    const headerMapping = {
        loc_info_id : '입지 정보 코드',
        city_name : '시/도 명',
        district_name : '시/군/구 명', 
        sub_district_name : '읍/면/동 명',
        SHOP : '매장 수',
        MOVE_POP : '유동 인구',
        SALES : '매출',
        WORK_POP : '직장 인구',
        INCOME : '소득',
        SPEND : '소비',	
        HOUSE : '세대수',
        RESIDENT : '주거인구',
        ref:'출처'
    };

    const headers = Object.keys(data[0]).map(key => headerMapping[key] || key);

    return (
        <div className="p-4">
            <DataLengthDown data={data} headers={headers} filename="LocInfoData.xlsx" />

            
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
                                        업소 평균 매출
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
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                        출처
                                        <button onClick={() => handleSort('REF')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                            <span className="text-xs">▲</span>
                                            <span className="text-xs">▼</span>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item, index) => (
                                <tr key={item.loc_info_id}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.loc_info_id}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.shop.toLocaleString()}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.move_pop.toLocaleString()}명</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.sales.toLocaleString()}원</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.work_pop.toLocaleString()}명</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.income.toLocaleString()}원</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.spend.toLocaleString()}원</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.house.toLocaleString()}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.resident.toLocaleString()}명</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.ref}</td>
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