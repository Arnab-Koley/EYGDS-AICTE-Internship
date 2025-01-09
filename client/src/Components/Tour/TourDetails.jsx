import React, { useState } from "react";

const TourDetails = ({ formData, handleInputChange, handleGuestChange, tour }) => {
  const [errorMessages, setErrorMessages] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  if (!tour) {
    return null;
  }

  const handleNumberChange = (field, value) => {
    const newValue = value === "" ? 0 : Math.max(0, parseInt(value, 10) || 0);
    handleGuestChange(field, newValue);
  };

  const today = new Date();
  today.setDate(today.getDate() + tour.checkInDay);
  const minCheckInDate = today.toISOString().split("T")[0];

  const minCheckOutDate = new Date(today);
  minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
  const formattedMinCheckOutDate = minCheckOutDate.toISOString().split("T")[0];

  const validateCheckInDate = (date) => {
    if (date < minCheckInDate) {
      setErrorMessages((prev) => ({
        ...prev,
        checkInDate: `Check-in date should be ${minCheckInDate} or later`,
      }));
    } 
    // Check if check-in date is after or equal to check-out date
    else if (formData.checkOutDate && date >= formData.checkOutDate) {
      setErrorMessages((prev) => ({
        ...prev,
        checkInDate: "Check-in date cannot be later than or equal to check-out date",
      }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        checkInDate: "",
      }));
    }
  };
  

  const validateCheckOutDate = (date) => {
    if (date <= formData.checkInDate) {
      setErrorMessages((prev) => ({
        ...prev,
        checkOutDate: "Check-out date cannot be earlier or equal to check-in date",
      }));
    } else if (date < formattedMinCheckOutDate) {
      setErrorMessages((prev) => ({
        ...prev,
        checkOutDate: `Check-out date should be ${formattedMinCheckOutDate} or later`,
      }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        checkOutDate: "",
      }));
    }
  };

  return (
    <div>
      <div>
        <label className={`block font-medium mt-2 ${!tour.guestType.adult ? "text-gray-500" : ""}`}>
          {tour.guestType.adult
            ? "Number of Adults(Age 18+) *"
            : "Adults(Age 18+) not allowed"}
        </label>
        <input
          type="number"
          min="1"
          value={formData.guests.adult}
          onChange={(e) =>
            handleGuestChange("adult", Math.max(1, parseInt(e.target.value, 10) || 1))
          }
          className={`border-2 rounded-lg p-3 w-full ${!tour.guestType.adult ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
          disabled={!tour.guestType.adult}
        />
      </div>

      <div>
        <label className={`block font-medium mt-2 ${!tour.guestType.teen ? "text-gray-500" : ""}`}>
          {tour.guestType.teen ? "Number of Teens(13-17)*" : "Teens(13-17) not allowed"}
        </label>
        <input
          type="number"
          min="0"
          value={formData.guests.teen}
          onChange={(e) =>
            handleNumberChange("teen", e.target.value)
          }
          className={`border-2 rounded-lg p-3 w-full ${!tour.guestType.teen ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
          disabled={!tour.guestType.teen}
        />
      </div>


      <div>
        <label className={`block font-medium mt-2 ${!tour.guestType.child ? "text-gray-500" : ""}`}>
          {tour.guestType.child ? "Number of Children(2-12)*" : "Children(2-12) not allowed"}
        </label>
        <input
          type="number"
          min="0"
          value={formData.guests.child}
          onChange={(e) =>
            handleNumberChange("child", e.target.value)
          }
          className={`border-2 rounded-lg p-3 w-full ${!tour.guestType.child ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
          disabled={!tour.guestType.child}
        />
      </div>

      <div>
        <label className={`block font-medium mt-2 ${!tour.guestType.infant ? "text-gray-500" : ""}`}>
          {tour.guestType.infant ? "Number of Infants(Under 2)*" : "Infants(Under 2) not allowed"}
        </label>
        <input
          type="number"
          min="0"
          value={formData.guests.infant}
          onChange={(e) =>
            handleNumberChange("infant", e.target.value)
          }
          className={`border-2 rounded-lg p-3 w-full ${!tour.guestType.infant ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
          disabled={!tour.guestType.infant}
        />
      </div>


      <div>
        <label className={`block font-medium mt-2 ${!tour.guestType.pet ? "text-gray-500" : ""}`}>
          {tour.guestType.pet ? "Number of Pets*" : "Pets not allowed"}
        </label>
        <input
          type="number"
          min="0"
          value={formData.guests.pet}
          onChange={(e) =>
            handleNumberChange("pet", e.target.value)
          }
          className={`border-2 rounded-lg p-3 w-full ${!tour.guestType.pet ? "border-gray-300 bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
          disabled={!tour.guestType.pet}
        />
      </div>

       {/* Check-in date input */}
       <div>
        <label className="block font-medium mt-4">Check-in Date *</label>
        <input
          type="date"
          value={formData.checkInDate}
          onChange={(e) => {
            handleInputChange("checkInDate", e.target.value);
            validateCheckInDate(e.target.value);
          }}
          min={minCheckInDate}
          className="border-2 rounded-lg p-3 w-full border-gray-300"
        />
        {errorMessages.checkInDate && (
          <p className="text-red-500 text-sm mt-2">{errorMessages.checkInDate}</p>
        )}
      </div>

      {/* Check-out date input */}
      <div>
        <label className="block font-medium mt-4">Check-out Date *</label>
        <input
          type="date"
          value={formData.checkOutDate}
          onChange={(e) => {
            handleInputChange("checkOutDate", e.target.value);
            validateCheckOutDate(e.target.value);
          }}
          min={formattedMinCheckOutDate}
          className="border-2 rounded-lg p-3 w-full border-gray-300"
        />
        {errorMessages.checkOutDate && (
          <p className="text-red-500 text-sm mt-2">{errorMessages.checkOutDate}</p>
        )}
      </div>
    </div>
  );
};

export default TourDetails;
