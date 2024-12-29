import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiDoorOpen } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";

const Step1Ques3 = ({ data, updateData, handleNavigation }) => {
  const [selectedAccommodationType, setSelectedAccommodationType] = useState(data.accommodationType); // Initialize with parent state

  const handleSelectAccommodationType = (accommodationType) => {
    setSelectedAccommodationType(accommodationType); // Update local state
    updateData("accommodationType", accommodationType); // Update parent state
  };

  return (
    <div className="px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        What type of place will guests have?
      </h1>

      <div className="flex flex-col lg:px-64 md:px-20 space-y-3 mt-5">
        {/* Entire Place */}
        <div
          onClick={() => handleSelectAccommodationType("entire")}
          className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer ${
            selectedAccommodationType === "entire" ? "border-4 border-primarycolor" : ""
          }`}
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">An entire place</h3>
            <p>Guests have the whole place to themselves.</p>
          </div>
          <div>
            <IoHome size={30} />
          </div>
        </div>

        {/* Room */}
        <div
          onClick={() => handleSelectAccommodationType("room")}
          className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer ${
            selectedAccommodationType === "room" ? "border-4 border-primarycolor" : ""
          }`}
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">A room</h3>
            <p>Guests have their own room in a home, plus access to shared spaces.</p>
          </div>
          <div>
            <PiDoorOpen size={30} />
          </div>
        </div>

        {/* Shared Room */}
        <div
          onClick={() => handleSelectAccommodationType("shared")}
          className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer ${
            selectedAccommodationType === "shared" ? "border-4 border-primarycolor" : ""
          }`}
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">A shared room in a hostel</h3>
            <p>Guests sleep in a shared room in a professionally managed hostel with staff on-site 24/7.</p>
          </div>
          <div>
            <FaPeopleRoof size={30} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-10">
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
            selectedAccommodationType
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedAccommodationType} // Disable button if no option is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Ques3;
