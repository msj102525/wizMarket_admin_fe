import React, { useState, useEffect } from 'react';
import WeatherList from './WeatherList';
// import CAIApiList from './CAIApiList';
// import RiseList from './RiseList';
import DataLengthDown from '../../../components/DataLengthDown';

const LocContextList = ({ loading, error, weatherData, caiData, riseData, cityName, districtName, subDistrictName }) => {
    const formattedRiseData = riseData ? [riseData] : [];
    const data = [...weatherData, ...caiData, ...formattedRiseData];

    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (value) => {
        setSelectedDate(value);
        setIsOpen(false);
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

    const headerMapping = {
        baseDate: '관측날짜',
        baseTime: '관측시간',
        category: '날씨 카테고리',
        fcstDate: '날짜',
        fcstTime: '시간',
        fcstValue: '값',
        nx: '경도',
        ny: '위도',
    };

    const headers = data && data.length > 0
        ? Object.keys(data[0]).map(key => headerMapping[key] || key)
        : [];

    return (
        <div className="border rounded-lg">
            <div className='w-full'>
                <div className="">
                    <DataLengthDown data={data} headers={headers} filename="LocContext.xlsx" />
                </div>
                <div className="">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {weatherData && !loading && !error && (
                        <div className="">
                            <div>
                                <div className="flex gap-8 pb-4">
                                    <div className="flex">
                                        <p className='text-center content-center'>{cityName}</p> &nbsp;
                                        <p className='text-center content-center'>{districtName}</p> &nbsp;
                                        <p className='text-center content-center'>{subDistrictName}</p>
                                    </div>
                                    <div className="relative  rounded-lg flex">
                                        <p className="block text-md font-semibold text-center content-center">날짜</p>
                                        <div
                                            className="px-3 py-2 flex justify-between items-center cursor-pointer"
                                            onClick={() => setIsOpen(!isOpen)}
                                            id="dateSelect"
                                        >
                                            {selectedDate || 'Select a date'}
                                            <span className="ml-2">&#9662;</span>
                                        </div>
                                        {isOpen && (
                                            <ul className="absolute top-11 z-10 w-full bg-white border border-gray-200 rounded shadow-lg">
                                                {Object.keys(groupedByDate).map((date) => (
                                                    <li
                                                        key={date}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-center "
                                                        onClick={() => handleDateChange(date)}
                                                    >
                                                        {date}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <WeatherList weatherData={weatherData} selectedDate={selectedDate} caiData={caiData} districtName={districtName} subDistrictName={subDistrictName} riseData={riseData} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocContextList;
