import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopulationData from './PopulationData';
import CrimeData from './CrimeData';

function LocationSelector() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subDistricts, setSubDistricts] = useState([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [startMonth, setStartMonth] = useState('1');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/population/get_cities`);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = async (event) => {
    const city_name = event.target.value;
    setSelectedCity(city_name);
    setSelectedDistrict('');
    setSubDistricts([]);

    if (city_name) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/population/get_districts`, { city_name });
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = async (event) => {
    const district_name = event.target.value;
    setSelectedDistrict(district_name);
    setSelectedSubDistrict('');

    if (district_name) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/population/get_sub_districts`, { district_name });
        setSubDistricts(response.data);
      } catch (error) {
        console.error('Error fetching sub-districts:', error);
      }
    } else {
      setSubDistricts([]);
    }
  };

  const handleSubDistrictChange = (event) => {
    setSelectedSubDistrict(event.target.value);
  };

  const handleStartMonthChange = (event) => {
    setStartMonth(event.target.value);
  };

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // 월을 1 증가시켜서 전달해야 합니다.
  };

  const formatYearMonthDay = (year, month) => {
    const lastDay = getLastDayOfMonth(year, month);
    return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-full mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">시/도:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">시/군/구:</label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedCity}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">-</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">읍/면/동:</label>
        <select
          value={selectedSubDistrict}
          onChange={handleSubDistrictChange}
          disabled={!selectedDistrict}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">-</option>
          {subDistricts.map((sub_district) => (
            <option key={sub_district} value={sub_district}>
              {sub_district}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">월:</label>
        <select
          value={startMonth}
          onChange={handleStartMonthChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[...Array(7).keys()].map(month => (
            <option key={month + 1} value={month + 1}>{month + 1}월</option>
          ))}
        </select>
      </div>

      {selectedSubDistrict && (
      <div className="flex justify-between space-x-4">
        <div className="w-1/2">
          <PopulationData 
            city_name={selectedCity}
            district_name={selectedDistrict}
            sub_district_name={selectedSubDistrict}
            start_year_month={formatYearMonthDay(2024, startMonth)}
          />
        </div>
        <div className="w-1/2">
          <CrimeData 
            city_name={selectedCity}
            start_year_month={formatYearMonthDay(2024, startMonth)}
          />
        </div>
      </div>
    )}
    </div>
  );
}

export default LocationSelector;
