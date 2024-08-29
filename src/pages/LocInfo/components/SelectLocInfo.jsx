import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectLocInfo = ({ locationName }) => {
  const [locData, setLocData] = useState(null);

  useEffect(() => {
    if (locationName) {
      handleSubmit(locationName); // 위치 정보가 변경될 때마다 서버에 요청
    }
  }, [locationName]);

  const handleSubmit = async (location) => {
    if (!location) return;

    const locationParts = location.split(' ');

    let city_name, district_name, sub_district_name;

    if (locationParts.length === 4) {
      city_name = locationParts[0];       // "경기도"
      district_name = locationParts[1];   // "안양시"
      sub_district_name = locationParts[3]; // "평안동"
    } else if (locationParts.length === 3) {
      city_name = locationParts[0];       // "서울특별시"
      district_name = locationParts[1];   // "영등포구"
      sub_district_name = locationParts[2]; // "영등포동"
    } else if (locationParts.length === 2) {
      city_name = locationParts[0];       // "세종특별시"
      district_name = locationParts[0];   // "세종특별시"
      sub_district_name = locationParts[1]; // "조치원"
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/loc_info/get_loc_info`, {
        city_name,
        district_name,
        sub_district_name,
      });
      setLocData(response.data);
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold text-center mt-4">{locationName}</h1>

      {locData && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">해당 지역 정보</h2>
          <ul>
            <li><strong>매장:</strong> {locData[4]}</li>
            <li><strong>유동인구:</strong> {locData[5]}</li>
            <li><strong>매출:</strong> {locData[6]}</li>
            <li><strong>직장인구:</strong> {locData[7]}</li>
            <li><strong>수입:</strong> {locData[8]}</li>
            <li><strong>소비:</strong> {locData[9]}</li>
            <li><strong>세대수:</strong> {locData[10]}</li>
            <li><strong>거주자:</strong> {locData[11]}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectLocInfo;
