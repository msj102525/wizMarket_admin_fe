import { useState, useEffect, useRef } from "react";

const DropdownWithCheckboxes = ({ selectedOptions, setSelectedOptions, dataDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDefault, setHasDefault] = useState(false); // 기본값 설정 여부 상태
  const dropdownRef = useRef(null); // 드롭다운 영역 참조

  useEffect(() => {
    // 기본 선택 옵션을 가장 마지막 날짜로 설정 (한 번만 실행)
    if (!hasDefault && dataDate && dataDate.length > 0) {
      setSelectedOptions((prev) => [...prev, dataDate[dataDate.length - 1].y_m]);
      setHasDefault(true); // 기본값 설정 후 hasDefault를 true로 설정
    }
  }, [dataDate, hasDefault, setSelectedOptions]);

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
        {selectedOptions.length > 0 ? selectedOptions[selectedOptions.length - 1].substring(0, 7) : "Select Date"}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3">
          {dataDate.map((date, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={date.y_m}
                onChange={handleCheckboxChange}
                checked={selectedOptions.includes(date.y_m)}
                className="form-checkbox"
              />
              <span>{date.y_m.substring(0, 7)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
