import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor';
import CategorySelect from '../../../components/CategorySelect';

const BizDeatilCategoryContentInsertModal = ({
    isOpen, onClose,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories,
    reference, references, setReference,
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saveStatus, setSaveStatus] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSelectedImages([]);
            setTitle('');
            setContent('');
            setSaveStatus(null);
            setError(null); // 모달 열 때마다 에러 상태 초기화
            setReference(1)
        }
    }, [isOpen, setReference]);


    const onSave = async () => {
        setLoading(true); // 로딩 상태 시작
        setError(null); // 이전 에러 초기화

        // 입력값 유효성 검사
        if (!title.trim() || !content.trim() || typeof detailCategory === 'string') {
            setSaveStatus('error');
            setMessage('제목, 내용, 및 카테고리를 올바르게 입력해 주세요.');
            setLoading(false); // 로딩 상태 종료
            setTimeout(() => {
                setSaveStatus(null); // 상태 초기화
                setMessage(''); // 메시지 초기화
            }, 1500);
            return;
        }

        const formData = new FormData();
        formData.append('detail_category', detailCategory);
        formData.append('title', title);
        formData.append('content', content);

        selectedImages.forEach((image) => {
            formData.append('images', image.file);
        });

        try {
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/insert/content`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setSaveStatus('success');
            setMessage('저장이 성공적으로 완료되었습니다.');

            setTimeout(() => {
                window.location.reload(); // 새로고침
            }, 1500); // 성공 메시지 표시 후 새로고침
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
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


    // 이미지 파일 변경
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        // 이미지가 4장을 초과할 경우 경고 메시지 표시
        if (selectedImages.length + newImages.length > 4) {
            setSaveStatus('error');
            setMessage('이미지는 최대 4장까지 가능합니다.');
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 1500); // 1.5초 후 경고 메시지 초기화
            return;
        }

        // 최대 4장까지 추가
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-128">
                <h2 className="text-2xl font-semibold mb-4">업종 리포트 등록</h2>

                {loading && <p>로딩 중...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {saveStatus === 'success' && (
                    <div className="p-3 mb-4 rounded bg-green-100 text-green-800">
                        {message}
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="p-3 mb-4 rounded bg-red-100 text-red-800">
                        {message}
                    </div>
                )}

                <div>
                    {/* 카테고리 검색 */}
                    <div className="mb-4 flex gap-4 mb:flex-row">
                        <div className="w-1/6 text-center content-center">
                            <label className="block mb-1 font-extrabold text-lg mb:text-4xl">카테고리 선택</label>
                        </div>
                        <div className="w-full flex gap-4">
                            <CategorySelect
                                reference={reference}
                                references={references}
                                setReference={setReference}
                                mainCategory={mainCategory}
                                setMainCategory={setMainCategory}
                                mainCategories={mainCategories}
                                subCategory={subCategory}
                                setSubCategory={setSubCategory}
                                subCategories={subCategories}
                                detailCategory={detailCategory}
                                setDetailCategory={setDetailCategory}
                                detailCategories={detailCategories} />
                        </div>
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
                        <label className="block text-lg font-semibold text-gray-700 mb-2">이미지 선택 (최대 4장)</label>
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

export default BizDeatilCategoryContentInsertModal;
