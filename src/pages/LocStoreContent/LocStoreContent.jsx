import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import LocStoreContentList from './components/LocStoreContentList';
import { Link } from 'react-router-dom';

const LocStoreContent = () => {
    const [locStoreContentList, setLocStoreContentList] = useState([]);
    const [locStoreCategoryList, setLocStoreCategoryList] = useState([]);

    useEffect(() => {
        // 페이지 로딩 시 API 요청 보내기
        const fetchLocStoreContent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/local_store_content/select_loc_store_content_list`
                );
                setLocStoreContentList(response.data);  // 받아온 데이터를 상태에 저장
                const locStoreContentData = response.data;

                if (locStoreContentData.length > 0) {
                    const secondResponse = await axios.post(
                        `${process.env.REACT_APP_FASTAPI_BASE_URL}/local_store_content/select_loc_store_category`,
                        { store_business_number_list: locStoreContentData.map(item => item.store_business_number) } // 필요한 데이터
                    );
                    setLocStoreCategoryList(secondResponse.data); // 두 번째 요청 데이터 설정
                }
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
                                <p className="text-3xl font-medium mb:text-5xl">매장 추가 정보</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <Link to="/locStore">
                            <button className="bg-blue-400 text-white py-2 px-4 rounded">
                                매장 정보등록 +
                            </button>
                        </Link>
                    </section>

                    {/* 데이터가 없을 경우 안내 메시지 표시 */}
                    <section className="w-full">
                        {locStoreContentList.length === 0 ? (
                            <p className="text-center text-gray-500 mt-6">
                                신규 매장 리포트를 작성해주세요.
                            </p>
                        ) : (
                            <LocStoreContentList
                                locStoreContentList={locStoreContentList}
                                locStoreCategoryList={locStoreCategoryList}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocStoreContent;
