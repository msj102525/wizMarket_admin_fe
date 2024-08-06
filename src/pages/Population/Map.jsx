import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=010db5a97ea7cd780a703f88ae795830&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.5, 127.5),
          level: 13,
        };
        const map = new window.kakao.maps.Map(container, options);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        let polygons = [];

        const drawPolygons = (geoJsonData) => {
          polygons.forEach((polygon) => polygon.setMap(null));
          polygons = [];

          geoJsonData.features.forEach((feature) => {
            const path = [];
            feature.geometry.coordinates[0].forEach((coord) => {
              path.push(new window.kakao.maps.LatLng(coord[1], coord[0]));
            });

            const polygon = new window.kakao.maps.Polygon({
              path,
              strokeWeight: 2,
              strokeColor: '#004c80',
              strokeOpacity: 0.8,
              fillColor: '#fff',
              fillOpacity: 0.7,
            });

            polygon.setMap(map);
            polygons.push(polygon);
          });
        };

        const fetchAndDrawPolygons = (level) => {
          const url =
          level > 10
          ? '/src/data/country_province_boundaries.json'
          : '/src/data/city_district_boundaries.json';
          fetch(url)
            .then((response) => response.json())
            .then((data) => drawPolygons(data));
        };

        fetchAndDrawPolygons(map.getLevel());

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          fetchAndDrawPolygons(map.getLevel());
        });
      });
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">지역 인구분포 정보</h1>
      <div id="map" className="w-2/3 h-96"></div>
    </div>
  );
};

export default Map;
