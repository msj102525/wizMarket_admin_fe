import React from 'react';

const SectionHeader = ({ title, isList, handleToggle, mapDisable }) => {
    return (
        <div className="div-underline p-2 flex justify-between py-4">
            <div className='flex gap-4'>
                <div className='w-1.5 bg-gradient-to-b from-[#E2E2E2] to-[#020202]'></div>
                <p className='text-3xl font-medium mb:text-5xl'>{title}</p>
            </div>
            {!mapDisable && (
                <div className='flex'>
                    <button
                        onClick={handleToggle}
                        className={`flex px-6 justify-center items-center gap-2 flex-shrink-0 
                        ${!isList ? 'rounded-l-xl bg-[#f0f0f0] text-black' : 'rounded-l-xl bg-[#0095FE] text-white'}`}
                    >
                        List
                    </button>
                    <button
                        onClick={handleToggle}
                        className={`flex px-6 justify-center items-center gap-2 flex-shrink-0 
                        ${isList ? 'rounded-r-xl bg-[#f0f0f0] text-black' : 'rounded-r-rounded-l-xl bg-[#0095FE] text-white'}`}
                    >
                        Map
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionHeader;
