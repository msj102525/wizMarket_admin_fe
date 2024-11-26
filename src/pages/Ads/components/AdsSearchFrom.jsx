import React, { useState, useEffect } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';

const AdsSearchFrom = ({
    storeName, setStoreName,
    useOption, setUseOption,
    title, setTitle,
    isLikeSearch, setIsLikeSearch,
    handleSearch, handleReset
}) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecent, setShowRecent] = useState(false); // 최근 검색어 표시 상태


    // Load recent searches from localStorage
    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(savedSearches);
    }, []);

    // Update recent searches in localStorage
    const saveSearchTerm = (term) => {
        const updatedSearches = [term, ...recentSearches.filter((item) => item !== term)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleSearchClick = () => {
        if (isLikeSearch) { // 직접 검색 여부에 따라 실행
            saveSearchTerm(storeName);
        }
        handleSearch(); // 검색은 항상 실행
    };

    const handleDeleteSearchTerm = (term) => {
        const updatedSearches = recentSearches.filter((item) => item !== term);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleDeleteAll = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <div className="relative border border-[#DDDDDD] rounded-lg shadow-md w-full">
            <div className="p-4 bg-[#F3F5F7]">
                {/* 상호 검색 */}
                <div className="mb-4 flex gap-4 mb:flex-row">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold text-lg mb:text-4xl">매장명 검색</label>
                    </div>
                    <div className="relative w-full">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={storeName || ""}
                                onChange={(e) => setStoreName(e.target.value)}
                                onFocus={() => setShowRecent(true)} // 포커스 시 최근 검색어 표시
                                onBlur={() => setTimeout(() => setShowRecent(false), 200)} // 포커스 해제 시 숨기기
                                placeholder="매장명을 입력하세요"
                                className="p-2 border border-[#DDDDDD] rounded w-full"
                            />
                            <div className="flex items-center gap-2 w-full mb:w-1/6">
                                <input
                                    type="checkbox"
                                    id="includeSearch"
                                    checked={isLikeSearch}
                                    onChange={(e) => setIsLikeSearch(e.target.checked)}
                                />
                                <label htmlFor="includeSearch" className="text-sm mb:text-4xl">직접 검색</label>
                            </div>
                        </div>
                        {/* 최근 검색어 */}
                        {showRecent && (
                            <div className="absolute top-full left-0 w-1/2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <div className="flex justify-between p-2">
                                    <span className="font-bold text-gray-700">최근 검색어</span>
                                    <button
                                        className="text-sm text-red-500"
                                        onClick={handleDeleteAll}
                                    >
                                        전체 삭제
                                    </button>
                                </div>
                                <ul>
                                    {recentSearches.map((term, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setStoreName(term); // 검색어 입력란에 설정
                                            }}
                                        >
                                            <span>{term}</span>
                                            <button
                                                className="text-sm text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 부모 클릭 이벤트 차단
                                                    handleDeleteSearchTerm(term);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">광고 채널</label>
                    </div>
                    <select
                        className="border border-gray-300 rounded w-full px-3 py-2"
                        value={useOption || ''}
                        onChange={(e) => setUseOption(e.target.value)}
                    >
                        <option value="">광고 채널을 선택하세요</option>
                        <option value="문자메시지">문자메시지</option>
                        <option value="유튜브 썸네일">유튜브 썸네일 (412x232)</option>
                        <option value="인스타그램 스토리">인스타 스토리 (412x732)</option>
                        <option value="인스타그램 피드">인스타 피드 (412x514)</option>
                        <option value="네이버 블로그">네이버 블로그</option>
                        <option value="배너">배너 (377x377)</option>
                    </select>
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">주제</label>
                    </div>
                    <select
                        className="border border-gray-300 rounded w-full px-3 py-2"
                        value={title || ''}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                        <option value="">주제를 선택하세요</option>
                        <option value="매장 소개">매장 소개</option>
                        <option value="이벤트">이벤트</option>
                        <option value="상품 소개">상품 소개</option>
                        <option value="예약">예약</option>
                        <option value="시즌인사">시즌인사</option>
                        <option value="감사">감사</option>
                        <option value="공지">공지</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                <div className="mb-4 flex gap-4">

                </div>

            </div>
            {/* 검색 및 초기화 버튼 */}
            <div className="py-2">
                <SearchResetButtons onSearch={handleSearchClick} onReset={handleReset} />
            </div>
        </div>
    );
};

export default AdsSearchFrom;
