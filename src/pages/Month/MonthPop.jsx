import React, { useState } from 'react';
import axios from 'axios';

const TableDataComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableHtml, setTableHtml] = useState('');

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/test-chrome');
      setTableHtml(response.data); // 서버에서 HTML을 직접 받음
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">옵션별 조회 결과</h1>
      <button
        onClick={handleFetchData}
        className="mt-4 w-2lg bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        조회
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="overflow-x-auto max-w-6xl max-h-96 overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
      </div>
    </div>
  );
};

export default TableDataComponent;
