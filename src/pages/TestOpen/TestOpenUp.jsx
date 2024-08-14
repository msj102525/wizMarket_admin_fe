import React, { useState } from 'react';
import axios from 'axios';
import TestOpenComponent from './components/TestOpenComponent';

const TestOpenUp = () => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    try {
      // response 변수를 선언하고 axios 요청을 통해 데이터를 받음
      const response = await axios.post('http://localhost:8000/enter-keyword', { keyword });
      // 데이터 설정
      setData(response.data.data);
      console.log(response.data.data); // 데이터 확인
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 로그 출력
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          placeholder="키워드를 입력하세요"
          className="px-4 py-2 border rounded shadow"
        />
        <button 
          onClick={handleSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
        >
          전송
        </button>
      </div>
      {data && <TestOpenComponent data={data} />}
    </div>
  );
};

export default TestOpenUp;
