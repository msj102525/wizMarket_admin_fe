import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import LocStoreAdsList from './components/AdsContentList';
import { Link } from 'react-router-dom';

const AdsContent = () => {
    const [AdsList, setAdsList] = useState([]);

    const onUpdate = (updatedItem) => {
        setAdsList((prevList) =>
            prevList.map((item) =>
                item.local_store_content_id === updatedItem.local_store_content_id ? updatedItem : item
            )
        );
    };

    const onDelete = (itemId) => {
        setAdsList((prevList) =>
            prevList.filter((item) => item.local_store_content_id !== itemId)
        );
    };

    useEffect(() => {
        // 페이지 로딩 시 API 요청 보내기
        const fetchLocStoreContent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/select/list`
                );
                // console.log(response.data)
                setAdsList(response.data);  // 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error('데이터 요청 중 오류 발생:', error);
            }
        };
        fetchLocStoreContent();
    }, []);

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

                    {/* 데이터가 없을 경우 안내 메시지 표시 */}
                    <section className="w-full">
                        {AdsList.length === 0 ? (
                            <p className="text-center text-gray-500 mt-6">
                                신규 wizAd를 작성해주세요.
                            </p>
                        ) : (
                            <LocStoreAdsList
                                AdsList={AdsList}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdsContent;
