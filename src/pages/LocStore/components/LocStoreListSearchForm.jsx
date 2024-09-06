import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import { useCities } from '../../../hooks/useCities';

const LocStoreListSearchForm = ({ onSearch }) => {  
    const {
        cities,
        districts,
        subDistricts,
        city,
        district,
        subDistrict,
        setCity,
        setDistrict,
        setSubDistrict,
    } = useCities(); // useCities 훅 사용

    // 상호와 업종 필터링 위한 상태 추가
    const [storeName, setStoreName] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [middleCategory, setMiddleCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [source, setSource] = useState('');

    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(storeName && { storeName }),  // 상호 필터 추가
            ...(mainCategory && { mainCategory }),
            ...(middleCategory && { middleCategory }),
            ...(subCategory && { subCategory }),
            ...(city && { city }),
            ...(district && { district }),
            ...(subDistrict && { subDistrict }),

        };

        onSearch(filters);  // 부모 컴포넌트에서 전달받은 onSearch 호출
    };

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setStoreName('');
        setMainCategory('');
        setMiddleCategory('');
        setSubCategory('');
        setCity('');
        setDistrict('');
        setSubDistrict('');
    };

    return (
        <div className="p-4 border border-[#DDDDDD] rounded-lg shadow-md w-full bg-[#EDEDED]">
            <div className="mb-4">
                {/* 상호 검색 텍스트 입력란 */}
                <div className="mb-4 flex items-center">
                    <label className="font-medium mr-32 w-1/6">상호 검색</label>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="상호명을 입력하세요"
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    />
                </div>

                {/* 업종 선택 (대분류, 중분류, 소분류) */}
                <div className="grid grid-cols-5 gap-4 mb-4">
                    <label className="font-medium w-1/2">업종 선택</label>

                    {/* 출처 */}
                    <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">출처</option>
                        {/* 대분류 카테고리 옵션들 추가 */}
                        <option value="food">공공데이터</option>
                        <option value="retail">한국산업분류</option>
                        <option value="service">나이스비즈맵</option>
                    </select>


                    {/* 대분류 선택 */}
                    <select
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">대분류 선택</option>
                        {/* 대분류 카테고리 옵션들 추가 */}
                        <option value="food">음식점</option>
                        <option value="retail">소매업</option>
                        <option value="service">서비스업</option>
                    </select>

                    {/* 중분류 선택 */}
                    <select
                        value={middleCategory}
                        onChange={(e) => setMiddleCategory(e.target.value)}
                        disabled={!mainCategory}  // 대분류 선택 없으면 중분류 선택 불가
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">중분류 선택</option>
                        {/* 예시 중분류 카테고리 */}
                        {mainCategory === 'food' && (
                            <>
                                <option value="korean">한식</option>
                                <option value="japanese">일식</option>
                                <option value="chinese">중식</option>
                            </>
                        )}
                        {mainCategory === 'retail' && (
                            <>
                                <option value="clothing">의류</option>
                                <option value="electronics">전자제품</option>
                            </>
                        )}
                        {mainCategory === 'service' && (
                            <>
                                <option value="hair">미용</option>
                                <option value="cleaning">청소</option>
                            </>
                        )}
                    </select>

                    {/* 소분류 선택 */}
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        disabled={!middleCategory}  // 중분류 선택 없으면 소분류 선택 불가
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">소분류 선택</option>
                        {/* 예시 소분류 카테고리 */}
                        {middleCategory === 'korean' && <option value="bbq">고기구이</option>}
                        {middleCategory === 'japanese' && <option value="sushi">초밥</option>}
                        {middleCategory === 'clothing' && <option value="sportswear">운동복</option>}
                        {/* 추가적으로 필요한 분류를 여기서 정의 */}
                    </select>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <label className="font-medium w-1/2">지역 선택</label>
                    {/* 시/도 선택 */}
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">시/도 선택</option>
                        {cities.map((c) => (
                            <option key={c[0]} value={c[0]}>
                                {c[1]}
                            </option>
                        ))}
                    </select>

                    {/* 군/구 선택 */}
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!city}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">군/구 선택</option>
                        {districts.map((d) => (
                            <option key={d[0]} value={d[0]}>
                                {d[2]}
                            </option>
                        ))}
                    </select>

                    {/* 읍/면/동 선택 */}
                    <select
                        value={subDistrict}
                        onChange={(e) => setSubDistrict(e.target.value)}
                        disabled={!district}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value="">읍/면/동 선택</option>
                        {subDistricts.map((sd) => (
                            <option key={sd[0]} value={sd[0]}>
                                {sd[3]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* 검색 및 초기화 버튼 */}
            <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
        </div>
    );
};

export default LocStoreListSearchForm;
