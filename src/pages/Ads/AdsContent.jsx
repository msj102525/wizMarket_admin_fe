import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import LocStoreAdsList from './components/AdsContentList';
import { Link } from 'react-router-dom';
import AdsSearchFrom from './components/AdsSearchFrom';


const AdsContent = () => {
    const [AdsList, setAdsList] = useState([]);

    const [storeName, setStoreName] = useState("");
    const [isLikeSearch, setIsLikeSearch] = useState(false);
    const [useOption, setUseOption] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        // 페이지 로딩 시 API 요청 보내기
        const fetchLocStoreContent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/select/list`
                );
                
                setAdsList(response.data);  // 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error('데이터 요청 중 오류 발생:', error);
            }
        };
        fetchLocStoreContent();
    }, []);

    const handleSearch = async () => {
        
        const matchType = isLikeSearch ? '=' : 'LIKE';  // isIncludeMatch가 체크되었는지에 따라 결정
        const filters = {
            store_name : storeName,
            use_option : useOption,
            title : title,
            match_type : matchType
        };
        console.log(filters)
        
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/select/filters/list`,
                filters,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setAdsList(response.data.data); // 검색 결과를 상태로 저장
        } catch (err) {
            console.error('검색 오류:', err);
            
        } finally {
            
        }
    };

    const handleReset = () => {
        // 모든 필터 값을 초기화
        setStoreName('');
        setIsLikeSearch(false); // 체크박스는 false로 초기화
        setIsLikeSearch('');
        setTitle('');
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <section>
                        <div className="div-underline p-2 flex justify-between py-4">
                            <div className="flex gap-4 items-center">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-gray-300 to-black"></div>
                                <p className="text-3xl font-medium mb:text-5xl">wizAd</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <Link to="/loc/store">
                            <button className="bg-blue-400 text-white py-2 px-4 rounded">
                                wizAd 등록 +
                            </button>
                        </Link>
                    </section>
                    <div>
                    <AdsSearchFrom
                        storeName = {storeName}
                        setStoreName = {setStoreName}
                        useOption = {useOption}
                        setUseOption = {setUseOption}
                        title = {title} 
                        setTitle = {setTitle}
                        isLikeSearch = {isLikeSearch}
                        setIsLikeSearch = {setIsLikeSearch}
                        handleSearch = {handleSearch}
                        handleReset  = {handleReset}
                    />
                </div>
                    {/* 데이터가 없을 경우 안내 메시지 표시 */}
                    <section className="w-full">
                        {AdsList.length === 0 ? (
                            <p className="text-center text-gray-500 mt-6">
                                신규 wizAd를 작성해주세요.
                            </p>
                        ) : (
                            <LocStoreAdsList
                                AdsList={AdsList}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdsContent;
