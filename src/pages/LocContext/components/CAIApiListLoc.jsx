import React from 'react';

const CAIApiList = ({ caiData, district, subDistrict }) => {
    if (!caiData || caiData.length === 0) {
        return <p className="text-center text-gray-500">CAI 데이터가 없습니다.</p>;
    }

    // Filter the data to only include items where the stationName matches the district
    const filteredData = caiData.filter(item => item.stationName === district || item.stationName === subDistrict);

    if (filteredData.length === 0) {
        return <p className="text-center text-gray-500">해당 지역의 CAI 데이터가 없습니다.</p>;
    }

    return (
        <div className="h-[500px] overflow-y-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
            {filteredData.map((item, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm mb-4">
                    <h3 className="text-lg font-semibold mb-2">{item.stationName}</h3>
                    <p className="mb-1"><strong>측정망 정보:</strong> {item.mangName}</p>
                    <p className="mb-1"><strong>측정일:</strong> {item.dataTime}</p>
                    <p className="mb-1"><strong>미세먼지(PM2.5) 농도:</strong> {item.pm25Value} ㎍/㎥</p>
                    <p className="mb-1"><strong>미세먼지(PM10) 농도:</strong> {item.pm10Value} ㎍/㎥</p>
                    <p className="mb-1"><strong>아황산가스 농도:</strong> {item.so2Value} ppm</p>
                    <p className="mb-1"><strong>일산화탄소 농도:</strong> {item.coValue} ppm</p>
                    <p className="mb-1"><strong>오존 농도:</strong> {item.o3Value} ppm</p>
                    <p className="mb-1"><strong>이산화질소 농도:</strong> {item.no2Value} ppm</p>
                    <p className="mb-1"><strong>24시간 예측 미세먼지(PM2.5):</strong> {item.pm25Value24} ㎍/㎥</p>
                    <p className="mb-1"><strong>24시간 예측 미세먼지(PM10):</strong> {item.pm10Value24} ㎍/㎥</p>
                    <p className="mb-1"><strong>통합대기환경수치:</strong> {item.khaiValue}</p>
                    <p className="mb-1"><strong>통합대기환경지수:</strong> {item.khaiGrade}</p>
                    <p className="mb-1"><strong>아황산가스 지수:</strong> {item.so2Grade}</p>
                    <p className="mb-1"><strong>일산화탄소 지수:</strong> {item.coGrade}</p>
                    <p className="mb-1"><strong>오존 지수:</strong> {item.o3Grade}</p>
                    <p className="mb-1"><strong>이산화질소 지수:</strong> {item.no2Grade}</p>
                    <p className="mb-1"><strong>미세먼지(PM10) 24시간 등급:</strong> {item.pm10Grade}</p>
                </div>
            ))}
        </div>
    );
};

export default CAIApiList;
