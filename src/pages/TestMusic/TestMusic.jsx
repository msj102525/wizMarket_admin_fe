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
                `${process.env.REACT_APP_PUBLIC_URL}/ads/test/generate/lyrics`,
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
            detail_content: titlePrompt,
        };
        // console.log("음악 생성 요청 중:", basicInfo);

        try {
            // 1. 음악 생성 요청
            const response = await axios.post(
                `${process.env.REACT_APP_PUBLIC_URL}/ads/test/generate/music`,
                basicInfo
            );
            // console.log("음악 생성 응답:", response.data);

            // 2. taskId 반환
            const taskId = response.data.task_id;

            if (taskId) {
                const waitTime = 180000; // 3분 대기 (충분한 시간으로 조정)
                // console.log(`taskId: ${taskId} 확인을 위해 ${waitTime / 1000}초 대기 중...`);

                // 3. 일정 시간 대기 (음악 생성 대기)
                await new Promise((resolve) => setTimeout(resolve, waitTime));

                // 4. 생성된 음악 확인 요청
                const resultResponse = await axios.post(
                    `${process.env.REACT_APP_PUBLIC_URL}/ads/test/check/music`,
                    { taskId }
                );
                // console.log("음악 생성 결과:", resultResponse.data);

                if (resultResponse.data && resultResponse.data.music) {
                    setMusic(resultResponse.data.music); // 생성된 음악 URL 저장
                } else {
                    console.error("음악 생성 실패:", resultResponse.data);
                }
            } else {
                console.error("음악 생성 실패: taskId 없음");
            }
        } catch (err) {
            console.error("저장 중 오류 발생:", err);
        } finally {
            setMusicLoading(false); // 로딩 상태 해제 위치 조정
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
                                <p>테스트 코드 - 생성시간 3분으로 설정, 최적화 필요</p>
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
                                    <div className="flex flex-col items-center mt-4 gap-4"> {/* Flexbox와 gap 적용 */}
                                        {music.map((audioUrl, index) => (
                                            <audio
                                                key={index}
                                                src={audioUrl}
                                                alt={`생성된 오디오 ${index + 1}`}
                                                className="max-h-96 mb-4"  // 각 오디오 간 간격을 위해 margin-bottom 추가
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
