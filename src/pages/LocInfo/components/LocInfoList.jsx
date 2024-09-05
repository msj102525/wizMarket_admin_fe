import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';

const LocInfoList = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);  // 현재 페이지에 표시할 데이터

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            <p className="mb-8">
                총 <span className="text-red-500">{data.length.toLocaleString()}</span>개
            </p>

            {currentData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full bg-white border-collapse border border-gray-200">
                        <thead className="bg-gray-200"> 
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">번호</th>
                                <th className="border border-gray-300 px-4 py-2">코드</th>
                                <th className="border border-gray-300 px-4 py-2">시/도</th>
                                <th className="border border-gray-300 px-4 py-2">시/군/구</th>
                                <th className="border border-gray-300 px-4 py-2">읍/면/동</th>
                                <th className="border border-gray-300 px-4 py-2">업소(개)</th>
                                <th className="border border-gray-300 px-4 py-2">유동인구</th>
                                <th className="border border-gray-300 px-4 py-2">매출</th>
                                <th className="border border-gray-300 px-4 py-2">직장인구</th>
                                <th className="border border-gray-300 px-4 py-2">소득</th>
                                <th className="border border-gray-300 px-4 py-2">소비</th>
                                <th className="border border-gray-300 px-4 py-2">세대수</th>
                                <th className="border border-gray-300 px-4 py-2">주거인구</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
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