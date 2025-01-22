import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // pagination 스타일 추가
import { Pagination, Navigation } from "swiper/modules"; // pagination 모듈 추가

const TestDrawImage = () => {

    const [stablePrompt, setStablePrompt] = React.useState('');
    const [stableImage, setStableImage] = React.useState([]);
    const [stableLoading, setStableLoading] = React.useState(false);
    const [dallePrompt, setDallePrompt] = React.useState('');
    const [dalleImage, setDalleImage] = React.useState([]);
    const [dalleLoading, setDalleLoading] = React.useState(false);
    const [midPrompt, setMidPrompt] = React.useState('');
    const [midImage, setMidImage] = React.useState([]);
    const [midLoading, setMidLoading] = React.useState(false);

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
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/image/mid`, {
                prompt: midPrompt, // stablePrompt 값을 전송
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            setMidLoading(false);
            setMidImage(response.data.images)
        } catch (err) {
            console.error('Error generating image:', err);
            setMidLoading(false);
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
                        <div className="flex-1 flex flex-col gap-2 w-1/4">
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
                        <div className="flex-1 flex flex-col gap-2 w-1/4">
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

                            <section className="flex w-full items-center justify-center">
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
                        <div className="flex-1 flex flex-col gap-2 w-1/4">
                            <section>
                                <h4>미드저니</h4>
                            </section>
                            <section className="w-full items-center">
                                <textarea
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                                    placeholder="프롬프트를 영어로 입력하세요"
                                    value={midPrompt} // 상태값 바인딩
                                    onChange={(e) => setMidPrompt(e.target.value)} // 상태 업데이트
                                ></textarea>
                            </section>

                            <section className="flex w-full items-center justify-center ">
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

                            {/* 이미지 영역 */}
                            <section className="w-full items-center">
                                {midImage.length > 0 && (
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        className="w-full mt-4"
                                    >
                                        {midImage.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Generated ${index + 1}`} // "Image" 대신 의미 있는 설명으로 대체
                                                    className="max-w-full rounded-md shadow-md"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </section>
                        </div>

                    </div>
                </main>

            </div>
        </div >
    );
}

export default TestDrawImage;
