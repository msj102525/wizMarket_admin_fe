import React, { useEffect } from 'react';
import sidoBoundaries from '../../data/country_province_boundaries.json';
import sigBoundaries from '../../data/city_district_boundaries.json';

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=010db5a97ea7cd780a703f88ae795830&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let mapContainer = document.getElementById('map');
        let mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 12
        };

        let map = new window.kakao.maps.Map(mapContainer, mapOption);
        let customOverlay = new window.kakao.maps.CustomOverlay({});
        let detailMode = false;
        let polygons = [];

        init(sidoBoundaries);

        window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
          let level = map.getLevel();
          if (!detailMode && level <= 10) {
            detailMode = true;
            removePolygon();
            init(sigBoundaries);
          } else if (detailMode && level > 10) {
            detailMode = false;
            removePolygon();
            init(sidoBoundaries);
          }
        });

        function removePolygon() {
          for (let i = 0; i < polygons.length; i++) {
            polygons[i].setMap(null);
          }
          polygons = [];
        }

        function init(data) {
          const units = data.features;
          const areas = units.map(unit => {
            const coordinates = unit.geometry.coordinates[0].map(coordinate => new window.kakao.maps.LatLng(coordinate[1], coordinate[0]));
            return {
              name: unit.properties.SIG_KOR_NM,
              path: coordinates,
              location: unit.properties.SIG_CD
            };
          });

          areas.forEach(area => displayArea(area));
        }

        function displayArea(area) {
          let polygon = new window.kakao.maps.Polygon({
            map: map,
            path: area.path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.8,
            fillColor: '#fff',
            fillOpacity: 0.7
          });
          polygons.push(polygon);

          window.kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
            polygon.setOptions({ fillColor: '#09f' });
            customOverlay.setContent('<div class="area">' + area.name + '</div>');
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });

          window.kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
          });

          window.kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
          });

          window.kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
            if (!detailMode) {
              map.setLevel(10);
              var latlng = mouseEvent.latLng;
              map.panTo(latlng);
            } else {
              // 클릭 이벤트 함수
              // callFunctionWithRegionCode(area.location);
            }
          });
        }
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
