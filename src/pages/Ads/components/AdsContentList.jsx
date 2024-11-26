import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdsContentDetailModal from './AdsContentDetailModal';


const AdsContentList = ({ AdsList = [], onUpdate, onDelete }) => {
    const [AdsListContent, setAdsListContent] = useState(AdsList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        setAdsListContent(AdsList);  // AdsList 업데이트될 때 setAdsListContent 업데이트
    }, [AdsList]);

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로
        const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로
        const hours = String(date.getHours()).padStart(2, '0'); // 시를 2자리로
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };


    // 서비스 게시 상태를 토글하는 함수
    const toggleServiceStatus = async (index) => {
        // 현재 상태 복사 후 업데이트
        const updatedContent = [...AdsListContent];
        updatedContent[index].status = updatedContent[index].status === 'Y' ? 'S' : 'Y';

        // 로컬 상태 업데이트
        setAdsListContent(updatedContent);
        // console.log(updatedContent)
        // console.log(updatedContent[index].ads_id)
        // 서버 업데이트 API 호출
        try {
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/update/status`,
                {
                    ads_id: updatedContent[index].ads_id,
                    status: updatedContent[index].status,
                }
            );
        } catch (error) {
            console.error('Error updating store publish status:', error);
        }
    };

    const openModal = (ads) => {
        setSelectedContent(ads);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContent(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-left shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            id
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            미리보기
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            매장명
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            도로명 주소
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            광고 채널
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            주제
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            세부 주제
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            등록일
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            ADS 게시
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {AdsListContent.map((ads, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 border-b text-gray-700">{ads.ads_id}</td>
                                <td className="px-4 py-2 border-b text-gray-700 relative">
                                    <div className="mt-2 relative group">
                                        <img
                                            className="block w-5 h-5"
                                            src={require("../../../assets/adsList/ads_list.png")}
                                            alt="user-img"
                                        />
                                        {/* 마우스 오버 시 표시할 이미지 */}
                                        <div className="absolute left-8 top-0 hidden group-hover:block">
                                            <img
                                                src={ads.ads_image_url}
                                                alt="Ad Preview"
                                                className="w-40 h-auto border border-gray-300 rounded shadow-md"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.store_name}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.road_name}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.use_option}</td>
                                <td
                                    className="px-4 py-2 border-b text-blue-600 cursor-pointer"
                                    onClick={() => openModal(ads)}
                                >
                                    {ads.title}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.detail_title}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{formatDate(ads.created_at)}</td>
                                <td className="px-4 py-2 border-b text-gray-700 text-center">
                                    <div
                                        onClick={() => toggleServiceStatus(index)}
                                        className={`relative inline-flex items-center w-12 h-6 cursor-pointer rounded-full transition-colors ${ads.status === 'Y' ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span
                                            className={`absolute left-1 h-5 w-5 rounded-full bg-white transition-transform transform ${ads.status === 'Y' ? 'translate-x-6' : ''}`}
                                        ></span>
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* 모달 렌더링 */}
            {selectedContent && (
                <AdsContentDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    localStoreContentId={selectedContent.local_store_content_id}
                    storeName={selectedContent.store_name}
                    roadName={selectedContent.road_name}
                    createdAt={selectedContent.created_at}
                />
            )}
        </div>
    );
};

export default AdsContentList;