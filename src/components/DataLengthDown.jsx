import React from 'react';
import * as XLSX from 'xlsx';

const DataLengthDown = ({ data, filename = 'data.xlsx' }) => {
    // 엑셀 다운로드 함수
    const handleExcelDownload = () => {
        if (!data || data.length === 0) {
            alert('다운로드할 데이터가 없습니다.');
            return;
        }

        // 테이블 헤더 설정 (필요에 따라 변경 가능)
        const headers = Object.keys(data[0]); // 첫 번째 객체의 키를 헤더로 사용
    
        const tableData = data.map((item, index) => [
            index + 1,  // 번호
            ...Object.values(item)  // 객체의 값들을 배열로 변환
        ]);
    
        // 헤더와 데이터를 결합 (헤더 + 데이터 배열)
        const worksheetData = [headers, ...tableData];
    
        // 엑셀 시트 생성
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, filename);
    };

    return (
        <div className="flex justify-between items-center mb-8">
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

// 사용법
// 1. 총 길이 및 엑셀 다운 컴포넌트 임포트
// 2. 데이터를 전달 받은 후 보여주는 ~List 컴포넌트 내부에서 사용
// 3. <DataLengthDown data={data} filename="LocInfoData.xlsx" />
// 4. data 는 요청 후 전달 받은 데이터 filename 은 엑셀 파일