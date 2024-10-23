import React from 'react';
import * as XLSX from 'xlsx';

const DataLengthDown = ({ data, filename = 'data.xlsx', headers }) => {
    // 엑셀 다운로드 함수
    const handleExcelDownload = () => {
        if (!data || data.length === 0) {
            alert('다운로드할 데이터가 없습니다.');
            return;
        }


        // 만약 headers가 주어지지 않으면, data의 첫 번째 객체 키를 기본 헤더로 사용
        const excelHeaders = ['번호', ...(headers || Object.keys(data[0]))]; 

        const tableData = data.map((item, index) => [
            index + 1,  // 인덱스 부여 (1부터 시작)
            ...Object.values(item)  // 객체의 값들을 배열로 변환
        ]);

        // 헤더와 데이터를 결합 (헤더 + 데이터 배열)
        const worksheetData = [excelHeaders, ...tableData];

        // 엑셀 시트 생성
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, filename);
    };

    return (
        <div className="flex justify-between items-center">
            <p>
                총 <span className="text-red-500">{data.length.toLocaleString()}</span>개
            </p>
            <button
                className="px-4 py-2 bg-white text-black rounded border border-black"
                onClick={handleExcelDownload}
            >
                엑셀 다운로드
            </button>
        </div>
    );
};

export default DataLengthDown;
