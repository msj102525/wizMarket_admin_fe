import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';

const CommercialDistrictList2 = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'commercial_district_id', direction: 'descending' });
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

    // Calculate data for the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult);

    return (
        <div className="overflow-x-auto">
            <p className='pb-4 text-sm cursor-default'>검색결과 {Intl.NumberFormat().format(sortedData.length)} 개</p>
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#EEEEEE]">
                    <tr>
                        {[
                            { key: 'commercial_district_id', label: 'ID' },
                            { key: 'city_name', label: '시/도' },
                            { key: 'district_name', label: '시/군/구' },
                            { key: 'sub_district_name', label: '읍/면/동' },
                            { key: 'biz_main_category_name', label: '대분류' },
                            { key: 'biz_sub_category_name', label: '중분류' },
                            { key: 'biz_detail_category_name', label: '소분류' },
                            { key: 'national_density', label: '전국 밀도' },
                            { key: 'city_density', label: '도시 밀도' },
                            { key: 'district_density', label: '구 밀도' },
                            { key: 'sub_district_density', label: '행정동 밀도' },
                            { key: 'average_profit', label: '평균 수익' },
                            { key: 'created_at', label: '작성일' },
                            { key: 'updated_at', label: '수정일' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="text-center p-4 text-xs font-extrabold text-black uppercase tracking-wider cursor-pointer w-1/12"
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
                            <tr key={item.commercial_district_id}>
                                <td className="text-center py-2 whitespace-nowrap text-sm font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                                    {sortConfig.direction === "descending" ? sortedData.length - indexOfFirstResult - index : indexOfFirstResult + index + 1}
                                </td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.commercial_district_id}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.city_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.district_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_main_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_sub_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.biz_detail_category_name}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.national_density}%</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.city_density}%</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.district_density}%</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{item.sub_district_density}%</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 font-semibold overflow-hidden overflow-ellipsis">{item.average_profit}만원</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{new Date(item.created_at).toLocaleDateString()}</td>
                                <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">{new Date(item.updated_at).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14" className="text-center px-6 py-4">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination component */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedData.length / resultsPerPage)}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
        </div>
    );
};

CommercialDistrictList2.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            commercial_district_id: PropTypes.number,
            city_name: PropTypes.string,
            district_name: PropTypes.string,
            sub_district_name: PropTypes.string,
            biz_main_category_name: PropTypes.string,
            biz_sub_category_name: PropTypes.string,
            biz_detail_category_name: PropTypes.string,
            national_density: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            city_density: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            district_density: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            sub_district_density: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            market_size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_payment: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            usage_count: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_sales: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            operating_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            food_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            employee_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            rental_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            tax_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            family_employee_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            ceo_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            etc_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_profit: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_mon: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_tue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_wed: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_thu: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_fri: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_sat: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_sun: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_06_09: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_09_12: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_12_15: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_15_18: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_18_21: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_21_24: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_24_06: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_m_20: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_m_30: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_m_40: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_m_50: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_m_60: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_f_20: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_f_30: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_f_40: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_f_50: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_client_per_f_60: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            top_menu_1: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
            top_menu_2: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
            top_menu_3: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
            top_menu_4: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
            top_menu_5: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
            created_at: PropTypes.string,
            updated_at: PropTypes.string,
        })
    ).isRequired,
};

export default CommercialDistrictList2;
