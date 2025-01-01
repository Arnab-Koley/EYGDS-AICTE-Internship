import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const Step2Ques2 = ({ data, updateData, handleNavigation }) => {
  const [description, setDescription] = useState(data.description || ""); // Initialize with existing data or empty string
  const maxLength = 500; // Maximum characters for the description

  // Handle input changes and limit input to maxLength
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setDescription(inputValue);
    }
  };

  // Update parent data whenever the description changes
  useEffect(() => {
    updateData("description", description);
  }, [description]);

  return (
    <div className="px-20 max-md:px-5 flex flex-col items-center">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
      Create your description
      </h1>
      <p className="text-center mt-2">
      Share what makes your place special.
      </p>

      {/* Input Box with Character Counter */}
      <div className="mt-10 max-w-md w-full">
        <textarea
          type="text"
          value={description}
          onChange={handleInputChange}
          placeholder="Enter a description"
          className="border-2 border-gray-300 rounded-lg p-3 w-full text-lg resize-x-none "
          rows={5}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {description.length}/{maxLength}
        </div>
      </div>

      <div className="flex justify-between items-center py-10 w-full">
        {/* Back Button */}
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          <IoIosArrowRoundBack size={25} />
          <span>Back</span>
        </button>

        {/* Next Button */}
        <button
          onClick={() => handleNavigation(1)}
          className={`px-10 py-3 rounded-lg text-2xl ${
            description.trim()
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!description.trim()} // Disable if the description is empty or only whitespace
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Ques2;
