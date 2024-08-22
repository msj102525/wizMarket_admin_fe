import React from 'react';
import InsertDataButton from './components/InsertDataButton';
import FetchPopulationData from './components/FetchPopulationData';

const MonthPop = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">동별 인구</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">데이터 넣기</h2>
        <InsertDataButton />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">조회</h2>
        <FetchPopulationData />
      </div>
    </div>
  );
};

export default MonthPop;
