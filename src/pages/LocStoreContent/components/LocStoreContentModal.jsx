import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocStoreModal = ({ isOpen, onClose, localStoreContentId, storeName, roadName, createdAt }) => {
    const [locStoreDetailData, setLocStoreDetailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!localStoreContentId) return;

            setLoading(true);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/local_store_content/select_loc_store_for_detail_content`,
                    { local_store_content_id: localStoreContentId }
                );

                setLocStoreDetailData(response.data);
                setTitle(response.data.local_store_detail_content.title);
                setContent(response.data.local_store_detail_content.content);
            } catch (error) {
                console.error("Error fetching store data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) fetchStoreData();
    }, [isOpen, localStoreContentId]);

    if (!isOpen) return null;

    const handleUpdate = () => {
        console.log("Update button clicked");
    };

    const handleDelete = () => {
        console.log("Delete button clicked");
    };

    const handleImageRemove = (index) => {
        const updatedImages = locStoreDetailData.image.filter((_, i) => i !== index);
        setLocStoreDetailData((prevData) => ({
            ...prevData,
            image: updatedImages,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-5xl overflow-auto max-h-[90vh]">
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : locStoreDetailData ? (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">매장 정보</h2>
                            <p className="text-gray-500 text-sm mt-2">매장 추가 정보를 확인하고 수정할 수 있습니다.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 border-b pb-4">
                            <div>
                                <p className="text-lg font-semibold text-gray-700">매장명</p>
                                <p className="text-gray-800">{storeName}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-700">주소</p>
                                <p className="text-gray-800">{roadName}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-700">생성일자</p>
                                <p className="text-gray-800">{createdAt}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">내용</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">이미지</h3>
                            <div className="flex gap-4 overflow-x-auto">
                                {locStoreDetailData.image.map((img, index) => (
                                    <div key={index} className="relative w-[150px] h-[100px] flex-shrink-0 border rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={`${process.env.REACT_APP_FASTAPI_BASE_URL}${img.local_store_image_url}`}
                                            alt={`Store view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleImageRemove(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 수정, 삭제, 닫기 버튼 */}
                        <div className="flex justify-between items-center mt-6">
                            {/* 좌측 닫기 버튼 */}
                            <div>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                                >
                                    닫기
                                </button>
                            </div>

                            {/* 우측 수정 및 삭제 버튼 */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                                >
                                    삭제
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                                >
                                    수정
                                </button>
                            </div>
                        </div>

                    </>
                ) : (
                    <p className="text-center text-gray-500">No data found</p>
                )}
            </div>
        </div>
    );
};

export default LocStoreModal;
