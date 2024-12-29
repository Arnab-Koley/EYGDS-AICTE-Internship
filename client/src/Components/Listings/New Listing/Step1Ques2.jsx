import React from "react";
import propertyTypeOptions from "../../../assets/data/propertyTypeData";
import { IoIosArrowRoundBack } from "react-icons/io";

const Step1Ques2 = ({ data, updateData, handleNavigation }) => {
  const selectedPropertyType = data.propertyType; // Use the persisted propertyType from the parent state

  const handleSelectGeography = (propertyType) => {
    updateData("propertyType", propertyType); // Update the parent state
  };

  return (
    <div className="px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold">
      Which of these best describes your place ?
      </h1>
      <div className="grid lg:grid-cols-6 grid-cols-4 gap-3 max-md:gap-1 max-md:grid-cols-3 max-sm:grid-cols-2 mt-10 items-center justify-center">
        {propertyTypeOptions.map((option) => (
          <div
            key={option.name}
            onClick={() => handleSelectGeography(option.name)}
            className={`border-2 rounded-lg cursor-pointer flex items-center justify-center flex-col ${
              selectedPropertyType === option.name
                ? "border-4 border-primarycolor"
                : ""
            }`}
          >
            <img
              src={option.imgSrc}
              alt={option.name}
              className="h-56 max-md:h-44 object-cover"
            />
            <p className="text-center p-2">{option.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center py-10">
        {/* Back button */}
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          <IoIosArrowRoundBack size={25} />
          <span>Back</span>
        </button>

        {/* Next button */}
        <button
          onClick={() => handleNavigation(1)}
          className={`px-10 py-3 rounded-lg text-2xl ${
            selectedPropertyType
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedPropertyType} // Disable button if no option is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Ques2;
