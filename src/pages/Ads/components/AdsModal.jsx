import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor'

const AdsModal = ({ isOpen, onClose, storeBusinessNumber }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]); // 파일 업로드 기존 이미지
    const [imageLoding, setImageLoading] = useState(false)

    const [content, setContent] = useState('');
    const [contentLoading, setContentLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null); // 저장 상태
    const [message, setMessage] = useState(''); // 성공 또는 실패 메시지

    const [useOption, setUseOption] = useState("MMS");
    const [title, setTitle] = useState("매장 소개");

    const [modelOption, setModelOption] = useState('');
    const [imageSize, setImageSize] = useState(null);
    const [combineImageText, setCombineImageText] = useState(null)
    const [prompt, setPrompt] = useState('');
    const [gptRole, setGptRole] = useState('');
    const [detailContent, setDetailContent] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');


    const optionSizes = {
        MMS: { width: 263, height: 362 },
        "유튜브 썸네일": { width: 412, height: 232 },
        "인스타그램 스토리": { width: 412, height: 732 },
        "인스타그램 피드": { width: 412, height: 514 },
        "네이버 블로그": { width: 400, height: 400 },
        "배너": { width: 377, height: 377 },
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            if (isOpen) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/select/init/info`,
                        null,
                        { params: { store_business_number: storeBusinessNumber } }
                    );
                    const {
                        commercial_district_max_sales_day,
                        commercial_district_max_sales_time,
                        commercial_district_max_sales_m_age,
                        commercial_district_max_sales_f_age,
                    } = response.data;

                    const [maxSalesDay, maxSalesDayValue] = Array.isArray(commercial_district_max_sales_day)
                        ? commercial_district_max_sales_day
                        : [null, null];

                    const [maxSalesTime, maxSalesTimeValue] = Array.isArray(commercial_district_max_sales_time)
                        ? commercial_district_max_sales_time
                        : [null, null];

                    const [maxSalesMale, maxSalesMaleValue] = Array.isArray(commercial_district_max_sales_m_age)
                        ? commercial_district_max_sales_m_age
                        : [null, null];

                    const [maxSalesFemale, maxSalesFemaleValue] = Array.isArray(commercial_district_max_sales_f_age)
                        ? commercial_district_max_sales_f_age
                        : [null, null];

                    const updatedData = {
                        ...response.data,
                        maxSalesDay,
                        maxSalesDayValue,
                        maxSalesTime,
                        maxSalesTimeValue,
                        maxSalesMale,
                        maxSalesMaleValue,
                        maxSalesFemale,
                        maxSalesFemaleValue,
                    };


                    setData(updatedData);
                    setImageSize(null)
                    setUseOption("MMS")
                    setTitle("매장 소개")
                } catch (err) {
                    console.error("초기 데이터 로드 중 오류 발생:", err);
                    setError("초기 데이터 로드 중 오류가 발생했습니다.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchInitialData();
    }, [isOpen, storeBusinessNumber]);

    useEffect(() => {
        if (data) {
            const dayMap = {
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_SUN: "일요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_MON: "월요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_TUE: "화요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_WED: "수요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_THU: "목요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_FRI: "금요일",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_SAT: "토요일",
            };
            const timeMap = {
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_06_09: "06~09시",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_09_12: "09~12시",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_12_15: "12~15시",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_15_18: "15~18시",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_18_21: "18~21시",
                COMMERCIAL_DISTRICT_AVERAGE_SALES_PERCENT_21_24: "21~24시",
            };
            const maleMap = {
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_M_20S: "남자 20대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_M_30S: "남자 30대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_M_40S: "남자 40대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_M_50S: "남자 50대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_M_60_OVER: "남자 60대 이상",
            };
            const femaleMap = {
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_F_20S: "여자 20대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_F_30S: "여자 30대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_F_40S: "여자 40대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_F_50S: "여자 50대",
                COMMERCIAL_DISTRICT_AVG_CLIENT_PER_F_60_OVER: "여자 60대 이상",
            };
            setPrompt(`매장명 : ${data.store_name || "값 없음"}
주소 : ${data.road_name || "값 없음"}
업종 : ${data.detail_category_name || "값 없음"}
월 매출 : ${data.loc_info_average_sales_k * 1000 || 0}원
매출이 가장 높은 요일 : ${dayMap[data.maxSalesDay] || data.maxSalesDay || "값 없음"} - ${data.maxSalesDayValue || "값 없음"}%
매출이 가장 높은 시간대 : ${timeMap[data.maxSalesTime] || data.maxSalesTime || "값 없음"} - ${data.maxSalesTimeValue || "값 없음"}%
매출이 가장 높은 남성 연령대 : ${maleMap[data.maxSalesMale] || data.maxSalesMale || "값 없음"} - ${data.maxSalesMaleValue || "값 없음"}%
매출이 가장 높은 여성 연령대 : ${femaleMap[data.maxSalesFemale] || data.maxSalesFemale || "값 없음"} - ${data.maxSalesFemaleValue || "값 없음"}%
                                    `);

            setGptRole(`다음과 같은 내용을 바탕으로 온라인 광고 콘텐츠를 제작하려고 합니다.
아래 내용을 바탕으로 재미있고 키치한 내용으로 광고 문구를 작성해주세요.
- 매장명과 주소 하단에 포함
- 주제 세부정보 내용을 바탕으로 40자 내외로 작성
- 특수기호, 이모티콘은 빼주세요.`);

            setAiPrompt(`${data.detail_category_name} ${title || "값 없음"} 용`);
        }
    }, [data, useOption, title]);


    useEffect(() => {
        if (isOpen) {
            setSelectedImages([]);
            setTitle('');
            setContent('');
            setUseOption('');
            setModelOption('');
            setCombineImageText('');
            setDetailContent('');
            setSaveStatus(null); // 모달 열 때마다 저장 상태 초기화
        }
    }, [isOpen]);

    // 문구 생성
    const generateContent = async () => {
        // 입력값 유효성 검사
        if (!title.trim()) {
            setSaveStatus('error');
            setMessage('주제를 올바르게 입력해 주세요.');
            setLoading(false); // 로딩 상태 종료
            setTimeout(() => {
                setSaveStatus(null); // 상태 초기화
                setMessage(''); // 메시지 초기화
            }, 1500);
            return;
        }
        setContentLoading(true)
        const basicInfo = {
            gpt_role: gptRole,
            prompt: prompt,
            detail_content: detailContent
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/generate/content`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setContent(response.data.content); // 성공 시 서버에서 받은 데이터를 상태에 저장
            setSaveStatus('success'); // 성공 상태로 설정
            setMessage('생성이 성공적으로 완료되었습니다.');
            setContentLoading(false)
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setSaveStatus('error'); // 실패 상태로 설정
            setMessage('저장 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000); // 3초 후 메시지 숨기기
        }
    };

    // Base64 데이터를 Blob으로 변환하는 유틸리티 함수
    const base64ToBlob = (base64, contentType = "image/png") => {
        const byteCharacters = atob(base64.split(",")[1]);
        const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    // 이미지 생성
    const generateImage = async () => {
        setImageLoading(true)
        const basicInfo = {
            use_option: useOption,
            ai_model_option: modelOption,
            ai_prompt: aiPrompt,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/generate/image`,
                basicInfo,
                { headers: { 'Content-Type': 'application/json' } }
            );
            // 성공 시 받은 데이터 상태에 저장
            const { image: base64Image } = response.data; // AI로 생성된 Base64 이미지
            // Base64 -> Blob -> File 변환
            const aiImageBlob = base64ToBlob(base64Image);
            const aiImageFile = new File([aiImageBlob], "ai-generated-image.png", { type: "image/png" });
            // selectedImages에 추가
            setSelectedImages([
                {
                    type: "ai",
                    file: aiImageFile, // File 객체로 저장
                    previewUrl: URL.createObjectURL(aiImageBlob), // 미리보기 URL
                },
            ]);
            setSaveStatus('success'); // 성공 상태로 설정
            setMessage('생성이 성공적으로 완료되었습니다.');
            setImageLoading(false)
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setSaveStatus('error'); // 실패 상태로 설정
            setMessage('저장 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000); // 3초 후 메시지 숨기기
        }
    };

    const generateAds = async () => {
        // 입력값 유효성 검사
        if (!title.trim() || !content.trim()) {
            setSaveStatus('error');
            setMessage('주제 혹은 문구를 올바르게 입력해 주세요.');
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 1500);
            return;
        }

        const formData = new FormData();
        formData.append('store_name', data.store_name);
        formData.append('content', content);
        const resizedWidth = optionSizes[useOption]?.width || null;
        const resizedHeight = optionSizes[useOption]?.height || null;

        // 리사이즈된 이미지 생성 및 추가
        if (selectedImages.length > 0 && selectedImages[0].file) {
            const file = selectedImages[0].file;
            if (resizedWidth && resizedHeight) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = resizedWidth;
                    canvas.height = resizedHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);

                    // Canvas를 Blob으로 변환하여 FormData에 추가
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        formData.append('image', resizedFile);
                        formData.append('image_width', resizedWidth);
                        formData.append('image_height', resizedHeight);

                        // 서버로 전송
                        sendFormData(formData);
                    }, file.type);
                };
            } else {
                // 리사이즈 크기가 없으면 원본 이미지와 크기를 전송
                formData.append('image', file);
                formData.append('image_width', imageSize.width);
                formData.append('image_height', imageSize.height);

                // 서버로 전송
                sendFormData(formData);
            }
        } else {
            setSaveStatus('error');
            setMessage('이미지를 업로드하거나 AI로 생성해주세요.');
            return;
        }
    };

    const sendFormData = async (formData) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/combine/image/text`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setCombineImageText(response.data.image);
            setSaveStatus('success');
            setMessage('생성이 성공적으로 완료되었습니다.');
        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setSaveStatus('error');
            setMessage('저장 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000);
        }
    };

    const onSave = async () => {
        // 입력값 유효성 검사
        if (!title.trim() || !content.trim()) {
            setSaveStatus('error');
            setMessage('제목 및 내용을 올바르게 입력해 주세요.');
            setLoading(false); // 로딩 상태 종료
            setTimeout(() => {
                setSaveStatus(null); // 상태 초기화
                setMessage(''); // 메시지 초기화
            }, 1500);
            return;
        }

        const formData = new FormData();
        formData.append('store_business_number', storeBusinessNumber);
        formData.append('title', title);
        formData.append('content', content);

        selectedImages.forEach((image) => {
            formData.append('images', image.file);
        });

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/insert`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            // 성공 시 받은 데이터 상태에 저장
            setData(response.data); // 성공 시 서버에서 받은 데이터를 상태에 저장
            setSaveStatus('success'); // 성공 상태로 설정
            setMessage('저장이 성공적으로 완료되었습니다.');

            // 모달을 닫기 전에 잠시 메시지를 표시
            setTimeout(() => {
                onClose();
            }, 1500); // 2초 후 모달 닫기

        } catch (err) {
            console.error('저장 중 오류 발생:', err);
            setSaveStatus('error'); // 실패 상태로 설정
            setMessage('저장 중 오류가 발생했습니다.');
        } finally {
            setTimeout(() => {
                setSaveStatus(null);
                setMessage('');
            }, 3000); // 3초 후 메시지 숨기기
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-semibold">wizAd</h2>
                        <h5 className="text-l">간편한 고객 맞춤형 자동 AI광고 만들기</h5>
                        <h5 className="text-l">Create easy, personalized, automated AI ads</h5>
                    </div>
                    <button
                        onClick={onClose} // 모달 닫기 함수
                        className="text-2xl text-red-500 hover:text-red-800 focus:outline-none"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                {loading && <p>로딩 중...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {saveStatus === 'success' && (
                    <div className="p-3 mb-4 rounded bg-green-100 text-green-800">
                        {message}
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="p-3 mb-4 rounded bg-red-100 text-red-800">
                        {message}
                    </div>
                )}

                {data && (
                    <div className="w-full border border-black p-3">
                        <div className="mb-6">
                            <p className="text-xl">매장 명: {data.store_name} </p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg text-gray-700 mb-2">매장 세부 정보</label>
                            <textarea
                                rows={9}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="border border-gray-300 rounded w-full px-3 py-2"
                            />
                        </div>
                        <hr className="border-t border-black opacity-100" />
                        <div className="mb-6 mt-6">
                            <label className="block text-lg text-gray-700 mb-2">광고 채널 선택</label>
                            <select
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                value={useOption}
                                onChange={(e) => setUseOption(e.target.value)}
                            >
                                <option value="MMS">MMS (263x362)</option>
                                <option value="유튜브 썸네일">유튜브 썸네일 (412x232)</option>
                                <option value="인스타그램 스토리">인스타 스토리 (412x732)</option>
                                <option value="인스타그램 피드">인스타 피드 (412x514)</option>
                                <option value="네이버 블로그">네이버 블로그</option>
                                <option value="배너">배너 (377x377)</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    주제 선택:
                                </label>
                            </div>

                            {/* 주제 선택 셀렉트 */}
                            <select
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                <option value="매장 소개">매장 소개</option>
                                <option value="이벤트">이벤트</option>
                                <option value="상품 소개">상품 소개</option>
                                <option value="예약">예약</option>
                                <option value="시즌인사">시즌인사</option>
                                <option value="감사">감사</option>
                                <option value="공지">공지</option>
                                <option value="기타">기타</option>
                            </select>
                            {/* 기타 선택 시 추가 입력란 */}
                            {title === "기타" && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded w-full px-3 py-2"
                                        placeholder="기타 항목을 입력하세요"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">gpt 프롬프트</label>
                            <textarea
                                rows={5}
                                value={gptRole}
                                onChange={(e) => setGptRole(e.target.value)}
                                className="border border-gray-300 rounded w-full px-3 py-2"
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    주제 세부 정보:
                                </label>
                            </div>
                            <div className="relative">
                                <TextEditor
                                    content={detailContent}
                                    setContent={setDetailContent}
                                />
                            </div>
                        </div>
                        
                        <hr className="h-1 bg-black border-none"></hr>
                        <div className="mb-6 mt-6 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    생성 문구:
                                </label>
                                <button
                                    type="button"
                                    className="flex items-center px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300"
                                    onClick={generateContent}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                        />
                                    </svg>
                                    ai 생성
                                </button>
                            </div>
                            <div className="relative">
                                {contentLoading ? (
                                    // 로딩 중일 때 빈 공간 유지
                                    <div className="h-[100px] flex items-center justify-center">
                                        <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    // 로딩이 끝나면 TextEditor 표시
                                    <textarea
                                        rows={5}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="border border-gray-300 rounded w-full px-3 py-2"
                                    />
                                )}
                            </div>
                        </div>
                        <hr className="h-1 bg-black border-none"></hr>
                        <div className="mb-6 mt-6">
                            <p className='text-2xl font-bold'>이미지</p>
                        </div>
                        <div className="mb-6 mt-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">모델</label>
                            <select
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                value={modelOption}
                                onChange={(e) => setModelOption(e.target.value)}
                            >
                                <option value="">그림 생성 모델을 선택하세요</option>
                                <option value="basic">기본</option>
                                <option value="poster">영화 포스터</option>
                                <option value="food">음식 특화</option>
                                <option value="dalle">달리3(GPT)</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">ai 전달 내용</label>
                            <textarea
                                rows={3}
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                className="border border-gray-300 rounded w-full px-3 py-2"
                            />
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-lg font-semibold text-gray-700 mb-2">이미지 선택</label>
                                <button
                                    type="button"
                                    className="flex items-center px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300"
                                    onClick={generateImage}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                        />
                                    </svg>
                                    ai 생성
                                </button>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                onChange={(e) => {
                                    if (!useOption) {
                                        e.target.value = null; // 선택된 파일 초기화
                                        return;
                                    }
                                    const file = e.target.files[0];
                                    if (file) {
                                        const img = new Image();
                                        img.src = URL.createObjectURL(file);
                                        img.onload = () => {
                                            setSelectedImages([
                                                {
                                                    type: "file",
                                                    file,
                                                    previewUrl: img.src,
                                                    width: img.width,
                                                    height: img.height,
                                                },
                                            ]);
                                        };
                                    }
                                }}
                            />
                        </div>
                        <div className="mt-4 flex justify-center">
                            {imageLoding ? (
                                <div className="flex justify-center items-center w-48 h-48">
                                    <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                selectedImages.length > 0 && (
                                    <div className="mt-4 flex justify-center">
                                        <div>
                                            {/* 미리보기 이미지 */}
                                            <img
                                                src={selectedImages[0]?.previewUrl} // 미리보기 URL 사용
                                                alt="미리보기"
                                                style={{
                                                    width: `${optionSizes[useOption]?.width || 'auto'}px`, // useOption에 따른 가로 크기
                                                    height: `${optionSizes[useOption]?.height || 'auto'}px`, // useOption에 따른 세로 크기
                                                    objectFit: "contain", // 이미지 왜곡 방지
                                                }}
                                                className="rounded"
                                            />
                                            {/* 삭제 버튼 */}
                                            <button
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                onClick={() => setSelectedImages([])}
                                            >
                                                &times;
                                            </button>
                                            {/* 크기 정보 표시 */}
                                            {imageSize && (
                                                <p className="mt-2 text-center text-sm text-gray-600">
                                                    원본 크기: {imageSize.width} x {imageSize.height} px
                                                </p>
                                            )}
                                            <p className="mt-2 text-center text-sm text-blue-600">
                                                리사이즈된 크기: {optionSizes[useOption]?.width} x {optionSizes[useOption]?.height} px
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={generateAds}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                생성
                            </button>
                        </div>
                        {/* 이미지 결과물 영역 */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">결과물</label>
                            <div className="max-h-screen overflow-auto">
                                {combineImageText ? (
                                    <img src={combineImageText} alt="결과 이미지" className="h-auto" />
                                ) : (
                                    <p className="text-center text-gray-500 p-4"></p>
                                )}
                            </div>
                        </div>

                    </div>
                )}
                <div className="flex justify-between items-center mt-6">
                    {/* 좌측 닫기 버튼 */}
                    <div>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                        >
                            취소
                        </button>
                    </div>
                    {/* 우측 저장 버튼 */}
                    <div className="flex space-x-4">
                        <button
                            onClick={onSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsModal;
