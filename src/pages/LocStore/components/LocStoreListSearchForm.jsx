import React, { useEffect } from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CitySelect from '../../../components/CitySelect';
import CategorySelect from '../../../components/CategorySelect';

const LocStoreListSearchForm = ({ 
    city, district, subDistrict, cities, districts, subDistricts, setCity, setDistrict, setSubDistrict,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories,
    reference, references, setReference,
    storeName, setStoreName,
    infoYear, setInfoYear,
    infoQuarter, setInfoQuarter,
    handleSearch, handleReset
}) => {

    // 페이지 접속 시 기본값 설정 (2024년, 2분기)
    useEffect(() => {
        setInfoYear("2024");
        setInfoQuarter("2");
    }, [setInfoYear, setInfoQuarter]);

    // 분기 옵션을 동적으로 설정 (2024년일 때만 1, 2분기 표시)
    const renderQuarterOptions = () => {
        if (infoYear === "2024") {
            return (
                <>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </>
            );
        } else {
            return (
                <>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </>
            );
        }
    };

    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full ">
            <div className="p-4 bg-[#F3F5F7]">
                {/* 상호 검색 */}
                <div className="mb-4 flex gap-4">
                    <div className="w-1/6 text-center content-center">
                        <label className="block mb-1 font-extrabold">상호 검색</label>
                    </div>
                    <div className="w-full flex gap-4">
                        <input
                            type="text"
                            value={storeName || ""}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="상호명을 입력하세요"
                            className="p-2 border border-[#DDDDDD] rounded w-full"
                        />
                    </div>
                </div>

                {/* 지역 검색 */}
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

                {/* 카테고리 검색 */}
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

                {/* 분기 선택 */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="w-1/6 text-center">
                        <label className="block mb-1 font-extrabold">분기</label>
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <select
                            value={infoYear || ""}
                            onChange={(e) => setInfoYear(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-1/4"
                        >
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                        <span>년</span>
                        <select
                            value={infoQuarter || ""}
                            onChange={(e) => setInfoQuarter(e.target.value)}
                            className="p-2 border border-[#DDDDDD] rounded w-1/4"
                        >
                            {renderQuarterOptions()}
                        </select>
                        <span>분기</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500">
                    * 데이터 양이 많아 원활한 검색을 위해 가능한 많은 조건, 좁은 조건을 추가해주세요.
                </p>
                <p className="text-sm text-gray-500">
                    * 카테고리 검색은 2023년 3분기부터 상권 정보 분류표에서만 가능합니다.
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
