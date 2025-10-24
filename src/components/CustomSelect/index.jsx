import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {ArrowDown} from '../../assets/icons';
const CustomSelect = ({
  options = [],
  value = '',
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={selectRef} 
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Select Trigger - Không border */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left bg-white
          focus:outline-none focus:ring-0 focus:border-none
          transition-all duration-200 flex items-center justify-between
          ${disabled 
            ? 'bg-gray-100 cursor-not-allowed opacity-50' 
            : 'cursor-pointer'
          }
          ${isOpen ? '' : ''}
        `}
      >
        <span className={`${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ArrowDown className="w-3 h-3 text-gray-400"/>
      </button>

      {/* Dropdown Menu - Không border */}
      {isOpen && (
        <div className="
          absolute z-50 w-full mt-1 bg-white rounded-lg
          shadow-lg max-h-60 overflow-auto
        ">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-2 text-left transition-colors duration-150
                  hover:bg-[#2F5855] hover:text-white
                  ${selectedValue === option.value 
                    ? 'bg-[#2F5855] text-white font-medium' 
                    : 'text-gray-900'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
            
            {options.length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-center">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;