import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import SearchResetButtons from '../../../components/SearchResetButton';

const RisingSearchForm = () => {
    const [industry, setIndustry] = useState('');
    const [mainCategory, setMainCategory] = useState('대분류');
    const [subCategory, setSubCategory] = useState('중분류');
    const [detailCategory, setDetailCategory] = useState('소분류');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [increaseRateMin, setIncreaseRateMin] = useState('');
    const [increaseRateMax, setIncreaseRateMax] = useState('');
    const [rankMin, setRankMin] = useState('');
    const [rankMax, setRankMax] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [detailCategories, setDetailCategories] = useState([]);

    useEffect(() => {
        if (mainCategory === '대분류' || mainCategory === '0') return;

        console.log(`대분류: ${mainCategory}`);
        console.log(`대분류 타입: ${typeof mainCategory}`);

        setSubCategory('중분류');
        setDetailCategory('소분류');

        // const fetchSubCategories = async () => {
        //     try {
        //         const response = await axios.get(`/api/subcategories/${mainCategory}`);
        //         setSubCategories(response.data);
        //     } catch (error) {
        //         console.error('Failed to fetch subcategories:', error);
        //     }
        // };

        // fetchSubCategories();
        console.log(detailCategories)

    }, [mainCategory, detailCategories]);

    const handleSearch = () => {
        console.log('Searching for:', {
            industry,
            mainCategory,
            subCategory,
            detailCategory,
            city,
            district,
            subDistrict,
            increaseRateMin,
            increaseRateMax,
            rankMin,
            rankMax
        });
    };

    const handleReset = () => {
        setIndustry('');
        setMainCategory('대분류');
        setSubCategory('중분류');
        setDetailCategory('소분류');
        setCity('');
        setDistrict('');
        setSubDistrict('');
        setIncreaseRateMin('');
        setIncreaseRateMax('');
        setRankMin('');
        setRankMax('');
        setSubCategories([]);
        setDetailCategories([]);
    };

    return (
        <div className="p-4 border border-[#DDDDDD] rounded-lg shadow-md w-full bg-[#EDEDED]">
            <div className="mb-4">
                <label className="block mb-1 font-medium">업종명을 입력해주세요.</label>
                <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2 border border-[#DDDDDD] rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">업종 검색</label>
                <div className="flex gap-4">
                    <select
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option value={0}>대분류</option>
                        <option value={1}>음식</option>
                        <option value={3}>소매/유통</option>
                        <option value={4}>생활서비스</option>
                        <option value={5}>여가/오락</option>
                        <option value={6}>학문/교육</option>
                        <option value={7}>의료/건강</option>
                    </select>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>중분류</option>
                        {subCategories.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                    </select>
                    <select
                        value={detailCategory}
                        onChange={(e) => setDetailCategory(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>소분류</option>
                        {/* 소분류 옵션들 */}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">지역 검색</label>
                <div className="flex gap-4">
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>시/도</option>
                        {/* 시/도 옵션들 */}
                    </select>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>군/구</option>
                        {/* 군/구 옵션들 */}
                    </select>
                    <select
                        value={subDistrict}
                        onChange={(e) => setSubDistrict(e.target.value)}
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    >
                        <option>읍/면/동</option>
                        {/* 읍/면/동 옵션들 */}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">증가율</label>
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={increaseRateMin}
                        onChange={(e) => setIncreaseRateMin(e.target.value)}
                        placeholder="이상"
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    />
                    <input
                        type="number"
                        value={increaseRateMax}
                        onChange={(e) => setIncreaseRateMax(e.target.value)}
                        placeholder="이하"
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">순위</label>
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={rankMin}
                        onChange={(e) => setRankMin(e.target.value)}
                        placeholder="이상"
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    />
                    <input
                        type="number"
                        value={rankMax}
                        onChange={(e) => setRankMax(e.target.value)}
                        placeholder="이하"
                        className="p-2 border border-[#DDDDDD] rounded w-full"
                    />
                </div>
            </div>

            <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
        </div>
    );
};

export default RisingSearchForm;
