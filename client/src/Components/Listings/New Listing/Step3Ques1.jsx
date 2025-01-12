import React from "react";

const Step3Ques1 = ({ data, updateData, handleNavigation }) => {
  const { basics } = data;

  const handleIncrease = (field) => {
    updateData("basics", { ...basics, [field]: basics[field] + 1 });
  };

  const handleDecrease = (field) => {
    if (basics[field] > 1) {
      updateData("basics", { ...basics, [field]: basics[field] - 1 });
    }
  };

  return (
    <div className="flex flex-col lg:px-80 px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Set the basics for your listing
      </h1>
      <p className="text-center mt-2">
        Specify the number of bedrooms, beds, and bathrooms.
      </p>

      <div className="flex flex-col space-y-4 mt-5">
        {Object.keys(basics).map((field) => (
          <div
            key={field}
            className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-lg text-xl"
          >
            <span className="capitalize">{field}</span>
            <div className="flex items-center space-x-3">
            
              <button
                onClick={() => handleDecrease(field)}
                className={`w-10 h-10 border-2 flex items-center justify-center rounded-full ${
                  basics[field] === 1
                    ? "border-gray-300 text-gray-500 cursor-not-allowed"
                    : "border-dark-1 text-dark-1"
                }`}
                disabled={basics[field] === 1}
              >
                -
              </button>
        
              <span className="w-10 text-center font-semibold">
                {basics[field]}
              </span>
          
              <button
                onClick={() => handleIncrease(field)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-dark-1 border-2 text-dark-1"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-10">
      
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          Back
        </button>

    
        <button
          onClick={() => handleNavigation(1)}
          className="bg-primarycolor text-white px-10 py-3 rounded-lg text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Ques1;
