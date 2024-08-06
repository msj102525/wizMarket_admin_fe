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
                    <Link to="/info">행정 구역 별 맵</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;