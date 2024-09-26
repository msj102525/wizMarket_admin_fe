import React from 'react';

const SearchResultsCount = ({ cities, districts, subDistricts }) => {
    return (
        <div className="p-4 rounded-md">
            <div className="flex items-center space-x-8">
                <p>
                    시/도 <span className="text-red-500">({cities.length.toLocaleString()}건)</span>
                </p>
                <p>
                    시/군/구 <span className="text-red-500">({districts.length.toLocaleString()}건)</span>
                </p>
                <p>
                    읍/면/동 <span className="text-red-500">({subDistricts.length.toLocaleString()}건)</span>
                </p>
            </div>
        </div>
    );
};

export default SearchResultsCount;
