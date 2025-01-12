import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Map from "../../../Utils/Map";


const Step1Ques4 = ({ data, updateData, handleNavigation }) => {
  const address = data.address; 

  const handleInputChange = (field, value) => {
    const updatedAddress = { ...address, [field]: value };
    updateData("address", updatedAddress); 
  };

  
  const isNextEnabled =
    address.country &&
    address.streetAddress &&
    address.city &&
    address.state &&
    address.pinCode &&
    address.specificLocation.lat &&
    address.specificLocation.lng;

  return (
    <div className="flex flex-col lg:px-80 px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Confirm your address
      </h1>
      <p className="text-center mt-2">
        Your address is only shared with guests after they've made a reservation.
      </p>

      <div className="flex flex-col space-y-4 mt-5">
        <div>
          <label className="block font-medium mb-1">Country *</label>
          <input
            type="text"
            value={address.country || "India"}
            readOnly
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

      
        <div>
          <label className="block font-medium mb-1">Flat, house, etc.</label>
          <input
            type="text"
            value={address.flatHouse || ""}
            onChange={(e) => handleInputChange("flatHouse", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter flat no (optional)"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">Street Address *</label>
          <input
            type="text"
            value={address.streetAddress || ""}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter street address"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">Nearby Landmark</label>
          <input
            type="text"
            value={address.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter nearby landmark (optional)"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">District / locality</label>
          <input
            type="text"
            value={address.districtLocality || ""}
            onChange={(e) => handleInputChange("districtLocality", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter district or locality (optional)"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">City / town *</label>
          <input
            type="text"
            value={address.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter city or town"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">State / union territory *</label>
          <input
            type="text"
            value={address.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter state or union territory"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Pin Code *</label>
          <input
            type="text"
            value={address.pinCode || ""}
            onChange={(e) => handleInputChange("pinCode", e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
            placeholder="Enter pin code"
          />
        </div>

        <div>
        <label className="block font-medium mb-1">Select Specific Location</label>
        <Map
          specificLocation={address.specificLocation}
          updateSpecificLocation={(location) =>
            updateData("address", {
              ...data.address,
              specificLocation: location, 
            })
          }
        />
      </div>


      </div>

      <div className="flex justify-between items-center py-10">
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          <IoIosArrowRoundBack size={25} />
          <span>Back</span>
        </button>

        <button
          onClick={() => {handleNavigation(1)}}
          className={`px-10 py-3 rounded-lg text-2xl ${
            isNextEnabled
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isNextEnabled} 
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Ques4;