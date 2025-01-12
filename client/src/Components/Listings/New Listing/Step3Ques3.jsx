import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; 

const Step3Ques3 = ({ data, updateData, handleNavigation }) => {
  const { guestType } = data;

  const handleToggleChange = (type) => {
    const updatedGuestType = {
      ...guestType,
      [type]: !guestType[type],
    };
    updateData("guestType", updatedGuestType);
  };

  return (
    <div className="flex flex-col lg:px-80 px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Set the allowed guest type
      </h1>
      <p className="text-center mt-2">Specify the guest you are allowing. You can can change it later.</p>

      <div className="space-y-5 mt-10 text-xl font-medium">
     
        <div className="flex items-center justify-between">
          <div>Adult <span className="text-base font-normal">(Age 18+)</span></div>
          <Toggle defaultChecked={true} disabled />
        </div>

        <div className="flex items-center justify-between">
          <div>Teen <span className="text-base font-normal">(13-17)</span></div>
          <Toggle
          checked={guestType.teen}
          onChange={() => handleToggleChange("teen")}
           />
        </div>
        <div className="flex items-center justify-between">
        <div>Child <span className="text-base font-normal">(2-12)</span></div>
          <Toggle
            checked={guestType.child}
            onChange={() => handleToggleChange("child")}
          />
        </div>

   
        <div className="flex items-center justify-between">
        <div>Infant <span className="text-base font-normal">(Under 2)</span></div>
          <Toggle
            checked={guestType.infant}
            onChange={() => handleToggleChange("infant")}
          />
        </div>

      
        <div className="flex items-center justify-between">
        <div>Pet</div>
          <Toggle
            checked={guestType.pet}
            onChange={() => handleToggleChange("pet")}
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-10">
     
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          Back
        </button>

     
        <button
          onClick={() => handleNavigation(1)}
          className="bg-primarycolor text-white px-10 py-3 rounded-lg text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Ques3;
