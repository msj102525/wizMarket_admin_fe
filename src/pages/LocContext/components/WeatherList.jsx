import React from 'react';
import formatTime from '../../../utils/formatTime';
import CAIApiListRight from './CAIApiListLocRight';
import CAIApiListLeft from './CAIApiListLocLeft';
import RiseList from './RiseList';

const WeatherList = ({ weatherData, selectedDate, caiData, districtName, subDistrictName, riseData }) => {
    if (!weatherData || weatherData.length === 0) {
        return <p className="text-center text-gray-500">데이터가 없습니다.</p>;
    }

    // 날짜별로 그룹화
    const groupedByDate = weatherData.reduce((acc, item) => {
        if (!acc[item.fcstDate]) {
            acc[item.fcstDate] = [];
        }
        acc[item.fcstDate].push(item);
        return acc;
    }, {});

    // 선택된 날짜의 데이터가 있으면 시간대별로 그룹화
    const groupedByTime = selectedDate ? groupedByDate[selectedDate].reduce((acc, item) => {
        if (!acc[item.fcstTime]) {
            acc[item.fcstTime] = [];
        }
        acc[item.fcstTime].push(item);
        return acc;
    }, {}) : {};

    // 시간대 리스트 정렬
    const sortedTimes = Object.keys(groupedByTime).sort((a, b) => a.localeCompare(b));


    const categoryLabels = {
        'TMP': '온도(℃)',
        'TMN': '일 최저기온(℃)',
        'TMX': '일 최고기온(℃)',
        // 'UUU': '풍속(동서성분 m/s 서->동 양수)',
        // 'VVV': '풍속(남북성분 m/s 남->북 양수)',
        // 'VEC': '풍향(deg)',
        'WSD': '풍속(m/s)',
        'SKY': '하늘 상태<br /> (맑음(1), 구름많음(3), 흐림(4))',
        // 'PTY': '강수형태(단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)',
        'POP': '강수 확률 (%)',
        // 'WAV': '파고 (m)',
        // 'PCP': '1시간 강수량 (범주 1mm)',
        'REH': '습도 (%)',
        // 'SNO': '1시간 신적설 (범주1cm)',
    };

    const categoryOrder = [
        'TMP',
        // 'TMN',
        // 'TMX',
        'SKY',
        'POP',
        // 'UUU',
        // 'VVV',
        // 'VEC',
        'WSD',
        // 'WAV',
        // 'PTY',
        // 'PCP',
        'REH',
        // 'SNO',
    ];

    const tmnValue = selectedDate ? groupedByDate[selectedDate].find(item => item.category === 'TMN')?.fcstValue || '-' : '-';
    const tmxValue = selectedDate ? groupedByDate[selectedDate].find(item => item.category === 'TMX')?.fcstValue || '-' : '-';

    return (
        <div className=''>
            <div className="flex justify-between gap-6 px-4">
                <div className="flex-1 flex border">
                    <p className='content-center'><strong>일 최저기온:</strong> {tmnValue}℃</p>
                    <p className='content-center'><strong>일 최고기온:</strong> {tmxValue}℃</p>
                </div>
                <div className="flex-1 content-center">
                    <CAIApiListLeft caiData={caiData} districtName={districtName} subDistrictName={subDistrictName} />
                </div>
                <div className="flex-1 content-center">
                    <CAIApiListRight caiData={caiData} districtName={districtName} subDistrictName={subDistrictName} />
                </div>
                <div className="flex-1 content-center">
                    <RiseList riseData={riseData} />
                </div>
            </div>
            {selectedDate && groupedByDate[selectedDate] && (
                <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
                    <h2 className="text-xl font-semibold mb-4">날짜: {selectedDate}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="px-2 bg-gray-50">
                                <tr>
                                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                                    {sortedTimes.map(time => (
                                        <th key={time} className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {formatTime(time)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categoryOrder.map(category => (
                                    <tr key={category}>
                                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: categoryLabels[category] || category }}></td>
                                        {sortedTimes.map(time => (
                                            <td key={time} className="py-4 whitespace-nowrap text-sm text-gray-500">
                                                {groupedByTime[time].find(item => item.category === category)?.fcstValue || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {!selectedDate && <p className="text-center text-gray-500">날짜를 선택하세요.</p>}
        </div>
    );
};

export default WeatherList;
