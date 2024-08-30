import React from 'react';

const LocInfo = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <div className="loc-info-container p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">상권 정보</h2>
            <div className="grid grid-cols-2 gap-4">
                <div><strong>상점 수:</strong> {data[3]}</div>
                <div><strong>유동 인구:</strong> {data[4]}</div>
                <div><strong>매출액:</strong> {data[5]}</div>
                <div><strong>직장인구:</strong> {data[6]}</div>
                <div><strong>소득:</strong> {data[7]}</div>
                <div><strong>지출:</strong> {data[8]}</div>
                <div><strong>가구 수:</strong> {data[9]}</div>
                <div><strong>주민 수:</strong> {data[10]}</div>
            </div>
        </div>
    );
};

export default LocInfo;
