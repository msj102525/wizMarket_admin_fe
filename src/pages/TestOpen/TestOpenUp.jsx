import React, { useState } from 'react';
import axios from 'axios';

const TestOpenUp = () => {
  const [message, setMessage] = useState('');

  const handleCrawl = async () => {
    try {
      // 크롤링 시작 요청
      await axios.post('http://localhost:8000/start-crawl');
      setMessage('크롤링이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('크롤링에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <button 
          onClick={handleCrawl}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
        >
          크롤링 시작
        </button>
      </div>
      {message && (
        <div className={`p-4 ${message.includes('성공') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded shadow-md`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default TestOpenUp;
