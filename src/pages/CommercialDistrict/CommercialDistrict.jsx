import axios from 'axios';
import Header from '../../componets/Header';
import { useEffect, useState } from 'react';
import CommercialDistrictList from './components/CommercialDistrictList';
import KakaoMap from '../CommercialDistrict2/components/KakaoMap';

const CommercialDistrict = () => {
    const [data, setData] = useState([]);

    const responseData = async () => {

        try {
            const { data: { VwsmAdstrdNcmCnsmpW: { row } } } =  await axios.get(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_OPEN_DATA_API_KEY}/json/VwsmAdstrdNcmCnsmpW/0/5/`);
            console.log(row);
            setData(row);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        responseData();
    }, [])

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
