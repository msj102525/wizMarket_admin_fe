import React, { useState } from 'react';
import axios from 'axios';

const InsertPopulationData = () => {
    const [showModal, setShowModal] = useState(false);

    const getPreviousMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const previousMonth = month === 1 ? 12 : month - 1;
        const previousYear = month === 1 ? year - 1 : year;
        const previousMonthStr = previousMonth < 10 ? `0${previousMonth}` : previousMonth;
        return `${previousYear}${previousMonthStr}`;
    };

    const handleInsertClick = async () => {
        const previousMonth = getPreviousMonth();
        const year_month = parseInt(previousMonth, 10);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/population/check_population`,
                { year_month }
            );

            if (response.data.exists) {
                alert('이미 최신화된 자료입니다.');
            } else {
                setShowModal(true);  // 신규 데이터가 있을 때 모달을 표시
            }
        } catch (error) {
            console.error('Error checking population data:', error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/population/insert_population`);
    
            if (response.status === 200) {
                alert('데이터가 성공적으로 삽입되었습니다.');
            } else {
                alert('데이터 삽입 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error inserting population data:', error);
            alert('데이터 삽입 중 오류가 발생했습니다.');
        } finally {
            setShowModal(false);  // 모달 닫기
        }
    };

    const handleCancel = () => {
        setShowModal(false);  // 모달 닫기
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleInsertClick}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
                확인
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="mb-4 text-center">
                            신규 데이터가 있습니다.<br />
                            최신화하시겠습니까?
                        </p>
                        <div className="space-x-4 flex justify-center">
                            <button
                                onClick={handleConfirm}
                                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
                            >
                                확인
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InsertPopulationData;
