import React from 'react';

const LocStoreList = ({ data }) => {

    

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
                        <th className="border border-gray-300 px-4 py-2">시/도</th>
                        <th className="border border-gray-300 px-4 py-2">시/군/구</th>
                        <th className="border border-gray-300 px-4 py-2">읍/면/동</th>
                        <th className="border border-gray-300 px-4 py-2">출처</th>
                        <th className="border border-gray-300 px-4 py-2">대분류</th>
                        <th className="border border-gray-300 px-4 py-2">중분류</th>
                        <th className="border border-gray-300 px-4 py-2">소분류</th>
                        <th className="border border-gray-300 px-4 py-2">표준산업분류명</th>
                        <th className="border border-gray-300 px-4 py-2">건물명</th>
                        <th className="border border-gray-300 px-4 py-2">도로명주소</th>
                        <th className="border border-gray-300 px-4 py-2">우편주소</th>
                        <th className="border border-gray-300 px-4 py-2">동정보</th>
                        <th className="border border-gray-300 px-4 py-2">층정보</th>
                        <th className="border border-gray-300 px-4 py-2">호정보</th>
                        <th className="border border-gray-300 px-4 py-2">생성일자</th>
                        <th className="border border-gray-300 px-4 py-2">수정일자</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-t ">
                            <td className="border border-gray-300 px-4 py-2 text-center ">{item.store_business_number}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.store_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.branch_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.city_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.sub_district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">상권정보분류표</td>
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
                            <td className="border border-gray-300 px-4 py-2 ">{item.CREATED_AT.slice(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{item.UPDATED_AT.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocStoreList;
