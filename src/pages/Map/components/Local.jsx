import { useState } from 'react';
import axios from 'axios';

const Local = () => {
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
      const authResponse = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json', {
        params: {
          consumer_key: process.env.REACT_APP_SGIS_CONSUMER_KEY,
          consumer_secret: process.env.REACT_APP_SGIS_CONSUMER_SECRET
        }
      });

      const { accessToken } = authResponse.data.result;

      const populationResponse = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json', {
        params: {
          accessToken: accessToken,
          year: year,
          adm_cd: admCd || 'non',
          low_search: lowSearch
        }
      });

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">인구 데이터</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="border p-1 rounded" />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Admin Code:
          <input type="text" value={admCd} onChange={(e) => setAdmCd(e.target.value)} className="border p-1 rounded" />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Low Search:
          <input type="number" value={lowSearch} onChange={(e) => setLowSearch(e.target.value)} className="border p-1 rounded" />
        </label>
      </div>
      <button onClick={fetchData} className="bg-blue-500 text-white p-2 rounded">Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Filtered Data:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>행정동 코드:</strong> {item.adm_cd}, <strong>행정구역명:</strong> {item.adm_nm}, <strong>총인구:</strong> {item.tot_ppltn}, <strong>평균나이(세):</strong> {item.avg_age}, 
                <strong>인구밀도(명/㎢):</strong> {item.ppltn_dnsty}, <strong>총가구:</strong> {item.tot_family}, 
                <strong>평균가구원수:</strong> {item.avg_fmember_cnt}, <strong>종업원수(전체 사업체):</strong> {item.employee_cnt}, <strong>사업체수(전체 사업체):</strong> {item.corp_cnt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Local;
