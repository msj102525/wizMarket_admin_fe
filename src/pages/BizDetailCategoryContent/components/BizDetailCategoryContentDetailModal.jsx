import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor';

const BizDetailCategoryContentDetailModal = ({ isOpen, onClose, categoryContentId, mainCategoryName, subCategoryName, detailCategoryName, createdAt, onUpdate, onDelete }) => {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지
    const [newImages, setNewImages] = useState([]); // 새로 추가된 이미지
    const [saveStatus, setSaveStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

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

    const fetchCategoryData = useCallback(async () => {
        if (!categoryContentId) return;

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/select/detail/content`,
                { biz_detail_category_content_id: categoryContentId }
            );

            setTitle(response.data.category_detail_content.title);
            setContent(response.data.category_detail_content.content);
            setExistingImages(response.data.image || []); // 기존 이미지 초기화

        } catch (error) {
            console.error("Error fetching store data:", error);
        } finally {
            setLoading(false);
        }
    }, [categoryContentId]);

    useEffect(() => {
        if (isOpen) fetchCategoryData();
    }, [isOpen, fetchCategoryData]);


    // 삭제
    const handleDelete = async () => {
        if (!categoryContentId) return;
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/delete/content`,
                { biz_detail_category_content_id: categoryContentId }
            );

            if (response.status === 200) {
                setSaveStatus('success');
                setMessage('삭제가 성공적으로 완료되었습니다.');
                onDelete(categoryContentId); // 부모 컴포넌트로 삭제된 ID 전달
                setTimeout(() => {
                    setSaveStatus(null);
                    setMessage('');
                    onClose(); // 모달 닫기
                }, 1500);
            }
        } catch (error) {
            console.error("Error deleting store content:", error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000);
        }
    };


    // 이미지 추가 및 제거
    const handleImageRemove = (index, isExisting = true) => {
        if (isExisting) {
            // 기존 이미지 제거
            setExistingImages((prev) => prev.filter((_, i) => i !== index));
        } else {
            // 새로 추가된 이미지 제거
            setNewImages((prev) => prev.filter((_, i) => i !== index));
        }
    };

    // 이미지 파일 변경
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImageFiles = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        // 이미지가 4장을 초과할 경우 경고 메시지 표시
        if (existingImages.length + newImages.length + newImageFiles.length > 4) {
            setSaveStatus('error');
            setMessage('이미지는 최대 4장까지 가능합니다.');
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 1500); // 1.5초 후 경고 메시지 초기화
            return;
        }

        // 이미지 추가
        setNewImages((prev) => [...prev, ...newImageFiles]);
    };


    // 수정
    const handleUpdate = async () => {
        if (!categoryContentId) return;

        // 입력값 유효성 검사
        if (!title.trim() || !content.trim()) {
            setSaveStatus('error');
            setMessage('제목 및 내용을 카테고리를 올바르게 입력해 주세요.');
            setLoading(false); // 로딩 상태 종료
            setTimeout(() => {
                setSaveStatus(null); // 상태 초기화
                setMessage(''); // 메시지 초기화
            }, 1500);
            return;
        }

        const formData = new FormData();
        formData.append("biz_detail_category_content_id", categoryContentId);
        formData.append("title", title);
        formData.append("content", content);

        // 기존 이미지가 모두 삭제된 경우 빈 문자열을 추가
        if (existingImages && existingImages.length === 0) {
            formData.append("existing_images", "");  // 빈 리스트를 나타내는 빈 값 전송
        } else {
            existingImages.forEach((img) => {
                formData.append("existing_images", JSON.stringify(existingImages.map(img => img.biz_detail_category_content_image_url)));
            });
        }
        // 새로 추가된 이미지 파일 전송
        if (newImages.length > 0) {
            newImages.forEach((img) => formData.append("new_images", img.file));
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/update/content`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setSaveStatus('success');
            setMessage('수정이 성공적으로 완료되었습니다.');

            const updatedItem = response.data;
            onUpdate(updatedItem); // 부모 컴포넌트로 업데이트된 데이터 전달

            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
                onClose(); // 모달 닫기
            }, 1500);

        } catch (error) {
            console.error('수정 중 오류 발생:', error);
            setSaveStatus('error');
            setError('저장 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-128">
                {loading && <p className="text-center text-gray-600">로딩 중...</p>}

                {error && <p className="text-center text-red-500">{error}</p>}

                {saveStatus === 'success' && (
                    <div className="p-3 mb-4 rounded bg-green-100 text-green-800 text-center">
                        {message}
                    </div>
                )}

                {saveStatus === 'error' && (
                    <div className="p-3 mb-4 rounded bg-red-100 text-red-800 text-center">
                        {message}
                    </div>
                )}


                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">업종 추가 정보</h2>
                    <p className="text-gray-500 text-sm mt-2">업종 추가 정보를 확인하고 수정할 수 있습니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 border-b pb-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-700">대분류</p>
                        <p className="text-gray-800">{mainCategoryName}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">중분류</p>
                        <p className="text-gray-800">{subCategoryName}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">소분류</p>
                        <p className="text-gray-800">{detailCategoryName}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">생성일자</p>
                        <p className="text-gray-800">{formatDate(createdAt)}</p>
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
                    <label className="block text-lg font-semibold text-gray-700 mb-2 w-full">내용</label>
                    <TextEditor
                        content={content}
                        setContent={setContent}
                    />
                </div>

                {/* 이미지 관리 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">기존 이미지</h3>
                    <div className="flex gap-4 overflow-x-auto">
                        {existingImages.map((img, index) => (
                            <div key={index} className="relative w-[150px] h-[100px] flex-shrink-0 border rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={`${process.env.REACT_APP_FASTAPI_REPORT_URL}${img.biz_detail_category_content_image_url}`}
                                    alt={`Store view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => handleImageRemove(index, true)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">새 이미지 추가</h3>
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                    <div className="flex gap-4 overflow-x-auto mt-2">
                        {newImages.map((img, index) => (
                            <div key={index} className="relative w-[150px] h-[100px] flex-shrink-0 border rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={img.previewUrl}
                                    alt={`New view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => handleImageRemove(index, false)}
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
                    <div>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                        >
                            닫기
                        </button>
                    </div>
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
            </div>
        </div>
    );
};

export default BizDetailCategoryContentDetailModal;
