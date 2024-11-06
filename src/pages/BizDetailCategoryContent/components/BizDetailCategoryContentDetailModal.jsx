import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor';

const BizDetailCategoryContentDetailModal = ({ isOpen, onClose, categoryContentId, mainCategoryName, subCategoryName, detailCategoryName, createdAt }) => {
    const [categoryDetailData, setCategoryDetailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지
    const [newImages, setNewImages] = useState([]); // 새로 추가된 이미지


    const fetchStoreData = useCallback(async () => {
        if (!categoryContentId) return;

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/select/detail/content`,
                { biz_detail_category_content_id: categoryContentId }
            );
            setCategoryDetailData(response.data);
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
        if (isOpen) fetchStoreData();
    }, [isOpen, fetchStoreData]);


    // 삭제
    const handleDelete = async () => {
        if (!categoryContentId) return;

        try {
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/delete/content`,
                { biz_detail_category_content_id: categoryContentId }
            );

            // 삭제 후 모달을 닫고 데이터를 갱신
            onClose(); // 모달 닫기
            window.location.reload();
        } catch (error) {
            console.error("Error deleting store content:", error);
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

    // 이미지 체인지
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImageFiles = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setNewImages((prev) => [...prev, ...newImageFiles]);
    };


    // 수정
    const handleUpdate = async () => {
        if (!categoryContentId) return;

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
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/update/content`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            onClose(); // 업데이트 후 모달 닫기
        } catch (error) {
            console.error("Error updating store content:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-128">
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : categoryDetailData ? (
                    <>

                        <div>
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
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">No data found</p>
                )}
            </div>
        </div>
    );
};

export default BizDetailCategoryContentDetailModal;
