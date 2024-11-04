import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocStoreModal = ({ isOpen, onClose, localStoreContentId }) => {
    const [locStoreDetailData, setLocStoreDetailData] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 모달이 열릴 때 데이터를 요청
        const fetchStoreData = async () => {
            if (!localStoreContentId) return; // ID가 없으면 요청하지 않음

            setLoading(true);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/local_store_content/select_loc_store_for_detail_content`,
                    {
                        local_store_content_id: localStoreContentId,  // 요청 본문에 데이터 전달
                    }
                );

                setLocStoreDetailData(response.data);
            } catch (error) {
                console.error('Error fetching store data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) fetchStoreData();
    }, [isOpen, localStoreContentId]);

    if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : locStoreDetailData ? (
                    <>
                        <div className="p-4">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">매장 정보</h2>
                            <p className="text-xl font-semibold text-black mb-2">
                                제목: <span className="font-normal text-gray-800">{locStoreDetailData.local_store_detail_content.title}</span>
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                내용: <span className="block mt-2 text-gray-700">{locStoreDetailData.local_store_detail_content.content}</span>
                            </p>
                        </div>
                        <div className="mt-4">
                            {locStoreDetailData.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={`${process.env.REACT_APP_FASTAPI_BASE_URL}${img.local_store_image_url}`}
                                    alt={`Store view ${index + 1}`}
                                    className="w-full h-auto mb-2 max-w-[400px] max-h-[300px] object-contain"  // 크기 제한 추가
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No data found</p>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default LocStoreModal;
