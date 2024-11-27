import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AdsContentList = ({ AdsList = []}) => {
    const [AdsListContent, setAdsListContent] = useState(AdsList);
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 URL
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 }); // 미리보기 위치


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
        const { clientX, clientY } = event; // 마우스 위치
        setPreviewImage(imageUrl);
        setPreviewPosition({ x: clientX + 10, y: clientY + 10 }); // 마우스 근처에 이미지 표시
    };

    const hidePreview = () => {
        setPreviewImage(null); // 미리보기 숨기기
    };

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
    
    
    

    return (
        <>
            {/* 테이블 */}
            <div className="overflow-x-auto">
                
                <table className="table-fixed min-w-full bg-white border border-gray-300 text-left shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">id</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold w-[90px]">미리보기</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">매장명</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">도로명 주소</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">광고 채널</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">주제</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">세부 주제</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">등록일</th>
                            <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">ADS 게시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AdsListContent.map((ads, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 border-b text-gray-700">{ads.ads_id}</td>
                                <td className="px-4 py-2 border-b text-gray-700 relative">
                                    <img
                                        className="block w-4 h-4"
                                        src={require("../../../assets/adsList/ads_list.png")}
                                        alt="user-img"
                                        onMouseEnter={(e) =>
                                            showPreview(`${process.env.REACT_APP_FASTAPI_ADS_URL}${ads.ads_final_image_url}`, e)
                                        }
                                        onMouseLeave={hidePreview}
                                    />
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.store_name}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.road_name}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.use_option}</td>
                                <td className="px-4 py-2 border-b text-blue-600 cursor-pointer" onClick={(e) => handleModalClick(e, ads)}>
                                    {ads.title}
                                </td>
                                <td className="px-4 py-2 border-b text-gray-700">{ads.detail_title}</td>
                                <td className="px-4 py-2 border-b text-gray-700">{formatDate(ads.created_at)}</td>
                                <td className="px-4 py-2 border-b text-gray-700 text-center">
                                    <div
                                        onClick={() => toggleServiceStatus(index)}
                                        className={`relative inline-flex items-center w-12 h-6 cursor-pointer rounded-full transition-colors ${ads.status === 'Y' ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`absolute left-1 h-5 w-5 rounded-full bg-white transition-transform transform ${ads.status === 'Y' ? 'translate-x-6' : ''
                                                }`}
                                        ></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                        className="w-auto h-auto border border-gray-300 rounded shadow-md"
                    />
                </div>
            )}
        </>
    );
};

export default AdsContentList;
