import React, { useState } from 'react';
import PopulationDataRequest from './components/PopulationDataRequest';

const GetPop = () => {
  const [result, setResult] = useState(null);

  const columnMapping = {
    admmCd: "행정코드",
    statsYm: "통계 연월",
    ctpvNm: "시도 이름",
    sggNm: "구 이름",
    dongNm: "동 이름",
    totNmprCnt: "총 인구수",
    maleNmprCnt: "남성 총 인구수",
    male0AgeNmprCnt: "0대 남성 인구수",
    male10AgeNmprCnt: "10대 남성 인구수",
    male20AgeNmprCnt: "20대 남성 인구수",
    male30AgeNmprCnt: "30대 남성 인구수",
    male40AgeNmprCnt: "40대 남성 인구수",
    male50AgeNmprCnt: "50대 남성 인구수",
    male60AgeNmprCnt: "60대 남성 인구수",
    male70AgeNmprCnt: "70대 남성 인구수",
    male80AgeNmprCnt: "80대 남성 인구수",
    male90AgeNmprCnt: "90대 남성 인구수",
    male100AgeNmprCnt: "100대 남성 인구수",
    femaleNmprCnt: "여성 총 인구수",
    female0AgeNmprCnt: "0대 여성 인구수",
    female10AgeNmprCnt: "10대 여성 인구수",
    female20AgeNmprCnt: "20대 여성 인구수",
    female30AgeNmprCnt: "30대 여성 인구수",
    female40AgeNmprCnt: "40대 여성 인구수",
    female50AgeNmprCnt: "50대 여성 인구수",
    female60AgeNmprCnt: "60대 여성 인구수",
    female70AgeNmprCnt: "70대 여성 인구수",
    female80AgeNmprCnt: "80대 여성 인구수",
    female90AgeNmprCnt: "90대 여성 인구수",
    female100AgeNmprCnt: "100대 여성 인구수",
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <PopulationDataRequest onFetchData={setResult} />
      {result && (
        <div className="mt-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {Object.keys(columnMapping).map((key) => (
                  <th key={key} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 min-w-[150px]">
                    {columnMapping[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(columnMapping).map((key) => (
                    <td key={key} className="py-2 px-4 border-b border-gray-200 min-w-[150px]">
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetPop;
