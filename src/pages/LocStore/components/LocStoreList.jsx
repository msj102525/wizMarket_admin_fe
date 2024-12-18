import React, { useState } from 'react';
import LocStoreContentModal from './LocStoreContentModal';

const LocStoreList = ({ data }) => {

    // const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    // const [previewData, setPreviewData] = useState({});
    // const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

    const handleLinkClick = (event, store_business_id) => {
        event.preventDefault();

        const REPORT_URL = `${process.env.REACT_APP_REPORT}/wizmarket/report/${store_business_id}`;
        const width = 394;
        const height = 900;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            REPORT_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    const handleModalClick = (event, storeBusinessNumber) => {
        event.preventDefault();

        const ADS_URL = `${process.env.REACT_APP_ADS}/ads/${storeBusinessNumber}`;
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoreBusinessNumber, setSelectedStoreBusinessNumber] = useState(null);

    const handleClick = (storeBusinessNumber) => {
        setSelectedStoreBusinessNumber(storeBusinessNumber);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStoreBusinessNumber(null);
    };

    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }



    // const handleMouseEnter = (menu_1, menu_1_price, event) => {
    //     const { clientX, clientY } = event; // 마우스 위치 좌표
    //     setPreviewData({
    //         menu: menu_1,
    //         price: menu_1_price,
    //     });
    //     setPreviewPosition({ x: clientX + 10, y: clientY + 10 }); // 마우스 근처에 위치
    //     setIsPreviewVisible(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsPreviewVisible(false);
    // };



    return (
        <div className="w-full overflow-x-auto">
            <p className='mb-4'>기준 : {data[0]?.local_year || "정보 없음"}년 {data[0]?.local_quarter || "정보 없음"}분기</p>
            <table className="min-w-full border-collapse border border-gray-200 text-sm truncate px-4 py-2">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            코드
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            상호명
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            정보 등록
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            지점명
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            시/도
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            시/군/구
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            읍/면/동
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">출처</th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            대분류
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            중분류
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            소분류
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            표준산업분류명
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            제휴사
                        </th>
                        {/* <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            평점
                        </th> */}
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            건물명
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            주소
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-t ">
                            <td className="border border-gray-300 px-4 py-2 text-center mb:hidden">{item.store_business_number}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <p
                                    className="cursor-pointer hover:text-blue-600 inline-block"
                                    onClick={(e) => handleLinkClick(e, item.store_business_number)}
                                >
                                    {item.store_name}
                                </p>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => handleClick(item.store_business_number)}
                                        className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                    >
                                        정보 등록
                                    </button>
                                    {/* <button
                                        onClick={(e) => handleAdsClick(item.store_business_number)}
                                        className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                    >
                                        wizAd
                                    </button> */}
                                    <button
                                        onClick={(e) => handleModalClick(e, item.store_business_number)}
                                        className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                    >
                                        wizAD
                                    </button>
                                </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.branch_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.city_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 ">{item.district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4">{item.sub_district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">
                                {item.source === 1 ? "나이스 비즈맵" : "상권정보분류표"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">
                                {item.source === 1 ? item.BIZ_MAIN_CATEGORY_NAME : item.large_category_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">
                                {item.source === 1 ? item.BIZ_SUB_CATEGORY_NAME : item.medium_category_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 ">
                                {item.source === 1 ? item.BIZ_DETAIL_CATEGORY_NAME : item.small_category_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.industry_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">
                                {(() => {
                                    const labels = [];
                                    if (item.jsam === 1) {
                                        labels.push("JSAM");
                                    }
                                    if (item.ktmyshop === 1) {
                                        labels.push("가게정보");
                                    }
                                    return labels.length > 0 ? labels.join(", ") : ""; // 조건에 맞는 텍스트 표시
                                })()}
                            </td>
                            {/* <td
                                onMouseEnter={(e) =>
                                handleMouseEnter(item.menu_1, item.menu_1_price, e)
                                }
                                onMouseLeave={handleMouseLeave}
                                className="border border-gray-300 px-4 py-2"
                            >
                                {item.kakao_review_score} ({item.kakao_review_count})
                            </td> */}
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.building_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">
                                {item.road_name_address && (
                                    <>
                                        {item.road_name_address}
                                        {item.new_postal_code && ` (${item.new_postal_code})`}
                                        {item.dong_info && ` ${item.dong_info}동`}
                                        {item.floor_info && ` ${item.floor_info}층`}
                                        {item.unit_info && ` ${item.unit_info}호`}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 모달 컴포넌트 */}
            <LocStoreContentModal
                isOpen={isModalOpen}
                onClose={closeModal}
                storeBusinessNumber={selectedStoreBusinessNumber}
            />
            {/* {isPreviewVisible && (
                <div
                    style={{
                        position: "absolute",
                        top: previewPosition.y,
                        left: previewPosition.x,
                        background: "white",
                        border: "1px solid gray",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                    }}
                >
                    <p className="font-bold">Menu: {previewData.menu || "N/A"}</p>
                    <p>Price: {previewData.price || "N/A"}</p>
                    <p className="font-bold">Menu: {previewData.menu || "N/A"}</p>
                    <p>Price: {previewData.price || "N/A"}</p>
                    <p className="font-bold">Menu: {previewData.menu || "N/A"}</p>
                    <p>Price: {previewData.price || "N/A"}</p>
                </div>
            )} */}
        </div>
    );
};

export default LocStoreList;
