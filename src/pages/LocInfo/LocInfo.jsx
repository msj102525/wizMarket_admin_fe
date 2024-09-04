import React, { useState } from 'react';
import LocInfoList from './components/LocInfoList';
import LocInfoMap from './components/LocInfoMap';
import Header from '../../components/Header';
import Aside from '../../components/Aside';

const LocInfo = () => {
    const [view, setView] = useState('list'); // 기본을 리스트로 설정

    return (
        <div>
            <Header />
            <div className="flex h-screen"> {/* Flex 컨테이너 */}
                <Aside className="w-64" /> {/* 사이드바의 너비 설정 */}
                <div className="flex-1 p-4"> {/* 메인 콘텐츠가 남은 공간을 차지 */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">입지분석</h2> {/* 소제목 */}
                            <div className="relative flex items-center border-2 border-black rounded-full p-1">
                                {/* 배경을 위한 요소 */}
                                <div
                                    className={`absolute top-0 left-0 h-full w-1/2 bg-black rounded-full transition-all duration-300 ${view === 'map' ? 'translate-x-full' : ''}`}
                                ></div>
                                <button
                                    onClick={() => setView('list')}
                                    className={`relative z-10 px-4 py-2 ${view === 'list' ? 'text-white' : 'text-black'} rounded-full focus:outline-none`}
                                >
                                    LIST
                                </button>
                                <button
                                    onClick={() => setView('map')}
                                    className={`relative z-10 px-4 py-2 ${view === 'map' ? 'text-white' : 'text-black'} rounded-full focus:outline-none`}
                                >
                                    MAP
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 border-4"></div> {/* 회색 줄 추가 */}
                    </div>

                    {/* 리스트 또는 맵 렌더링 */}
                    {view === 'list' ? <LocInfoList /> : <LocInfoMap />}
                </div>
            </div>
        </div>
    );
}

export default LocInfo;
