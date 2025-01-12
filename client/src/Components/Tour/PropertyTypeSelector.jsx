import React, { useState, useRef } from "react";

const PropertyTypeSelector = ({ propertyTypeOptions, selectedPropertyType, handlePropertyTypeClick }) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  const maxIndex = propertyTypeOptions.length - 1;

  const handleNext = () => {
    if (startIndex < maxIndex) {
      setStartIndex(startIndex + 1);
      containerRef.current.scrollLeft += containerRef.current.offsetWidth; 
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth; 
    }
  };

  return (
    <div className="flex justify-center w-full select-none mt-5">
      <div className="relative flex items-center w-full">

        <div className="p-3 md:hidden">
          <button
            onClick={handlePrev}
            className="text-gray-600  text-xl bg-white border-2 h-8 w-8 rounded-full"
            disabled={startIndex === 0}
          >
            &#60;
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex max-md:space-x-2 overflow-x-auto w-full md:justify-center scrollbar-hidden  md:flex-wrap"
        >
          {propertyTypeOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handlePropertyTypeClick(option.name)}
              className={`flex border-2 rounded-lg items-center cursor-pointer md:m-1 ${
                selectedPropertyType === option.name ? "border-primarycolor" : "border-gray-500"
              }`}
            >
              <div className="h-12 w-12 flex">
                <img
                  src={option.imgSrc}
                  alt={option.name}
                  className="h-12 w-12 object-cover rounded-l-lg"
                />
              </div>
              <h1
                className={`px-2 border-l-2 h-full flex items-center justify-center ${
                  selectedPropertyType === option.name
                    ? "border-primarycolor bg-primarycolor text-white"
                    : "border-gray-500"
                }`}
              >
                {option.name}
              </h1>
            </div>
          ))}
        </div>

        <div className="p-3 md:hidden">
          <button
            onClick={handleNext}
            className={`text-gray-600 disabled:text-gray-400 h-8 w-8 text-xl bg-white border-2 rounded-full` }
            disabled={startIndex === propertyTypeOptions.length - 1}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeSelector;
