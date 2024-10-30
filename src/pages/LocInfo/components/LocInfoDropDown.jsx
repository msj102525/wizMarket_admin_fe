import { useState } from "react";

const DropdownWithCheckboxes = ({ selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions(prev =>
      checked ? [...prev, value] : prev.filter(option => option !== value)
    );
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-white text-gray-400 p-2 border border-[#DDDDDD] rounded w-full "
      >
        기준 년월 선택
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="2024-10-01"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("2024-10-01")}
              className="form-checkbox"
            />
            <span>2024-10</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="2024-08-01"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("2024-08-01")}
              className="form-checkbox"
            />
            <span>2024-08</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
