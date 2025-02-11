import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // pagination 스타일 추가
import { Pagination, Navigation } from "swiper/modules"; // pagination 모듈 추가
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리

const TestDrawImage = () => {

    const [stablePrompt, setStablePrompt] = useState('');
    const [stableImage, setStableImage] = useState([]);
    const [stableLoading, setStableLoading] = useState(false);

    const [dallePrompt, setDallePrompt] = useState('');
    const [dalleImage, setDalleImage] = useState([]);
    const [dalleLoading, setDalleLoading] = useState(false);
    const [dalleRatio, setDalleRatio] = useState('9:16');

    const [midPrompt, setMidPrompt] = useState('');
    const [midImage, setMidImage] = useState([]);
    const [midLoading, setMidLoading] = useState(false);
    const [midMessage, setMidMessage] = useState('');
    const [midRatio, setMidRatio] = useState('9:16')
    const [selectMidImage, setSelectMidImage] = useState(0);

    const [imagenPrompt, setImagenPrompt] = useState('');
    const [imagenImage, setImagenImage] = useState([]);
    const [imagenLoading, setImagenLoading] = useState(false);
    const [imagenMessage, setImagenMessage] = useState('')
    const [imagenRatio, setImagenRatio] = useState('9:16')
    const [selectImagenImage, setSelectImagenImage] = useState(0);

    // 📌 오늘 날짜를 YYYYMMDD 형식으로 반환하는 함수 (전역 선언)
    const getFormattedDate = () => {
        return new Date().toISOString().split("T")[0].replace(/-/g, "");
    };

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

    const downStable = async () => {
        console.log(stableImage.length)
        try {
            if (!stableImage || stableImage.length === 0) {
                alert("다운로드할 이미지가 없습니다.");
                return;
            }
            // 📌 UUID 생성
            const uuid = uuidv4().split("-")[0]; // 짧은 UUID

            // 📌 파일명 설정: SD_YYYYMMDD_UUID.png
            const fileName = `SD_${getFormattedDate()}_${uuid}.png`;

            // 📌 이미지 다운로드 처리
            const response = await fetch(stableImage);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            // 📌 가짜 `<a>` 태그를 생성하여 클릭 이벤트 트리거
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            // 📌 다운로드 후 URL 해제
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("이미지 다운로드 중 오류 발생:", error);
        }
    };

    const generateDalle = async () => {
        setDalleLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/dalle`, {
                prompt: dallePrompt,
                ratio: dalleRatio
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

    const downDalle = async () => {
        try {
            if (!dalleImage || dalleImage.length === 0) {
                alert("다운로드할 이미지가 없습니다.");
                return;
            }
            // 📌 UUID 생성
            const uuid = uuidv4().split("-")[0]; // 짧은 UUID

            // 📌 파일명 설정: SD_YYYYMMDD_UUID.png
            const fileName = `DL_${getFormattedDate()}_${uuid}.png`;

            // 📌 이미지 다운로드 처리
            const response = await fetch(dalleImage);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            // 📌 가짜 `<a>` 태그를 생성하여 클릭 이벤트 트리거
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            // 📌 다운로드 후 URL 해제
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("이미지 다운로드 중 오류 발생:", error);
        }
    };

    const generateMid = async () => {
        setMidLoading(true);
        setMidMessage('')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/mid/test`,
                {
                    prompt: midPrompt,
                    ratio: midRatio
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

    const handleMidSlideChange = (swiper) => {
        setSelectMidImage(swiper.activeIndex);
    };
    
    const downMid = async () => {
        if (!midImage || midImage.length === 0) {
            alert("다운로드할 이미지가 없습니다.");
            return;
        }

        const imageUrl = midImage[selectMidImage]; // ✅ 현재 보고 있는 이미지
        console.log("다운로드할 이미지 URL:", imageUrl);

        // 📌 UUID 생성
        const uuid = uuidv4().split("-")[0]; // 짧은 UUID

        // 📌 파일명 설정: SD_YYYYMMDD_UUID.png
        const fileName = `MI_${getFormattedDate()}_${uuid}.png`;

        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                alert("이미지를 가져오는 데 실패했습니다.");
                return;
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("이미지 다운로드 중 오류 발생:", error);
            alert("이미지 다운로드 중 오류가 발생했습니다.");
        }
    };

    const generateImagen = async () => {
        setImagenLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/imagen`,
                {
                    prompt: imagenPrompt,
                    ratio: imagenRatio
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.data.images) {
                setImagenMessage('\n생성 오류\n다시 생성해주세요')
            }
            setImagenLoading(false);
            setImagenImage(response.data.images || []);
        } catch (err) {
            console.error("Error generating image:", err);
            setImagenLoading(false);
        }
    };

    const handleImagenSlideChange = (swiper) => {
        setSelectImagenImage(swiper.activeIndex);
    };

    const downImagen = async () => {
        if (!imagenImage || imagenImage.length === 0) {
            alert("다운로드할 이미지가 없습니다.");
            return;
        }

        const imageUrl = imagenImage[selectImagenImage]; // ✅ 현재 보고 있는 이미지
        console.log("다운로드할 이미지 URL:", imageUrl);

        // 📌 UUID 생성
        const uuid = uuidv4().split("-")[0]; // 짧은 UUID

        // 📌 파일명 설정: SD_YYYYMMDD_UUID.png
        const fileName = `IM_${getFormattedDate()}_${uuid}.png`;

        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                alert("이미지를 가져오는 데 실패했습니다.");
                return;
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("이미지 다운로드 중 오류 발생:", error);
            alert("이미지 다운로드 중 오류가 발생했습니다.");
        }
    };


    return (
        <div>
            <Header />
            <div className="flex">
                <dir className="mb:hidden">
                    <Aside />
                </dir>
                <main className="flex flex-col gap-4 h-full w-full overflow-y-auto">
                    <div className="flex flex-col flex-1">
                        {/* 상위 영역 */}
                        <div className='flex flex-row h-full gap-2'>
                            {/* 디퓨전 프롬프트 영역 */}
                            <div className='flex flex-col justify-center items-center flex-1'>
                                <section className='flex w-full p-2 justify-center'>
                                    <h4>Diffusion</h4>
                                </section>
                                <section className="items-center w-full">
                                    <textarea
                                        className="w-full h-64 p-2 border border-gray-300 rounded-md"
                                        placeholder="프롬프트를 영어로 입력하세요"
                                        value={stablePrompt} // 상태값 바인딩
                                        onChange={(e) => setStablePrompt(e.target.value)} // 상태 업데이트
                                    ></textarea>
                                </section>
                                <section className="flex items-center ">
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
                            </div>
                            {/* 디퓨전 이미지 영역 */}
                            <div className='pl-2 flex flex-col justify-center items-center flex-1'>
                                <section className="w-auto items-center">
                                    {stableImage.length > 0 ? (
                                        <div className="mt-4">
                                            <img src={stableImage} alt="디퓨전 결과 이미지" className="max-h-80" />
                                        </div>
                                    ) : (
                                        <div>
                                            이미지 영역
                                        </div>
                                    )}
                                </section>
                                <button
                                    onClick={downStable}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                >
                                    다운로드
                                </button>
                            </div>

                            {/* Dalle 프롬프트 영역 */}
                            <div className='flex flex-col justify-center items-center flex-1'>
                                <section className='flex w-full p-2 justify-center items-center'>
                                    <h4 className='pr-2'>Dalle</h4>
                                    <select
                                        className="p-2 border rounded-md"
                                        value={dalleRatio}
                                        onChange={(e) => setDalleRatio(e.target.value)}
                                    >
                                        <option value="1:1">1:1</option>
                                        <option value="16:9">16:9</option>
                                        <option value="9:16">9:16</option>
                                    </select>
                                </section>
                                <section className="items-center w-full">
                                    <textarea
                                        className="w-full h-64 p-2 border border-gray-300 rounded-md"
                                        placeholder="프롬프트를 영어로 입력하세요"
                                        value={dallePrompt} // 상태값 바인딩
                                        onChange={(e) => setDallePrompt(e.target.value)} // 상태 업데이트
                                    ></textarea>
                                </section>
                                <section className="flex items-center ">
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
                            </div>
                            {/* Dalle 이미지 영역 */}
                            <div className='pl-2 flex flex-col justify-center items-center flex-1'>
                                <section className="w-auto items-center">
                                    {dalleImage.length > 0 ? (
                                        <div className="mt-4">
                                            <img src={dalleImage} alt="Dalle 결과 이미지" className="max-w-[200px] rounded-md shadow-md" />
                                        </div>
                                    ) : (
                                        <div>
                                            이미지 영역
                                        </div>
                                    )}
                                </section>
                                <button
                                    onClick={downDalle}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                >
                                    다운로드
                                </button>
                            </div>
                        </div>
                        <hr />

                        {/* 하위 영역 */}
                        <div className='flex flex-row h-full gap-2'>
                            {/* 미드저니 프롬프트 영역 */}
                            <div className='flex flex-col justify-center items-center flex-1'>
                                <section className='flex w-full p-2 justify-center items-center'>
                                    <h4 className='pr-2'>미드저니</h4>
                                    <select
                                        className="p-2 border rounded-md"
                                        value={midRatio}
                                        onChange={(e) => setMidRatio(e.target.value)}
                                    >
                                        <option value="1:1">1:1</option>
                                        <option value="16:9">16:9</option>
                                        <option value="9:16">9:16</option>
                                    </select>
                                </section>
                                <section className="items-center w-full">
                                    <textarea
                                        className="w-full h-64 p-2 border border-gray-300 rounded-md"
                                        placeholder="프롬프트를 영어로 입력하세요"
                                        value={midPrompt} // 상태값 바인딩
                                        onChange={(e) => setMidPrompt(e.target.value)} // 상태 업데이트
                                    ></textarea>
                                </section>
                                <section className="flex items-center ">
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
                            </div>
                            {midMessage}
                            {/* 미드저니 이미지 영역 */}
                            <div className='pl-2 flex flex-col justify-center items-center flex-1'>
                                <section className="items-center justify-center">
                                    {midImage.length > 0 ? (
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            navigation
                                            pagination={{ clickable: true }}
                                            spaceBetween={30}
                                            slidesPerView={1}
                                            className="max-w-[200px] mt-4"
                                            onSlideChange={handleMidSlideChange}
                                        >
                                            {midImage.map((image, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`Generated ${index + 1}`} // "Image" 대신 의미 있는 설명으로 대체
                                                        className="max-w-[200px] rounded-md shadow-md"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div>
                                            이미지 영역
                                        </div>
                                    )}
                                </section>
                                <button
                                    onClick={downMid}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                >
                                    다운로드
                                </button>
                            </div>
                            {/* IMAGEN 프롬프트 영역 */}
                            <div className='flex flex-col justify-center items-center flex-1'>
                                <section className='flex w-full p-2 justify-center items-center'>
                                    <h4 className='pr-2'>Imagen3</h4>
                                    <select
                                        className="p-2 border rounded-md"
                                        value={imagenRatio}
                                        onChange={(e) => setImagenRatio(e.target.value)}
                                    >
                                        <option value="1:1">1:1</option>
                                        <option value="16:9">16:9</option>
                                        <option value="9:16">9:16</option>
                                    </select>
                                </section>
                                <section className="items-center w-full">
                                    <textarea
                                        className="w-full h-64 p-2 border border-gray-300 rounded-md"
                                        placeholder="**특수문자 제외** 프롬프트를 영어로 입력하세요"
                                        value={imagenPrompt} // 상태값 바인딩
                                        onChange={(e) => setImagenPrompt(e.target.value)} // 상태 업데이트
                                    ></textarea>
                                </section>
                                <section className="flex items-center ">
                                    {imagenLoading ? (
                                        // 스피너 표시
                                        <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        // 버튼 표시
                                        <button
                                            onClick={generateImagen}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                        >
                                            생성
                                        </button>
                                    )}
                                </section>
                            </div>
                            {/* IMAGEN 이미지 영역 */}
                            <div className='pl-2 flex flex-col justify-center items-center flex-1'>
                                <section className="items-center justify-center">
                                    {imagenImage.length > 0 ? (
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            navigation
                                            pagination={{ clickable: true }}
                                            spaceBetween={30}
                                            slidesPerView={1}
                                            className="max-w-[200px] mt-4"
                                            onSlideChange={handleImagenSlideChange}
                                        >
                                            {imagenImage.map((image, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`Generated ${index + 1}`} // "Image" 대신 의미 있는 설명으로 대체
                                                        className="max-w-[200px] rounded-md shadow-md"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className="whitespace-pre-line">
                                            이미지 영역
                                            {imagenMessage}
                                        </div>
                                    )}
                                </section>
                                <button
                                    onClick={downImagen}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                >
                                    다운로드
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div >
    );
}

export default TestDrawImage;
