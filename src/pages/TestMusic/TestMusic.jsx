import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState } from 'react';
import axios from 'axios';

const TestMusic = () => {


    // 배경 제거 관련 상태값
    const [lyricsPrompt, setLyricsPrompt] = useState(''); // 비디오 내용
    const [stylePrompt, setStylePrompt] = useState(''); // 비디오 내용
    const [titlePrompt, setTitlePrompt] = useState(''); // 비디오 내용


    const [lyricsLoading, setLiricsLoading] = useState(false)
    const [music, setMusic] = useState(null); // 비디오 이미지
    const [musicLoading, setMusicLoading] = useState(false); // 비디오 중 여부

    const LyricsEditChange = (event) => {
        setLyricsPrompt(event.target.value); // 상태 업데이트
    };

    const StyleEditChange = (event) => {
        setStylePrompt(event.target.value); // 상태 업데이트
    };

    const TitleEditChange = (event) => {
        setTitlePrompt(event.target.value); // 상태 업데이트
    };

    // 가사 생성
    const generateLyrics = async () => {
        if (!stylePrompt | !titlePrompt) {
            alert("제목과 스타일을 입력해주세요");
            return;
        }
        setLiricsLoading(true);
        const basicInfo = {
            prompt: stylePrompt,
            ratio: titlePrompt
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/test/generate/lyrics`,
                basicInfo
            );
            setLyricsPrompt(response.data.lyrics)
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setLiricsLoading(false);
        }
    }


    // 음악 생성
    const generateMusic = async () => {
        setMusicLoading(true);
        const basicInfo = {
            prompt: lyricsPrompt,
            gpt_role: stylePrompt,
            detail_content: titlePrompt
        };
        console.log(basicInfo)
        try {
            // 1. 음악 생성 요청
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/test/generate/music`,
                basicInfo
            );
            console.log(response.data);

            // 2. taskId 반환 (음악 생성 요청 후 taskId를 받아옴)
            const taskId = response.data.task_id;

            if (taskId) {
                // 3. 일정 시간 대기 후 생성된 음악을 확인하는 POST 요청 보내기
                const waitTime = 5000; // 5초 대기 (조정 가능)
                console.log(`taskId: ${taskId} 확인을 위해 ${waitTime / 1000}초 대기 중...`);

                const taskInfo = {
                    prompt: taskId,
                };

                setTimeout(async () => {
                    const resultResponse = await axios.post(
                        `${process.env.REACT_APP_PUBLIC_URL}/ads/test/check/music`,
                        taskInfo
                    );
                    console.log(resultResponse.data);

                    // 4. 결과 처리
                    if (resultResponse.data && resultResponse.data.music) {
                        setMusic(resultResponse.data.music); // 생성된 음악 URL 저장
                    } else {
                        console.error("음악 생성 실패:", resultResponse.data);
                    }
                }, waitTime); // 지정된 시간 후에 결과 확인 요청
            } else {
                console.error("음악 생성 실패: taskId 없음");
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
                        {/* 음악 생성 테스트 */}
                        <div className='w-full flex flex-row gap-4'>
                            <section className="items-center justify-center flex flex-col gap-6">
                                <textarea
                                    className="p-2 border rounded"
                                    placeholder="제목 프롬프트(80자)"
                                    rows="5"
                                    cols="50"
                                    value={titlePrompt} // 상태 값 연결
                                    onChange={TitleEditChange} // 입력 값 변경 처리
                                ></textarea>
                                <textarea
                                    className="p-2 border rounded"
                                    placeholder="스타일 프롬프트(200자)"
                                    rows="7"
                                    cols="50"
                                    value={stylePrompt} // 상태 값 연결
                                    onChange={StyleEditChange} // 입력 값 변경 처리
                                ></textarea>
                                <div className='flex flex-col gap-4 items-center justify-center'>
                                    <button
                                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                                        onClick={generateLyrics}
                                        disabled={lyricsLoading}
                                    >
                                        {lyricsLoading ? (
                                            <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            "가사 생성"
                                        )}
                                    </button>
                                    <textarea
                                        className="p-2 border rounded"
                                        placeholder="가사 프롬프트(3000자)"
                                        rows="25"
                                        cols="50"
                                        value={lyricsPrompt} // 상태 값 연결
                                        onChange={LyricsEditChange} // 입력 값 변경 처리
                                    ></textarea>
                                </div>
                                <button
                                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
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
                                {music && music.length > 0 && (
                                    <div className="items-center mt-4">
                                        {music.map((audioUrl, index) => (
                                            <audio
                                                key={index}
                                                src={audioUrl}
                                                alt={`생성된 오디오 ${index + 1}`}
                                                className="max-h-96 rounded-md shadow-md"
                                                controls
                                            />
                                        ))}
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

export default TestMusic;
