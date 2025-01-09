
import React from "react";

const Address = ({ formData, handleAddressChange }) => {
  return (
    <div>
      <div>
        <label className="block font-medium mt-2">Country</label>
        <input
          type="text"
          value={formData.address.country}
          onChange={(e) => handleAddressChange("country", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your country"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Flat, House, etc.</label>
        <input
          type="text"
          value={formData.address.flatHouse}
          onChange={(e) => handleAddressChange("flatHouse", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter flat no (optional)"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Street Address *</label>
        <input
          type="text"
          value={formData.address.streetAddress}
          onChange={(e) => handleAddressChange("streetAddress", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter street address"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Landmark</label>
        <input
          type="text"
          value={formData.address.landmark}
          onChange={(e) => handleAddressChange("landmark", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter nearby landmark (optional)"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">District / Locality</label>
        <input
          type="text"
          value={formData.address.districtLocality}
          onChange={(e) =>
            handleAddressChange("districtLocality", e.target.value)
          }
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter district or locality (optional)"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">City / Town *</label>
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) => handleAddressChange("city", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter city or town"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">
          State / Union Territory *
        </label>
        <input
          type="text"
          value={formData.address.state}
          onChange={(e) => handleAddressChange("state", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter state or union territory"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Pin Code *</label>
        <input
          type="text"
          value={formData.address.pinCode}
          onChange={(e) => handleAddressChange("pinCode", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter pin code"
        />
      </div>
    </div>
  );
};

export default Address;
