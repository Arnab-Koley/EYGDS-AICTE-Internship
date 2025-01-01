import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const Step2Ques1 = ({ data, updateData, handleNavigation }) => {
  const [title, setTitle] = useState(data.title || ""); // Initialize with existing data or empty string
  const maxLength = 32; // Maximum characters for the title

  // Handle input changes and limit input to maxLength
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setTitle(inputValue);
    }
  };

  // Update parent data whenever the title changes
  useEffect(() => {
    updateData("title", title);
  }, [title]);

  return (
    <div className="px-20 max-md:px-5 flex flex-col items-center">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Now, let's give your {data.propertyType} a title
      </h1>
      <p className="text-center mt-2">
        Short titles work best. Have fun with it - you can always change it later.
      </p>

      {/* Input Box with Character Counter */}
      <div className="mt-10 max-w-md w-full">
        <textarea
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter a title"
          className="border-2 border-gray-300 rounded-lg p-3 w-full text-lg resize-none overflow-y-hidden"
          rows={3}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {title.length}/{maxLength}
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
            title.trim()
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!title.trim()} // Disable if the title is empty or only whitespace
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Ques1;
