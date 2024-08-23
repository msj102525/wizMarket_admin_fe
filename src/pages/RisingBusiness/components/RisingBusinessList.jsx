import React from 'react';
import PropTypes from 'prop-types';

const RisingBusinessList = ({ data }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };


    return (
        <div className="">
            <ul className="flex gap-2">
                {data.length > 0 ? (
                    data.map((item) => (
                        <li key={item.rising_business_id} className="">
                            <p className="text-ㅡㅇ">업종: {item.business_name}</p>
                            <p className="text-sm text-gray-600">증가율: {item.growth_rate}%</p>
                            <p className="text-sm text-gray-500">데이터 생성 날짜 : </p>
                            <p className="text-sm text-gray-500">{formatDate(item.created_at)}</p>
                            {/* <p className="text-sm text-gray-500">Updated At: {formatDate(item.updated_at)}</p> */}
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
            rising_business_id: PropTypes.number.isRequired,
            business_name: PropTypes.string.isRequired,
            growth_rate: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            region_id: PropTypes.number,
            sub_district_rank: PropTypes.number
        })
    ).isRequired,
};

export default RisingBusinessList;
