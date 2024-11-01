import React, { useState } from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';

const StoreTable = ({ stores, toggleServiceStatus }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-left shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            매장명
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            주소
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            전화번호
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            영업시간
                        </th>
                        <th className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold">
                            서비스 게시
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2 border-b text-gray-700">{store.name}</td>
                            <td className="px-4 py-2 border-b text-gray-700">{store.address}</td>
                            <td className="px-4 py-2 border-b text-gray-700">{store.phone}</td>
                            <td className="px-4 py-2 border-b text-gray-700">{store.hours}</td>
                            <td className="px-4 py-2 border-b text-gray-700 text-center">
                                <div
                                    onClick={() => toggleServiceStatus(index)}
                                    className={`relative inline-flex items-center w-12 h-6 cursor-pointer rounded-full transition-colors ${
                                        store.isPublished ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`absolute left-1 h-5 w-5 rounded-full bg-white transition-transform transform ${
                                            store.isPublished ? 'translate-x-6' : ''
                                        }`}
                                    ></span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const LocStoreContent = () => {
    const [stores, setStores] = useState([
        {
            name: '스타벅스 강남점',
            address: '서울시 강남구 강남대로 123',
            phone: '02-1234-5678',
            hours: '09:00 - 21:00',
            isPublished: true,
        },
        {
            name: '이디야 커피 신촌점',
            address: '서울시 서대문구 신촌로 25',
            phone: '02-9876-5432',
            hours: '10:00 - 22:00',
            isPublished: false,
        },
        {
            name: '투썸플레이스 홍대점',
            address: '서울시 마포구 홍익로 50',
            phone: '02-1357-2468',
            hours: '08:00 - 20:00',
            isPublished: true,
        },
    ]);

    // 서비스 게시 상태를 토글하는 함수
    const toggleServiceStatus = (index) => {
        setStores((prevStores) =>
            prevStores.map((store, i) =>
                i === index ? { ...store, isPublished: !store.isPublished } : store
            )
        );
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
                                <p className="text-3xl font-medium mb:text-5xl">매장 추가 정보</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <StoreTable stores={stores} toggleServiceStatus={toggleServiceStatus} />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocStoreContent;
