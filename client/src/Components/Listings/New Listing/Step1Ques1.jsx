import React from "react";
import geographyOptions from "../../../assets/data/geographydData";
import { IoIosArrowRoundBack } from "react-icons/io";

const Step1Ques1 = ({ data, updateData, handleNavigation }) => {
  const selectedGeography = data.geography; // Use the persisted geography from the parent state

  const handleSelectGeography = (geography) => {
    updateData("geography", geography); // Update the parent state
  };

  return (
    <div className="px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold">
        Select the appropriate geography of the place
      </h1>
      <div className="grid  lg:grid-cols-9 md:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 gap-2 mt-10 items-center justify-center">
        {geographyOptions.map((option) => (
          <div
            key={option.name}
            onClick={() => handleSelectGeography(option.name)}
            className={`border-2 rounded-lg cursor-pointer flex items-center justify-center flex-col ${
              selectedGeography === option.name
                ? "border-4 border-primarycolor"
                : ""
            }`}
          >
            <img
              src={option.imgSrc}
              alt={option.name}
              className="h-36 max-sm:h-28 object-cover"
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
            selectedGeography
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedGeography} // Disable button if no option is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Ques1;
