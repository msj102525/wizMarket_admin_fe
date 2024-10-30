import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageSize = 10; // 10개 단위로 페이지 번호 표시
    const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1; // 현재 페이지 그룹의 시작 페이지
    const endPage = Math.min(startPage + pageSize - 1, totalPages); // 현재 페이지 그룹의 끝 페이지

    // 첫 페이지로 이동
    const handleFirst = () => {
        onPageChange(1);
    };

    // 마지막 페이지로 이동
    const handleLast = () => {
        onPageChange(totalPages);
    };

    // 이전 페이지로 이동 (1페이지씩 이동)
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // 다음 페이지로 이동 (1페이지씩 이동)
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2 pt-4">
            {/* 첫 페이지 버튼 */}
            <button
                onClick={handleFirst}
                className="px-4 py-2 border border-gray-300 rounded"
                disabled={currentPage === 1}
            >
                시작
            </button>

            {/* 이전 버튼 */}
            <button
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-300 rounded"
                disabled={currentPage === 1}
            >
                이전
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 border border-gray-300 rounded ${currentPage === number ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                    {number}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button
                onClick={handleNext}
                className="px-4 py-2 border border-gray-300 rounded"
                disabled={currentPage === totalPages}
            >
                다음
            </button>

            {/* 마지막 페이지 버튼 */}
            <button
                onClick={handleLast}
                className="px-4 py-2 border border-gray-300 rounded"
                disabled={currentPage === totalPages}
            >
                끝
            </button>
        </div>
    );
};

export default Pagination;
