import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchPopulationData = () => {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [populationData, setPopulationData] = useState([]); // 조회된 데이터를 저장하기 위한 상태

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/population/get_regions`);
                const regionsData = response.data;
      
                // 객체 형식으로 변환하지 않고 바로 배열을 유지하는 경우
                setRegions(regionsData);
      
                // CITY 목록을 추출
                const uniqueCities = [...new Set(regionsData.map(region => region[0]))];
                setCities(uniqueCities);
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };
      
        fetchRegions();
    }, []);

    // 선택된 CITY에 따라 DISTRICT 목록 필터링
    useEffect(() => {
        if (selectedCity) {
            const filteredDistricts = regions
                .filter(region => region[0] === selectedCity)
                .map(region => region[1]);
            setDistricts([...new Set(filteredDistricts)]);
            setSelectedDistrict('');
            setSelectedSubDistrict('');
            setSubDistricts([]);
        } else {
            setDistricts([]);
            setSelectedDistrict('');
            setSubDistricts([]);
            setSelectedSubDistrict('');
        }
    }, [selectedCity, regions]);

    // 선택된 DISTRICT에 따라 SUB_DISTRICT 목록 필터링
    useEffect(() => {
        if (selectedDistrict) {
            const filteredSubDistricts = regions
                .filter(region => region[0] === selectedCity && region[1] === selectedDistrict)
                .map(region => region[2]);
            setSubDistricts([...new Set(filteredSubDistricts)]);
            setSelectedSubDistrict('');
        } else {
            setSubDistricts([]);
            setSelectedSubDistrict('');
        }
    }, [selectedDistrict, selectedCity, regions]);

    const fetchPopulationData = async () => {
        const requestData = {
            start_date: parseInt(startDate, 10), // 시작 연월
            end_date: parseInt(endDate, 10),     // 종료 연월
            city: selectedCity,
            district: selectedDistrict,
            sub_district: selectedSubDistrict,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/population/get_population`,
                requestData
            );
            setPopulationData(response.data);
        } catch (error) {
            console.error('Error fetching population data:', error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {/* 시작 연월 입력 */}
                <input
                    type="text"
                    placeholder="Start Year-Month (YYYYMM)"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                />

                {/* 종료 연월 입력 */}
                <input
                    type="text"
                    placeholder="End Year-Month (YYYYMM)"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                />

                {/* CITY 선택 */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>

                {/* DISTRICT 선택 */}
                <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                    disabled={!selectedCity}
                >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>{district}</option>
                    ))}
                </select>

                {/* SUB-DISTRICT 선택 */}
                <select
                    value={selectedSubDistrict}
                    onChange={(e) => setSelectedSubDistrict(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full"
                    disabled={!selectedDistrict}
                >
                    <option value="">Select Sub-District</option>
                    {subDistricts.map((subDistrict) => (
                        <option key={subDistrict} value={subDistrict}>{subDistrict}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={fetchPopulationData}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
            >
                조회
            </button>

            {/* 조회된 데이터를 테이블로 표시 */}
            {populationData.length > 0 && (
                <table className="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr>

                            <th className="py-2 px-4 border-b">GENDER</th>
                            <th className="py-2 px-4 border-b">0-9</th>
                            <th className="py-2 px-4 border-b">10-19</th>
                            <th className="py-2 px-4 border-b">20-29</th>
                            <th className="py-2 px-4 border-b">30-39</th>
                            <th className="py-2 px-4 border-b">40-49</th>
                            <th className="py-2 px-4 border-b">50-59</th>
                            <th className="py-2 px-4 border-b">60-69</th>
                            <th className="py-2 px-4 border-b">70-79</th>
                            <th className="py-2 px-4 border-b">80-89</th>
                            <th className="py-2 px-4 border-b">90-99</th>
                            <th className="py-2 px-4 border-b">100+</th>
                            <th className="py-2 px-4 border-b">TOTAL</th>
                            <th className="py-2 px-4 border-b">MALETOTAL</th>
                            <th className="py-2 px-4 border-b">FEMALETOTAL</th>
                            <th className="py-2 px-4 border-b">YEAR_MONTH</th>

                        </tr>
                    </thead>
                    <tbody>
                        {populationData.map((entry) => (
                            <tr key={entry.POP_ID}>
                                
                                <td className="py-2 px-4 border-b text-center">{entry.GENDER}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO09}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO1019}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO2029}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO3039}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO4049}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO5059}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO6069}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO7079}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO8089}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TO9099}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.OVER100}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.TOTAL}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.MALETOTAL}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.FEMALETOTAL}</td>
                                <td className="py-2 px-4 border-b text-right">{entry.Y_M}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FetchPopulationData;
