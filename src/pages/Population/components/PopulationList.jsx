import React from 'react';

const PopulationList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">pop_id</th>
            <th className="border border-gray-300 px-4 py-2">시/도</th>
            <th className="border border-gray-300 px-4 py-2">시/군</th>
            <th className="border border-gray-300 px-4 py-2">읍/면/동</th>
            <th className="border border-gray-300 px-4 py-2">남자(%)</th>
            <th className="border border-gray-300 px-4 py-2">여자(%)</th>
            <th className="border border-gray-300 px-4 py-2">10대 미만</th>
            <th className="border border-gray-300 px-4 py-2">10대 이상</th>
            <th className="border border-gray-300 px-4 py-2">20대 이상</th>
            <th className="border border-gray-300 px-4 py-2">30대 이상</th>
            <th className="border border-gray-300 px-4 py-2">40대 이상</th>
            <th className="border border-gray-300 px-4 py-2">50대 이상</th>
            <th className="border border-gray-300 px-4 py-2">60대 이상</th>
            <th className="border border-gray-300 px-4 py-2">월</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.pop_id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.pop_id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.subdistrict_name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.male_percentage}%</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.female_percentage}%</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.under_10}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_10s}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_20s}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_30s}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_40s}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_50s}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.age_60_plus}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.reference_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopulationList;
