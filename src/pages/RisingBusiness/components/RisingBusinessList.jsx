import React from 'react';
import PropTypes from 'prop-types';

const RisingBusinessList = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <ul className="flex gap-4 flex-wrap">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <li key={index} className="min-w-[300px] p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                            <p className="text-lg font-semibold mb-2">{item.biz_main_category_name}</p>
                            <p className="text-sm text-gray-600 mb-1">카테고리: {item.biz_sub_category_name} / {item.biz_detail_category_name}</p>
                            <p className="text-sm text-gray-600 mb-2">증가율: <span className="text-green-500 font-semibold">{item.growth_rate}%</span></p>
                            <div className="text-xs text-gray-500 mt-4">
                                <p>작성일: {new Date(item.created_at).toLocaleDateString()}</p>
                                <p>수정일: {new Date(item.updated_at).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center p-4">데이터가 없습니다.</li>
                )}
            </ul>
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
