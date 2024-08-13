import axios from 'axios';
import Header from '../../components/Header';
import { useEffect, useState, useCallback } from 'react';
import CommercialDistrictList from './components/CommercialDistrictList';
import KakaoMap from '../../components/KakaoMap';

const CommercialDistrict = () => {
    const [data, setData] = useState([]);
    const [lastYearDate, setLastYearDate] = useState('');

    useEffect(() => {
        const now = new Date();
        const formattedDate = formatDate(now);
        setLastYearDate(formattedDate);
    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const lastYear = year - 1;
        const month = date.getMonth() + 1; 
        const quarter = Math.ceil(month / 3);

        return `${lastYear}${quarter}`;
    };

    const responseData = useCallback(async () => {
        try {
            const { data: { VwsmAdstrdNcmCnsmpW: { row } } } = await axios.get(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_OPEN_DATA_API_KEY}/json/VwsmAdstrdNcmCnsmpW/0/999/`);

            const filtered = row.filter(item => item.STDR_YYQU_CD === lastYearDate);
            setData(filtered);

        } catch (error) {
            console.error(error);
        }
    }, [lastYearDate]);

    useEffect(() => {
        if (lastYearDate) {
            responseData();
        }
    }, [lastYearDate, responseData]);

    console.log(data.length)

    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold underline">
                상권분석
            </h1>
            <KakaoMap />
            <CommercialDistrictList data={data} />
        </div>
    );
}

export default CommercialDistrict;
