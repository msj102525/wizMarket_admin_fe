import React from 'react';
import SearchResetButtons from '../../../components/SearchResetButton';
import CitySelect from '../../../components/CitySelect';

const LocContextSearchForm = ({
    city, district, subDistrict,
    cities, districts, subDistricts,
    setCity, setDistrict, setSubDistrict,
    handleSearch, handleReset,
}) => {


    return (
        <div className="border border-[#DDDDDD] rounded-lg shadow-md w-full h-full ">
            <div className="pt-4 bg-[#F3F5F7] h-full flex flex-col justify-between">
                <div className="mb-4 flex gap-4">
                    <div className="w-1/5 text-center content-center">
                        <label className="block mb-1 font-extrabold">지역 검색</label>
                    </div>
                    <div className="w-full">
                        <CitySelect
                            city={city}
                            district={district}
                            subDistrict={subDistrict}
                            cities={cities}
                            districts={districts}
                            subDistricts={subDistricts}
                            setCity={setCity}
                            setDistrict={setDistrict}
                            setSubDistrict={setSubDistrict}
                        />
                    </div>
                </div>
                <div className="bg-white py-2">
                    <SearchResetButtons onSearch={handleSearch} onReset={handleReset} />
                </div>
            </div>
        </div>
    );
};

export default LocContextSearchForm;