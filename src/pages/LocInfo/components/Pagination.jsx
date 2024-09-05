import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageSize = 10; // 10개 단위로 페이지 번호 표시
    const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1; // 현재 페이지 그룹의 시작 페이지
    const endPage = Math.min(startPage + pageSize - 1, totalPages); // 현재 페이지 그룹의 끝 페이지

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
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* 이전 버튼 */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1} // 첫 페이지면 비활성화
                className={`px-4 py-2 border border-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                이전
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 border border-gray-300 rounded ${currentPage === number ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
                >
                    {number}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages} // 마지막 페이지면 비활성화
                className={`px-4 py-2 border border-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;
