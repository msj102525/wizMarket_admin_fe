import React, { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
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

                        new window.kakao.maps.Map(container, options);
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
    }, []);

    return (
        <div id='map' className='w-[500px] h-[500px]'>
        </div>
    );
};

export default KakaoMap;
