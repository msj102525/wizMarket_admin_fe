import React, { useState } from 'react';

const PopulationList = ({ data, ageFilter }) => {
  // 표시할 열을 필터에 맞게 동적으로 구성
  const columns = [
    { key: 'pop_id', label: '번호' },
    { key: 'city_name', label: '시/도' },
    { key: 'district_name', label: '시/군' },
    { key: 'subdistrict_name', label: '읍/면/동' },
    { key: 'male_percentage', label: '남자(%)' },
    { key: 'female_percentage', label: '여자(%)' },
    { key: 'under_10', label: '10대 미만', filter: 'under_10' },
    { key: 'age_10s', label: '10대 이상', filter: 'age_10s' },
    { key: 'age_20s', label: '20대 이상', filter: 'age_20s' },
    { key: 'age_30s', label: '30대 이상', filter: 'age_30s' },
    { key: 'age_40s', label: '40대 이상', filter: 'age_40s' },
    { key: 'age_50s', label: '50대 이상', filter: 'age_50s' },
    { key: 'age_60_plus', label: '60대 이상', filter: 'age_60_plus' },
    { key: 'reference_date', label: '월' },
  ];

  // 정렬 상태 관리
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // 정렬 처리 함수
  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedPageData = [...sortedData].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sortedPageData);
    setSortConfig({ key: columnKey, direction });
  };

  // ageFilter에 맞는 열만 선택
  const filteredColumns = columns.filter(col => {
    if (!col.filter) return true; // 남녀 비율, 번호 등 나이 필터와 상관없는 컬럼 유지

    // 나이 필터가 없을 때는 모든 나이 관련 컬럼을 포함
    if (!ageFilter || (!ageFilter.ageGroupMin && !ageFilter.ageGroupMax)) {
      return true;
    }

    // 나이 필터가 있을 때는 필터 범위 내의 나이 컬럼만 표시
    const filterOrder = ['under_10', 'age_10s', 'age_20s', 'age_30s', 'age_40s', 'age_50s', 'age_60_plus'];

    // min과 max 값이 없을 때 기본값 설정
    const minIndex = ageFilter.ageGroupMin ? filterOrder.indexOf(ageFilter.ageGroupMin) : 0;
    const maxIndex = ageFilter.ageGroupMax ? filterOrder.indexOf(ageFilter.ageGroupMax) : filterOrder.length - 1;

    // 현재 열의 인덱스가 필터 범위 내에 있을 경우에만 포함
    const colIndex = filterOrder.indexOf(col.filter);
    return colIndex >= minIndex && colIndex <= maxIndex;
  });

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          {filteredColumns.map(col => (
            <th key={col.key} className="border border-gray-300 px-4 py-2 font-bold">
              <div className="flex items-center justify-between"> {/* 텍스트와 버튼 나란히 */}
                {col.label}
                {/* 번호 열을 제외한 열에 정렬 버튼 추가 */}
                {col.key !== 'pop_id' && col.key !== 'city_name' && col.key !== 'district_name' && col.key !== 'subdistrict_name' && (
                  <div className="flex flex-col ml-2"> {/* 버튼을 수직으로 배치 */}
                    <button onClick={() => handleSort(col.key, 'asc')} className="text-xs">▲</button>
                    <button onClick={() => handleSort(col.key, 'desc')} className="text-xs">▼</button>
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={row.pop_id}>
            {filteredColumns.map(col => (
              <td key={col.key} className="border border-gray-300 px-4 py-2">{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PopulationList;
