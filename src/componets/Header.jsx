import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Go to main</Link>
                </li>
                <li>
                    <Link to="/map">지역 인구 분포도</Link>
                </li>
                <li>
                    <Link to="/main3">Go to main3</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;