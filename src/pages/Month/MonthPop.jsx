import React, { useState, useEffect } from 'react';
import axios from 'axios';
import locData from '../../data/loc.json';

const TableDataComponent = () => {
  const [tableData, setTableData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminRegion, setAdminRegion] = useState('all');
  const [subRegionOptions, setSubRegionOptions] = useState([]);
  const [subRegion, setSubRegion] = useState('');
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));

  useEffect(() => {
    const fetchRegions = () => {
      const filteredRegions = locData.filter(region => String(region.adcode).startsWith(adminRegion));
      setSubRegionOptions(filteredRegions);
      setSubRegion('');
    };

    if (adminRegion !== 'all') {
      fetchRegions();
    }
  }, [adminRegion]);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/test-chrome');
      setTableData(response.data.table_text);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">월별 인구 데이터</h1>
      <div id="form-container" className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* 행정구역 */}
        <div className="mb-4">
          <label htmlFor="adminRegion" className="block text-sm font-medium text-gray-700">행정구역</label>
          <select id="adminRegion" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="all">전국</option>
            <option value="seoul">서울특별시</option>
            <option value="busan">부산광역시</option>
            <option value="daegu">대구광역시</option>
            {/* 다른 옵션 추가 */}
          </select>

          <select id="subRegion" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="all">시·군·구</option>
            {/* 다른 옵션 추가 */}
          </select>
          <span title="Info" className="text-gray-500 ml-2 cursor-pointer">
            &#9432; 매월 말일 작성 / 공표일시 : 매월 1일 12시 이후<br></br>
            (공표일이 주말, 공휴일인 경우에는 다음 평일에 공표)
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">조회기간</label>
          <div className="flex items-center mb-2">
            <input type="radio" id="monthly" name="period" value="monthly" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
            <label htmlFor="monthly" className="ml-3 block text-sm font-medium text-gray-700">월간</label>
            <input type="radio" id="yearly" name="period" value="yearly" className="ml-6 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
            <label htmlFor="yearly" className="ml-3 block text-sm font-medium text-gray-700">연간</label>
          </div>

          <div className="flex items-center">
            <select
              id="startYear"
              className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map(year => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>

            <select
              id="startMonth"
              className="mt-1 ml-2 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => 12 - i).map(month => (
                <option key={month} value={String(month).padStart(2, '0')}>{`${String(month).padStart(2, '0')}월`}</option>
              ))}
            </select>

            <span className="mx-2">~</span>

            <select
              id="endYear"
              className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            >
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map(year => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>

            <select
              id="endMonth"
              className="mt-1 ml-2 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => 12 - i).map(month => (
                <option key={month} value={String(month).padStart(2, '0')}>{`${String(month).padStart(2, '0')}월`}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleFetchData}
          className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          조회
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <pre className="mt-6 bg-gray-50 p-4 rounded-md shadow-inner w-full max-w-md">{tableData}</pre>
    </div>
  );
};

export default TableDataComponent;
