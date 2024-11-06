import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor';

const LocStoreContentModal = ({ isOpen, onClose, storeBusinessNumber }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saveStatus, setSaveStatus] = useState(null); // 저장 상태
    const [message, setMessage] = useState(''); // 성공 또는 실패 메시지

    useEffect(() => {
        const fetchInitialData = async () => {
            if (isOpen) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_FASTAPI_BASE_URL}/loc/store/select/init/content`,
                        null,
                        { params: { store_business_number: storeBusinessNumber } }
                    );
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

    useEffect(() => {
        if (isOpen) {
            setSelectedImages([]);
            setTitle('');
            setContent('');
            setSaveStatus(null); // 모달 열 때마다 저장 상태 초기화
        }
    }, [isOpen]);

    const onSave = async () => {
        const formData = new FormData();
        formData.append('store_business_number', storeBusinessNumber);
        formData.append('title', title);
        formData.append('content', content);

        selectedImages.forEach((image) => {
            formData.append('images', image.file);
        });

        try {
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/store/content/insert/content`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // 성공 시 받은 데이터 상태에 저장
            setData(response.data); // 성공 시 서버에서 받은 데이터를 상태에 저장
            setSaveStatus('success'); // 성공 상태로 설정
            setMessage('저장이 성공적으로 완료되었습니다.');

            // 모달을 닫기 전에 잠시 메시지를 표시
            setTimeout(() => {
                onClose();
            }, 1500); // 2초 후 모달 닫기

        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setSaveStatus('error'); // 실패 상태로 설정
            setMessage('저장 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000); // 3초 후 메시지 숨기기
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
                <h2 className="text-2xl font-semibold mb-4">매장 리포트 등록</h2>

                {loading && <p>로딩 중...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {saveStatus === 'success' && (
                    <div className="p-3 mb-4 rounded bg-green-100 text-green-800">
                        저장이 성공적으로 완료되었습니다.
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="p-3 mb-4 rounded bg-red-100 text-red-800">
                        {message}
                    </div>
                )}

                {data && (
                    <div>
                        <div className="mb-6">
                            <p className="text-xl">매장 명: {data.store_name} - {data.road_name_address}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">제목:</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                placeholder="제목을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">내용:</label>
                            <TextEditor
                                content={content}
                                setContent={setContent}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">이미지 선택(최대 4장)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                onChange={handleFileChange}
                            />
                        </div>
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
                <div className="flex justify-between items-center mt-6">
                    {/* 좌측 닫기 버튼 */}
                    <div>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                        >
                            취소
                        </button>
                    </div>
                    {/* 우측 저장 버튼 */}
                    <div className="flex space-x-4">
                        <button
                            onClick={onSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocStoreContentModal;
