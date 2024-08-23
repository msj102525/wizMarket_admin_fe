import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import RisingBusinessList from './components/RisingBusinessList';



const RisingBusiness = () => {
    const administrativeAddress = useSelector((state) => state.address.administrativeAddress);
    const roadAddress = useSelector((state) => state.address.roadAddress);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const subStringAdress = (address) => {
        console.log(address);
        const parts = address.split(' ');

        let city = '';
        let subDistrict = '';

        if (parts.length >= 3) {
            city = parts[0];
            subDistrict = parts.slice(2).join(' ');
        } else if (parts.length === 2) {
            city = parts[0];
            subDistrict = parts[2];
        }

        return {
            city,
            subDistrict
        };
    };



    useEffect(() => {
        const fetchData = async () => {
            if (!administrativeAddress) return;

            setLoading(true);
            setError(null);

            const { city, subDistrict } = subStringAdress(administrativeAddress);
            console.log(city, subDistrict);

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/rising`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        city: city,
                        sub_district: subDistrict,
                    },
                });
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (administrativeAddress) {
            fetchData();
        }
    }, [administrativeAddress]);

    return (
        <div>
            <Header />
            <div className="px-6">
                <div>도로명 주소: {roadAddress}</div>
                <div>행정동 주소: {administrativeAddress}</div>

                <div className="flex gap-2">
                    <div className="">
                        <KakaoMap />
                    </div>
                    <div className="">
                        <p>지도중심기준 지역 뜨는 업종</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <RisingBusinessList data={data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RisingBusiness;
