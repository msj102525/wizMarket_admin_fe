import React from 'react';
import axios from 'axios';

const CustomSearch = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/testopenup');
      console.log(response.data);
      alert("Input field clicked successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to click input field.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Custom Search</h1>
      <button
        onClick={handleClick}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Click Search Input on Openub
      </button>
    </div>
  );
};

export default CustomSearch;
