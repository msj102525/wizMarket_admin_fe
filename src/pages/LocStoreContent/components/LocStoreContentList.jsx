import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocStoreModal from './LocStoreContentDetailModal';


const LocStoreContentList = ({ locStoreContentList = [], locStoreCategoryList = [], onUpdate, onDelete }) => {
    const [localStoreContent, setLocalStoreContent] = useState(locStoreContentList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        setLocalStoreContent(locStoreContentList);  // locStoreContentList가 업데이트될 때 localStoreContent를 업데이트
    }, [locStoreContentList]);

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
        const updatedContent = [...localStoreContent];
        updatedContent[index].status = updatedContent[index].status === 'Y' ? 'S' : 'Y';

        // 로컬 상태 업데이트
        setLocalStoreContent(updatedContent);
        // console.log(updatedContent)

        // 서버 업데이트 API 호출
        try {
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/store/content/update/status`,
                {
                    local_store_content_id: updatedContent[index].local_store_content_id,
                    status: updatedContent[index].status,
                }
            );

        } catch (error) {
            console.error('Error updating store publish status:', error);
        }
    };

    const openModal = (store) => {
        setSelectedContent(store);
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
                            업종대분류
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            업종중분류
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            업종소분류
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            매장명
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            도로명 주소
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            제목
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            등록일
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            리포트 게시
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {localStoreContent.map((store, index) => {
                        const category = locStoreCategoryList.find(
                            (cat) => cat.store_business_number === store.store_business_number
                        );

                        return (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 border-b text-gray-700">{store.local_store_content_id}</td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {category ? category.large_category_name : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {category ? category.medium_category_name : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {category ? category.small_category_name : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{store.store_name}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{store.road_name}</td>
                                <td
                                    className="px-4 py-2 border-b text-blue-600 cursor-pointer"
                                    onClick={() => openModal(store)}
                                >
                                    {store.title}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{formatDate(store.created_at)}</td>
                                <td className="px-4 py-2 border-b text-gray-700 text-center">
                                    <div
                                        onClick={() => toggleServiceStatus(index)}
                                        className={`relative inline-flex items-center w-12 h-6 cursor-pointer rounded-full transition-colors ${store.status === 'Y' ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span
                                            className={`absolute left-1 h-5 w-5 rounded-full bg-white transition-transform transform ${store.status === 'Y' ? 'translate-x-6' : ''}`}
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
                <LocStoreModal
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

export default LocStoreContentList;