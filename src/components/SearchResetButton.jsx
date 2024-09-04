import React from 'react';

const SearchResetButtons = ({ onSearch, onReset }) => {
    return (
        <div className="flex gap-4">
            <button
                onClick={onSearch}
                className="bg-blue-500 text-white p-2 rounded"
            >
                검색
            </button>
            <button
                onClick={onReset}
                className="bg-gray-500 text-white p-2 rounded"
            >
                초기화
            </button>
        </div>
    );
};

export default SearchResetButtons;
