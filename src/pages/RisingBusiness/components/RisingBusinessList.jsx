import React from 'react';

const RisingBusinessList = ({ data }) => {
    return (
        <div className="">
            <ul className=''>
                {data.map((item) => (
                    <li key={item.id} className='flex gap-4 p-4 border'>
                        <p className='flex-1'>City: {item.city}</p>
                        <p className='flex-1'>District: {item.district}</p>
                        <p className='flex-1'>Sub-district: {item.sub_district}</p>
                        <p className='flex-1'>Business Name: {item.business_name}</p>
                        <p className='flex-1'>Growth Rate: {item.growth_rate}</p>
                        <p className='flex-1'>Created At: {new Date(item.created_at).toLocaleString()}</p>
                        <p className='flex-1'>Updated At: {new Date(item.updated_at).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RisingBusinessList;
