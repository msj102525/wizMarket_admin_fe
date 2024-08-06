import React, { useEffect } from 'react';

const MapComponent = ({ onMapLoad }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=010db5a97ea7cd780a703f88ae795830&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 12,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        onMapLoad(map);
      });
    };
  }, [onMapLoad]);

  return <div id="map" className="w-2/3 h-96 mx-auto"></div>;
};

export default MapComponent;
