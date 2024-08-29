import React, { useState } from 'react';
import SelectLocInfo from './components/SelectLocInfo'; 
import KaKaoMapSemin from '../../components/KakaoMapSemin';
import Header from '../../components/Header';

function LocInfo() {
  const [locationName, setLocationName] = useState(''); // 위치 정보를 저장하는 상태

  const handleLocationChange = (location) => {
    setLocationName(location);
  };

  return (
    <div>
      <Header /> {/* 헤더를 포함시키려는 경우 */}
      <div className="flex flex-col items-center mt-4"> {/* flex-col을 사용하여 수직 배치 */}
        <h1 className="text-2xl font-bold text-center mb-6">DB 조회 페이지</h1>
        <div className="flex">
          <div className="flex-1">
            <KaKaoMapSemin onLocationChange={handleLocationChange} /> {/* 콜백 함수를 전달 */}
          </div>
          <div className="flex-1 ml-4">
            <SelectLocInfo locationName={locationName} /> {/* 위치 정보를 SelectLocInfo으로 전달 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocInfo;
