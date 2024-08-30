// src/pages/population/Population.jsx
import React from 'react';
import LocationSelector from './components/LocationSelector';
import Header from '../../components/Header';

function Population() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-full" >
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">월별 인구 보기</h1>
          <LocationSelector />
        </div>
      </div>
    </div>
  );
}

export default Population;
