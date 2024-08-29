// components/WeatherList.js
import React from 'react';

const WeatherList = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">데이터가 없습니다.</p>;
    }

    // 날짜별로 그룹화
    const groupedByDate = data.reduce((acc, item) => {
        if (!acc[item.fcstDate]) {
            acc[item.fcstDate] = [];
        }
        acc[item.fcstDate].push(item);
        return acc;
    }, {});

    const categoryLabels = {
        'TMP': '온도(℃)',
        'TMN': '일 최저기온(℃)',
        'TMX': '일 최고기온(℃)',
        'UUU': '풍속(동서성분 m/s 서->동 양수)',
        'VVV': '풍속(남북성분 m/s 남->북 양수)',
        'VEC': '풍향(deg)',
        'WSD': '풍속(m/s)',
        'SKY': '하늘 상태 (맑음(1), 구름많음(3), 흐림(4))',
        'PTY': '강수형태(단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)',
        'POP': '강수 확률 (%)',
        'WAV': '파고 (m)',
        'PCP': '1시간 강수량 (범주 1mm)',
        'REH': '습도 (%)',
        'SNO': '1시간 신적설 (범주1cm)',
    };

    const categoryOrder = [
        'TMP',
        'TMN',
        'TMX',
        'SKY',
        'PTY',
        'POP',
        'UUU',
        'VVV',
        'VEC',
        'WSD',
        'WAV',
        'PCP',
        'REH',
        'SNO',
    ];

    return (
        <div className="flex justify-between overflow-y-auto h-[453px] border border-gray-200 rounded-lg p-4 bg-white shadow-md">
            {Object.keys(groupedByDate).map((date) => (
                <div key={date} className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">날짜: {date}</h2>
                    {categoryOrder.map((category) => (
                        <div key={category} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{categoryLabels[category] || category}</h3>
                            <div className="flex flex-col gap-4">
                                {groupedByDate[date].filter(item => item.category === category).map((item, index) => (
                                    <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                                        <p><strong>시간:</strong> {item.fcstTime}</p>
                                        <p><strong>값:</strong> {item.fcstValue}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WeatherList;
