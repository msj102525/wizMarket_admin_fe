import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="div-underline">
            <div className='flex justify-between px-10'>
                <div className="w-72 flex items-center">
                    <Link to="/">
                        <h1 className='py-6 w-96 sm:w-auto'>
                            <img src={require('../assets/header/wizmarket_logo.png')} alt="Wiz-Market_logo" className='block w-full h-auto' />
                        </h1>
                    </Link>
                </div>
                <div className="flex leading-9 mb:hidden">
                    <div className="p-6 font-normal">
                        {/* <p className='text-2xl'>JYes님</p> */}
                    </div>
                    <div className="p-6 font-normal">
                        {/* <p className='text-2xl'>Logout</p> */}
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;