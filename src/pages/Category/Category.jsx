import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategorySelect from '../../components/CategorySelect';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import SectionHeader from '../../components/SectionHeader';

import { useState } from 'react';

const Category = () => {

    const [isList, setIsList] = useState(false);
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    } = useCategories();

    const handleToggle = () => {
        setIsList(!isList);
    };



    return (

        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <section>
                        <SectionHeader title="업종 분류" isList={isList} handleToggle={handleToggle} />
                    </section>
                    
                    <section className="bg-white p-4">

                        {/* 검색 부 */}
                        <section className="flex items-center space-x-2 bg-gray-100 p-4 rounded-md">
                            <div className='w-1/2'>
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
                                    detailCategories={detailCategories}
                                />
                            </div>
                            <div>
                                <button className='ml-4 bg-black text-white px-4 py-2 rounded'>
                                    검색
                                </button>
                            </div>
                        </section>

                        {/* 총 갯수 부 */}
                        <section className="bg-gray-100 p-4 rounded-md mt-4 flex items-center space-x-8">
                            <div>
                                출처 총: <span className="text-red-500">{references.length}</span> 건
                            </div>
                            <span className="border-l border-black h-4"></span>
                            <div>
                                나이스비즈맵: <span className="text-red-500">{detailCategory.length}</span> 건
                            </div>
                            <span className="border-l border-black h-4"></span>
                            <div>
                                한국표준산업분류코드: <span className="text-red-500">준비중</span> 건
                            </div>
                            <span className="border-l border-black h-4"></span>
                            <div>
                                상권정보시스템: <span className="text-red-500"></span> 건
                            </div>
                        </section>


                        {/* 검색 갯수 부 */}
                        <section className="bg-white px-4 pb-4 pt-4 flex justify-between items-center">
                            <div>
                                검색결과: <span className="text-red-500">~~~</span> 개
                            </div>
                            <button
                                className="px-4 py-2 bg-white text-black rounded border"
                            >
                                엑셀 다운로드
                            </button>
                        </section>

                        
                    </section>
                </main>
            </div>
        </div>

    );
};

export default Category;