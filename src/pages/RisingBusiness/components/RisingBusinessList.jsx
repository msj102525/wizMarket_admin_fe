import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RisingBusinessList = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'rising_business_id', direction: 'descending' });
    console.log(sortConfig)

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

    const requestSort = key => {
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

    return (
        <div className="overflow-x-auto">
            <p className='pb-4 text-sm cursor-default'>검색결과 {Intl.NumberFormat().format(sortedData.length)} 개</p>
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#EEEEEE]">
                    <tr>
                        {[
                            { key: 'rising_business_id', label: '번호' },
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
                            { key: 'updated_at', label: '수정일' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="px-6 py-3 text-left text-xs font-extrabold text-black uppercase tracking-wider cursor-pointer w-1/12"
                                onClick={() => requestSort(key)}
                            >
                                {label} {getSortIndicator(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.length > 0 ? (
                        sortedData.map((item, index) => (
                            <tr key={item.rising_business_id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                                    {sortConfig.direction === "descending" ? sortedData.length - index : index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.rising_business_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.city_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.district_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_main_category_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_sub_category_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_detail_category_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold overflow-hidden overflow-ellipsis">{item.growth_rate}%</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_rank}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{new Date(item.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{new Date(item.updated_at).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12" className="text-center px-6 py-4">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
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