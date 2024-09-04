import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import RisingBusinessList from './components/RisingBusinessList';
import RisingSearchForm from './components/RisingSearchForm';


const RisingBusiness = () => {
    const kakaoAddressResult = useSelector((state) => state.address.kakaoAddressResult);
    const prevKakaoAddressResult = useRef(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            if (!kakaoAddressResult) return;

            setLoading(true);
            setError(null);

            const { region_1depth_name: city, region_2depth_name: fullDistrict, region_3depth_name: subDistrict } = kakaoAddressResult;
            const district = fullDistrict.split(' ')[0];

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/rising`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: {
                        city: city,
                        district: district,
                        sub_district: subDistrict,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (
            !prevKakaoAddressResult.current ||
            prevKakaoAddressResult.current.region_3depth_name !== kakaoAddressResult.region_3depth_name ||
            prevKakaoAddressResult.current.x !== kakaoAddressResult.x ||
            prevKakaoAddressResult.current.y !== kakaoAddressResult.y
        ) {
            fetchData();
            prevKakaoAddressResult.current = kakaoAddressResult;
        }
    }, [kakaoAddressResult]);


    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="gap-2">
                    <section className="div-underline p-2">
                        <p>뜨는 업종</p>
                    </section>
                    <section className="flex">
                        <KakaoMap />
                        <RisingSearchForm />
                    </section>
                    <section className="">
                        <p>지도중심기준 지역 뜨는 업종</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <RisingBusinessList data={data} />
                        )}
                    </section>
                </main>
            </div>


        </div>
    );
};

export default RisingBusiness;
