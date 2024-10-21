import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import DataLengthDown from '../../../components/DataLengthDown';
import ExpandedRow from './LocInfoListExpandedRow';

const LocInfoList = ({ data, statData, allCorrData, filterCorrData, regionStat, filterForFind }) => {
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
    const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리

    // 정렬 함수 (전체 데이터에 대해 적용)
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'asc' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
            if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
            return 0;
        }
        return 0;
    });

    // 페이징 처리
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

    const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

    // 페이지 변경 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 정렬 버튼 클릭 시 호출될 함수
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const isValueAboveThreshold = (value) => value >= 0.7;  // 0.7 이상인지 확인

    const headerMapping = {
        loc_info_id: '입지 정보 코드',
        city_name: '시/도 명',
        district_name: '시/군/구 명',
        sub_district_name: '읍/면/동 명',
        shop: '매장 수',
        move_pop: '유동 인구',
        sales: '매출',
        work_pop: '직장 인구',
        income: '소득',
        spend: '소비',
        house: '세대수',
        resident: '주거인구',
        y_m: '기준년월'
    };

    const headers = Object.keys(data[0]).map(key => headerMapping[key] || key);

    // 펼치기
    const [expandedRows, setExpandedRows] = useState([]);

    // 특정 row를 펼치고 닫는 toggle 함수
    const toggleExpand = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter(id => id !== rowId)); // 이미 확장된 경우 제거
        } else {
            setExpandedRows([...expandedRows, rowId]); // 확장되지 않은 경우 추가
        }
    };


    const FaqItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="faq-item border p-4 my-2">
                <div
                    onClick={toggleOpen}
                    className="cursor-pointer text-xl font-semibold flex justify-between"
                >
                    <span>{question}</span>
                    <span>{isOpen ? '▾' : '▸'}</span>
                </div>
                {isOpen && <div className="faq-answer mt-2">{answer}</div>}
            </div>
        );
    };

    const Faq = ({ statData, allCorrData }) => {
        console.log(allCorrData)
        const table = (
            <div>
                <table className="border-collapse border border-gray-300 mt-2">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2"></th>
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
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'shop');
                                    return stat ? `${stat.avg_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'sales');
                                    return stat ? `${(stat.avg_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'income');
                                    return stat ? `${(stat.avg_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'spend');
                                    return stat ? `${(stat.avg_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'move_pop');
                                    return stat ? `${stat.avg_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'work_pop');
                                    return stat ? `${stat.avg_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'resident');
                                    return stat ? `${stat.avg_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'house');
                                    return stat ? `${stat.avg_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">표준편차</th>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'shop');
                                    return stat ? `${stat.std_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'sales');
                                    return stat ? `${(stat.std_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'income');
                                    return stat ? `${(stat.std_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'spend');
                                    return stat ? `${(stat.std_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'move_pop');
                                    return stat ? `${stat.std_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'work_pop');
                                    return stat ? `${stat.std_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'resident');
                                    return stat ? `${stat.std_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'house');
                                    return stat ? `${stat.std_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">중간값</th>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'shop');
                                    return stat ? `${stat.med_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'sales');
                                    return stat ? `${(stat.med_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'income');
                                    return stat ? `${(stat.med_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'spend');
                                    return stat ? `${(stat.med_val / 10000).toFixed(1)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'move_pop');
                                    return stat ? `${stat.med_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'work_pop');
                                    return stat ? `${stat.med_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'resident');
                                    return stat ? `${stat.med_val.toFixed(1)}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'house');
                                    return stat ? `${stat.med_val.toFixed(1)}개` : '데이터 없음';
                                })()}
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">최대/최소</th>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'shop');
                                    return stat ? `${stat.max_val}/${stat.min_val}개` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'sales');
                                    return stat ? `${(stat.avg_val / 10000)}/${(stat.min_val / 10000)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'income');
                                    return stat ? `${(stat.avg_val / 10000)}/${(stat.min_val / 10000)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'spend');
                                    return stat ? `${(stat.avg_val / 10000)}/${(stat.min_val / 10000)}만원` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'move_pop');
                                    return stat ? `${stat.max_val}/${stat.min_val}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'work_pop');
                                    return stat ? `${stat.max_val}/${stat.min_val}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'resident');
                                    return stat ? `${stat.max_val}/${stat.min_val}명` : '데이터 없음';
                                })()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(() => {
                                    const stat = statData.find((stat) => stat.target_item === 'house');
                                    return stat ? `${stat.max_val}/${stat.min_val}개` : '데이터 없음';
                                })()}
                            </td>
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

        );

        return (
            <div className="faq-container">
                <FaqItem question="통계 값 조회" answer={table} />
            </div>
        );
    };





    return (
        <div className="p-4">
            <DataLengthDown data={data} headers={headers} filename="LocInfoData.xlsx" />
            <Faq statData={statData} allCorrData={allCorrData} />
            {currentData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <>
                    <table className="min-w-full mt-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">상세</th>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    시/도
                                    <button onClick={() => handleSort('city_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    시/군/구
                                    <button onClick={() => handleSort('district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    읍/면/동
                                    <button onClick={() => handleSort('sub_district_name')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    업소 수
                                    <button onClick={() => handleSort('shop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    업소 평균 매출
                                    <button onClick={() => handleSort('sales')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    평균소득
                                    <button onClick={() => handleSort('income')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    평균소비
                                    <button onClick={() => handleSort('spend')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    유동인구
                                    <button onClick={() => handleSort('move_pop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    직장인구
                                    <button onClick={() => handleSort('work_pop')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    주거인구
                                    <button onClick={() => handleSort('resident')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    세대수
                                    <button onClick={() => handleSort('house')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    Total J-Score
                                    <button onClick={() => handleSort('j_score')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>

                                <th className="border border-gray-300 px-4 py-2"><div className="flex justify-center items-center">
                                    기준년월
                                    <button onClick={() => handleSort('y_m')} className="ml-2 flex flex-col items-center justify-center px-2 py-1">
                                        <span className="text-xs">▲</span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="light-gray-text">
                            {currentData.map((item, index) => (
                                <React.Fragment key={item.loc_info_id}>
                                    {/* 기본 데이터 행 */}
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                className="text-gray-500 focus:outline-none"
                                                onClick={() => toggleExpand(item.loc_info_id)}
                                            >
                                                {/* 펼쳐졌을 때 아래 방향 화살표, 그렇지 않으면 오른쪽 방향 화살표 */}
                                                {expandedRows.includes(item.loc_info_id) ? (
                                                    <span>&#xFE3F;</span>  // 아래 방향 화살표 (유니코드: ▼)
                                                ) : (
                                                    <span>&#xFE40;</span>  // 오른쪽 방향 화살표 (유니코드: ▶)
                                                )}
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">loc_info_{item.loc_info_id}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.city_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.sub_district_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.shop === '정보 없음' ? '정보 없음' : `${item.shop.toLocaleString()}개 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'shop'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'shop'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'shop'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "shop"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.sales === '정보 없음' ? '정보 없음' : `${Math.floor(item.sales / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'sales'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'sales'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'sales'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "sales"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.income === '정보 없음' ? '정보 없음' : `${Math.floor(item.income / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'income'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'income'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'income'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "income"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.spend === '정보 없음' ? '정보 없음' : `${Math.floor(item.spend / 10000).toLocaleString()}만원 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'spend'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'spend'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'spend'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "spend"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.move_pop === '정보 없음' ? '정보 없음' : `${item.move_pop.toLocaleString()}명 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'move_pop'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'move_pop'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'move_pop'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "move_pop"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.work_pop === '정보 없음' ? '정보 없음' : `${item.work_pop.toLocaleString()}명 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'work_pop'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'work_pop'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'work_pop'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "work_pop"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.resident === '정보 없음' ? '정보 없음' : `${item.resident.toLocaleString()}명 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'resident'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'resident'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'resident'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "resident"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.house === '정보 없음' ? '정보 없음' : `${item.house.toLocaleString()}명 `}
                                            (
                                            {
                                                (() => {
                                                    const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
                                                    let stat;

                                                    // 모든 값이 None일 때 city, district, subDistrict로 필터링
                                                    if (!city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'house'
                                                        );
                                                    }
                                                    // city 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && !district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'house'
                                                        );
                                                    }
                                                    // district 값만 있을 때 city, subDistrict로 필터링
                                                    else if (city && district && !subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === 'house'
                                                        );
                                                    }
                                                    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
                                                    else if (city && district && subDistrict) {
                                                        stat = regionStat.find(stat =>
                                                            stat.city_name === item.city_name &&
                                                            stat.district_name === item.district_name &&
                                                            stat.sub_district_name === item.sub_district_name &&
                                                            stat.target_item === "house"  // target_item을 'shop'으로 유지
                                                        );
                                                    }


                                                    // 조건에 맞는 stat이 있을 때 j_score 표시
                                                    if (stat) {
                                                        return stat.j_score.toFixed(1);
                                                    } else {
                                                        return "데이터 없음";
                                                    }
                                                })()
                                            }
                                            )
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            Total j_score
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.y_m}</td>
                                    </tr>

                                    {/* 확장된 데이터 행 */}
                                    {/* 확장된 데이터 행 */}
                                    {expandedRows.includes(item.loc_info_id) && (
                                        <ExpandedRow
                                            item={item}
                                            statData={statData}
                                            allCorrData={allCorrData}
                                            filterCorrData={filterCorrData}
                                            regionStat={regionStat}
                                            filterForFind={filterForFind}
                                            className="expanded-row-text"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* 페이지네이션 컴포넌트 */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default LocInfoList;
