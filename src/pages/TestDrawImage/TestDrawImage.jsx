import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // pagination 스타일 추가
import { Pagination, Navigation } from "swiper/modules"; // pagination 모듈 추가

const TestDrawImage = () => {

    const [stablePrompt, setStablePrompt] = useState('');
    const [stableImage, setStableImage] = useState([]);
    const [stableLoading, setStableLoading] = useState(false);
    const [dallePrompt, setDallePrompt] = useState('');
    const [dalleImage, setDalleImage] = useState([]);
    const [dalleLoading, setDalleLoading] = useState(false);
    const [midPrompt, setMidPrompt] = useState('');
    const [midImage, setMidImage] = useState([]);
    const [midLoading, setMidLoading] = useState(false);
    const [midMessage, setMidMessage] = useState('')

    const generateStable = async () => {
        setStableLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/stable`, {
                prompt: stablePrompt, // stablePrompt 값을 전송
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setStableLoading(false);
            setStableImage(response.data.image);
        } catch (err) {
            console.error('Error generating image:', err);
            setStableLoading(false);
        }
    };

    const generateDalle = async () => {
        setDalleLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/dalle`, {
                prompt: dallePrompt,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setDalleLoading(false);
            setDalleImage(response.data.image);
        } catch (err) {
            console.error('Error generating image:', err);
            setDalleLoading(false);
        }
    };

    const generateMid = async () => {
        setMidLoading(true);
        setMidMessage('')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/mid/test`,
                {
                    prompt: midPrompt, // stablePrompt 값을 전송
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 180000, // ⏳ 180초(180,000ms) 후 타임아웃 설정
                }
            );
    
            setMidLoading(false);
            setMidImage(response.data.images);
        } catch (err) {
            if (err.code === "ECONNABORTED") {
                setMidMessage('⏳ 요청 시간이 초과되었습니다 (180초 제한) 재 요청 해주세요')
            } else {
                console.error("Error generating image:", err);
            }
            setMidLoading(false);
        }
    };

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
                    <div className="flex flex-row gap-4 flex-1">
                        {/* 왼쪽 영역 */}
                        <div className="flex-1 flex flex-col gap-2 w-1/3">
                            <section>
                                <h4>스테이블 디퓨전</h4>
                            </section>
                            <section className="w-full items-center">
                                <textarea
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                                    placeholder="프롬프트를 영어로 입력하세요"
                                    value={stablePrompt} // 상태값 바인딩
                                    onChange={(e) => setStablePrompt(e.target.value)} // 상태 업데이트
                                ></textarea>
                            </section>
                            <section className="flex w-full items-center justify-center ">
                                {stableLoading ? (
                                    // 스피너 표시
                                    <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    // 버튼 표시
                                    <button
                                        onClick={generateStable}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                    >
                                        생성
                                    </button>
                                )}
                            </section>
                            <section className="w-full items-center">
                                {stableImage && (
                                    <div className="mt-4">
                                        <img src={stableImage} alt="Stable Diffusion 결과 이미지" className="max-w-full rounded-md shadow-md" />
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* 중앙 영역 */}
                        <div className="flex-1 flex flex-col gap-2 w-1/3">
                            <section>
                                <h4>dalle</h4>
                            </section>
                            <section className="w-full items-center">
                                <textarea
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                                    placeholder="프롬프트를 영어로 입력하세요"
                                    value={dallePrompt} // 상태값 바인딩
                                    onChange={(e) => setDallePrompt(e.target.value)} // 상태 업데이트
                                ></textarea>
                            </section>

                            <section className="flex items-center justify-center">
                                {dalleLoading ? (
                                    // 스피너 표시
                                    <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    // 버튼 표시
                                    <button
                                        onClick={generateDalle}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                    >
                                        생성
                                    </button>
                                )}
                            </section>
                            

                            {/* 생성된 이미지 */}
                            <section className="w-full items-center">
                                {dalleImage && (
                                    <div className="mt-4">
                                        <img src={dalleImage} alt="Dalle Diffusion 결과 이미지" className="max-w-full rounded-md shadow-md" />
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* 오른쪽 영역 */}
                        <div className="flex-1 flex flex-col gap-2">
                            <section>
                                <h4>미드저니</h4>
                            </section>
                            <section className=" items-center">
                                <textarea
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                                    placeholder="프롬프트를 영어로 입력하세요"
                                    value={midPrompt} // 상태값 바인딩
                                    onChange={(e) => setMidPrompt(e.target.value)} // 상태 업데이트
                                ></textarea>
                            </section>

                            <section className="flex  items-center justify-center ">
                                {midLoading ? (
                                    // 스피너 표시
                                    <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    // 버튼 표시
                                    <button
                                        onClick={generateMid}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                    >
                                        생성
                                    </button>
                                )}
                            </section>
                            {midMessage}

                            {/* 이미지 영역 */}
                            <section className="items-center">
                                {midImage.length > 0 && (
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        className="max-w-[500px] mt-4"
                                    >
                                        {midImage.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Generated ${index + 1}`} // "Image" 대신 의미 있는 설명으로 대체
                                                    className="max-w-[600px] rounded-md shadow-md"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </section>
                        </div>
                    </div>

                    <hr />

                    <div className='flex flex-row pt-24'>
                        {/* 배경 제거 테스트 1 */}
                        <div className='w-full'>
                            <section>
                                <h4>이미지 파일 배경 제거 테스트1</h4>

                            </section>
                            <section className='flex items-center justify-center'>
                                <input type="file" accept="image/*" onChange={previewImage} className='w-1/3'/>
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

export default TestDrawImage;
