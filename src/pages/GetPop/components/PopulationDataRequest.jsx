import React, { useState } from 'react';
import axios from 'axios';

const PopulationDataRequest = ({ onFetchData }) => {
  const [formData, setFormData] = useState({
    srchFrYm: '202210',
    srchToYm: '202210',
    region: '',
    subRegion: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/getmonthpop', formData);
      onFetchData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      onFetchData(null);
    }
  };

  const generateDateOptions = () => {
    const startYear = 2022;
    const startMonth = 10;
    const endYear = 2024;
    const endMonth = 7;
    const options = [];

    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startMonth : 1;
      const monthEnd = year === endYear ? endMonth : 12;

      for (let month = monthStart; month <= monthEnd; month++) {
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        options.push(`${year}${monthStr}`);
      }
    }

    return options;
  };

  const dateOptions = generateDateOptions();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Population Data Request</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold">Search From (YYYYMM):</label>
          <select
            name="srchFrYm"
            value={formData.srchFrYm}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {dateOptions.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Search To (YYYYMM):</label>
          <select
            name="srchToYm"
            value={formData.srchToYm}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {dateOptions.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Region:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Subregion:</label>
          <input
            type="text"
            name="subRegion"
            value={formData.subRegion}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PopulationDataRequest;
