import React from 'react';

const CAIApiListRight = ({ caiData, districtName, subDistrictName }) => {
    if (!caiData || caiData.length === 0) {
        return <p className="text-center text-gray-500">CAI 데이터가 없습니다.</p>;
    }

    // Filter the data to only include items where the first two characters of stationName match district or subDistrict
    const filteredDatas = caiData.filter(item =>
        item.stationName.slice(0, 2) === districtName.slice(0, 2) ||
        item.stationName.slice(0, 2) === subDistrictName.slice(0, 2)
    );

    const filteredData = filteredDatas.length === 0 ? caiData[0] : filteredDatas[0];

    return (
        <div className="bg-white rounded-lg">
            <div className="p-4 border border-gray-300 rounded-lg shadow-sm flex gap-2">
                {/* <h3 className="text-sm font-semibold mb-2">{item.stationName} : </h3> */}
                {/* <p className="mb-1 text-xs">측정망 정보: {item.mangName}</p> */}
                {/* <p className="mb-1 text-xs">측정일: {item.dataTime}</p> */}
                {/* <p className="mb-1 text-xs">미세먼지(PM2.5) 농도: {item.pm25Value} ㎍/㎥</p> */}
                {/* <p className="mb-1 text-xs">미세먼지(PM10) 농도: {item.pm10Value} ㎍/㎥</p> */}
                <div className="">
                    <p className="mb-1 text-xs">아황산가스 농도: <span className=' text-red-500 text-xs'> {filteredData.so2Value} </span>ppm</p>
                    <p className="mb-1 text-xs">일산화탄소 농도: <span className=' text-red-500 text-xs'> {filteredData.coValue} </span>ppm</p>
                </div>
                <div className="">
                    <p className="mb-1 text-xs">오존 농도: <span className=' text-red-500 text-xs'> {filteredData.o3Value} </span>ppm</p>
                    <p className="mb-1 text-xs">이산화질소 농도: <span className=' text-red-500 text-xs'> {filteredData.no2Value} </span>ppm</p>
                </div>
                {/* <p className="mb-1 text-xs">24시간 예측 미세먼지(PM2.5): {item.pm25Value24} ㎍/㎥</p> */}
                {/* <p className="mb-1 text-xs">24시간 예측 미세먼지(PM10): {item.pm10Value24} ㎍/㎥</p> */}
                {/* <p className="mb-1 text-xs">통합대기환경수치: {item.khaiValue}</p> */}
                {/* <p className="mb-1 text-xs">통합대기환경지수: {item.khaiGrade}</p> */}
                {/* <p className="mb-1 text-xs">아황산가스 지수: {item.so2Grade}</p> */}
                {/* <p className="mb-1 text-xs">일산화탄소 지수: {item.coGrade}</p> */}
                {/* <p className="mb-1 text-xs">오존 지수: {item.o3Grade}</p> */}
                {/* <p className="mb-1 text-xs">이산화질소 지수: {item.no2Grade}</p> */}
                {/* <p className="mb-1 text-xs">미세먼지(PM10) 24시간 등급: {item.pm10Grade}</p> */}
            </div>
        </div>
    );
};

export default CAIApiListRight;
