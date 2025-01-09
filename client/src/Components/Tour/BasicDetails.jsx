
import React from "react";

const BasicDetails = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div>
        <label className="block font-medium mt-2">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Primary Phone No *</label>
        <input
          type="text"
          value={formData.primaryPhoneNo}
          onChange={(e) => handleInputChange("primaryPhoneNo", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your primary phone number"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Secondary Phone No</label>
        <input
          type="text"
          value={formData.secondaryPhoneNo}
          onChange={(e) => handleInputChange("secondaryPhoneNo", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your secondary phone number (optional)"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Primary Email *</label>
        <input
          type="email"
          value={formData.primaryEmail}
          onChange={(e) => handleInputChange("primaryEmail", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your primary email"
        />
      </div>
      <div>
        <label className="block font-medium mt-2">Secondary Email</label>
        <input
          type="email"
          value={formData.secondaryEmail}
          onChange={(e) => handleInputChange("secondaryEmail", e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
          placeholder="Enter your secondary email (optional)"
        />
      </div>
    </div>
  );
};

export default BasicDetails;