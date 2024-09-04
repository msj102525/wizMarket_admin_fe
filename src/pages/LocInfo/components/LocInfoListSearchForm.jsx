import React, { useState } from 'react';

const LocInfoListSearchForm = () => {
    // 상태 관리: 각 입력 필드의 값을 관리하기 위해 useState 훅 사용
    const [filters, setFilters] = useState({
        region: '',
        city: '',
        district: '',
        retailMin: '',
        retailMax: '',
        salesMin: '',
        salesMax: '',
        incomeMin: '',
        incomeMax: '',
        floatingPopulationMin: '',
        floatingPopulationMax: '',
        residentialPopulationMin: '',
        residentialPopulationMax: '',
        employeePopulationMin: '',
        employeePopulationMax: '',
    });

    // 값이 변경될 때 필터 상태를 업데이트하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('필터링 조건:', filters);
        // 필터링 로직을 여기서 수행하거나 서버로 요청을 보낼 수 있음
    };

    // 폼 초기화
    const handleReset = () => {
        setFilters({
            region: '',
            city: '',
            district: '',
            retailMin: '',
            retailMax: '',
            salesMin: '',
            salesMax: '',
            incomeMin: '',
            incomeMax: '',
            floatingPopulationMin: '',
            floatingPopulationMax: '',
            residentialPopulationMin: '',
            residentialPopulationMax: '',
            employeePopulationMin: '',
            employeePopulationMax: '',
        });
    };
    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* 지역 필터링 */}
                    <div className="col-span-2 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">지역 검색</label>
                        <select
                            name="region"
                            value={filters.region}
                            onChange={handleInputChange}
                            className="block w-32 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">시/도</option>
                            {/* 옵션 추가 */}
                        </select>
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                        <select
                            name="city"
                            value={filters.city}
                            onChange={handleInputChange}
                            className="block w-32 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">군/구</option>
                            {/* 옵션 추가 */}
                        </select>
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                        <select
                            name="district"
                            value={filters.district}
                            onChange={handleInputChange}
                            className="block w-32 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">읍/면/동</option>
                            {/* 옵션 추가 */}
                        </select>
                    </div>
    
                    {/* 유동인구 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">유동인구</label>
                        <input
                            type="number"
                            name="floatingPopulationMin"
                            value={filters.floatingPopulationMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="floatingPopulationMax"
                            value={filters.floatingPopulationMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 직장인구 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">직장인구</label>
                        <input
                            type="number"
                            name="employeePopulationMin"
                            value={filters.employeePopulationMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="employeePopulationMax"
                            value={filters.employeePopulationMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 업소(개) */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">업소(개)</label>
                        <input
                            type="number"
                            name="retailMin"
                            value={filters.retailMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="retailMax"
                            value={filters.retailMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 매출 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">매출</label>
                        <input
                            type="number"
                            name="salesMin"
                            value={filters.salesMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="salesMax"
                            value={filters.salesMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 주거인구 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">주거인구</label>
                        <input
                            type="number"
                            name="residentialPopulationMin"
                            value={filters.residentialPopulationMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="residentialPopulationMax"
                            value={filters.residentialPopulationMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 세대수 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">세대수</label>
                        <input
                            type="number"
                            name="householdMin"
                            value={filters.householdMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="householdMax"
                            value={filters.householdMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
    
                    {/* 소득 */}
                    <div className="col-span-3 flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">소득</label>
                        <input
                            type="number"
                            name="incomeMin"
                            value={filters.incomeMin}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="mx-2">~</span>
                        <input
                            type="number"
                            name="incomeMax"
                            value={filters.incomeMax}
                            onChange={handleInputChange}
                            className="block w-28 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
    
                {/* 제출 및 초기화 버튼을 중앙 하단에 배치 */}
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                        초기화
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-800"
                    >
                        검색
                    </button>
                </div>
            </form>
        </div>
    );
        
};

export default LocInfoListSearchForm;
