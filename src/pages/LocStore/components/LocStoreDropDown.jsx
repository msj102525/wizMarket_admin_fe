import { useState, useEffect, useRef } from "react";

const DropdownWithCheckboxesString = ({ selectedOptions, setSelectedOptions, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 영역 참조



  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const handleClickOutside = (event) => {
    // 드롭다운 영역 외부 클릭 시 닫기
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block w-1/6" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-white text-gray-400 p-2 border border-[#DDDDDD] rounded w-full text-left"
      >
        {selectedOptions.length > 0
          ? selectedOptions[selectedOptions.length - 1] // 마지막 선택 옵션 표시
          : "Select Option"}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                onChange={handleCheckboxChange}
                checked={selectedOptions.includes(option)}
                className="form-checkbox"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxesString;
