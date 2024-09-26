import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';

const RisingBusinessList = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'rising_business_id', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const resultsPerPage = 20; // 페이지당 표시할 데이터 개수

    const sortedData = React.useMemo(() => {
        const sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '';
    };

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult);

    const headerMapping = {
        rising_business_id: '카테고리 아이디',
        city_name: '시/도',
        district_name: '시/군/구',
        sub_district_name: '읍/면/동',
        biz_main_category_name: '대분류명',
        biz_sub_category_name: '중분류명',
        biz_detail_category_name: '소분류명',
        growth_rate: '증가율',
        sub_district_rank: '읍/면/동 순위',
        created_at: '생성날짜',
        updated_at: '수정날짜',
    };

    const headers = data && data.length > 0
        ? Object.keys(data[0]).map(key => headerMapping[key] || key)
        : [];

    return (
        <div className="overflow-x-auto">
            <div className="w-full">
                <DataLengthDown data={data} headers={headers} filename="RisingBusiness.xlsx" />
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#EEEEEE]">
                    <tr>
                        {[
                            { key: 'rising_business_id', label: '코드' },
                            { key: 'city_name', label: '시/도' },
                            { key: 'district_name', label: '시/군/구' },
                            { key: 'sub_district_name', label: '읍/면/동' },
                            { key: 'biz_main_category_name', label: '대분류' },
                            { key: 'biz_sub_category_name', label: '중분류' },
                            { key: 'biz_detail_category_name', label: '소분류' },
                            { key: 'growth_rate', label: '증가율' },
                            { key: 'sub_district_rank', label: '지역순위' },
                            { key: 'created_at', label: '작성일' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="text-center p-4 text-md font-extrabold text-black uppercase tracking-wider cursor-pointer w-1/12"
                                onClick={() => requestSort(key)}
                            >
                                {label} {getSortIndicator(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentResults.length > 0 ? (
                        currentResults.map((item, index) => (
                            <tr key={item.rising_business_id}>
                                <td className="text-center py-2 whitespace-nowrap text-md font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                                    {sortConfig.direction === "descending" ? sortedData.length - indexOfFirstResult - index : indexOfFirstResult + index + 1}
                                </td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.city_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.district_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_main_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_sub_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_detail_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 font-semibold overflow-hidden overflow-ellipsis">{item.growth_rate}%</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_rank}</td>
                                <td className="text-center py-2 whitespace-nowrap text-md text-gray-500 overflow-hidden overflow-ellipsis">{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12" className="text-center px-6 py-4">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination 컴포넌트 추가 */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedData.length / resultsPerPage)}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
        </div>
    );
};

RisingBusinessList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            city_name: PropTypes.string.isRequired,
            district_name: PropTypes.string.isRequired,
            sub_district_name: PropTypes.string.isRequired,
            biz_main_category_name: PropTypes.string.isRequired,
            biz_sub_category_name: PropTypes.string.isRequired,
            biz_detail_category_name: PropTypes.string.isRequired,
            growth_rate: PropTypes.number.isRequired,
            sub_district_rank: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RisingBusinessList;
