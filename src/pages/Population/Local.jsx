import { useState } from 'react';
import axios from 'axios';

export default function PopulationData() {
  const [year, setYear] = useState('2020');
  const [admCd, setAdmCd] = useState('');
  const [lowSearch, setLowSearch] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get accessToken
      const tokenResponse = await axios.get('http://127.0.0.1:8000/api/get-token');
      const accessToken = tokenResponse.data.result.accessToken;
      console.log('Access Token:', accessToken); // 토큰 값을 콘솔에 출력

      // Step 2: Fetch population data
      const populationResponse = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json', {
        params: {
          accessToken: accessToken,
          year: year,
          adm_cd: admCd || 'non', // admCd가 비어있을 경우 'non'으로 설정
          low_search: lowSearch
        }
      });

      // JSON 응답에서 특정 키 값만 추출
      const filteredData = populationResponse.data.result.map(item => ({
        adm_cd: item.adm_cd,
        adm_nm: item.adm_nm,
        tot_ppltn: item.tot_ppltn,
        avg_age: item.avg_age,
        ppltn_dnsty: item.ppltn_dnsty,
        tot_family: item.tot_family,
        avg_fmember_cnt: item.avg_fmember_cnt,
        employee_cnt: item.employee_cnt,
        corp_cnt: item.corp_cnt
      }));

      setData(filteredData);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>인구 데이터</h1>
      <div>
        <label>
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Admin Code:
          <input type="text" value={admCd} onChange={(e) => setAdmCd(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Low Search:
          <input type="number" value={lowSearch} onChange={(e) => setLowSearch(e.target.value)} />
        </label>
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Filtered Data:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                행정동 코드: {item.adm_cd}, 행정구역명: {item.adm_nm}, 총인구: {item.tot_ppltn}, 평균나이(세): {item.avg_age}, 
                인구밀도(명/㎢): {item.ppltn_dnsty}, 총가구: {item.tot_family}, 
                평균가구원수: {item.avg_fmember_cnt}, 종업원수(전체 사업체): {item.employee_cnt}, 사업체수(전체 사업체): {item.corp_cnt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
