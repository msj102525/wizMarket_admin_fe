import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import locData from '../../../data/loc.json';

const Local = ({ selectedRegion }) => {
  const [admCd, setAdmCd] = useState('');
  const [lowSearch, setLowSearch] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (admCd) => {
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

      const populationParams = {
        accessToken: accessToken,
        year: 2022,
        low_search: lowSearch
      };

      if (admCd) {
        populationParams.adm_cd = admCd;
      }

      const populationResponse = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json', {
        params: populationParams
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
  }, [lowSearch]);

  useEffect(() => {
    if (selectedRegion) {
      console.log(`Selected Region: ${selectedRegion}`);
      const region = locData.find(item => item.loc === selectedRegion);
      if (region) {
        setAdmCd(region.adcode.toString());
        fetchData(region.adcode.toString());
      }
    }
  }, [selectedRegion, fetchData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">인구 데이터</h1>
      
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
      <button onClick={() => fetchData(admCd)} className="bg-blue-500 text-white p-2 rounded">Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Filtered Data:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">행정동 코드</th>
                  <th className="px-4 py-2 border">행정구역명</th>
                  <th className="px-4 py-2 border">총인구</th>
                  <th className="px-4 py-2 border">평균나이(세)</th>
                  <th className="px-4 py-2 border">인구밀도(명/㎢)</th>
                  <th className="px-4 py-2 border">총가구</th>
                  <th className="px-4 py-2 border">평균가구원수</th>
                  <th className="px-4 py-2 border">종업원수(전체 사업체)</th>
                  <th className="px-4 py-2 border">사업체수(전체 사업체)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 border">{item.adm_cd}</td>
                    <td className="px-4 py-2 border">{item.adm_nm}</td>
                    <td className="px-4 py-2 border">{item.tot_ppltn}</td>
                    <td className="px-4 py-2 border">{item.avg_age}</td>
                    <td className="px-4 py-2 border">{item.ppltn_dnsty}</td>
                    <td className="px-4 py-2 border">{item.tot_family}</td>
                    <td className="px-4 py-2 border">{item.avg_fmember_cnt}</td>
                    <td className="px-4 py-2 border">{item.employee_cnt}</td>
                    <td className="px-4 py-2 border">{item.corp_cnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Local;
