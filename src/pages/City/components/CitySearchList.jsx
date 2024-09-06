import React from 'react';

const CitySearchList = ({ results }) => {
    if (results.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                검색 결과가 없습니다.
            </div>
        );
    }

    // 데이터에 따라 출력할 테이블의 열을 동적으로 결정
    const hasDistrictData = results[0].hasOwnProperty('district_name');
    const hasSubDistrictData = results[0].hasOwnProperty('sub_district_name');

    return (
        <div className="mt-4 bg-white">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">번호</th>
                        <th className="border border-gray-300 px-4 py-2">코드</th>
                        <th className="border border-gray-300 px-4 py-2">시/도</th>
                        {/* District 열을 추가, 필요한 경우 */}
                        {hasDistrictData && (
                            <>
                                <th className="border border-gray-300 px-4 py-2">시/군/구</th>
                            </>
                        )}
                        {/* SubDistrict 열을 추가, 필요한 경우 */}
                        {hasSubDistrictData && (
                            <>
                                <th className="border border-gray-300 px-4 py-2">읍/면/동</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.number}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.city_id || item.district_id || item.sub_district_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                            {/* District 데이터가 있는 경우 출력 */}
                            {hasDistrictData && (
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                            )}
                            {/* SubDistrict 데이터가 있는 경우 출력 */}
                            {hasSubDistrictData && (
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitySearchList;
