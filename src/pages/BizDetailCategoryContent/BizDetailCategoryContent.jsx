import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import BizDetailCategoryInsertModal from './components/BizDeatilCategoryContentInsertModal';
import BizDetailCategoryList from './components/BizDetailCategoryContentList'
import { useCategories } from '../../hooks/useCategories';

const BizDetailCategoryContent = () => {
    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const [categoryContentList, setCategoryContentList] = useState([]);
    const [categoryBizCategoryList, setCategoryBizCategoryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onInsert = (newItem, newBizCategoryData) => {
        setCategoryContentList((prevList) => [...prevList, newItem]);
        setCategoryBizCategoryList((prevList) => [...prevList, ...newBizCategoryData]);
    };

    const onUpdate = (updatedItem) => {
        setCategoryContentList((prevList) =>
            prevList.map((item) =>
                item.biz_detail_category_content_id === updatedItem.biz_detail_category_content_id ? updatedItem : item
            )
        );
    };

    const onDelete = (itemId) => {
        setCategoryContentList((prevList) =>
            prevList.filter((item) => item.biz_detail_category_content_id !== itemId)
        );
    };
    

    useEffect(() => {
        // 페이지 로딩 시 API 요청 보내기
        const fetchCategoryContent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/select/list`
                );
                setCategoryContentList(response.data);  // 받아온 데이터를 상태에 저장
                const categoryContentData = response.data;

                if (categoryContentData.length > 0) {
                    const secondResponse = await axios.post(
                        `${process.env.REACT_APP_FASTAPI_BASE_URL}/category/content/select/biz/category/list`,
                        { biz_category_number_list: categoryContentData.map(item => item.detail_category_id) } // 필요한 데이터
                    );
                    setCategoryBizCategoryList(secondResponse.data); // 두 번째 요청 데이터 설정
                }
            } catch (error) {
                console.error('데이터 요청 중 오류 발생:', error);
            }
        };
        fetchCategoryContent();
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
                                <p className="text-3xl font-medium mb:text-5xl">세부 업종 공통 정보</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <button className="bg-blue-400 text-white py-2 px-4 rounded" onClick={() => openModal()}>
                            업종 정보등록 +
                        </button>
                    </section>

                    {/* 데이터가 없을 경우 안내 메시지 표시 */}
                    <section className="w-full">
                        {categoryContentList.length === 0 ? (
                            <p className="text-center text-gray-500 mt-6">
                                신규 업종 리포트를 작성해주세요.
                            </p>
                        ) : (
                            <BizDetailCategoryList
                                categoryContentList={categoryContentList}
                                categoryBizCategoryList={categoryBizCategoryList}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        )}
                    </section>
                    {isModalOpen && (
                        <BizDetailCategoryInsertModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onInsert={onInsert}
                            mainCategory={mainCategory}
                            setMainCategory={setMainCategory}
                            mainCategories={mainCategories}
                            subCategory={subCategory}
                            setSubCategory={setSubCategory}
                            subCategories={subCategories}
                            detailCategory={detailCategory}
                            setDetailCategory={setDetailCategory}
                            detailCategories={detailCategories}
                            reference={reference}
                            references={references}
                            setReference={setReference}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default BizDetailCategoryContent;
