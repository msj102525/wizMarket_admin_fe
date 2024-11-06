import React  from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';


const BizDetailCategoryContent = () => {
    
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
                                <p className="text-3xl font-medium mb:text-5xl">세부 업종 공통 정보</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <button className="bg-blue-400 text-white py-2 px-4 rounded">
                            정보등록 +
                        </button>
                    </section>

                    {/* 데이터가 없을 경우 안내 메시지 표시 */}
                    <section className="w-full">
                        {/* {locStoreContentList.length === 0 ? (
                            <p className="text-center text-gray-500 mt-6">
                                신규 매장 리포트를 작성해주세요.
                            </p>
                        ) : (
                            <LocStoreContentList
                                locStoreContentList={locStoreContentList}
                                locStoreCategoryList={locStoreCategoryList}
                            />
                        )} */}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default BizDetailCategoryContent;
