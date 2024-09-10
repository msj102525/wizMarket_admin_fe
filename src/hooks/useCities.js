import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const useCities = () => {
    const [cities, setCities] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allSubDistricts, setAllSubDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/city/locations`);
                setCities(response.data.cities);
                setAllDistricts(response.data.districts);
                setAllSubDistricts(response.data.sub_districts);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const districts = useMemo(() => {
        return city ? allDistricts.filter(d => d[1] === Number(city)) : allDistricts;
    }, [allDistricts, city]);

    const subDistricts = useMemo(() => {
        return district ? allSubDistricts.filter(sd => sd[1] === Number(district)) : allSubDistricts;
    }, [allSubDistricts, district]);

    return {
        cities,
        districts,
        subDistricts,
        city,
        district,
        subDistrict,
        setCity,
        setDistrict,
        setSubDistrict,
    };
};