import React from 'react';

const CityCountAllForm = ({ cityCounts }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex items-center space-x-8">
                <p>
                    총 <span className="text-red-500">{(cityCounts.cities + cityCounts.districts + cityCounts.subDistricts).toLocaleString()}</span> 건
                </p>
                
                {/* 구분 선 */}
                <span className="border-l border-gray-300 h-4"></span>

                <p>
                    시/도 <span className="text-red-500">{cityCounts.cities.toLocaleString()}</span> 건
                </p>

                {/* 구분 선 */}
                <span className="border-l border-gray-300 h-4"></span>

                <p>
                    시/군/구 <span className="text-red-500">{cityCounts.districts.toLocaleString()}</span> 건
                </p>

                {/* 구분 선 */}
                <span className="border-l border-gray-300 h-4"></span>

                <p>
                    읍/면/동 <span className="text-red-500">{cityCounts.subDistricts.toLocaleString()}</span> 건
                </p>
            </div>
        </div>
    );
};

export default CityCountAllForm;
