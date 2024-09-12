// components/RiseList.js
import React from 'react';
import formatTime from '../../../utils/formatTime';

const RiseList = ({ riseData }) => {
    if (!riseData || riseData.length === 0) {
        return <p className="text-center text-gray-500">해달 출몰 시각 데이터가 없습니다.</p>;
    }

    return (
        <div className=" bg-white rounded-lg  border border-gray-200 h-16 content-center">
            <div className="p-2">
                {/* <h3 className="text-xl font-semibold mb-2 text-gray-800">지역:{riseData.location}</h3> */}
                <div className="flex gap-2 contents-center">
                    {/* <p className="text-gray-700"><strong>날짜:</strong> {riseData.locdate}</p> */}
                    {/* <p className="text-gray-700"><strong>위도:</strong> {riseData.latitudeNum}</p> */}
                    {/* <p className="text-gray-700"><strong>경도:</strong> {riseData.longitudeNum}</p> */}
                    <div className="w-7">
                        <img className='block w-full h-auto' src={require("../../../assets/locContext/ep_sunrise.png")} alt="sunrise" />
                    </div>
                    <p className="text-gray-700 text-xl content-center">일출 <span className='text-xl text-blue-500'>{formatTime(riseData.sunrise)}</span></p>
                    <p className="text-gray-700 text-xl content-center">/</p>
                    <div className="w-7">
                        <img className='block w-full h-auto' src={require("../../../assets/locContext/ep_sunset.png")} alt="sunset" />
                    </div>
                    <p className="text-gray-700 text-xl content-center">일몰 <span className='text-xl text-red-500'>{formatTime(riseData.sunset)}</span></p>
                    {/* <p className="text-gray-700 text-xl">일중: {formatTime(riseData.suntransit)}</p> */}
                    {/* <p className="text-gray-700"><strong>월출:</strong> {formatTime(riseData.moonrise)}</p> */}
                    {/* <p className="text-gray-700"><strong>월중:</strong> {formatTime(riseData.moontransit)}</p> */}
                    {/* <p className="text-gray-700"><strong>월몰:</strong> {formatTime(riseData.moonset)}</p> */}
                    {/* <p className="text-gray-700"><strong>시민박명(아침):</strong> {formatTime(riseData.civilm)}</p> */}
                    {/* <p className="text-gray-700"><strong>시민박명(저녁):</strong> {formatTime(riseData.civile)}</p> */}
                    {/* <p className="text-gray-700"><strong>항해박명(아침):</strong> {formatTime(riseData.nautm)}</p> */}
                    {/* <p className="text-gray-700"><strong>항해박명(저녁):</strong> {formatTime(riseData.naute)}</p> */}
                    {/* <p className="text-gray-700"><strong>천문박명(아침):</strong> {formatTime(riseData.astm)}</p> */}
                    {/* <p className="text-gray-700"><strong>천문박명(저녁):</strong> {formatTime(riseData.aste)}</p> */}
                </div>
            </div>
        </div>
    );
};

export default RiseList;
