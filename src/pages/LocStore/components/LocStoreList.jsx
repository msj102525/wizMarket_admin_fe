import React, { useState } from 'react';
import LocStoreContentModal from './LocStoreContentModal';
import AdsModal from '../../Ads/components/AdsModal';

const LocStoreList = ({ data }) => {

    const handleLinkClick = (event, store_business_id) => {
        event.preventDefault();

        const REPORT_URL = `http://192.168.0.240:3001/wizmarket/report/${store_business_id}`;
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adsModalOpen, setAdsModalOpen] = useState(false);
    const [selectedStoreBusinessNumber, setSelectedStoreBusinessNumber] = useState(null);

    const handleClick = (storeBusinessNumber) => {
        setSelectedStoreBusinessNumber(storeBusinessNumber);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStoreBusinessNumber(null);
    };

    const handleAdsClick = (storeBusinessNumber) => {
        setSelectedStoreBusinessNumber(storeBusinessNumber);
        setAdsModalOpen(true);
    };

    const closeAdsModal = () => {
        setAdsModalOpen(false);
        setSelectedStoreBusinessNumber(null);
    };




    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }


    return (
        <div className="w-full overflow-x-auto">
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
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            건물명
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            도로명주소
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            우편주소
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            동정보
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            층정보
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                            호정보
                        </th>
                        <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                            기준년분기
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
                                    <button
                                        onClick={() => handleAdsClick(item.store_business_number)}
                                        className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                    >
                                        wizAd
                                    </button>
                                </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.branch_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.city_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 ">{item.district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4">{item.sub_district_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">상권정보분류표</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.large_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.medium_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 ">{item.small_category_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.industry_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.building_name}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.road_name_address}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.new_postal_code}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.dong_info}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden ">{item.floor_info}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4 mb:hidden">{item.unit_info}</td>
                            <td className="border border-gray-300 px-4 py-2 mb:py-4">
                                {item.local_year}년 {item.local_quarter}/4분기
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
            <AdsModal
                isOpen={adsModalOpen}
                onClose={closeAdsModal}
                storeBusinessNumber={selectedStoreBusinessNumber}
            />
        </div>
    );
};

export default LocStoreList;
