import React from 'react';

const LocInfoList = ({ data }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">검색 결과 리스트</h2>

            {data.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">번호</th>
                            <th className="border border-gray-300 px-4 py-2">코드</th>
                            <th className="border border-gray-300 px-4 py-2">시/도</th>
                            <th className="border border-gray-300 px-4 py-2">시/군/구</th>
                            <th className="border border-gray-300 px-4 py-2">읍/면/동</th>
                            <th className="border border-gray-300 px-4 py-2">업소</th>
                            <th className="border border-gray-300 px-4 py-2">유동인구</th>
                            <th className="border border-gray-300 px-4 py-2">매출</th>
                            <th className="border border-gray-300 px-4 py-2">직장인구</th>
                            <th className="border border-gray-300 px-4 py-2">소득</th>
                            <th className="border border-gray-300 px-4 py-2">소비</th>
                            <th className="border border-gray-300 px-4 py-2">세대수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.LOC_INFO_ID}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.LOC_INFO_ID}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.CITY_ID}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.DISTRICT_ID}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.SUB_DISTRICT_ID}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.SHOP}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.MOVE_POP}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.SALES}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.WORK_POP}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.INCOME}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.SPEND}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.HOUSE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LocInfoList;
