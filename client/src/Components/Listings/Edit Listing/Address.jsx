import React from "react";
import Map from "../../../Utils/Map";

const Address = ({ data, updateData }) => {
  const address = data.address;

  const handleInputChange = (field, value) => {
    const updatedAddress = { ...address, [field]: value };
    updateData("address", updatedAddress);
  };

  return (
    <div className="md:px-20 mt-5">
      <h1 className="text-xl font-semibold ">
        Address
      </h1>
      <div className="flex flex-col space-y-4 mt-2">

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
        <Map
          specificLocation={address.specificLocation}
          updateSpecificLocation={(location) =>
            updateData("address", {
              ...data.address,
              specificLocation: location, 
            })
        }/>
      </div>
    </div>
  );
};

export default Address;
