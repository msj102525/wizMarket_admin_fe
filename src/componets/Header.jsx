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
                        <Link to="/info">행정 구역 별 맵</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/monthPop">월별 인구 크롤링</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/commercial">상권분석</Link>
                    </li>
                    <li className='px-4'>
                        <Link to="/commercial2">상권분석2</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Header;