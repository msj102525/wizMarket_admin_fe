import React, { useState } from 'react';
import LocInfoListSearchForm from './LocInfoListSearchForm.jsx'; // 같은 폴더 내에서 import

const LocInfoList = () => {
    // 리스트 또는 다른 데이터에 대한 상태를 관리하는 경우, 여기서 처리
    const [data, setData] = useState([]);

    return (
        <div>
            {/* 검색 폼 렌더링 */}
            <LocInfoListSearchForm />

            {/* 검색 결과 또는 리스트 렌더링 */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold">검색 결과</h2>
                <ul className="mt-4">
                    {/* 여기에 데이터를 리스트 형태로 렌더링할 수 있음 */}
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <li key={index} className="p-2 border-b border-gray-300">
                                {/* 각 데이터 항목을 표시 */}
                                {item.name}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">검색 결과가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default LocInfoList;
