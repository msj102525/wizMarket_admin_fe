import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';

const CategoryList = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'biz_detail_category_id', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;

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

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult);

    const headerMapping = {
        category_id: '카테고리 아이디',
        main_category_name: '대분류명',
        sub_category_name: '중분류명',
        detail_category_name: '소분류명',
    };

    const headers = data && data.length > 0
        ? Object.keys(data[0]).map(key => headerMapping[key] || key)
        : [];

    return (
        <div className="overflow-x-auto">
            <div className="w-full">
                <DataLengthDown data={data} headers={headers} filename="CategoryData.xlsx" />
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#EEEEEE]">
                    <tr>
                        {[
                            { key: 'category_id', label: '카테고리 ID' },
                            { key: 'main_category_name', label: '대분류' },
                            { key: 'sub_category_name', label: '중분류' },
                            { key: 'detail_category_name', label: '소분류' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="text-center p-4 text-xs font-extrabold text-black uppercase tracking-wider cursor-pointer w-1/4"
                                onClick={() => requestSort(key)}
                            >
                                {label} {getSortIndicator(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentResults.length > 0 ? (
                        currentResults.map((item) => (
                            <tr key={item.category_id}>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.category_id}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.main_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.detail_category_name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center px-6 py-4">데이터가 없습니다.</td>
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

CategoryList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            biz_detail_category_id: PropTypes.number,
            biz_main_category_name: PropTypes.string,
            biz_sub_category_name: PropTypes.string,
            biz_detail_category_name: PropTypes.string,
        })
    ).isRequired,
};

export default CategoryList;
