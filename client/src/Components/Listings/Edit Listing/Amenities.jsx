import React, { useState } from "react";
import amenitiesData from "../../../assets/data/amenitiesData";
import standoutAmenitiesData from "../../../assets/data/standoutAmenitiesData";
import safetyItemsData from "../../../assets/data/safetyItemsData";
import { FaCheck } from "react-icons/fa6";

import { GoAlertFill } from "react-icons/go";

const Amenities = ({ data, updateData }) => {
  const { basics } = data;
  const [safetyDetails, setSafetyDetails] = useState(data.safetyDetails || {});

  const handleIncrease = (field) => {
    updateData("basics", { ...basics, [field]: basics[field] + 1 });
  };

  const handleDecrease = (field) => {
    if (basics[field] > 1) {
      updateData("basics", { ...basics, [field]: basics[field] - 1 });
    }
  };

  const handleSelectAmenity = (amenityLabel) => {
    const updatedAmenities = data.amenities.includes(amenityLabel)
      ? data.amenities.filter((item) => item !== amenityLabel)
      : [...data.amenities, amenityLabel];
    updateData("amenities", updatedAmenities);
  };

  const handleSelectStandoutAmenity = (standoutAmenityLabel) => {
    const updatedStandoutAmenities = data.standoutAmenities.includes(
      standoutAmenityLabel
    )
      ? data.standoutAmenities.filter((item) => item !== standoutAmenityLabel)
      : [...data.standoutAmenities, standoutAmenityLabel];
    updateData("standoutAmenities", updatedStandoutAmenities);
  };

  const handleSelectSafetyItem = (safetyItemLabel) => {
    const updatedSafetyItems = data.safetyItems.includes(safetyItemLabel)
      ? data.safetyItems.filter((item) => item !== safetyItemLabel)
      : [...data.safetyItems, safetyItemLabel];
    updateData("safetyItems", updatedSafetyItems);
  };

  const handleCheckboxChange = (field) => {
    const updatedDetails = { ...safetyDetails, [field]: !safetyDetails[field] };
    setSafetyDetails(updatedDetails);
    updateData("safetyDetails", updatedDetails);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const updatedDetails = { ...safetyDetails, safetyInfo: value };
    setSafetyDetails(updatedDetails);
    updateData("safetyDetails", updatedDetails);
  };

  return (
    <div className="flex flex-col md:px-20 mt-5">
      {/* Basics Section */}
      <section>
        <h1 className="text-xl font-semibold">Basic Details</h1>
        <div className="flex md:space-x-3 mt-2 max-md:flex-col max-md:space-y-1">
          {Object.keys(basics).map((field) => (
            <div
              key={field}
              className="flex justify-between items-center border-2 border-gray-300 p-3 md:w-1/3 rounded-lg"
            >
              <span className="capitalize">{field}</span>
              <div className="flex items-center space-x-2 max-md:space-x-3 max-sm:w-1/3 max-sm:justify-between">
                <button
                  onClick={() => handleDecrease(field)}
                  className={`w-8 h-8 border-2 flex items-center justify-center rounded-full ${
                    basics[field] === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primarycolor text-white"
                  }`}
                  disabled={basics[field] === 1}
                >
                  -
                </button>
                <span className="text-center font-semibold">{basics[field]}</span>
                <button
                  onClick={() => handleIncrease(field)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primarycolor text-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section >
        <h1 className="text-xl font-semibold mt-5">Select the amnities your place offers</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-2">
          {amenitiesData.map((amenity) => (
            <div
              key={amenity.label}
              onClick={() => handleSelectAmenity(amenity.label)}
              className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
                data.amenities.includes(amenity.label)
                  ? "border-4 border-primarycolor bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                {React.createElement(amenity.icon, { size: 30 })}
                <p className="font-medium">{amenity.label}</p>
              </div>
              <p className="text-sm text-gray-500">{amenity.description}</p>
            </div>
          ))}
        </div>

        {/* Standout Amenities */}
        <h3 className="text-xl font-semibold mt-5">Standout Amenities</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-2">
          {standoutAmenitiesData.map((amenity) => (
            <div
              key={amenity.label}
              onClick={() => handleSelectStandoutAmenity(amenity.label)}
              className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
                data.standoutAmenities.includes(amenity.label)
                  ? "border-4 border-primarycolor bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                {React.createElement(amenity.icon, { size: 30 })}
                <p className="font-medium">{amenity.label}</p>
              </div>
              <p className="text-sm text-gray-500">{amenity.description}</p>
            </div>
          ))}
        </div>

        {/* Safety Items */}
        <h3 className="text-xl font-semibold mt-5">Safety Items</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-2">
          {safetyItemsData.map((item) => (
            <div
              key={item.label}
              onClick={() => handleSelectSafetyItem(item.label)}
              className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
                data.safetyItems.includes(item.label)
                  ? "border-4 border-primarycolor bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                {React.createElement(item.icon, { size: 30 })}
                <p className="font-medium">{item.label}</p>
              </div>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>


      </section>

      {/* Safety Details Section */}
      <section>
        <h3 className="text-xl font-semibold mt-5">Safety Details</h3>
        <div className="space-y-4 mt-2">
          {/* Exterior Security Camera Checkbox */}
          <div className="flex items-center justify-between w-80">
            <div>Exterior security camera present</div>
            <div className="relative w-6 h-6">
              <input
                type="checkbox"
                checked={safetyDetails.exteriorSecurityCamera}
                onChange={() => handleCheckboxChange("exteriorSecurityCamera")}
                className="absolute w-6 h-6 opacity-0 cursor-pointer"
              />
              <div
                className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center ${
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

                  {/* Weapons on Property Checkbox */}
        <div className="flex items-center justify-between w-80">
          <div>Weapon(s) on the property</div>
          <div className="relative w-6 h-6">
            <input
              type="checkbox"
              checked={safetyDetails.weaponsOnProperty}
              onChange={() => handleCheckboxChange("weaponsOnProperty")}
              className="absolute w-6 h-6 opacity-0 cursor-pointer"
            />
            <div
              className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center ${
                safetyDetails.weaponsOnProperty
                  ? "bg-primarycolor border-primarycolor"
                  : "bg-white border-gray-400"
              }`}
            >
              {safetyDetails.weaponsOnProperty && <FaCheck className="text-white text-xl" />}
            </div>
          </div>
        </div>

          {/* Noise Decibel Monitor Checkbox */}
          <div className="flex items-center justify-between w-80">
            <div>Noise decibel monitor present</div>
            <div className="relative w-6 h-6">
              <input
                type="checkbox"
                checked={safetyDetails.noiseDecibelMonitor}
                onChange={() => handleCheckboxChange("noiseDecibelMonitor")}
                className="absolute w-6 h-6 opacity-0 cursor-pointer"
              />
              <div
                className={`w-full h-full border-2 rounded cursor-pointer flex items-center justify-center ${
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

          {/* Safety Info Input */}
          <div>
            <label htmlFor="safetyInfo" className="">
              Additional Safety Information :
            </label>
            <textarea
              id="safetyInfo"
              value={safetyDetails.safetyInfo || ""}
              onChange={handleInputChange}
              placeholder="Explain in details of your safety measures"
              className="w-full border-2 rounded-lg p-2 mt-2"
            />
          </div>
        </div>
        
      <div className="text-sm text-gray-600 mt-2">
        <div className="flex items-center space-x-2">
          <GoAlertFill size={20} />
          <h3 className="">Important things to know</h3>
        </div>
        <p className="mt-2">
          Security cameras that monitor indoor spaces are not allowed even if
          they're turned off. All exterior security cameras must be disclosed.
          Be sure to comply with your local laws and review Desh Dekho's
          anti-discrimination policy.
        </p>
      </div>
      </section>
    </div>
  );
};

export default Amenities;
