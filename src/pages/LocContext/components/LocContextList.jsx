import React, { useState, useEffect } from 'react';
import WeatherList from './WeatherList';
import CAIApiList from './CAIApiListLoc';
import RiseList from './RiseList';
import DataLengthDown from '../../../components/DataLengthDown';

const LocContextList = ({ loading, error, weatherData, caiData, riseData, cityName, districtName, subDistrictName }) => {
    const formattedRiseData = riseData ? [riseData] : [];
    const data = [...weatherData, ...caiData, ...formattedRiseData];

    const [selectedDate, setSelectedDate] = useState(null);


    // 날짜 선택을 위한 select box 핸들러
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // 날짜별로 그룹화
    const groupedByDate = weatherData.reduce((acc, item) => {
        if (!acc[item.fcstDate]) {
            acc[item.fcstDate] = [];
        }
        acc[item.fcstDate].push(item);
        return acc;
    }, {});

    // 첫 번째 날짜를 선택된 날짜로 설정
    useEffect(() => {
        if (weatherData.length > 0) {
            const firstDate = weatherData[0].fcstDate;
            setSelectedDate(firstDate);
        }
    }, [weatherData]);

    return (
        <div className="">
            <div className='w-full'>
                <div className="pb-4">
                    <DataLengthDown data={data} filename="LocContext.xlsx" />
                </div>
                <div className="pb-10 border">
                    <p className="text-lg font-semibold mb-4">지도 중심 기준 날씨</p>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {weatherData && !loading && !error && (
                        <div className="">
                            <div>
                                <div className="flex border gap-8 ">
                                    <div className="flex">
                                        <p className='text-center content-center'>{cityName}</p>
                                        <p className='text-center content-center'>{districtName}</p>
                                        <p className='text-center content-center'>{subDistrictName}</p>
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="dateSelect" className="block text-md font-semibold text-center content-center">날짜 선택:</label>
                                        <select
                                            id="dateSelect"
                                            className="border border-gray-300 rounded-lg px-3 py-2"
                                            onChange={handleDateChange}
                                            value={selectedDate || ''}
                                        >
                                            {Object.keys(groupedByDate).map((date) => (
                                                <option key={date} value={date}>
                                                    {date}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <WeatherList weatherData={weatherData} selectedDate={selectedDate} caiData={caiData} districtName={districtName} subDistrictName={subDistrictName} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className='w-1/4'>
                <div className="pb-10">
                    <p className="text-lg font-semibold mb-4">시/도 CAI 데이터</p>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {caiData && !loading && !error && (
                        <CAIApiList caiData={caiData} districtName={districtName} subDistrictName={subDistrictName} />
                    )}
                </div>
            </div> */}
            <div className='w-1/4'>
                <div className="pb-10">
                    <p className="text-lg font-semibold mb-4">위치별 해달 출몰시각</p>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {riseData && !loading && !error && (
                        <RiseList riseData={riseData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocContextList;
