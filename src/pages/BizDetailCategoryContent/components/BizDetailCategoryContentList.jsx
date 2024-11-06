import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BizDetailCategoryContentDetailModal from './BizDetailCategoryContentDetailModal';


const BizDetailCategoryContentList = ({ categoryContentList = [], categoryBizCategoryList = [] }) => {
    const [categoryContent, setCategoryContent] = useState(categoryContentList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

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
                                <td className="px-4 py-2 border-b text-gray-700">{content.created_at}</td>
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
                    categoryContentId={selectedContent.content.biz_detail_category_content_id}
                    mainCategoryName={selectedContent.bizCategory?.biz_main_category_name || 'N/A'}
                    subCategoryName={selectedContent.bizCategory?.biz_sub_category_name || 'N/A'}
                    detailCategoryName={selectedContent.bizCategory?.biz_detail_category_name || 'N/A'}
                    createdAt={selectedContent.content.created_at}
                />
            )}
        </div>
    );
};

export default BizDetailCategoryContentList;