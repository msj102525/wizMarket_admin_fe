import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FastAPIRequest = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Message from FastAPI:</h1>
            <p>{message}</p>
        </div>
    );
};

export default FastAPIRequest;
