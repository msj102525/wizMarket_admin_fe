import React, { useState } from 'react';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';

const CommercialDistrict2 = () => {
    const [address, setAddress] = useState("");

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    return (
        <div>
            <Header />
            <div>Selected Address: {address}</div>
            <KakaoMap onAddressChange={handleAddressChange} />

        </div>
    );
};

export default CommercialDistrict2;
