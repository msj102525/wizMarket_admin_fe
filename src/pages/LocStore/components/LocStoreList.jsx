import React, { useState } from 'react';
import LocStoreContentModal from './LocStoreContentModal';
import DataLengthDown from '../../../components/DataLengthDown';
import Pagination from '../../../components/Pagination';

const LocStoreList = ({ data }) => {

    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리

    // 정렬 함수 (전체 데이터에 대해 적용)
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;

            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (sortConfig.direction === 'asc') {
                // 오름차순: null -> 0 -> 값
                if (aValue === null && bValue !== null) return -1;
                if (aValue !== null && bValue === null) return 1;
                if (aValue === 0 && bValue !== 0) return -1;
                if (aValue !== 0 && bValue === 0) return 1;
            } else {
                // 내림차순: 값 -> 0 -> null
                if (aValue !== null && bValue === null) return -1;
                if (aValue === null && bValue !== null) return 1;
                if (aValue !== 0 && bValue === 0) return -1;
                if (aValue === 0 && bValue !== 0) return 1;
            }

            // 일반적인 값 비교
            if (aValue < bValue) return -1 * direction;
            if (aValue > bValue) return 1 * direction;
            return 0;
        }
        return 0;
    });


    // 페이징 처리
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleLinkClick = (event, store_business_id) => {
        event.preventDefault();

        const REPORT_URL = `${process.env.REACT_APP_REPORT}/wizmarket/report/${store_business_id}`;
        const width = 365;
        const height = 900;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        // window.open(
        //     REPORT_URL,
        //     "_blank",
        //     `width=${width},height=${height},top=${top},left=${left}`
        // );

        window.open(
            REPORT_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
        );

    };

    const handleModalClick = (event, storeBusinessNumber) => {
        event.preventDefault();

        const ADS_URL = `${process.env.REACT_APP_ADS}/ads/${storeBusinessNumber}`;
        const width = 400;
        const height = 800;
        const left = window.screenX + (window.innerWidth / 4) * 2 + (window.innerWidth / 4 - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            ADS_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    const handleLightClick = (event, storeBusinessNumber) => {
        event.preventDefault();

        const ADS_URL = `${process.env.REACT_APP_ADS}/ads/light/${storeBusinessNumber}`;
        const width = 455;
        const height = 800;
        const left = window.screenX + (window.outerWidth - width) / 2;
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

    return (
        <div>
            <div className="w-full overflow-x-auto">
                <div className="w-full">
                    <DataLengthDown data={data} filename="loc_store.xlsx" />
                </div>
                <p className='mb-4'>기준 : {data[0]?.local_year || "정보 없음"}년 {data[0]?.local_quarter || "정보 없음"}분기</p>
                <table className="min-w-full border-collapse border border-gray-200 text-sm truncate px-4 py-2">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                                코드
                            </th>
                            <th className="border border-gray-300 px-4 py-2 mb:text-3xl">
                                <div className="flex justify-center items-center">
                                    지점명
                                    <button onClick={() => handleSort('store_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                                정보 등록
                            </th>
                            <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                                임시
                            </th>
                            <th className="border border-gray-300 px-4 py-2 mb:text-3xl mb:hidden">
                                지점명
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center">
                                    시/도
                                    <button onClick={() => handleSort('city_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center">
                                    시/군/구
                                    <button onClick={() => handleSort('district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center">
                                    읍/면/동
                                    <button onClick={() => handleSort('sub_district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
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
                        {currentData.map((item, index) => (
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
                                            onClick={(e) => handleModalClick(e, item.store_business_number)}
                                            className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                        >
                                            wizAD
                                        </button>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <div className="flex justify-center space-x-3">
                                        <button
                                            onClick={(e) => handleLightClick(e, item.store_business_number)}
                                            className="bg-blue-300 text-white px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
                                        >
                                            임시
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
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default LocStoreList;
