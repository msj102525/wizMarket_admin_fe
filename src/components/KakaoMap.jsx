import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoadAddress, setAdministrativeAddress, setKakaoAddressResult } from '../stores/addressSlice';

const KakaoMap = () => {
    const dispatch = useDispatch();
    const { cityName, districtName, subDistrictName } = useSelector(state => state.address);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);
    const [marker, setMarker] = useState(null);
    const [infowindow, setInfowindow] = useState(null);

    useEffect(() => {
        const combinedKeyword = [cityName, districtName, subDistrictName].filter(Boolean).join(' ');
        setSearchKeyword(combinedKeyword);
    }, [cityName, districtName, subDistrictName]);

    const updateCenterInfo = useCallback((map, geocoder) => {
        const coords = map.getCenter();
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const infoDiv = document.getElementById('centerAddr');
                for (let i = 0; i < result.length; i++) {
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        dispatch(setAdministrativeAddress(result[i].address_name));
                        dispatch(setKakaoAddressResult(result[i]));
                        break;
                    }
                }
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.48197916687, 127.067489994874),
                    level: 3,
                };
                const newMap = new window.kakao.maps.Map(container, options);
                const newGeocoder = new window.kakao.maps.services.Geocoder();
                const newMarker = new window.kakao.maps.Marker();
                const newInfowindow = new window.kakao.maps.InfoWindow({ zindex: 1 });

                setMap(newMap);
                setGeocoder(newGeocoder);
                setMarker(newMarker);
                setInfowindow(newInfowindow);

                window.kakao.maps.event.addListener(newMap, 'idle', () => {
                    updateCenterInfo(newMap, newGeocoder);
                });

                window.kakao.maps.event.addListener(newMap, 'dragend', () => {
                    updateCenterInfo(newMap, newGeocoder);
                });

                const searchAddress = (keyword) => {
                    newGeocoder.addressSearch(keyword, (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            newMap.setCenter(coords);
                            newMarker.setPosition(coords);
                            newMarker.setMap(newMap);

                            const content = `<div class="bAddr"><span class="title">검색 결과</span><div>${result[0].address_name}</div></div>`;
                            newInfowindow.setContent(content);
                            newInfowindow.open(newMap, newMarker);

                            dispatch(setRoadAddress(result[0].address_name));
                            updateCenterInfo(newMap, newGeocoder);
                        }
                    });
                };

                const searchButton = document.getElementById('search-button');
                searchButton.addEventListener('click', () => {
                    const keyword = document.getElementById('search-input').value;
                    searchAddress(keyword);
                });

                const searchInput = document.getElementById('search-input');
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        searchAddress(e.target.value);
                    }
                });
            });
        };

        script.onerror = () => {
            console.error('Kakao Maps API script loading failed');
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [dispatch, updateCenterInfo]);

    useEffect(() => {
        if (searchKeyword && map && geocoder) {
            const searchAddress = (keyword) => {
                geocoder.addressSearch(keyword, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                        map.setCenter(coords);
                        marker.setPosition(coords);
                        marker.setMap(map);

                        const content = `<div class="bAddr"><span class="title">검색 결과</span><div>${result[0].address_name}</div></div>`;
                        infowindow.setContent(content);
                        infowindow.open(map, marker);

                        dispatch(setRoadAddress(result[0].address_name));
                        updateCenterInfo(map, geocoder);
                    }
                });
            };

            searchAddress(searchKeyword);
        }
    }, [searchKeyword, map, geocoder, marker, infowindow, dispatch, updateCenterInfo]);

    return (
        <div className="map_wrap w-full h-full relative">
            <div className="search-container absolute top-2 left-2 z-20 flex">
                <input
                    id="search-input"
                    type="text"
                    placeholder="동 이름을 입력하세요"
                    className="p-2 border rounded"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button
                    id="search-button"
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    검색
                </button>
            </div>
            <div id="map" className="w-full h-full"></div>
            <div className="hAddr absolute left-2 top-16 mb:top-24 rounded bg-white bg-opacity-80 z-10 p-2">
                <span className="title font-bold">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr" className="block mt-1 font-normal"></span>
            </div>
        </div>
    );
};

export default KakaoMap;