import React, { useState } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import { useCities } from '../../../hooks/useCities';
import CitySelect from '../../../components/CitySelect';
import CategorySelect from '../../../components/CategorySelect';
import { useCategories } from '../../../hooks/useCategories';

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

    const {
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories,
        reference, references, setReference,
    } = useCategories();

    // 상호와 업종 필터링 위한 상태 추가
    const [storeName, setStoreName] = useState('');
    const [selectedQuarterMin, setSelectedQuarterMin] = useState('');
    const [selectedQuarterMax, setSelectedQuarterMax] = useState('');



    const handleSearch = () => {
        // 필터링된 데이터 (빈 값 제거)
        const filters = {
            ...(storeName && { storeName }),  // 상호 필터 추가
            ...(mainCategory && mainCategory !== '대분류' && mainCategory !== '0' && { mainCategory }),  // '대분류'와 '0'은 제외
            ...(subCategory && subCategory !== '중분류' && subCategory !== '0' && { subCategory }),      // '중분류'와 '0'은 제외
            ...(detailCategory && detailCategory !== '소분류' && detailCategory !== '0' && { detailCategory }), // '소분류'와 '0'은 제외
            ...(city && { city }),
            ...(district && { district }),
            ...(subDistrict && { subDistrict }),
            ...(selectedQuarterMin && { selectedQuarterMin }),
            ...(selectedQuarterMax && { selectedQuarterMax }),
        };
        

        onSearch(filters);  // 부모 컴포넌트에서 전달받은 onSearch 호출
    };

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setStoreName('');
        setMainCategory('');
        setSubCategory('');
        setDetailCategory('');
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setSelectedQuarterMin('');
        setSelectedQuarterMax('');
        setReference('');
    };

    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full ">
            <div className="p-4 bg-[#F3F5F7]">
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">상호 검색</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="상호명을 입력하세요"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />

                    </div>
                </div>


                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">지역 검색</label>
                    </div>
                    <div className="w-full">
                        <CitySelect
                            city={city}
                            district={district}
                            subDistrict={subDistrict}
                            cities={cities}
                            districts={districts}
                            subDistricts={subDistricts}
                            setCity={setCity}
                            setDistrict={setDistrict}
                            setSubDistrict={setSubDistrict}
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">카테고리 검색</label>
                    </div>
                    <div className="w-full">
                        <CategorySelect
                            reference={reference}
                            references={references}
                            setReference={setReference}
                            mainCategory={mainCategory}
                            setMainCategory={setMainCategory}
                            mainCategories={mainCategories}
                            subCategory={subCategory}
                            setSubCategory={setSubCategory}
                            subCategories={subCategories}
                            detailCategory={detailCategory}
                            setDetailCategory={setDetailCategory}
                            detailCategories={detailCategories} />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">분기</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <select
                            value={selectedQuarterMin}
                            onChange={(e) => setSelectedQuarterMin(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-1/5"
                        >
                            <option value="">이상</option>
                            <option value="2021.1/4">2021년 1/4</option>
                            <option value="2021.2/4">2021년 2/4</option>
                            <option value="2021.3/4">2021년 3/4</option>
                            <option value="2021.4/4">2021년 4/4</option>
                            <option value="2022.1/4">2022년 1/4</option>
                            <option value="2022.2/4">2022년 2/4</option>
                            <option value="2022.3/4">2022년 3/4</option>
                            <option value="2022.4/4">2022년 4/4</option>
                            <option value="2023.1/4">2023년 1/4</option>
                            <option value="2023.2/4">2023년 2/4</option>
                            <option value="2023.3/4">2023년 3/4</option>
                            <option value="2023.4/4">2023년 4/4</option>
                            <option value="2024.1/4">2024년 1/4</option>
                            <option value="2024.2/4">2024년 2/4</option>
                        </select>~
                        {/* 최대 연령대 선택 (이하) */}
                        <select
                            value={selectedQuarterMax}
                            onChange={(e) => setSelectedQuarterMax(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-1/5"
                        >
                            <option value="">이하</option>
                            <option value="2021.1/4">2021년 1/4</option>
                            <option value="2021.2/4">2021년 2/4</option>
                            <option value="2021.3/4">2021년 3/4</option>
                            <option value="2021.4/4">2021년 4/4</option>
                            <option value="2022.1/4">2022년 1/4</option>
                            <option value="2022.2/4">2022년 2/4</option>
                            <option value="2022.3/4">2022년 3/4</option>
                            <option value="2022.4/4">2022년 4/4</option>
                            <option value="2023.1/4">2023년 1/4</option>
                            <option value="2023.2/4">2023년 2/4</option>
                            <option value="2023.3/4">2023년 3/4</option>
                            <option value="2023.4/4">2023년 4/4</option>
                            <option value="2024.1/4">2024년 1/4</option>
                            <option value="2024.2/4">2024년 2/4</option>
                        </select>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    * 데이터 양이 많아 원활한 검색을 위해 가능한 많은 조건, 좁은 조건을 추가해주세요.
                </p>
                <p className="text-sm text-gray-500">
                    * 카테고리 검색은 2023년 3분기부터 상권 정보 분류표에서만 가능합니다.
                </p>
                <p className="text-sm text-gray-500">
                    * 2023년 1, 2 분기 누락, 인서트 예정
                </p>


            </div>

            {/* 검색 및 초기화 버튼 */}
            <div className="py-2 ">
                <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
            </div>
        </div>
    );
};

export default LocStoreListSearchForm;
