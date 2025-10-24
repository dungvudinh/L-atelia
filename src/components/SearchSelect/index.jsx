import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const SearchSelect = ({
  options = [],
  value = '',
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div 
      ref={selectRef} 
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Select Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 flex items-center justify-between
          ${disabled 
            ? 'bg-gray-100 cursor-not-allowed opacity-50' 
            : 'cursor-pointer hover:border-gray-400'
          }
          ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
      >
        <span className={`${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg
          shadow-lg max-h-60 overflow-hidden
        ">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="
                  w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-2 text-left transition-colors duration-150
                  hover:bg-blue-50 hover:text-blue-700
                  ${selectedValue === option.value 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-900'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
            
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-gray-500 text-center">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { CustomSelect, SearchSelect };