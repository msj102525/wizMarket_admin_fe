import React from 'react';
import PropTypes from 'prop-types';

const CommercialDistrictList2 = ({ data }) => {
    return (
        <div className="overflow-y-auto h-[480px] border border-gray-200 rounded-lg p-4 bg-white shadow-md">
            {data.length === 0 ? (
                <p className="text-center text-gray-500">데이터가 없습니다.</p>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {data.map((item) => (
                        <div key={item.commercial_district_id} className="border border-gray-300 rounded-lg p-4 bg-white w-full sm:w-80 shadow-md">
                            <h2 className="text-lg font-semibold mb-2">상권 ID: {item.commercial_district_id}</h2>

                            <p><strong>시/도:</strong> {item.city_name}</p>
                            <p><strong>시/군/구:</strong> {item.district_name}</p>
                            <p><strong>읍/면/동:</strong> {item.sub_district_name}</p>

                            <h3 className="text-md font-semibold mt-4">비즈니스 카테고리</h3>
                            <p><strong>주요 카테고리:</strong> {item.biz_main_category_name}</p>
                            <p><strong>서브 카테고리:</strong> {item.biz_sub_category_name}</p>
                            <p><strong>상세 카테고리:</strong> {item.biz_detail_category_name}</p>

                            <h3 className="text-md font-semibold mt-4">밀도 정보</h3>
                            <p><strong>전국 밀도:</strong> {item.national_density}%</p>
                            <p><strong>도시 밀도:</strong> {item.city_density}%</p>
                            <p><strong>구 밀도:</strong> {item.district_density}%</p>
                            <p><strong>행정동 밀도:</strong> {item.sub_district_density}%</p>

                            <h3 className="text-md font-semibold mt-4">시장 정보</h3>
                            <p><strong>시장 크기:</strong> {item.market_size}원</p>
                            <p><strong>평균 결제금액:</strong> {item.average_payment}원</p>
                            <p><strong>이용 횟수:</strong> {item.usage_count}건</p>
                            <p><strong>평균 매출:</strong> {item.average_sales}만원</p>

                            <h3 className="text-md font-semibold mt-4">운영 비용</h3>
                            <p><strong>운영 비용:</strong> {item.operating_cost}만원</p>
                            <p><strong>식재료 비용:</strong> {item.food_cost}만원</p>
                            <p><strong>직원 비용:</strong> {item.employee_cost}만원</p>
                            <p><strong>임대 비용:</strong> {item.rental_cost}만원</p>
                            <p><strong>세금 비용:</strong> {item.tax_cost}만원</p>
                            <p><strong>가족 직원 비용:</strong> {item.family_employee_cost}만원</p>
                            <p><strong>CEO 비용:</strong> {item.ceo_cost}만원</p>
                            <p><strong>기타 비용:</strong> {item.etc_cost}만원</p>

                            <h3 className="text-md font-semibold mt-4">수익 정보</h3>
                            <p><strong>평균 수익:</strong> {item.average_profit}만원</p>
                            <p><strong>월요일 평균 수익:</strong> {item.avg_profit_per_mon}%</p>
                            <p><strong>화요일 평균 수익:</strong> {item.avg_profit_per_tue}%</p>
                            <p><strong>수요일 평균 수익:</strong> {item.avg_profit_per_wed}%</p>
                            <p><strong>목요일 평균 수익:</strong> {item.avg_profit_per_thu}%</p>
                            <p><strong>금요일 평균 수익:</strong> {item.avg_profit_per_fri}%</p>
                            <p><strong>토요일 평균 수익:</strong> {item.avg_profit_per_sat}%</p>
                            <p><strong>일요일 평균 수익:</strong> {item.avg_profit_per_sun}%</p>
                            <p><strong>06-09시 평균 수익:</strong> {item.avg_profit_per_06_09}%</p>
                            <p><strong>09-12시 평균 수익:</strong> {item.avg_profit_per_09_12}%</p>
                            <p><strong>12-15시 평균 수익:</strong> {item.avg_profit_per_12_15}%</p>
                            <p><strong>15-18시 평균 수익:</strong> {item.avg_profit_per_15_18}%</p>
                            <p><strong>18-21시 평균 수익:</strong> {item.avg_profit_per_18_21}%</p>
                            <p><strong>21-24시 평균 수익:</strong> {item.avg_profit_per_21_24}%</p>
                            <p><strong>24-06시 평균 수익:</strong> {item.avg_profit_per_24_06}%</p>

                            <h3 className="text-md font-semibold mt-4">고객 정보</h3>
                            <p><strong>20대 남성 평균 고객 수:</strong> {item.avg_client_per_m_20}%</p>
                            <p><strong>30대 남성 평균 고객 수:</strong> {item.avg_client_per_m_30}%</p>
                            <p><strong>40대 남성 평균 고객 수:</strong> {item.avg_client_per_m_40}%</p>
                            <p><strong>50대 남성 평균 고객 수:</strong> {item.avg_client_per_m_50}%</p>
                            <p><strong>60대 남성 평균 고객 수:</strong> {item.avg_client_per_m_60}%</p>
                            <p><strong>20대 여성 평균 고객 수:</strong> {item.avg_client_per_f_20}%</p>
                            <p><strong>30대 여성 평균 고객 수:</strong> {item.avg_client_per_f_30}%</p>
                            <p><strong>40대 여성 평균 고객 수:</strong> {item.avg_client_per_f_40}%</p>
                            <p><strong>50대 여성 평균 고객 수:</strong> {item.avg_client_per_f_50}%</p>
                            <p><strong>60대 여성 평균 고객 수:</strong> {item.avg_client_per_f_60}%</p>

                            <h3 className="text-md font-semibold mt-4">인기 메뉴</h3>
                            <p><strong>메뉴 1:</strong> {item.top_menu_1}</p>
                            <p><strong>메뉴 2:</strong> {item.top_menu_2}</p>
                            <p><strong>메뉴 3:</strong> {item.top_menu_3}</p>
                            <p><strong>메뉴 4:</strong> {item.top_menu_4}</p>
                            <p><strong>메뉴 5:</strong> {item.top_menu_5}</p>

                            <div className="text-xs text-gray-500 mt-4">
                                <p>작성일: {new Date(item.created_at).toLocaleDateString()}</p>
                                <p>수정일: {new Date(item.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
