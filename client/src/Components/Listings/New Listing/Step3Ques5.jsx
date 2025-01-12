import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";

const Step3Ques5 = ({ data, updateData, handleNavigation, handleSubmit, isSubmitting }) => {
  const [safetyDetails, setSafetyDetails] = useState({
    exteriorSecurityCamera: data.safetyDetails.exteriorSecurityCamera,
    noiseDecibelMonitor: data.safetyDetails.noiseDecibelMonitor,
    weaponsOnProperty: data.safetyDetails.weaponsOnProperty,
    safetyInfo: data.safetyDetails.safetyInfo,
  });

  const handleCheckboxChange = (field) => {
    setSafetyDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [field]: !prevDetails[field] };
      updateData("safetyDetails", updatedDetails); 
      return updatedDetails;
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSafetyDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, safetyInfo: value };
      updateData("safetyDetails", updatedDetails); 
      return updatedDetails;
    });
  };


  

  return (
    <div className="flex flex-col lg:px-80 px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Share Safety Details
      </h1>
      <p className="text-center mt-2">Does your place have any of these?</p>

      <div className="space-y-3 mt-10 text-xl max-md:text-lg">
     
        <div className="flex items-center justify-between">
          <div>Exterior security camera present</div>
          <div className="relative w-8 h-8">
            <input
              type="checkbox"
              checked={safetyDetails.exteriorSecurityCamera}
              onChange={() => handleCheckboxChange("exteriorSecurityCamera")}
              className="absolute w-8 h-8 opacity-0 cursor-pointer"
            />
            <div
              className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center 
        ${
          safetyDetails.exteriorSecurityCamera
            ? "bg-primarycolor border-primarycolor"
            : "bg-white border-gray-400"
        }`}
            >
              {safetyDetails.exteriorSecurityCamera && (
                <FaCheck className="text-white text-xl" />
              )}
            </div>
          </div>
        </div>

    
        <div className="flex items-center justify-between">
          <div>Noise decibel monitor present</div>
          <div className="relative w-8 h-8">
            <input
              type="checkbox"
              checked={safetyDetails.noiseDecibelMonitor}
              onChange={() => handleCheckboxChange("noiseDecibelMonitor")}
              className="absolute w-8 h-8 opacity-0 cursor-pointer"
            />
            <div
              className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center 
        ${
          safetyDetails.noiseDecibelMonitor
            ? "bg-primarycolor border-primarycolor"
            : "bg-white border-gray-400"
        }`}
            >
              {safetyDetails.noiseDecibelMonitor && (
                <FaCheck className="text-white text-xl" />
              )}
            </div>
          </div>
        </div>

       
        <div className="flex items-center justify-between">
          <div>Weapon(s) on the property</div>
          <div className="relative w-8 h-8">
            <input
              type="checkbox"
              checked={safetyDetails.weaponsOnProperty}
              onChange={() => handleCheckboxChange("weaponsOnProperty")}
              className="absolute w-8 h-8 opacity-0 cursor-pointer"
            />
            <div
              className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center 
        ${
          safetyDetails.weaponsOnProperty
            ? "bg-primarycolor border-primarycolor"
            : "bg-white border-gray-400"
        }`}
            >
              {safetyDetails.weaponsOnProperty && (
                <FaCheck className="text-white text-xl" />
              )}
            </div>
          </div>
        </div>

     
        <div className="flex flex-col">
          <label htmlFor="safetyInfo" className="text-xl max-md:text-lg mt-5">
            Explain in details of your safety measures:
          </label>
          <textarea
            id="safetyInfo"
            value={safetyDetails.safetyInfo}
            onChange={handleInputChange}
            className="border-2 rounded-md p-2 mt-2"
            placeholder="Why these are needed"
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-5">
        <div className="flex items-center space-x-2">
          <GoAlertFill size={20} />
          <h3 className="text-lg">Important things to know</h3>
        </div>
        <p className=" mt-2">
          Security cameras that monitor indoor spaces are not allowed even if
          they're turned off. All exterior security cameras must be disclosed.
          Be sure to comply with your local laws and review Desh Dekho's
          anti-discrimination policy.
        </p>
      </div>

      <div className="flex justify-between items-center py-10">
   
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          Back
        </button>

   
        <button
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
          className="bg-primarycolor text-white px-10 py-3 rounded-lg text-2xl"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step3Ques5;
