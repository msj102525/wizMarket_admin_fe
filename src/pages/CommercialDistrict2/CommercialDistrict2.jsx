import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';

const CommercialDistrict2 = () => {
    const roadAddress = useSelector((state) => state.address.roadAddress);

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <Header />
            <div>Selected Address: {roadAddress}</div>
            <KakaoMap />
        </div>
    );
};

export default CommercialDistrict2;
