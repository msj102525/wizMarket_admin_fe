import React from 'react';
import CitySelect from '../../components/CitySelect'
import Header from '../../components/Header';
import Aside from '../../components/Aside';

const City = () => {
    return (
        <div>
            <Header />
            <div className="flex">
                <Aside />
                <main className="flex-1 flex flex-col gap-2 min-h-screen p-4">
                    <CitySelect/>

                    
                </main>
            </div>
        </div>
    );
};


export default City;
