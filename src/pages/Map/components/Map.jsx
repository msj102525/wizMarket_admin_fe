import React, { useState } from 'react';
import MapComponent from './MapComponent';
import BoundaryHandler from './BoundaryHandler';

const Map = () => {
  const [map, setMap] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">지역 인구분포 정보</h1>
      <div className="mb-4">
        옵션 선택
      </div>
      <MapComponent onMapLoad={setMap} />
      {map && <BoundaryHandler map={map} />}
    </div>
  );
};

export default Map;
