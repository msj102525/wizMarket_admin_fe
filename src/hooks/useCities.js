import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCities = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/city/locations`);
                setCities(response.data.cities);
                setDistricts(response.data.districts);
                setSubDistricts(response.data.sub_districts);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const filteredDistricts = districts.filter(d => d[1] === Number(city));
    const filteredSubDistricts = subDistricts.filter(sd => sd[1] === Number(district));

    return {
        cities,
        districts: filteredDistricts,
        subDistricts: filteredSubDistricts,
        city,
        district,
        subDistrict,
        setCity,
        setDistrict,
        setSubDistrict,
    };
};
