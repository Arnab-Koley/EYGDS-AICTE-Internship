import React from "react";
import geographyOptions from "../../../assets/data/geographydData";
import propertyTypeOptions from "../../../assets/data/propertyTypeData";
import { IoHome } from "react-icons/io5";
import { PiDoorOpen } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";

const Location = ({ data, updateData }) => {

  const selectedGeographies = data.geography || [];

  const handleToggleGeography = (geography) => {
    let updatedGeographies;

    if (selectedGeographies.includes(geography)) {
      // If geography is already selected, remove it
      updatedGeographies = selectedGeographies.filter((item) => item !== geography);
    } else {
      // Otherwise, add it to the selected list
      updatedGeographies = [...selectedGeographies, geography];
    }

    updateData("geography", updatedGeographies); // Update parent state
  };


  return (
    <div className="md:px-20">
   
      {/* Geography Selection */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold">
          Select the appropriate geography of the place
        </h1>
        <div className="grid lg:grid-cols-9 md:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 gap-1 mt-1 items-center justify-center">
          {geographyOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handleToggleGeography(option.name)}
              className={`border-2 rounded-lg cursor-pointer flex items-center justify-center flex-col ${
                selectedGeographies.includes(option.name) ? "border-4 border-primarycolor" : ""
              }`}
            >
              <img
                src={option.imgSrc}
                alt={option.name}
                className="h-36 max-sm:h-28 object-cover"
              />
              <p className="text-center p-2">{option.name}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Property Type Selection */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold">
          Which of these best describes your place ?
        </h1>
        <div className="grid lg:grid-cols-9 md:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 gap-2 mt-1 items-center justify-center">
          {propertyTypeOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => updateData("propertyType", option.name)}
              className={`border-2 rounded-lg cursor-pointer flex items-center justify-center flex-col ${
                data.propertyType === option.name ? "border-4 border-primarycolor" : ""
              }`}
            >
              <img
                src={option.imgSrc}
                alt={option.name}
                className="h-36 max-sm:h-28 object-cover"
              />
              <p className="text-center p-2">{option.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation Type Selection */}
      <div>
        <h1 className="text-xl font-semibold">
          What type of place will guests have?
        </h1>
        <div className="flex mt-1 lg:space-x-3 max-lg:flex-col max-lg:space-y-2">
   
          <div
            onClick={() => updateData("accommodationType", "entire")}
            className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer lg:w-1/3 ${
              data.accommodationType === "entire" ? "border-4 border-primarycolor" : ""
            }`}
          >
            <div className="flex flex-col">
              <h3 className="font-semibold">An entire place</h3>
              <p className="text-sm">Guests have the whole place to themselves.</p>
            </div>
            <div><IoHome size={30} /></div>
          </div>

          {/* Room */}
          <div
            onClick={() => updateData("accommodationType", "room")}
            className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer lg:w-1/3 ${
              data.accommodationType === "room" ? "border-4 border-primarycolor" : ""
            }`}
          >
            <div className="flex flex-col">
              <h3 className=" font-semibold">A room</h3>
              <p className="text-sm">Guests have their own room in a home, plus access to shared spaces.</p>
            </div>
            <div><PiDoorOpen size={30} /></div>
          </div>

          {/* Shared Room */}
          <div
            onClick={() => updateData("accommodationType", "shared")}
            className={`flex justify-between items-center p-5 border-2 rounded-lg space-x-3 cursor-pointer lg:w-1/3 ${
              data.accommodationType === "shared" ? "border-4 border-primarycolor" : ""
            }`}
          >
            <div className="flex flex-col">
              <h3 className="font-semibold">A shared room in a hostel</h3>
              <p className="text-sm">
                Guests sleep in a shared room in a professionally managed hostel with staff
                on-site 24/7.
              </p>
            </div>
            <div><FaPeopleRoof size={30} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
