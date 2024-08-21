import React from 'react';

const CommercialDistrictList2 = ({ data }) => {
    return (
        <div className="overflow-y-auto h-[480px] border border-gray-200 rounded-lg p-4 bg-white shadow-md">
            {data.length === 0 ? (
                <p className="text-center text-gray-500">데이터가 없습니다.</p>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {data.map((item) => (
                        <div key={item.id} className="border border-gray-300 rounded-lg p-4 bg-white w-full sm:w-80 shadow-md">
                            <h2 className="text-lg font-semibold mb-3">
                                {item.city} {item.district} {item.sub_district}
                            </h2>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">카테고리:</span> {item.main_category} &gt; {item.sub_category} &gt; {item.detail_category}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">전국 밀도:</span> {item.national_density || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">시/도 밀도:</span> {item.city_density || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">시/군/구 밀도:</span> {item.district_density || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">읍/면/동 밀도:</span> {item.sub_district_density || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">시장 규모:</span> {item.market_size || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">평균 매출:</span> {item.average_sales || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">영업 비용:</span> {item.average_operating_cost || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">식재료비:</span> {item.average_food || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">고용인 인건비:</span> {item.average_employee || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">임차료:</span> {item.average_rental || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">세금:</span> {item.average_tax || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">가족 종사자 인건비:</span> {item.average_family_employee || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">대표자 인건비:</span> {item.average_ceo || 'N/A'}만원
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">ETC 금액:</span> {item.average_etc || 'N/A'}만원
                            </p>

                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">평균 결제 금액:</span> {item.average_payment_cost || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">이용 건수:</span> {item.usage_count || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">평균 수익:</span> {item.average_profit_amount || 'N/A'} ({item.average_profit_percent || 'N/A'})
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">가장 수익성 높은 요일:</span> {item.most_profitable_day || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">요일별 매출 비율:</span> {item.day_percent || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">월요일 매출:</span> {item.sales_monday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">화요일 매출:</span> {item.sales_tuesday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">수요일 매출:</span> {item.sales_wednesday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">목요일 매출:</span> {item.sales_thursday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">금요일 매출:</span> {item.sales_friday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">토요일 매출:</span> {item.sales_saturday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">일요일 매출:</span> {item.sales_sunday || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">가장 수익성 높은 시간대:</span> {item.most_profitable_time || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">시간대별 매출 비율:</span> {item.time_percent || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">06-09시 매출:</span> {item.sales_06_09 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">09-12시 매출:</span> {item.sales_09_12 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">12-15시 매출:</span> {item.sales_12_15 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">15-18시 매출:</span> {item.sales_15_18 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">18-21시 매출:</span> {item.sales_18_21 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">21-24시 매출:</span> {item.sales_21_24 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">24-06시 매출:</span> {item.sales_24_06 || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">주 이용 성별:</span> {item.dominant_gender || 'N/A'} ({item.dominant_gender_percent || 'N/A'}%)
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">주 이용 연령대:</span> {item.dominant_age_group || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">주 이용자 연령:</span> {item.most_visitor_age || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">총남자:</span> {item.total_male_percent || 'N/A'}
                            </p>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">성별 연령대 비율</h3>
                                <ul className="list-disc list-inside text-sm text-gray-700 flex">
                                    <li><span className="font-medium">총 남자:</span> {item.total_male_percent || 'N/A'}</li>
                                    <li><span className="font-medium">20대 남자:</span> {item.male_20s || 'N/A'}</li>
                                    <li><span className="font-medium">30대 남자:</span> {item.male_30s || 'N/A'}</li>
                                    <li><span className="font-medium">40대 남자:</span> {item.male_40s || 'N/A'}</li>
                                    <li><span className="font-medium">50대 남자:</span> {item.male_50s || 'N/A'}</li>
                                    <li><span className="font-medium">60대 이상 남자:</span> {item.male_60s || 'N/A'}</li>
                                </ul>
                                <ul className="list-disc list-inside text-sm text-gray-700 flex">
                                    <li><span className="font-medium">총 여자:</span> {item.total_female_percent || 'N/A'}</li>
                                    <li><span className="font-medium">20대 여자:</span> {item.female_20s || 'N/A'}</li>
                                    <li><span className="font-medium">30대 여자:</span> {item.female_30s || 'N/A'}</li>
                                    <li><span className="font-medium">40대 여자:</span> {item.female_40s || 'N/A'}</li>
                                    <li><span className="font-medium">50대 여자:</span> {item.female_50s || 'N/A'}</li>
                                    <li><span className="font-medium">60대 이상 여자:</span> {item.female_60s || 'N/A'}</li>
                                </ul>
                            </div>
                            <div className="mt-3">
                                <span className="font-medium text-sm">뜨는 메뉴:</span>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {item.top_menu_1 ? <li>{item.top_menu_1}</li> : null}
                                    {item.top_menu_2 ? <li>{item.top_menu_2}</li> : null}
                                    {item.top_menu_3 ? <li>{item.top_menu_3}</li> : null}
                                    {item.top_menu_4 ? <li>{item.top_menu_4}</li> : null}
                                    {item.top_menu_5 ? <li>{item.top_menu_5}</li> : null}
                                </ul>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
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

export default CommercialDistrictList2;
