import React, { useState, useEffect } from 'react';

const KakaoMapSemin = ({ onLocationChange }) => {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        
        const initializeMap = (position) => {
          const options = {
            center: new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
            level: 4,
          };
          const mapInstance = new window.kakao.maps.Map(container, options);
          const zoomControl = new window.kakao.maps.ZoomControl();
          mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          setMap(mapInstance);

          // 서버에 초기 위치 데이터 전송
          updateLocationName(mapInstance.getCenter(), true);

          // 지도 움직일 때마다 서버에 요청
          window.kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
            const center = mapInstance.getCenter();
            updateLocationName(center);
          });
        };

        // 사용자의 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(initializeMap, () => {
            // 위치 정보를 가져오지 못한 경우 기본 위치로 설정 (예: 서울 시청)
            initializeMap({ coords: { latitude: 37.5665, longitude: 126.9780 } });
          });
        } else {
          // 브라우저가 Geolocation API를 지원하지 않는 경우 기본 위치로 설정
          initializeMap({ coords: { latitude: 37.5665, longitude: 126.9780 } });
        }
      });
    };

    return () => {
      script.remove(); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  const updateLocationName = (coords, isInitialLoad = false) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result.find((region) => region.region_type === 'H');
        if (address) {
          onLocationChange(address.address_name); // 위치 정보를 상위 컴포넌트로 전달
          if (!isInitialLoad) {
            // 지도의 중심이 변경될 때마다 위치 정보 업데이트
            onLocationChange(address.address_name); 
          }
        }
      }
    });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery && map) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(searchQuery, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);

          const fullAddress = data[0].address_name;
          const addressWithoutNumbers = fullAddress.replace(/[\d-]/g, '').trim();
          onLocationChange(addressWithoutNumbers);

          // 검색된 위치로 이동하므로 새로운 위치에 대한 데이터 요청
          updateLocationName(map.getCenter());
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="검색어를 입력하세요"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
          검색
        </button>
      </div>
      <div
        id="map"
        style={{
          width: '400px',
          height: '300px',
        }}
        className="shadow-md rounded"
      ></div>
    </div>
  );
};

export default KakaoMapSemin;
