import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const CustomAccordion = ({ data = [], className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Default data nếu không có props
  const defaultData = [
    {
      title: "SALT WATER EXCHANGE SWIMMING POOL",
      content: 'The original well has been meticulously restored and sits alongside the exterior shower by Dornbracht.'
    },
    {
      title: "RESTORED ORIGINAL WELL",
      content: 'The original well has been meticulously restored and sits alongside the exterior shower by Dornbracht.'
    }
  ];

  const accordionItems = data.length > 0 ? data : defaultData;
console.log(accordionItems)
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="accordion-container  ">
        {accordionItems.map((item, index) => (
          <div 
            key={index} 
            className={`accordion-item border-b border-gray-200 last:border-b-0 `}
          >
            <button
              className="accordion-header w-full  py-4 text-left transition-colors duration-200 flex items-center justify-between cursor-pointer"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              <div className="flex items-center">
                <div className={`transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-90' : ''
                }`}>
                <ChevronRight size={25} />
                </div>
                <span className="text-[18px] font-bold text-gray-800 ml-2">
                  {item.title}
                </span>
              </div>
              
            </button>
            
            <div 
              className={`accordion-content overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className=" pb-4 text-[18px]">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomAccordion;