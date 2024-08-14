import { useEffect, useCallback } from 'react';
import sidoBoundaries from '../../../data/country_province_boundaries.json';
import sigBoundaries from '../../../data/city_district_boundaries.json';

const BoundaryHandler = ({ map, onRegionSelect }) => {
  // onRegionSelect를 useCallback으로 감싸기
  const memoizedOnRegionSelect = useCallback(onRegionSelect, [onRegionSelect]);

  useEffect(() => {
    if (!map) return;

    let detailMode = false;
    let polygons = [];
    let overlays = [];

    init(sidoBoundaries);

    window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
      const level = map.getLevel();
      if (!detailMode && level <= 10) {
        detailMode = true;
        removePolygon();
        removeOverlay();
        init(sigBoundaries);
      } else if (detailMode && level > 10) {
        detailMode = false;
        removePolygon();
        removeOverlay();
        init(sidoBoundaries);
      }
    });

    function removePolygon() {
      polygons.forEach((polygon) => polygon.setMap(null));
      polygons = [];
    }

    function removeOverlay() {
      overlays.forEach((overlay) => overlay.setMap(null));
      overlays = [];
    }

    function calculateCenter(coordinates) {
      let latSum = 0;
      let lngSum = 0;
      coordinates.forEach(coord => {
        latSum += coord.getLat();
        lngSum += coord.getLng();
      });
      return new window.kakao.maps.LatLng(latSum / coordinates.length, lngSum / coordinates.length);
    }

    function init(data) {
      const units = data.features;
      const areas = units.map((unit) => {
        const coordinates = unit.geometry.coordinates[0].map(
          (coordinate) => new window.kakao.maps.LatLng(coordinate[1], coordinate[0])
        );
        const path = coordinates;

        return {
          name: unit.properties.SIG_KOR_NM,
          path: path,
          center: calculateCenter(coordinates),
          location: unit.properties.SIG_CD,
        };
      });

      areas.forEach((area) => {
        displayArea(area);
        displayOverlay(area);
      });
    }

    function displayArea(area) {
      const polygon = new window.kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        fillColor: '#fff',
        fillOpacity: 0.7,
      });
      polygons.push(polygon);

      window.kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ fillColor: '#09f' });
      });

      window.kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
      });

      window.kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        console.log(`Clicked area: ${area.name}`);
        console.log(`Clicked location: ${latlng.getLat()}, ${latlng.getLng()}`);
        memoizedOnRegionSelect(area.name, latlng.getLat(), latlng.getLng()); // Set the selected region and coordinates
        if (!detailMode) {
          map.setLevel(10);
          map.panTo(latlng);
        } else {
          // 클릭 이벤트 함수
          // callFunctionWithRegionCode(area.location);
        }
      });
    }

    function displayOverlay(area) {
      const content = `<div class="bg-white border border-blue-800 p-1 rounded">${area.name}</div>`;

      const overlay = new window.kakao.maps.CustomOverlay({
        map: map,
        position: area.center,
        content: content,
        yAnchor: 1,
      });

      overlays.push(overlay);
    }
  }, [map, memoizedOnRegionSelect]);

  return null;
};

export default BoundaryHandler;
