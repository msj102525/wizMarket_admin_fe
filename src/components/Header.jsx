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
                        <Link to="/monthPop">월별 인구 DB 저장</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/getPop">월별 인구 DB 보기</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/testOpenUp">동별 상권 정보(유동인구, 매출, 세대수 등)</Link>
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
                        <Link to="/weather">날씨</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Header;