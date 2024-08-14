import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRoadAddress, setAdministrativeAddress } from '../stores/addressSlice';

const KakaoMap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map');

                    if (container) {
                        const options = {
                            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
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
                                        // 주소 상태를 Redux로 디스패치
                                        dispatch(setAdministrativeAddress(result[i].address_name));
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

                                    // 클릭한 위치의 주소를 Redux 상태로 디스패치
                                    dispatch(setRoadAddress(address));
                                }
                            });
                        });

                        window.kakao.maps.event.addListener(map, 'idle', () => {
                            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
                        });
                    } else {
                        console.error('지도 컨테이너를 찾을 수 없습니다');
                    }
                });
            } else {
                console.error('Kakao Maps API가 로드되지 않았습니다');
            }
        };

        script.onerror = () => {
            console.error('Kakao Maps API 스크립트 로드에 실패했습니다');
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [dispatch]);

    return (
        <div className="map_wrap w-[500px] h-[500px] relative">
            <div id="map" className="w-full h-full"></div>
            <div className="hAddr absolute left-2 top-2 rounded bg-white bg-opacity-80 z-10 p-2">
                <span className="title font-bold">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr" className="block mt-1 font-normal"></span>
            </div>
        </div>
    );
};

export default KakaoMap;
