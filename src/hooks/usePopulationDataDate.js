import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePopulationDataDate = () => {
    const [dataDate, setDataDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/population/data/date`);
                // console.log(response.data)
                setDataDate(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { dataDate, loading, error };
};

