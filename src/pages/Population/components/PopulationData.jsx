import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PopulationData({ city_name, district_name, sub_district_name, start_year_month, end_year_month }) {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/population/get_population`, {
          city_name,
          district_name,
          sub_district_name,
          start_year_month,
          end_year_month
        });
        setPopulationData(response.data);
        console.log(typeof(response.data))
        console.log(response.data)
        
      } catch (error) {
        console.error('Error fetching population data:', error);
      }
    };

    fetchPopulationData();
  }, [city_name, district_name, sub_district_name, start_year_month, end_year_month]);

  if (!populationData) {
    return <p>Loading population data...</p>;
  }

  const keys = [
    'population_id', 'city_id', 'district_id', 'sub_district_id', 'gender_id', 'admin_code', 'reference_date',
    'city_name', 'district_name', 'sub_district_name', 'total_population',
    'male_population', 'female_population', 
    'age_0', 'age_1', 'age_2', 'age_3', 'age_4', 'age_5', 'age_6', 'age_7', 'age_8', 'age_9',
    'age_10', 'age_11', 'age_12', 'age_13', 'age_14', 'age_15', 'age_16', 'age_17', 'age_18', 'age_19',
    'age_20', 'age_21', 'age_22', 'age_23', 'age_24', 'age_25', 'age_26', 'age_27', 'age_28', 'age_29',
    'age_30', 'age_31', 'age_32', 'age_33', 'age_34', 'age_35', 'age_36', 'age_37', 'age_38', 'age_39',
    'age_40', 'age_41', 'age_42', 'age_43', 'age_44', 'age_45', 'age_46', 'age_47', 'age_48', 'age_49',
    'age_50', 'age_51', 'age_52', 'age_53', 'age_54', 'age_55', 'age_56', 'age_57', 'age_58', 'age_59',
    'age_60', 'age_61', 'age_62', 'age_63', 'age_64', 'age_65', 'age_66', 'age_67', 'age_68', 'age_69',
    'age_70', 'age_71', 'age_72', 'age_73', 'age_74', 'age_75', 'age_76', 'age_77', 'age_78', 'age_79',
    'age_80', 'age_81', 'age_82', 'age_83', 'age_84', 'age_85', 'age_86', 'age_87', 'age_88', 'age_89',
    'age_90', 'age_91', 'age_92', 'age_93', 'age_94', 'age_95', 'age_96', 'age_97', 'age_98', 'age_99',
    'age_100', 'age_101', 'age_102', 'age_103', 'age_104', 'age_105', 'age_106', 'age_107', 'age_108', 'age_109',
    'age_110'
  ];

  const maleData = populationData[0].reduce((obj, value, index) => {
    obj[keys[index]] = value;
    return obj;
  }, {});

  const femaleData = populationData[1].reduce((obj, value, index) => {
    obj[keys[index]] = value;
    return obj;
  }, {});

  // Function to render each block of age data (e.g., 0-9, 10-19, etc.)
  const renderAgeBlock = (startAge, endAge) => {
    return (
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {Array.from({ length: endAge - startAge + 1 }, (_, i) => (
              <th key={i} className="px-4 py-2">{startAge + i}세</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">남성</td>
            {Array.from({ length: endAge - startAge + 1 }, (_, i) => (
              <td key={i} className="border px-4 py-2">{maleData[`age_${startAge + i}`]}명</td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2">여성</td>
            {Array.from({ length: endAge - startAge + 1 }, (_, i) => (
              <td key={i} className="border px-4 py-2">{femaleData[`age_${startAge + i}`]}명</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">{maleData.city_name} {maleData.district_name} {maleData.sub_district_name} {maleData.reference_date.slice(0, -3)} 월 인구</h2>
      <h3 className="text-l font-bold mb-4">총 인구 : {maleData.total_population}명, 남성 인구 : {maleData.male_population}명, 여성 인구 : {femaleData.female_population}명 </h3>
      {renderAgeBlock(0, 9)}
      {renderAgeBlock(10, 19)}
      {renderAgeBlock(20, 29)}
      {renderAgeBlock(30, 39)}
      {renderAgeBlock(40, 49)}
      {renderAgeBlock(50, 59)}
      {renderAgeBlock(60, 69)}
      {renderAgeBlock(70, 79)}
      {renderAgeBlock(80, 89)}
      {renderAgeBlock(90, 99)}
      {renderAgeBlock(100, 110)}
    </div>
  );
}

export default PopulationData;
