import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import admmCdData from '../../data/admmCdData.xlsx'; 

const PopulationDataRequest = () => {
  const [formData, setFormData] = useState({
    srchFrYm: new Date().toISOString().slice(0, 7).replace('-', ''),  // 현재 년월로 설정
    srchToYm: new Date().toISOString().slice(0, 7).replace('-', '')  // 현재 년월로 설정
  });

  const [admmCdList, setAdmmCdList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmmCdData = async () => {
      try {
        const response = await fetch(admmCdData);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const admmCdList = jsonData.map(row => ({ admmCd: row[0], lv: row[1] }));
        setAdmmCdList(admmCdList);
      } catch (error) {
        console.error('Error reading the Excel file:', error);
      }
    };

    fetchAdmmCdData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchPopulationData = async () => {
    const url = 'https://apis.data.go.kr/1741000/admmSexdAgePpltn/selectAdmmSexdAgePpltn';
    const serviceKey = '1jueoVRRiok5ir7CFXToGLdKxxO8VbivsiTBpHUYLYBa+AISMUtKyXEXemXk1a275576TI/ai1e2yMlI+RNCWA=='; // 실제 서비스 키로 변경 필요

    try {
      for (const { admmCd, lv } of admmCdList) {
        const params = {
          ...formData,
          admmCd,
          lv,
          serviceKey,
          regSeCd: '1',
          type: 'JSON',
          numOfRows: '100',
          pageNo: '1'
        };

        const response = await axios.get(url, { params });
        const items = response.data.Response.items.item;
        console.log(items);

        // 데이터를 FastAPI 서버로 전송
        await sendItemsToServer(items);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const sendItemsToServer = async (items) => {
    try {
      const response = await axios.post('http://localhost:8000/receive-items', {
        items: items
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Population Data Request</h1>
      <form className="space-y-4">
        
        <div>
          <label className="block font-semibold">Search From (YYYYMM):</label>
          <input
            type="text"
            name="srchFrYm"
            value={formData.srchFrYm}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={fetchPopulationData}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Fetch Data
        </button>
        
      </form>
      
    </div>
  );
};

export default PopulationDataRequest;
