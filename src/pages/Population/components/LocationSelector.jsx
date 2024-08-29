import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopulationData from './PopulationData';

function LocationSelector() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subDistricts, setSubDistricts] = useState([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/population/get_cities`);
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
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/population/get_districts`, { city_name });
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
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/population/get_sub_districts`, { district_name });
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

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Location Selector</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">시/도:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select City</option>
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
          <option value="">Select District</option>
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
          <option value="">Select Sub-District</option>
          {subDistricts.map((sub_district) => (
            <option key={sub_district} value={sub_district}>
              {sub_district}
            </option>
          ))}
        </select>
      </div>

      {selectedSubDistrict && (
        <PopulationData 
          city_name={selectedCity}
          district_name={selectedDistrict}
          sub_district_name={selectedSubDistrict} 
        />
      )}
    </div>
  );
}

export default LocationSelector;
