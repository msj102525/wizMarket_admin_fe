import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';

const TestGenerateVideo = () => {


    // 배경 제거 관련 상태값
    const [oldImage, setOldImage] = useState(null); // 미리보기용 이미지 URL
    const [uploadedFile, setUploadedFile] = useState(null); // 실제 업로드할 파일

    const [videoPrompt, setVideoPrompt] = useState(''); // 비디오 내용
    const [videoImage, setVideoImage] = useState(null); // 비디오 이미지
    const [videoLoading, setVideoLoading] = useState(false); // 비디오 중 여부

    const [musicPrompt, setMusicPrompt] = useState(''); // bgm 내용
    const [music, setMusic] = useState(null);
    const [musicLoading, setMusicLoading] = useState(false)

    // 파일 선택 시 미리보기 및 파일 저장
    const previewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOldImage(URL.createObjectURL(file)); // 미리보기 URL 저장
            setUploadedFile(file); // 파일 객체 저장
        }
    };


    const VideoEditChange = (event) => {
        setVideoPrompt(event.target.value); // 상태 업데이트
    };

    const MusicEditChange = (event) => {
        setMusicPrompt(event.target.value); // 상태 업데이트
    };


    // 비디오 생성
    const generateVideo = async () => {
        if (!uploadedFile) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }
        setVideoLoading(true);

        const formData = new FormData();
        formData.append("image", uploadedFile); // 올바른 파일 객체 추가
        formData.append("prompt", videoPrompt);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/test/generate/video`,
                formData
            );

            if (response.data.video_url) {
                setVideoImage(response.data.video_url); // 🖼️ 변환된 비디오 URL을 저장
            } else {
                console.error("비디오 생성 실패:", response.data);
            }
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setVideoLoading(false);
        }
    };

    // 음악 생성
    const generateMusic = async () => {
        setMusicLoading(true);
        const basicInfo = {
            prompt: musicPrompt,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/test/generate/music`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.music) {
                setMusic(response.data.music); // 🖼️ 변환된 비디오 URL을 저장
            } else {
                console.error("음악 생성 실패:", response.data);
            }
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setMusicLoading(false);
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

                    <div className='flex flex-col pt-2'>
                        {/* 비디오 생성 테스트 */}
                        <div className='w-full flex flex-row gap-4'>
                            <div className='flex flex-col'>
                                <section className='flex'>
                                    <input type="file" accept="image/*" onChange={previewImage} />
                                </section>
                                <section className="">
                                    {/* 기존 이미지 미리보기 */}
                                    {oldImage && (
                                        <div className="items-center mt-4">
                                            <img
                                                src={oldImage}
                                                alt="기존 이미지"
                                                className="max-h-96 rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </section>
                            </div>
                            <section className="items-center justify-center flex flex-col">
                                <textarea
                                    className="p-2 border rounded"
                                    placeholder="내용을 입력하세요"
                                    rows="17"
                                    cols="50"
                                    value={videoPrompt} // 상태 값 연결
                                    onChange={VideoEditChange} // 입력 값 변경 처리
                                ></textarea>
                                <button
                                    className="py-2 w-1/3 m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
                                    onClick={generateVideo}
                                    disabled={videoLoading}
                                >
                                    {videoLoading ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "비디오 생성"
                                    )}
                                </button>
                            </section>
                            <section>
                                {videoImage && (
                                    <div className="items-center mt-4">
                                        <video
                                            src={videoImage}
                                            alt="생성된 비디오"
                                            type="video/mp4"
                                            className="max-h-96 rounded-md shadow-md"
                                            controls 
                                        />
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* 음악 생성 */}
                        <div className='w-full flex flex-row gap-4'>
                            
                            <section className="items-center justify-center flex flex-col">
                                <textarea
                                    className="p-2 border rounded"
                                    placeholder="내용을 입력하세요"
                                    rows="17"
                                    cols="50"
                                    value={musicPrompt} // 상태 값 연결
                                    onChange={MusicEditChange} // 입력 값 변경 처리
                                ></textarea>
                                <button
                                    className="py-2 w-1/3 m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
                                    onClick={generateMusic}
                                    disabled={musicLoading}
                                >
                                    {musicLoading ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "음악 생성"
                                    )}
                                </button>
                            </section>
                            <section>
                                {music && (
                                    <div className="items-center mt-4">
                                        <audio controls>
                                            <source src={`data:audio/mp3;base64,${music}`} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                )}
                            </section>
                        </div>


                    </div>
                </main>
            </div>
        </div >
    );
}

export default TestGenerateVideo;
