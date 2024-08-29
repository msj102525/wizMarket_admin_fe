import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PopulationData({ city_name, district_name, sub_district_name }) {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/population/get_population`, {
          city_name,
          district_name,
          sub_district_name
        });
        setPopulationData(response.data);
      } catch (error) {
        console.error('Error fetching population data:', error);
      }
    };

    fetchPopulationData();
  }, [city_name, district_name, sub_district_name]);

  if (!populationData) {
    return <p>Loading population data...</p>;
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">Population Data</h2>
      <ul>
        {populationData.map((value, index) => (
          <li key={index}>
            {`Column ${index + 1}: ${value}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopulationData;