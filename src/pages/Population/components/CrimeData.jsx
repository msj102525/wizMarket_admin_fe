import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrimeData({ city_name, start_year_month }) {
  const [crimeData, setCrimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const convertToQuarter = (start_year_month) => {
    const [year, month] = start_year_month.split('-').map(Number);
  
    if (month >= 1 && month <= 3) {
      return `${year}.1/4`;       // 예: 2024-01 -> 2024.1/4
    } else if (month >= 4 && month <= 6) {
      return `${year}.2/4`;       // 예: 2024-04 -> 2024.2/4
    } else if (month >= 7 && month <= 9) {
      return `${year}.3/4`;       // 예: 2024-07 -> 2024.3/4
    } else if (month >= 10 && month <= 12) {
      return `${year}.4/4`;       // 예: 2024-10 -> 2024.4/4
    } else {
      throw new Error('Invalid month value');
    }
  };

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const quarter = convertToQuarter(start_year_month);
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/crime/get_crime`, {
          city_name,
          start_year_month: quarter  // 분기로 대체
        });

        setCrimeData(response.data);
      } catch (error) {
        setError('Failed to fetch crime data');
        console.error('Error fetching crime data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrimeData();
  }, [city_name, start_year_month]);

  if (loading) return <p>Loading crime data...</p>;
  if (error) return <p>{error}</p>;

  // 그룹화된 데이터 구조로 변경
  const groupedCrimeData = crimeData.reduce((acc, crime) => {
    const { CRIME_MAJOR_CATEGORY, CRIME_MINOR_CATEGORY, INCIDENT_COUNT, ARREST_COUNT, INCIDENT_TO_ARREST_RATIO, ARREST_PERSONNEL, LEGAL_ENTITY } = crime;

    if (!acc[CRIME_MAJOR_CATEGORY]) {
      acc[CRIME_MAJOR_CATEGORY] = [];
    }

    acc[CRIME_MAJOR_CATEGORY].push({
      minorCategory: CRIME_MINOR_CATEGORY,
      incidentCount: INCIDENT_COUNT,
      arrestCount: ARREST_COUNT,
      INCIDENT_TO_ARREST_RATIO : INCIDENT_TO_ARREST_RATIO,
      ARREST_PERSONNEL : ARREST_PERSONNEL, 
      LEGAL_ENTITY : LEGAL_ENTITY
    });

    return acc;
  }, {});

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">{city_name} 범죄 건수 {convertToQuarter(start_year_month)}분기</h2>
      
      {Object.entries(groupedCrimeData).map(([majorCategory, crimes], index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{majorCategory}</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">범죄 유형</th>
                <th className="px-4 py-2 text-right">발생 건수</th>
                <th className="px-4 py-2 text-right">검거 건수</th>
                <th className="px-4 py-2 text-right">검거/발생 (%)</th>
                <th className="px-4 py-2 text-right">검거 인원</th>
                <th className="px-4 py-2 text-right">법인체</th>
              </tr>
            </thead>
            <tbody>
              {crimes.map((crime, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{crime.minorCategory}</td>
                  <td className="border px-4 py-2 text-right">{crime.incidentCount}</td>
                  <td className="border px-4 py-2 text-right">{crime.arrestCount}</td>
                  <td className="border px-4 py-2 text-right">{crime.INCIDENT_TO_ARREST_RATIO}</td>
                  <td className="border px-4 py-2 text-right">{crime.ARREST_PERSONNEL}</td>
                  <td className="border px-4 py-2 text-right">{crime.LEGAL_ENTITY}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default CrimeData;
