import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav>
                <ul className='flex p-4'>
                    <li className='px-4'>
                        <Link to="/">HOME</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/population">지역별 인구 및 범죄 정보</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/LocInfo">동별 상권 정보(유동인구, 매출, 세대수 등)</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/LocStore">지역 별 매장 정보</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/commercial">상권분석(openapi)</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/commercial2">상권분석(nicebizmap)</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/rising">뜨는 업종</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/location/context">지역 상황정보(날씨, 환경, 일출몰)</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Header;