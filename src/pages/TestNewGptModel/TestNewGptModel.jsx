import Aside from '../../components/Aside';
import Header from '../../components/Header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestNewGptModel = () => {

    const [oldPrompt, setOldPrompt] = useState('');
    const [oldResultLoding, setOldResultLoading] = useState(false)
    const [oldResult, setOldResult] = useState('');
    const [newPrompt, setNewPrompt] = useState('');
    const [newResultLoding, setNewResultLoading] = useState(false)
    const [newResult, setNewResult] = useState('');

    // 페이지 로드 시 초기값 설정
    useEffect(() => {
        setOldPrompt(`다음과 같은 내용을 바탕으로 온라인 광고 콘텐츠를 제작하려고 합니다. 
잘 어울리는 광고 문구를 생성해주세요.
- 현재 날짜, 날씨, 시간, 계절 등의 상황에 어울릴 것
- 40자 이상 작성할 것
- 특수기호, 이모티콘은 제외할 것
- 광고 채널 : 문자메시지 형태로 작성할 것
- 주제 : 매장 소개 형태로 작성할 것
            
매장명 : 인더키친 몽뜨레셰프 청담본점
주소 : 서울 강남구 도산대로 435
업종 : 패밀리레스토랑
날짜 : 2024-12-11 (수요일) 17:39
날씨 : 맑음, 5.91℃
매출이 가장 높은 시간대 : 21~24시
매출이 가장 높은 남성 연령대 : 남자 40대
매출이 가장 높은 여성 연령대 : 여자 30대
주제 세부 정보 : `); 
        setNewPrompt(`다음과 같은 내용을 바탕으로 온라인 광고 콘텐츠를 제작하려고 합니다. 
잘 어울리는 광고 문구를 생성해주세요.
- 현재 날짜, 날씨, 시간, 계절 등의 상황에 어울릴 것
- 40자 이상 작성할 것
- 특수기호, 이모티콘은 제외할 것
- 광고 채널 : 문자메시지 형태로 작성할 것
- 주제 : 매장 소개 형태로 작성할 것

매장명 : 인더키친 몽뜨레셰프 청담본점
주소 : 서울 강남구 도산대로 435
업종 : 패밀리레스토랑
날짜 : 2024-12-11 (수요일) 17:39
날씨 : 맑음, 5.91℃
매출이 가장 높은 시간대 : 21~24시
매출이 가장 높은 남성 연령대 : 남자 40대
매출이 가장 높은 여성 연령대 : 여자 30대
주제 세부 정보 : `); 
    }, []); 

    const handleOldChange = (event) => {
        setOldPrompt(event.target.value); // 상태 업데이트
    };

    const handleNewChange = (event) => {
        setNewPrompt(event.target.value); // 상태 업데이트
    };

    const onOldGenerate = async () => {
        setOldResultLoading(true)
        const basicInfo = {
            prompt: oldPrompt,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/test/old/content`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setOldResult(response.data.content); // 성공 시 서버에서 받은 데이터를 상태에 저장
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
        } finally {
            setOldResultLoading(false)
        }
    }

    const onNewGenerate = async () => {
        setNewResultLoading(true)
        const basicInfo = {
            prompt: newPrompt,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/generate/test/new/content`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setNewResult(response.data.content); // 성공 시 서버에서 받은 데이터를 상태에 저장
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
        } finally {
            setNewResultLoading(false)
        }
    }

    return (
        <div>
            <Header />
            <div className="flex">
                <dir className="mb:hidden">
                    <Aside />
                </dir>

                <main className="flex flex-col gap-4 min-h-screen p-4 overflow-x-hidden">
                    {/* 상단 텍스트 */}
                    <section className="w-full text-center">
                        <h4 className="text-lg font-bold">테스트를 위해 글자 수 제한 없음</h4>
                    </section>

                    {/* 좌우 영역 컨테이너 */}
                    <div className="flex flex-row gap-4 flex-1">
                        {/* 왼쪽 영역 */}
                        <div className="flex-1 flex flex-col gap-2">
                            <section>
                                <h4>기존 모델</h4>
                            </section>

                            <section className="w-full items-center">
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="내용을 입력하세요"
                                    rows="30"
                                    cols="50"
                                    value={oldPrompt} // 상태 값 연결
                                    onChange={handleOldChange} // 입력 값 변경 처리
                                ></textarea>
                            </section>

                            <section className="w-full items-center">
                                <button
                                    onClick={onOldGenerate}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    disabled={oldResultLoding}
                                >
                                    {oldResultLoding ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "생성"
                                    )}
                                </button>
                            </section>

                            {/* 생성된 답변 */}
                            <section className="w-full items-center">
                                <h4>생성된 결과</h4>
                                <div className="p-4 border rounded bg-gray-100">
                                    {oldResult ? (
                                        <p>{oldResult}</p>
                                    ) : (
                                        <p className="text-gray-500">결과가 없습니다. 내용을 입력하고 생성 버튼을 클릭하세요.</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* 오른쪽 영역 */}
                        <div className="flex-1 flex flex-col gap-2">
                            <section>
                                <h4>새 모델</h4>
                            </section>

                            <section className="w-full items-center">
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="내용을 입력하세요"
                                    rows="30"
                                    cols="50"
                                    value={newPrompt} // 상태 값 연결
                                    onChange={handleNewChange} // 입력 값 변경 처리
                                ></textarea>
                            </section>

                            <section className="w-full items-center">
                                <button
                                    onClick={onNewGenerate}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    disabled={newResultLoding}
                                >
                                    {newResultLoding ? (
                                        <div className="w-6 h-6 border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "생성"
                                    )}
                                </button>
                            </section>

                            {/* 생성된 답변 */}
                            <section className="w-full items-center">
                                <h4>생성된 결과</h4>
                                <div className="p-4 border rounded bg-gray-100">
                                    {newResult ? (
                                        <p>{newResult}</p>
                                    ) : (
                                        <p className="text-gray-500">결과가 없습니다. 내용을 입력하고 생성 버튼을 클릭하세요.</p>
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

export default TestNewGptModel;
