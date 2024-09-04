import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoadAddress, setAdministrativeAddress, setKakaoAddressResult } from '../stores/addressSlice';

const KakaoMap = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');

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
                const map = new window.kakao.maps.Map(container, options);
                const geocoder = new window.kakao.maps.services.Geocoder();
                const marker = new window.kakao.maps.Marker();
                const infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 });

                const searchAddrFromCoords = (coords, callback) => {
                    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
                };

                const searchDetailAddrFromCoords = (coords, callback) => {
                    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
                };

                const displayCenterInfo = (result, status) => {
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
                };

                searchAddrFromCoords(map.getCenter(), displayCenterInfo);

                window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                    searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const detailAddr = result[0].road_address ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>` : '';
                            const address = result[0].address.address_name;
                            const content = `<div class="bAddr"><span class="title">법정동 주소정보</span>${detailAddr}<div>지번 주소 : ${address}</div></div>`;

                            marker.setPosition(mouseEvent.latLng);
                            marker.setMap(map);

                            infowindow.setContent(content);
                            infowindow.open(map, marker);

                            dispatch(setRoadAddress(address));
                        }
                    });
                });

                window.kakao.maps.event.addListener(map, 'idle', () => {
                    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
                });

                // 주소 검색 함수
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
                            searchAddrFromCoords(coords, displayCenterInfo);
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
            console.error('Kakao Maps API 스크립트 로드에 실패했습니다');
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [dispatch]);

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
            <div className="hAddr absolute left-2 top-16 rounded bg-white bg-opacity-80 z-10 p-2">
                <span className="title font-bold">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr" className="block mt-1 font-normal"></span>
            </div>
        </div>
    );
};

export default KakaoMap;