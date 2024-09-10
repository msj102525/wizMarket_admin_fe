import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';
// import { useCities } from '../../../hooks/useCities';

const CommercialDistrictList2 = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'commercial_district_id', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState({});
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

    const toggleRowExpansion = useCallback((id) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }, []);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult);

    const renderExpandedRow = (item) => (
        <>
            <tr>
                <td colSpan={1}></td>
                <td colSpan={8} className='border-l'>
                    <tr>
                        <td rowSpan="2" className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">
                            <p>요일별<br />평균매출</p>
                        </td>
                        {/* 요일별 데이터 */}
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">월요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">화요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">수요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">목요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">금요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">토요일</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">일요일</td>
                    </tr>
                    <tr>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_mon)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_tue)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_wed)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_thu)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_fri)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_sat)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_sun)}</td>
                    </tr>
                </td>
                <td colSpan={5} className='border-l'>
                    <tr>
                        <td rowSpan="2"></td>
                        <td rowSpan="2" className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">
                            <p>밀집도</p>
                        </td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">전국 밀집도</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">시/도 밀집도</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">군/구 밀집도</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">읍/면/동 밀집도</td>
                    </tr>
                    <tr>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.national_density)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.city_density)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.district_density)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.sub_district_density)}</td>
                    </tr>
                </td>

                <td colSpan={6} className='border-l'>
                    <tr>
                        <td rowSpan="2"></td>
                        <td rowSpan="2" className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">
                            <p>뜨는 메뉴</p>
                        </td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">TOP1</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">TOP2</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">TOP3</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">TOP4</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">TOP5</td>
                    </tr>
                    <tr>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{item.top_menu_1}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{item.top_menu_2}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{item.top_menu_3}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{item.top_menu_4}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{item.top_menu_5}</td>
                    </tr>
                </td>
            </tr>
            <tr>
                <td colSpan={1}></td>
                <td colSpan={9} className='border-l'>
                    <tr>
                        <td rowSpan="2" className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">
                            <p>시간별<br />평균 매출</p>
                        </td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">06-09</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">09-12</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">12-15</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">15-18</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">18-21</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">21-24</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">24-06</td>
                    </tr>
                    <tr>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_06_09)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_09_12)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_12_15)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_15_18)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_18_21)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_21_24)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_profit_per_24_06)}</td>
                    </tr>
                </td>
                <td colSpan={15} className='border-l'>
                    <tr>
                        <td rowSpan="2"></td>
                        <td rowSpan="2" className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">
                            <p>연령별 비중</p>
                        </td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">남 20대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">남 30대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">남 40대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">남 50대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">남 60대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">여 20대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">여 30대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">여 40대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">여 50대 비중</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">여 60대 비중</td>
                    </tr>
                    <tr>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_m_20)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_m_30)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_m_40)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_m_50)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_m_60)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_f_20)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_f_30)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_f_40)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_f_50)}</td>
                        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 px-2">{Intl.NumberFormat().format(item.avg_client_per_f_60)}</td>
                    </tr>
                </td>

            </tr>

        </>
    );

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-full">
                <DataLengthDown data={data} filename="CommercialDistrict.xlsx" />
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#EEEEEE]">
                    <tr>
                        {[
                            { key: 'toggle', label: 'toggle' },
                            { key: 'commercial_district_id', label: 'ID' },
                            { key: 'city_name', label: '시/도' },
                            { key: 'district_name', label: '시/군/구' },
                            { key: 'sub_district_name', label: '읍/면/동' },
                            { key: 'copyright', label: '출처' },
                            { key: 'biz_main_category_name', label: '대분류' },
                            { key: 'biz_sub_category_name', label: '중분류' },
                            { key: 'biz_detail_category_name', label: '소분류' },
                            { key: 'market_size', label: '시장규모' },
                            { key: 'average_profit', label: '평균매출' },
                            { key: 'average_payment', label: '평균결제' },
                            { key: 'usage_count', label: '평균건수' },
                            { key: 'operating_cost', label: '영업비용' },
                            { key: 'food_cost', label: '식자재비' },
                            { key: 'employee_cost', label: '인건비' },
                            { key: 'rental_cost', label: '임대료' },
                            { key: 'tax_cost', label: '세금' },
                            { key: 'created_at', label: '생성일시' },
                            { key: 'updated_at', label: '수정일시' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="text-center p-2 text-xs font-extrabold text-black uppercase tracking-wider cursor-pointer"
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
                            <React.Fragment key={item.commercial_district_id}>
                                <tr>
                                    <td className="flex justify-center whitespace-nowrap text-sm font-medium text-gray-900 p-2">
                                        <div
                                            className="w-[11px] cursor-pointer"
                                            onClick={() => toggleRowExpansion(item.commercial_district_id)}
                                        >
                                            <img
                                                className={`block w-full h-auto transition-transform duration-200 ${expandedRows[item.commercial_district_id] ? 'transform rotate-180' : ''}`}
                                                src={require("../../../assets/form/dropdownArrow.png")}
                                                alt="toggleImg"
                                            />
                                        </div>
                                    </td>
                                    <td className="text-center whitespace-nowrap text-sm font-medium text-gray-900 p-2">{item.commercial_district_id}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.city_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.district_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.sub_district_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{"출처"}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.biz_main_category_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.biz_sub_category_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{item.biz_detail_category_name}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.market_size)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.average_sales)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.average_payment)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.usage_count)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.operating_cost)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.food_cost)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.employee_cost)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.rental_cost)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{Intl.NumberFormat().format(item.tax_cost)}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{new Date(item.updated_at).toLocaleDateString()}</td>
                                    <td className="text-center whitespace-nowrap text-sm text-gray-500">{new Date(item.updated_at).toLocaleDateString()}</td>
                                </tr>
                                {expandedRows[item.commercial_district_id] && renderExpandedRow(item)}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="15" className="text-center py-4 text-sm font-medium text-gray-500">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
            market_size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_payment: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            usage_count: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_sales: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            operating_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            food_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            employee_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            rental_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            tax_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            average_profit: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_mon: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_tue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_wed: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_thu: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_fri: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_sat: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
            avg_profit_per_sun: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
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