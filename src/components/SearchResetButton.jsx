import React from 'react';

const SearchResetButtons = ({ onSearch, onReset, flexStart }) => {
    return (
        <div className={flexStart ? `flex gap-4 justify-start` : `flex gap-4 justify-center`}>
            <div className="">
                <button
                    onClick={onReset}
                    className="w-full h-full px-32 py-2 border bg-[#ffffff] text-black rounded  text-3xl sm:text-sm"
                >
                    초기화
                </button>
            </div>
            <div className="">
                <button
                    onClick={onSearch}
                    className="w-full h-full px-32 py-2 border bg-[#000000] text-white rounded  text-3xl sm:text-sm"
                >
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchResetButtons;
