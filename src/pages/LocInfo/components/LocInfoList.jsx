import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';


const LocInfoList = ({ data, statData }) => {
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리

    // 정렬 함수 (전체 데이터에 대해 적용)
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
            if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
            return 0;
        }
        return 0;
    });

    // 페이징 처리
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };



    const headerMapping = {
        loc_info_id: '입지 정보 코드',
        city_name: '시/도 명',
        district_name: '시/군/구 명',
        sub_district_name: '읍/면/동 명',
        shop: '매장 수',
        move_pop: '유동 인구',
        sales: '매출',
        work_pop: '직장 인구',
        income: '소득',
        spend: '소비',
        house: '세대수',
        resident: '주거인구',
        y_m: '기준년월'
    };

    const headers = Object.keys(data[0]).map(key => headerMapping[key] || key);

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

    return (
        <div className="p-4">
            <DataLengthDown data={data} headers={headers} filename="LocInfoData.xlsx" />

            {currentData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full mt-4 bg-white border-collapse border border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">상세</th>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
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
                                    업소 수
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
                                    기준년월
                                    <button onClick={() => handleSort('y_m')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
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
                                                    <span>&#9660;</span>  // 아래 방향 화살표 (유니코드: ▼)
                                                ) : (
                                                    <span>&#9654;</span>  // 오른쪽 방향 화살표 (유니코드: ▶)
                                                )}
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">loc_info_{item.loc_info_id}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.shop.toLocaleString()}개</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {Math.floor(item.sales / 10000).toLocaleString()}만원
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {Math.floor(item.income / 10000).toLocaleString()}만원
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {Math.floor(item.spend / 10000).toLocaleString()}만원
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.move_pop.toLocaleString()}명</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.resident.toLocaleString()}명</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.work_pop.toLocaleString()}명</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.house.toLocaleString()}개</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.y_m}</td>
                                    </tr>

                                    {/* 확장된 데이터 행 */}
                                    {/* 확장된 데이터 행 */}
                                    {expandedRows.includes(item.loc_info_id) && (
                                        <>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">L</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">전체</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
                                                        <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>

                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
                                                        <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
                                                        <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}명 </>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
                                                        <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>

                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
                                                        <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
                                                        <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}명 </>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
                                                        <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>

                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
                                                        <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
                                                        <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}명 </>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">최대/최소</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.MAX_VALUE}/{stat.MIN_VALUE}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
                                                        <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>

                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
                                                        <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
                                                        <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
                                                        <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
                                                        <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
                                                        <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
                                                        <>{stat.MAX_VALUE}/{stat.MIN_VALUE}개</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.J_SCORE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
                                                        <>{(stat.J_SCORE.toFixed(1)).toLocaleString()}</>  // 10,000으로 나누고, "만원" 추가
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>

                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
                                                        <>{(stat.J_SCORE.toFixed(1)).toLocaleString()}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
                                                        <>{(stat.J_SCORE).toFixed(1).toLocaleString()}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
                                                        <>{stat.J_SCORE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
                                                        <>{stat.J_SCORE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
                                                        <>{stat.J_SCORE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
                                                        <>{stat.J_SCORE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">L</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.city_name}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
                                                        <>{stat.district_name}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.AVG_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.STD_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MED_VAL.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">최대/최소</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                                <td colSpan="1" className="border px-4 py-2 text-center">
                                                    {/* 평균 값 표시 */}
                                                    {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
                                                        <>{stat.J_SCORE}</>
                                                    ))}
                                                    {/* 각 데이터 컬럼에 대한 통계 표시 */}
                                                </td>
                                            </tr>
                                        </>
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
