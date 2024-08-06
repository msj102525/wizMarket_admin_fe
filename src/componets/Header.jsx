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
                    <Link to="/main2">Go to main2</Link>
                </li>
                <li>
                    <Link to="/main3">Go to main3</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;