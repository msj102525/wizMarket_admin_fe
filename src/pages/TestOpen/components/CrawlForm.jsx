// src/pages/TestOpen/components/CrawlForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CrawlForm() {
  const [startYearMonth, setStartYearMonth] = useState('');
  const [endYearMonth, setEndYearMonth] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/getmovepop', {
        srchFrYm: startYearMonth.replace('-', ''),
        srchToYm: endYearMonth.replace('-', ''),
        region: location,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error sending crawl request:", error);
      setData(null);
    }
  };

  const renderData = (item) => {
    return (
      <div key={item.keyword} className="bg-white shadow rounded-lg p-6 mb-4">
        <p><span className="font-bold">업소:</span> {item.business.trim()}</p>
        <p><span className="font-bold">유동인구:</span> {item.person.trim()}</p>
        <p><span className="font-bold">매출:</span> {item.price.trim()}</p>
        <p><span className="font-bold">직장인구:</span> {item.wrcppl.trim()}</p>
        <p><span className="font-bold">소득:</span> {item.earn.trim()}</p>
        <p><span className="font-bold">소비:</span> {item.cnsmp.trim()}</p>
        <p><span className="font-bold">세대수:</span> {item.hhCnt.trim()}</p>
        <p><span className="font-bold">주거인구:</span> {item.rsdppl.trim()}</p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">시작 년월:</label>
          <input 
            type="month" 
            value={startYearMonth} 
            onChange={(e) => setStartYearMonth(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">끝 년월:</label>
          <input 
            type="month" 
            value={endYearMonth} 
            onChange={(e) => setEndYearMonth(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location:</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          DB 조회
        </button>
      </form>

      {data && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">조회 결과:</h3>
          {data.map(item => renderData(item))}
        </div>
      )}
    </div>
  );
}

export default CrawlForm;
