import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../../components/Pagination';


const AdsContentList = ({ AdsList = [] }) => {
    const [AdsListContent, setAdsListContent] = useState(AdsList);
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 URL
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 }); // 미리보기 위치
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 10;  // 한 페이지에 보여줄 리스트 개수


    // useEffect(() => {
    //     console.log("AdsList 데이터:", AdsList);
    // }, [AdsList]);

    // 주제 용도
    useEffect(() => {
        setAdsListContent(AdsList);
    }, [AdsList]);

    useEffect(() => {
        const handleChildMessage = (event) => {
            if (event.data === "reload") {
                window.location.reload();
            }
        };

        window.addEventListener("message", handleChildMessage);

        return () => {
            window.removeEventListener("message", handleChildMessage);
        };
    }, []);

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // 미리보기 이미지 설정
    const showPreview = (imageUrl, event) => {
        const { clientX, clientY } = event;
      
        // 미리보기 이미지 크기 설정
        const previewWidth = 240; // 미리보기 이미지의 너비
        const previewHeight = 384; // 미리보기 이미지의 높이
      
        // 화면 가시 영역 확인
        const maxX = window.innerWidth - previewWidth;
        const maxY = window.innerHeight - previewHeight;
      
        // 마우스 위치를 기준으로 조정
        const adjustedX = Math.min(clientX + 10, maxX);
        const adjustedY = Math.min(clientY + 10, maxY);
      
        setPreviewImage(imageUrl);
        setPreviewPosition({ x: adjustedX, y: adjustedY });
      };
      

    // 미리보기 숨기기
    const hidePreview = () => {
        setPreviewImage(null); 
    };

    // 상태 업데이트
    const toggleServiceStatus = async (index) => {
        const updatedContent = [...AdsListContent];
        updatedContent[index].status = updatedContent[index].status === 'Y' ? 'S' : 'Y';
        setAdsListContent(updatedContent);

        try {
            await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/update/status`, {
                ads_id: updatedContent[index].ads_id,
                status: updatedContent[index].status,
            });
        } catch (error) {
            console.error('Error updating store publish status:', error);
        }
    };

    // 수정 창 열기
    const handleModalClick = (event, ads) => {
        event.preventDefault();

        const encodedParams = new URLSearchParams(ads).toString();
        const ADS_URL = `${process.env.REACT_APP_ADS}/ads/detail?${encodedParams}`;
        const width = 500;
        const height = 800;
        const left = window.screenX + (window.innerWidth / 4) * 2 + (window.innerWidth / 4 - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            ADS_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    // 홍보용 창 열기
    const promoteModalClick = (event, ads_id) => {
        event.preventDefault();
        console.log(ads_id)
        const ADS_URL = `${process.env.REACT_APP_ADS}/ads/promote/${ads_id}`;
        const width = 300;
        const height = 400;
        const left = window.screenX + (window.innerWidth / 4) * 2 + (window.innerWidth / 4 - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            ADS_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    // 페이징 처리
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = AdsListContent.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

    const totalPages = Math.ceil(AdsListContent.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };




    return (
        <>
            <div className="mt-4">
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full table-auto bg-white border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-100 to-gray-300">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    미리보기
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    매장명
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    도로명 주소
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    광고 채널
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    주제
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    세부 주제
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    등록일
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                                    게시 상태
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((ads, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100 transition-colors border-b last:border-none"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800"
                                        onClick={(e) => promoteModalClick(e, ads.ads_id)}>
                                        {ads.ads_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 relative">
                                        <img
                                            className="w-6 h-6 rounded-full"
                                            src={require("../../../assets/adsList/ads_list.png")}
                                            alt="user-img"
                                            onMouseEnter={(e) =>
                                                showPreview(
                                                    `${process.env.REACT_APP_FASTAPI_ADS_URL}${ads.ads_final_image_url}`,
                                                    e
                                                )
                                            }
                                            onMouseLeave={hidePreview}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{ads.store_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{ads.road_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{ads.use_option}</td>
                                    <td
                                        className="px-6 py-4 text-sm text-blue-500 cursor-pointer hover:underline"
                                        onClick={(e) => handleModalClick(e, ads)}
                                    >
                                        {ads.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{ads.detail_title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {formatDate(ads.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div
                                            onClick={() => toggleServiceStatus(index)}
                                            className={`relative inline-flex items-center w-14 h-8 cursor-pointer rounded-full transition-colors ${ads.status === "Y" ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                        >
                                            <span
                                                className={`absolute left-1 h-6 w-6 rounded-full bg-white transition-transform transform ${ads.status === "Y" ? "translate-x-6" : ""
                                                    }`}
                                            ></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                {/* 이미지 미리보기 */}
                {previewImage && (
                    <div
                        className="fixed z-50 pointer-events-none"
                        style={{
                            top: `${previewPosition.y}px`,
                            left: `${previewPosition.x}px`,
                        }}
                    >
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-72 max-h-96 border border-gray-300 rounded shadow-md"
                        />
                    </div>
                )}
            </div>

        </>
    );
};

export default AdsContentList;
