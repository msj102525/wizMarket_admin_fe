import React, { useState } from 'react';

// 헬퍼 함수로 데이터를 찾고 포맷팅
const getStatValue = (statData, targetItem, field, divisor = 1, unit = '') => {
    const stat = statData.find(stat => stat.target_item === targetItem);
    return stat && stat[field] ? `${(stat[field] / divisor).toFixed(1)}${unit}` : '데이터 없음';
};

// 최대/최소 값을 모두 표시하는 헬퍼 함수
const getMaxMinValue = (statData, targetItem, unit = '') => {
    const stat = statData.find(stat => stat.target_item === targetItem);
    if (stat && stat.max_val !== null && stat.min_val !== null) {
        return `${stat.max_val.toFixed(1)} / ${stat.min_val.toFixed(1)}${unit}`;
    }
    return '데이터 없음';
};

const isValueAboveThreshold = (value) => value >= 0.7;  // 0.7 이상인지 확인

const LocInfoNationStat = ({ statData, allCorrData }) => {

    const [isOpen, setIsOpen] = useState(false); // 테이블의 열림/닫힘 상태

    const toggleOpen = () => {
        setIsOpen(!isOpen); // 열고 닫는 상태를 반전시킴
    };

    return (
        <div>
            <button
                onClick={toggleOpen}
                className="bg-gray-300 px-4 py-2 mb-2 rounded">
                {isOpen ? '통계 테이블 닫기' : '통계 테이블 열기'}
            </button>



            {isOpen && (
                <div>
                    <table className="border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    {(() => {
                                        const stat = statData.find((stat) => stat.target_item === 'shop');
                                        return stat ? `${stat.ref_date}` : '데이터 없음';
                                    })()}
                                </th>
                                <th className="border border-gray-300 px-4 py-2">업소 수</th>
                                <th className="border border-gray-300 px-4 py-2">업소 평균 매출</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소득</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소비</th>
                                <th className="border border-gray-300 px-4 py-2">유동 인구</th>
                                <th className="border border-gray-300 px-4 py-2">직장 인구</th>
                                <th className="border border-gray-300 px-4 py-2">주거 인구</th>
                                <th className="border border-gray-300 px-4 py-2">세대 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">평균</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'shop', 'avg_val', 1, '개')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'sales', 'avg_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'income', 'avg_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'spend', 'avg_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'move_pop', 'avg_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'work_pop', 'avg_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'resident', 'avg_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'house', 'avg_val', 1, '개')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">표준편차</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'shop', 'std_val', 1, '개')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'sales', 'std_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'income', 'std_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'spend', 'std_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'move_pop', 'std_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'work_pop', 'std_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'resident', 'std_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'house', 'std_val', 1, '개')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">중간값</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'shop', 'med_val', 1, '개')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'sales', 'med_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'income', 'med_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'spend', 'med_val', 10000, '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'move_pop', 'med_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'work_pop', 'med_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'resident', 'med_val', 1, '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(statData, 'house', 'med_val', 1, '개')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">최대/최소</th>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'shop', '개')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'sales', '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'income', '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'spend', '만원')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'move_pop', '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'work_pop', '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'resident', '명')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(statData, 'house', '개')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">상관분석</th>
                                <th className="border border-gray-300 px-4 py-2">업소 수</th>
                                <th className="border border-gray-300 px-4 py-2">업소 평균 매출</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소득</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소비</th>
                                <th className="border border-gray-300 px-4 py-2">유동 인구</th>
                                <th className="border border-gray-300 px-4 py-2">직장 인구</th>
                                <th className="border border-gray-300 px-4 py-2">주거 인구</th>
                                <th className="border border-gray-300 px-4 py-2">세대수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">업소 평균 매출</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["SALES"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["SALES"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["INCOME"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["INCOME"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["SPEND"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["SPEND"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["INCOME"]["SPEND"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">유동 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["MOVE_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["MOVE_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["INCOME"]["MOVE_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SPEND"]["MOVE_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["WORK_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["WORK_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["INCOME"]["WORK_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SPEND"]["WORK_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["MOVE_POP"]["WORK_POP"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["INCOME"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SPEND"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["MOVE_POP"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["WORK_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["WORK_POP"]["RESIDENT"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SHOP"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SALES"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SALES"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["INCOME"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["SPEND"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["MOVE_POP"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["WORK_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["WORK_POP"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["RESIDENT"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["RESIDENT"]["HOUSE"].toFixed(4)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LocInfoNationStat;
