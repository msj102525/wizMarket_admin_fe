import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';

const RemoveBackground = () => {


    // 배경 제거 관련 상태값
    const [oldImage, setOldImage] = useState(null); // 미리보기용 이미지 URL
    const [uploadedFile, setUploadedFile] = useState(null); // 실제 업로드할 파일

    const [removeLoading, setRemoveLoading] = useState(false);
    const [newImage, setNewImage] = useState(null); // 배경 제거 후 이미지

    const [freeImageLoding, setFreeImageLoading] = useState(false)
    const [freeImage, setFreeImage] = useState(null);   // 배경 제거 후 이미지2

    // 파일 선택 시 미리보기 및 파일 저장
    const previewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOldImage(URL.createObjectURL(file)); // 미리보기 URL 저장
            setUploadedFile(file); // 파일 객체 저장
        }
    };

    // 배경 제거 요청
    const changeImage = async () => {
        if (!uploadedFile) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }

        setRemoveLoading(true);
        const formData = new FormData();
        formData.append("image", uploadedFile); // 올바른 파일 객체 추가

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/remove/background`,
                formData,
                { responseType: "blob" } // 🚀 중요: 바이너리 데이터를 Blob으로 받음
            );
            const imageUrl = URL.createObjectURL(response.data);
            setNewImage(imageUrl); // 🖼️ 변환된 이미지 URL을 저장
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setRemoveLoading(false);
        }
    };

    // 배경 제거 요청2
    const changeFreeImage = async () => {
        if (!uploadedFile) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }

        setFreeImageLoading(true);
        const formData = new FormData();
        formData.append("image", uploadedFile); // 올바른 파일 객체 추가

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/remove/background/free`,
                formData,
                { responseType: "blob" } // 🚀 중요: 바이너리 데이터를 Blob으로 받음
            );
            const imageUrl = URL.createObjectURL(response.data);
            setFreeImage(imageUrl); // 🖼️ 변환된 이미지 URL을 저장
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setFreeImageLoading(false);
        }
    };


    return (
        <div>
            <Header />
            <div className="flex">
                <dir className="mb:hidden">
                    <Aside />
                </dir>
                <main className="flex flex-col gap-4 h-full w-full p-4 overflow-y-auto">
                    {/* 좌우 영역 컨테이너 */}
                    
                    <div className='flex flex-row pt-24'>
                        {/* 배경 제거 테스트 1 */}
                        <div className='w-full'>
                            <section>
                                <h4>이미지 파일 배경 제거 테스트1</h4>

                            </section>
                            <section className='flex items-center justify-center'>
                                <input type="file" accept="image/*" onChange={previewImage} className='w-1/3' />
                                <button
                                    className="py-2 w-1/3 m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
                                    onClick={changeImage}
                                    disabled={removeLoading}
                                >
                                    {removeLoading ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "배경 제거"
                                    )}
                                </button>
                                <button
                                    className="py-2 m-4 w-1/3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
                                    onClick={changeFreeImage}
                                    disabled={freeImageLoding}
                                >
                                    {freeImageLoding ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "배경 제거2"
                                    )}
                                </button>
                            </section>


                            <section className="w-full items-center flex">
                                {/* 기존 이미지 미리보기 */}
                                {oldImage && (
                                    <div className="items-center mt-4">
                                        <img
                                            src={oldImage}
                                            alt="기존 이미지"
                                            className="max-h-[600px] rounded-md shadow-md"
                                        />
                                    </div>
                                )}
                                <div>
                                    {newImage && (
                                        <div className="items-center mt-4">
                                            <img
                                                src={newImage}
                                                alt="배경 제거된 이미지"
                                                className="max-h-[600px] rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {freeImage && (
                                        <div className="items-center mt-4">
                                            <img
                                                src={freeImage}
                                                alt="배경 제거된 이미지"
                                                className="max-h-[600px] rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    );
}

export default RemoveBackground;
