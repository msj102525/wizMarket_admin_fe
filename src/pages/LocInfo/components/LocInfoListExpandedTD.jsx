import React from 'react';

// 0.7 이상인지 확인하는 함수
const isValueAboveThreshold = (value) => value >= 0.7;

// 공통 컴포넌트로 분리한 td 태그
const CorrDataCell = ({ item, filterCorrData, targetField, thresholdField }) => {
  const matchingYear = filterCorrData[item.y_m]; // item의 y_m 값을 사용
  const matchingDistrict = matchingYear?.find(
    (data) => data.DISTRICT_NAME === item.district_name && data.level_1 === targetField // item의 지역 이름과 level_1이 targetField와 일치하는지 확인
  );

  // thresholdField는 level_1을 기준으로 값을 가져오도록 수정
  const isAboveThreshold = matchingDistrict && isValueAboveThreshold(matchingDistrict[thresholdField]);

  return (
    <td colSpan="1" className="border px-4 py-2 text-center"
      style={{
        color: isAboveThreshold ? 'red' : 'black'
      }}
    >
      {matchingDistrict ? matchingDistrict[thresholdField].toFixed(3) : "데이터 없음"}
    </td>
  );
};

export default CorrDataCell;
