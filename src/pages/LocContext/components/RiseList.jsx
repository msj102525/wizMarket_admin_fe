// components/RiseList.js
import React from 'react';
import formatTime from '../../../utils/formatTime';

const RiseList = ({ riseData }) => {
    if (!riseData || riseData.length === 0) {
        return <p className="text-center text-gray-500">해달 출몰 시각 데이터가 없습니다.</p>;
    }

    return (
        <div className=" bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">지역:{riseData.location}</h3>
                <div className="flex gap-2">
                    {/* <p className="mb-1 text-gray-700"><strong>날짜:</strong> {riseData.locdate}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>위도:</strong> {riseData.latitudeNum}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>경도:</strong> {riseData.longitudeNum}</p> */}
                    <p className="mb-1 text-gray-700"><strong>일출:</strong> {formatTime(riseData.sunrise)}</p>
                    {/* <p className="mb-1 text-gray-700"><strong>일중:</strong> {formatTime(riseData.suntransit)}</p> */}
                    <p className="mb-1 text-gray-700"><strong>일몰:</strong> {formatTime(riseData.sunset)}</p>
                    {/* <p className="mb-1 text-gray-700"><strong>월출:</strong> {formatTime(riseData.moonrise)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>월중:</strong> {formatTime(riseData.moontransit)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>월몰:</strong> {formatTime(riseData.moonset)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>시민박명(아침):</strong> {formatTime(riseData.civilm)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>시민박명(저녁):</strong> {formatTime(riseData.civile)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>항해박명(아침):</strong> {formatTime(riseData.nautm)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>항해박명(저녁):</strong> {formatTime(riseData.naute)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>천문박명(아침):</strong> {formatTime(riseData.astm)}</p> */}
                    {/* <p className="mb-1 text-gray-700"><strong>천문박명(저녁):</strong> {formatTime(riseData.aste)}</p> */}
                </div>
            </div>
        </div>
    );
};

export default RiseList;
