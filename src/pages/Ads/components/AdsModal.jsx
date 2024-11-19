import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextEditor from '../../../components/TextEditor'

const AdsModal = ({ isOpen, onClose, storeBusinessNumber }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageLoding, setImageLoading] = useState(false)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentLoading, setContentLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null); // 저장 상태
    const [message, setMessage] = useState(''); // 성공 또는 실패 메시지
    const [useOption, setUseOption] = useState('');
    const [modelOption, setModelOption] = useState('');
    const [imageSize, setImageSize] = useState(null);
    const [combineImageText, setCombineImageText] = useState(null)
    const [prompt, setPrompt] = useState('');
    const [gptRole, setGptRole] = useState('');
    const [detailContent, setDetailContent] = useState('');


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
    
                    setData(updatedData);
    
                    setPrompt(`매장명 : ${updatedData.store_name || "값 없음"}
주소 : ${updatedData.road_name || "값 없음"}
업종 : ${updatedData.detail_category_name || "값 없음"}
채널 : ${useOption ? `${useOption} 용 이미지` : "값 없음"}
용도 : ${title ? `${title} 용` : "값 없음"}
월 매출 : ${updatedData.loc_info_average_sales_k * 1000 || 0}원
매출이 가장 높은 요일 : ${dayMap[updatedData.maxSalesDay] || updatedData.maxSalesDay || "값 없음"} - ${updatedData.maxSalesDayValue || "값 없음"}%
매출이 가장 높은 시간대 : ${timeMap[updatedData.maxSalesTime] || updatedData.maxSalesTime || "값 없음"} - ${updatedData.maxSalesTimeValue || "값 없음"}%
매출이 가장 높은 남성 연령대 : ${maleMap[updatedData.maxSalesMale] || updatedData.maxSalesMale || "값 없음"} - ${updatedData.maxSalesMaleValue || "값 없음"}%
매출이 가장 높은 여성 연령대 : ${femaleMap[updatedData.maxSalesFemale] || updatedData.maxSalesFemale || "값 없음"} - ${updatedData.maxSalesFemaleValue || "값 없음"}%
                    `);
                    setGptRole('다음과 같은 내용을 바탕으로 온라인 광고 콘텐츠를 제작하려고 합니다.\n내용에 부합하는 광고문구를 30자 내외로 작성해주세요.\n<br> 태그를 사용해 줄 나눔해서 작성해주세요.')
                } catch (err) {
                    console.error("초기 데이터 로드 중 오류 발생:", err);
                    setError("초기 데이터 로드 중 오류가 발생했습니다.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchInitialData();
    }, [isOpen, storeBusinessNumber, useOption, title]);
    
    useEffect(() => {
        if (isOpen) {
            setSelectedImages([]);
            setTitle('');
            setContent('');
            setUseOption('');
            setModelOption('');
            setCombineImageText('');
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
            gpt_role : gptRole,
            prompt: prompt,
            detail_content: detailContent
        };
        console.log(basicInfo)
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
            title: title,
            store_name: data.store_name,
            detail_category_name: data.detail_category_name,
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
            setLoading(false); // 로딩 상태 종료
            setTimeout(() => {
                setSaveStatus(null); // 상태 초기화
                setMessage(''); // 메시지 초기화
            }, 1500);
            return;
        }
        const formData = new FormData();
        formData.append('store_name', data.store_name);
        formData.append('content', content);
        formData.append('image_width', imageSize.width);
        formData.append('image_height', imageSize.height);
        if (selectedImages.length > 0 && selectedImages[0].file) {
            formData.append("image", selectedImages[0].file);
        } else {
            setSaveStatus("error");
            setMessage("이미지를 업로드하거나 AI로 생성해주세요.");
            return;
        }
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/ads/combine/image/text`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            // 성공 시 받은 데이터 상태에 저장
            setCombineImageText(response.data.image); // Base64 이미지 설정
            setSaveStatus('success'); // 성공 상태로 설정
            setMessage('생성이 성공적으로 완료되었습니다.');
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
                <h2 className="text-2xl font-semibold mb-4">ADS 등록</h2>

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
                    <div className="w-full">
                        <div className="mb-6">
                            <p className="text-xl">매장 명: {data.store_name} - {data.road_name}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">채널 선택</label>
                            <select
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                value={useOption}
                                onChange={(e) => setUseOption(e.target.value)}
                            >
                                <option value="">형태를 선택하세요</option>
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
                                <option value="">주제를 선택하세요</option>
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
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">gpt 프롬프트</label>
                            <textarea
                                rows={3}
                                value = {gptRole}
                                onChange={(e) => setGptRole(e.target.value)} 
                                className="border border-gray-300 rounded w-full px-3 py-2"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">전달 내용</label>
                            <textarea
                                rows={10}
                                value = {prompt}
                                onChange={(e) => setPrompt(e.target.value)} 
                                className="border border-gray-300 rounded w-full px-3 py-2"
                            />
                        </div>

                        <div className="mb-6 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    문구:
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
                                    <TextEditor
                                        content={content}
                                        setContent={setContent}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
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
                                    <div className="relative">
                                        <img
                                            src={selectedImages[0].previewUrl}
                                            alt="미리보기"
                                            className="w-full h-full object-cover rounded"
                                            onLoad={(e) => {
                                                const imgElement = e.target;
                                                setImageSize({
                                                    width: imgElement.naturalWidth,
                                                    height: imgElement.naturalHeight,
                                                });
                                            }}
                                        />
                                        <button
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            onClick={() => setSelectedImages([])}
                                        >
                                            &times;
                                        </button>
                                        {imageSize && (
                                            <p className="mt-2 text-center text-sm text-gray-600">
                                                Size: {imageSize.width} x {imageSize.height} px
                                            </p>
                                        )}
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
                            <div className="border border-gray-300 rounded p-0 max-h-screen overflow-auto">
                                {combineImageText ? (
                                    <img src={combineImageText} alt="결과 이미지" className="w-full h-auto" />
                                ) : (
                                    <p className="text-center text-gray-500 p-4">이미지를 생성 중입니다...</p>
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
