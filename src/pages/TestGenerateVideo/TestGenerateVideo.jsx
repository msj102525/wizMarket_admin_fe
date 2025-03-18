import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';

const TestGenerateVideo = () => {


    // 배경 제거 관련 상태값
    const [oldImage, setOldImage] = useState(null); // 미리보기용 이미지 URL
    const [bgImage, setBgImage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null); // 실제 업로드할 파일
    const [bgFile, setBgFile] = useState(null)

    const [videoPrompt, setVideoPrompt] = useState(''); // 비디오 내용
    const [videoImage, setVideoImage] = useState(null); // 비디오 이미지
    const [videoLoading, setVideoLoading] = useState(false); // 비디오 중 여부

    const [bgPrompt, setBgPrompt] = useState('')
    const [bgNPrompt, setBgNPrompt] = useState('')
    const [bgRemoveImage, setBgRemoveImage] = useState(null);
    const [bgLoading, setBgLoading] = useState(false)
    const [type, setType] = useState('')    // 스타일 선택 or 직접 입력
    const [scene, setScene] = useState('')  // 선택한 스타일 값




    // 파일 선택 시 미리보기 및 파일 저장
    const previewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOldImage(URL.createObjectURL(file)); // 미리보기 URL 저장
            setUploadedFile(file); // 파일 객체 저장
        }
    };

    const bgviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgImage(URL.createObjectURL(file)); // 미리보기 URL 저장
            setBgFile(file); // 파일 객체 저장
        }
    };


    const VideoEditChange = (event) => {
        setVideoPrompt(event.target.value); // 상태 업데이트
    };

    const BgEditChange = (event) => {
        setBgPrompt(event.target.value); // 상태 업데이트
    };

    const BgNEditChange = (event) => {
        setBgNPrompt(event.target.value); // 상태 업데이트
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

    // 배경 생성
    const generateBg = async () => {
        if (!bgFile) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }
        setBgLoading(true);

        const kakaoJsKey = process.env.REACT_APP_KAKAO_JS_API_KEY;
        if (!kakaoJsKey) {
            console.error("Kakao JavaScript Key가 설정되지 않았습니다.");
            return;
        }

        if (!window.Kakao) {
            // console.log("카카오 SDK 로드 중...");
            const script = document.createElement("script");
            script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
            script.async = true;
            script.onload = () => {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(kakaoJsKey);
                }
                generateBg(bgImage);
            };
            document.body.appendChild(script);
            return;
        }

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoJsKey);
        }
        // ✅ 기존 방식 유지: 카카오 이미지 업로드
        const base64ToBlob = async (base64Data) => {
            const res = await fetch(base64Data);
            const blob = await res.blob();
            return blob;
        };

        const blob = await base64ToBlob(bgImage);
        const file = new File([blob], "uploaded_image.png", { type: "image/png" });

        let uploadedImageUrl = null;

        try {
            const response = await window.Kakao.Share.uploadImage({ file: [file] });
            // console.log("✅ 카카오 이미지 업로드 응답:", response);

            if (response && response.infos && response.infos.original && response.infos.original.url) {
                uploadedImageUrl = response.infos.original.url;
            } else {
                console.error("❌ 카카오 이미지 업로드 실패 (응답 없음):", response);
                return;
            }
        } catch (uploadError) {
            console.error("❌ 카카오 이미지 업로드 중 오류 발생:", uploadError);
            return;
        }

        const url = uploadedImageUrl

        let ratio = ""

        if (type === "style") {
            ratio = scene;
        } else {
            ratio = bgPrompt + " | " + bgNPrompt;
        }

        const basicInfo = {
            prompt: url,
            gpt_role: type,
            ratio: ratio
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/test/generate/bg`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.image) {
                setBgRemoveImage(response.data.image); // 🖼️ 변환된 비디오 URL을 저장
            } else {
                console.error("비디오 생성 실패:", response.data);
            }
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setBgLoading(false);
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

                        {/* 배경 생성 */}
                        <div className='w-full flex flex-row gap-4'>
                            <div className='flex flex-col'>
                                <section className='flex'>
                                    <input type="file" accept="image/*" onChange={bgviewImage} />
                                </section>
                                <section className="">
                                    {/* 기존 이미지 미리보기 */}
                                    {bgImage && (
                                        <div className="items-center mt-4">
                                            <img
                                                src={bgImage}
                                                alt="기존 이미지"
                                                className="max-h-96 rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </section>
                            </div>
                            <section className="items-center justify-center flex flex-col">
                                <select
                                    name="type"
                                    className="border-4"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        타입을 선택해주세요
                                    </option>
                                    <option value="style">스타일 선택</option>
                                    <option value="write">직접 입력</option>
                                </select>

                                {type === "style" && (  // "style"일 때만 style 선택 옵션 표시
                                    <div className='pt-8'>
                                        <select
                                            name="scene"
                                            className="p-2 border rounded"
                                            value={scene}
                                            onChange={(e) => setScene(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                스타일을 선택해주세요
                                            </option>
                                            <option value="marble">marble</option>
                                            <option value="wood">wood</option>
                                            <option value="industrial">industrial</option>
                                            <option value="linen">linen</option>
                                            <option value="brick">brick</option>
                                            <option value="counter">counter</option>
                                        </select>
                                    </div>
                                )}

                                {type === "write" && (  // "write"일 때만 텍스트 영역 표시
                                    <div className='pt-8 flex flex-col'>
                                        <div className='pb-6'>
                                            <textarea
                                                className="p-2 border"
                                                placeholder="긍정 프롬프트"
                                                rows="8"
                                                cols="50"
                                                value={bgPrompt} // 상태 값 연결
                                                onChange={BgEditChange} // 입력 값 변경 처리
                                            ></textarea>
                                        </div>
                                        <div>
                                            <textarea
                                                className="p-2 border"
                                                placeholder="부정 프롬프트"
                                                rows="8"
                                                cols="50"
                                                value={bgNPrompt} // 상태 값 연결
                                                onChange={BgNEditChange} // 입력 값 변경 처리
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="py-2 m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
                                    onClick={generateBg}
                                    disabled={bgLoading}
                                >
                                    {bgLoading ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "배경 생성"
                                    )}
                                </button>
                            </section>
                            <section>
                                {bgRemoveImage && (
                                    <div className="items-center mt-4">
                                        <img src={bgRemoveImage} alt="Generated Background" className="max-h-96 rounded-md shadow-md" />
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
