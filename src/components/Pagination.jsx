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
                    className={`px-4 py-2 border border-gray-300 rounded ${currentPage === number ? 'bg-black text-white' : 'bg-white text-black'}`}
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

// 페이징 사용법
// 1. 사용할 컴포넌트에서 임포트

// 2. 변수 부여
// const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
// const [resultsPerPage] = useState(20);  // 페이지당 표시할 결과 수

// 3. 페이징 계산 및 변경
// 현재 페이지에 해당하는 데이터 계산
// const indexOfLastResult = currentPage * resultsPerPage;
// const indexOfFirstResult = indexOfLastResult - resultsPerPage;
// const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);


// 페이지 변경 함수
// const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
// };

// 4. 페이징 사용
// <Pagination
//        currentPage={currentPage}
//        totalPages={Math.ceil(filteredResults.length / resultsPerPage)}
//        onPageChange={handlePageChange}
// />