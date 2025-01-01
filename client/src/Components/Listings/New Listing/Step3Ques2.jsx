import React from "react";
import amenitiesData from "../../../assets/data/amenitiesData";
import standoutAmenitiesData from "../../../assets/data/standoutAmenitiesData";
import safetyItemsData from "../../../assets/data/safetyItemsData";
import { IoIosArrowRoundBack } from "react-icons/io";

const Step3Ques2 = ({ data, updateData, handleNavigation }) => {
  const selectedAmenities = data.amenities || [];
  const selectedStandoutAmenities = data.standoutAmenities || [];
  const selectedSafetyItems = data.safetyItems || [];

  const handleSelectAmenity = (amenityLabel) => {
    let updatedAmenities = [...selectedAmenities];
    if (updatedAmenities.includes(amenityLabel)) {
      updatedAmenities = updatedAmenities.filter((item) => item !== amenityLabel);
    } else {
      updatedAmenities.push(amenityLabel);
    }
    updateData("amenities", updatedAmenities);
  };

  const handleSelectStandoutAmenity = (standoutAmenityLabel) => {
    let updatedStandoutAmenities = [...selectedStandoutAmenities];
    if (updatedStandoutAmenities.includes(standoutAmenityLabel)) {
      updatedStandoutAmenities = updatedStandoutAmenities.filter(
        (item) => item !== standoutAmenityLabel
      );
    } else {
      updatedStandoutAmenities.push(standoutAmenityLabel);
    }
    updateData("standoutAmenities", updatedStandoutAmenities);
  };

  const handleSelectSafetyItem = (safetyItemLabel) => {
    let updatedSafetyItems = [...selectedSafetyItems];
    if (updatedSafetyItems.includes(safetyItemLabel)) {
      updatedSafetyItems = updatedSafetyItems.filter((item) => item !== safetyItemLabel);
    } else {
      updatedSafetyItems.push(safetyItemLabel);
    }
    updateData("safetyItems", updatedSafetyItems);
  };

  return (
    <div className="px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold">
        Tell guests what your place has to offer
      </h1>
      <p className="mt-2 text-xl">
        Guests appreciate accurate amenity details, so choose the ones available.
      </p>

      <h3 className="text-xl font-semibold mt-5">What about these guest favourites ?</h3>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-3 ">
        {amenitiesData.map((amenity) => (
          <div
            key={amenity.label}
            onClick={() => handleSelectAmenity(amenity.label)}
            className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
              selectedAmenities.includes(amenity.label)
                ? "border-4 border-primarycolor bg-gray-100"
                : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              {React.createElement(amenity.icon, { size: 30 })}
              <p className="font-medium">{amenity.label}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-5">Do you have any standout amenities ?</h3>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-3 ">
        {standoutAmenitiesData.map((standoutAmenity) => (
          <div
            key={standoutAmenity.label}
            onClick={() => handleSelectStandoutAmenity(standoutAmenity.label)}
            className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
              selectedStandoutAmenities.includes(standoutAmenity.label)
                ? "border-4 border-primarycolor bg-gray-100"
                : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              {React.createElement(standoutAmenity.icon, { size: 30 })}
              <p className="font-medium">{standoutAmenity.label}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{standoutAmenity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-5">Do you have any of these safety items ?</h3>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 gap-3 mt-3 ">
        {safetyItemsData.map((safetyItem) => (
          <div
            key={safetyItem.label}
            onClick={() => handleSelectSafetyItem(safetyItem.label)}
            className={`border-2 rounded-lg cursor-pointer flex flex-col p-3 space-y-2 ${
              selectedSafetyItems.includes(safetyItem.label)
                ? "border-4 border-primarycolor bg-gray-100"
                : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              {React.createElement(safetyItem.icon, { size: 30 })}
              <p className="font-medium">{safetyItem.label}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{safetyItem.description}</p>
            </div>
          </div>
        ))}
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
          className="px-10 py-3 rounded-lg text-2xl bg-primarycolor text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Ques2;
