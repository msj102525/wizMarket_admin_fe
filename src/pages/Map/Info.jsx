import React, { useState } from 'react';
import Map from './components/Map';
import Local from './components/Local';

const Info = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleRegionSelect = (region, lat, lng) => {
    setSelectedRegion(region);
    setCoordinates({ lat, lng });
  };

  return (
    <div>
      <Map onRegionSelect={handleRegionSelect} />
      <Local selectedRegion={selectedRegion} coordinates={coordinates} />
    </div>
  );
};

export default Info;
