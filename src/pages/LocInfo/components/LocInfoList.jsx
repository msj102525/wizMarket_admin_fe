import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';
import ExpandedRow from './LocInfoListExpandedRow';


const LocInfoList = ({ data = [], statData, filterCorrData, regionStat, filterForFind }) => {
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

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const headerMapping = {
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
        y_m: '기준년월',
        j_score_rank: 'Rank J-Score(가중치)',
        j_score_per: 'Per J-Score(가중치)'
    };

    const headers = data.length > 0 && data[0] ? Object.keys(data[0]).map(key => headerMapping[key] || key) : [];
    const today = new Date().toISOString().split('T')[0];

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

    // 지역 필터값에 따른 j_score_rank 찾기 함수
    const findJScoreByRegion = (data, targetItem, regionStat) => {

        const stat = regionStat.find(stat =>
            stat.ref_date === data.y_m &&
            stat.city_name === data.city_name &&
            stat.district_name === data.district_name &&
            stat.sub_district_name === data.sub_district_name &&
            stat.target_item === targetItem
        );

        // 조건에 맞는 stat이 있을 때 j_score 반환, 없으면 "-"
        return stat && stat.j_score !== null ? stat.j_score.toFixed(2) : "";
    };


    



    return (
        <div className="p-4">
            <DataLengthDown data={data} headers={headers} filename={`입지정보_${today}.xlsx`} />
            {/* <DataLengthDown
                data={{
                    city_id: data.city_id,
                    district_id: data.district_id,
                    sub_district_id: data.sub_district_id,
                    shop: data.shop,
                    income: data.income,
                    spend: data.spend,
                    move_pop: data.move_pop,
                    work_pop: data.wokr_pop,
                    resident: data.resident,
                    house: data.house,
                    j_score_rank: data.j_score_rank,
                    j_score_per: data.j_score_per,
                    length:data.length
                }}
                headers={headers}
                filename={`입지정보_${today}.xlsx`}
            /> */}
            {currentData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full mt-4">
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
                                    Rank/% J-Score
                                    <button onClick={() => handleSort('j_score_rank')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    J-Score
                                    <button onClick={() => handleSort('j_score_per')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
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
                                        <td className="border border-gray-300 px-4 py-2 text-center">loc_info_{item.sub_district_id}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.shop === null || item.shop === '-' ? '-' : `${item.shop.toLocaleString()}개 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'shop', regionStat)
                                            }
                                            
                                            )
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.sales === null || item.sales === '-' ? '-' : `${Math.floor(item.sales / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'sales', regionStat)
                                            }
                                            
                                            )
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.income === null || item.income === '-' ? '-' : `${Math.floor(item.income / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'income', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.spend === null || item.spend === '-' ? '-' : `${Math.floor(item.spend / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'spend', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.move_pop === null || item.move_pop === '-' ? '-' : `${item.move_pop.toLocaleString()}명 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'move_pop', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.work_pop === null || item.work_pop === '-' ? '-' : `${item.work_pop.toLocaleString()}명 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'work_pop', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.resident === null || item.resident === '-' ? '-' : `${item.resident.toLocaleString()}명 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'resident', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.house === null || item.house === '-' ? '-' : `${item.house.toLocaleString()}개 `}
                                            (
                                            {
                                                findJScoreByRegion(item, 'house', regionStat)
                                            }
                                            
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score_rank === null || item.j_score_rank === '-' ? '-' : `${item.j_score_rank.toFixed(2)} `}/
                                            {item.j_score_per === null || item.j_score_per === '-' ? '-' : `${item.j_score_per.toFixed(2)} `}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.j_score === null || item.j_score === '-' ? '-' : `${item.j_score.toFixed(2)} `}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.y_m}</td>
                                    </tr>

                                    {/* 확장된 데이터 행 */}
                                    {/* 확장된 데이터 행 */}
                                    {expandedRows.includes(item.loc_info_id) && (
                                        <ExpandedRow
                                            item={item}
                                            statData={statData}
                                            filterCorrData={filterCorrData}
                                            regionStat={regionStat}
                                            filterForFind={filterForFind}
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
