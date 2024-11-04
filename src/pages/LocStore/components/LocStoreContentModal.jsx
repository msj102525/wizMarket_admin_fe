import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocStoreContentModal = ({ isOpen, onClose, storeBusinessNumber }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]); // 이미지 파일 저장
    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 내용 상태

    useEffect(() => {
        const fetchInitialData = async () => {
            if (isOpen) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc_store/select_loc_store_for_content`,
                        null,
                        {
                            params: { store_business_number: storeBusinessNumber },
                        }
                    );
                    console.log(response.data)
                    setData(response.data);
                } catch (err) {
                    console.error('초기 데이터 로드 중 오류 발생:', err);
                    setError('초기 데이터 로드 중 오류가 발생했습니다.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchInitialData();
    }, [isOpen, storeBusinessNumber]);

    // 모달이 열릴 때마다 selectedImages, title, content 초기화
    useEffect(() => {
        if (isOpen) {
            setSelectedImages([]);
            setTitle('');
            setContent('');
        }
    }, [isOpen]);

    const onSave = async () => {
        const formData = new FormData();
        formData.append('store_business_number', storeBusinessNumber);
        formData.append('title', title);
        formData.append('content', content);

        selectedImages.forEach((image, index) => {
            formData.append(`images`, image.file);
        });

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/local_store_content/insert_store_content_image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('저장 성공:', response.data);
            onClose(); // 저장 후 모달 닫기
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setError('저장 중 오류가 발생했습니다.');
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setSelectedImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    };

    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-128">
                <h2 className="text-2xl font-semibold mb-4">매장 추가 정보 등록</h2>

                {loading && <p>로딩 중...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {data && (
                    <div>
                        <p className="text-xl">매장 명: {data.store_name} - {data.road_name_address}</p>

                        <label className="block text-gray-700 mt-4 mb-2">제목:</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full px-3 py-2"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label className="block text-gray-700 mt-4 mb-2">내용:</label>
                        <textarea
                            className="border border-gray-300 rounded w-full px-3 py-2 h-72"
                            rows="4"
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>

                        <label className="block text-gray-700 mt-4 mb-2">이미지 선택(최대 4장)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="border border-gray-300 rounded w-full px-3 py-2"
                            onChange={handleFileChange}
                        />

                        <div className="mt-4 flex flex-wrap gap-4">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={image.previewUrl}
                                        alt={`미리보기 ${index + 1}`}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => removeImage(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                    >
                        닫기
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocStoreContentModal;
