import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BizDetailCategoryContentDetailModal from './BizDetailCategoryContentDetailModal';


const BizDetailCategoryContentList = ({ categoryContentList = [], categoryBizCategoryList = [], onUpdate, onDelete }) => {
    const [categoryContent, setCategoryContent] = useState(categoryContentList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [previewImage, setPreviewImage] = useState(""); // 미리보기 이미지 URL
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 }); // 미리보기 위치

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

    useEffect(() => {
        setCategoryContent(categoryContentList);  // categoryContentList가 업데이트될 때 categoryContent를 업데이트
    }, [categoryContentList]);

    // 서비스 게시 상태를 토글하는 함수
    const toggleServiceStatus = async (index) => {
        // 현재 상태 복사 후 업데이트
        const updatedContent = [...categoryContent];
        updatedContent[index].status = updatedContent[index].status === 'Y' ? 'S' : 'Y';

        // 로컬 상태 업데이트
        setCategoryContent(updatedContent);

        // 서버 업데이트 API 호출
        try {
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/update/status`,
                {
                    biz_detail_category_content_id: updatedContent[index].biz_detail_category_content_id,
                    status: updatedContent[index].status,
                }
            );

        } catch (error) {
            console.error('Error updating store publish status:', error);
        }
    };

    // 미리보기 이미지 설정
    const showPreview = (imageUrl, event) => {
        const { clientX, clientY } = event; // 마우스 위치
        setPreviewPosition({ x: clientX + 10, y: clientY + 10 }); // 마우스 근처에 이미지 표시
        if (!imageUrl) {
            setPreviewImage(""); // 이미지가 없는 경우 빈 문자열
            return;
        }
        setPreviewImage(imageUrl);
    };


    const hidePreview = () => {
        setPreviewImage(null); // 미리보기 숨기기
        setPreviewPosition({ x: 0, y: 0 }); // 위치 초기화
    };

    const openModal = (content, bizCategory) => {
        setSelectedContent({ content, bizCategory });
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
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold w-[90px]">미리보기</th>
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
                    {categoryContent.map((content, index) => {
                        const bizCategory = categoryBizCategoryList.find(
                            (cat) => cat.biz_detail_category_id === content.detail_category_id
                        );
                        return (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 border-b text-gray-700">{content.biz_detail_category_content_id}</td>
                                <td className="px-4 py-2 border-b text-gray-700 relative">
                                    <img
                                        className="block w-4 h-4"
                                        src={require("../../../assets/adsList/ads_list.png")}
                                        alt="user-img"
                                        onMouseEnter={(e) =>
                                            content.biz_detail_category_content_image_url &&
                                            showPreview(`${process.env.REACT_APP_FASTAPI_REPORT_URL}${content.biz_detail_category_content_image_url}`, e)
                                        }
                                        onMouseLeave={hidePreview}
                                    />
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {bizCategory ? bizCategory.biz_main_category_name : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {bizCategory ? bizCategory.biz_sub_category_name : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">
                                    {bizCategory ? bizCategory.biz_detail_category_name : 'N/A'}
                                </td>
                                <td
                                    className="px-4 py-2 border-b text-blue-600 cursor-pointer"
                                    onClick={() => openModal(content, bizCategory)}
                                >
                                    {content.title}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{formatDate(content.created_at)}</td>
                                <td className="px-4 py-2 border-b text-gray-700 text-center">
                                    <div
                                        onClick={() => toggleServiceStatus(index)}
                                        className={`relative inline-flex items-center w-12 h-6 cursor-pointer rounded-full transition-colors ${content.status === 'Y' ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span
                                            className={`absolute left-1 h-5 w-5 rounded-full bg-white transition-transform transform ${content.status === 'Y' ? 'translate-x-6' : ''}`}
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
                <BizDetailCategoryContentDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    categoryContentId={selectedContent.content.biz_detail_category_content_id}
                    mainCategoryName={selectedContent.bizCategory?.biz_main_category_name || 'N/A'}
                    subCategoryName={selectedContent.bizCategory?.biz_sub_category_name || 'N/A'}
                    detailCategoryName={selectedContent.bizCategory?.biz_detail_category_name || 'N/A'}
                    createdAt={selectedContent.content.created_at}
                />
            )}
            <div
                className="fixed z-50 pointer-events-none bg-white p-2 border border-gray-300 rounded shadow-md"
                style={{
                    top: `${previewPosition.y}px`,
                    left: `${previewPosition.x}px`,
                }}
            >
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="w-80 h-80 border border-gray-300 rounded shadow-md"
                    />
                ) : (
                    <p className="text-gray-500 text-center">미리보기 이미지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BizDetailCategoryContentList;