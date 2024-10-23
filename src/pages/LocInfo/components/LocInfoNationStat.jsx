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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["SALES"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["SALES"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["INCOME"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["INCOME"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["SPEND"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["SPEND"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["INCOME"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["INCOME"]["SPEND"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["INCOME"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["INCOME"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SPEND"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SPEND"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["INCOME"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["INCOME"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SPEND"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SPEND"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["MOVE_POP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["MOVE_POP"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["INCOME"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["INCOME"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SPEND"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SPEND"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["MOVE_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["MOVE_POP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["WORK_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["WORK_POP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SHOP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SHOP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SALES"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SALES"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["INCOME"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["INCOME"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["SPEND"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["SPEND"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["MOVE_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["MOVE_POP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["WORK_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["WORK_POP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-08-01"]["RESIDENT"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-08-01"]["RESIDENT"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                            </tr>
                        </tbody>
                    </table>









                    {/* <table className="border-collapse border border-gray-300 mt-2">
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
                    </table> */}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["SALES"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["SALES"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["INCOME"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["INCOME"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["SPEND"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["SPEND"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["INCOME"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["INCOME"]["SPEND"]}
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
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["INCOME"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["INCOME"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SPEND"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SPEND"]["MOVE_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["INCOME"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["INCOME"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SPEND"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SPEND"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["MOVE_POP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["MOVE_POP"]["WORK_POP"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["INCOME"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["INCOME"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SPEND"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SPEND"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["MOVE_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["MOVE_POP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["WORK_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["WORK_POP"]["RESIDENT"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SHOP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SHOP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SALES"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SALES"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["INCOME"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["INCOME"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["SPEND"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["SPEND"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["MOVE_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["MOVE_POP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["WORK_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["WORK_POP"]["HOUSE"]}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(allCorrData["2024-10-01"]["RESIDENT"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {allCorrData["2024-10-01"]["RESIDENT"]["HOUSE"]}
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
