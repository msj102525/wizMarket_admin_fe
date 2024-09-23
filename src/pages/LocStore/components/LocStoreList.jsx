import React, { useState } from 'react';

const LocStoreList = ({ data }) => {

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리
    // 정렬 함수
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
            if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
            return 0;
        }
        return data;  // 정렬 상태 없으면 그대로 반환
    });

    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }


    return (
        // 테이블을 감싸는 div에 overflow-x-auto 추가하여 스크롤바 위치를 테이블 바깥으로 옮김
        <div className="w-full overflow-x-auto">


            <table className="min-w-full border-collapse border border-gray-200 text-sm truncate px-4 py-2">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">코드</th>
                        <th className="border border-gray-300 px-4 py-2">상호명</th>
                        <th className="border border-gray-300 px-4 py-2">지점명</th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                시/도
                                <button onClick={() => handleSort('city_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                            시/군/구
                                <button onClick={() => handleSort('district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                            읍/면/동
                                <button onClick={() => handleSort('sub_district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">출처</th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                            대분류
                                <button onClick={() => handleSort('large_category_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                중분류
                                <button onClick={() => handleSort('medium_category_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                소분류
                                <button onClick={() => handleSort('small_category_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                표준산업분류명
                                <button onClick={() => handleSort('industry_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                건물명
                                <button onClick={() => handleSort('building_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                도로명주소
                                <button onClick={() => handleSort('road_name_address')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                우편주소
                                <button onClick={() => handleSort('new_postal_code')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                동정보
                                <button onClick={() => handleSort('dong_info')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                층정보
                                <button onClick={() => handleSort('floor_info')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                호정보
                                <button onClick={() => handleSort('unit_info')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                기준년분기
                                <button onClick={() => handleSort('Y_Q')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                생성일자
                                <button onClick={() => handleSort('CREATED_AT')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center">
                                수정일자
                                <button onClick={() => handleSort('UPDATED_AT')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                    <span className="text-xs">▲</span>
                                    <span className="text-xs">▼</span>
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index} className="border-t ">
                            <td className="border border-gray-300 px-4 py-2 text-center ">{item.loc_store_id}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.store_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.branch_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.city_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.sub_district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">상권정보시스템</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.large_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.medium_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.small_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.industry_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.building_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.road_name_address}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.new_postal_code}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.dong_info}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.floor_info}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.unit_info}</td>
                            <td className="border border-gray-300 px-4 py-2 ">
                                {`${item.info_year}.${item.info_quarter}/4`}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 ">
                                {item.CREATED_AT.slice(0, 10)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 ">
                                {item.UPDATED_AT.slice(0, 10)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocStoreList;
