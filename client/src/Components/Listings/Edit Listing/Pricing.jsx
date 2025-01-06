import React, { useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Import toggle styles (if needed)
import { MdCurrencyRupee } from "react-icons/md";

const Pricing = ({ data, updateData }) => {
  const { guestType, price } = data;

  const handleToggleChange = (type) => {
    const updatedGuestType = {
      ...guestType,
      [type]: !guestType[type],
    };
    updateData("guestType", updatedGuestType);
  };

  const handlePriceChange = (guestType, value) => {
    // Ensure the value is a number or empty string and is not negative
    let numericValue = value.trim(); // Trim to remove extra spaces
    
    // If value is empty, set to '0', otherwise, parse the number correctly
    if (numericValue === "") {
      numericValue = "0";
    } else {
      // Remove leading zeros
      numericValue = numericValue.replace(/^0+/, "");
    }

    // Update the state with the final value
    const updatedPrice = { ...price, [guestType]: numericValue };
    updateData('price', updatedPrice); // Update parent state with new price
  };

  return (
    <div className="md:px-20 ">
      <h1 className="text-xl font-semibold mt-5">
        Allowed Guest
      </h1>
      <div className="space-y-3 mt-2 font-medium w-60">
        {/* Adult Toggle (disabled and default true) */}
        <div className="flex items-center justify-between">
          <div>Adult <span className=" text-sm font-normal">(Age 18+)</span></div>
          <Toggle defaultChecked={true} disabled />
        </div>

        {/* Teen Toggle */}
        <div className="flex items-center justify-between">
          <div>Teen <span className="text-base font-normal">(13-17)</span></div>
          <Toggle
            checked={guestType.teen}
            onChange={() => handleToggleChange("teen")}
          />
        </div>

        {/* Child Toggle */}
        <div className="flex items-center justify-between">
          <div>Child <span className="text-base font-normal">(2-12)</span></div>
          <Toggle
            checked={guestType.child}
            onChange={() => handleToggleChange("child")}
          />
        </div>

        {/* Infant Toggle */}
        <div className="flex items-center justify-between">
          <div>Infant <span className="text-base font-normal">(Under 2)</span></div>
          <Toggle
            checked={guestType.infant}
            onChange={() => handleToggleChange("infant")}
          />
        </div>

        {/* Pet Toggle */}
        <div className="flex items-center justify-between">
          <div>Pet</div>
          <Toggle
            checked={guestType.pet}
            onChange={() => handleToggleChange("pet")}
          />
        </div>
      </div>

      <div className=" space-y-2 mt-7">
      <h1 className="text-xl font-semibold">
        Pricing
      </h1>
        <div className="flex  flex-col  ">
          <div className=''>Adult <span className="text-sm font-normal">(Age 18+)</span></div>
          <div className='flex items-center space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center rounded-l-md p-2 bg-gray-300'>
                <MdCurrencyRupee size={25} />
              </div>
              <input
                type="number"
                value={price.adult}
                onChange={(e) => handlePriceChange('adult', e.target.value)}
                className="outline-none w-full pl-3"
              />
            </div>
            <span className='text-sm'>/night</span>
          </div>
        </div>

        {/* Teen Price Input */}
        <div className="flex flex-col ">
          <div className=''>Teen <span className="text-sm font-normal">(13-17)</span></div>
          <div className='flex items-center  space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center rounded-l-md p-2 bg-gray-300'>
                <MdCurrencyRupee size={25} />
              </div>
              <input
                type="number"
                value={price.teen}
                onChange={(e) => handlePriceChange('teen', e.target.value)}
                className="outline-none w-full pl-3"
              />
            </div>
            <span className='text-sm'>/night</span>
          </div>
        </div>

        {/* Child Price Input */}
        <div className="flex flex-col ">
          <div className=''>Child <span className="text-sm font-normal">(2-12)</span></div>
          <div className='flex items-center space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center rounded-l-md p-2 bg-gray-300'>
                <MdCurrencyRupee size={25} />
              </div>
              <input
                type="number"
                value={price.child}
                onChange={(e) => handlePriceChange('child', e.target.value)}
                className="outline-none w-full pl-3"
              />
            </div>
            <span className='text-sm'>/night</span>
          </div>
        </div>

        {/* Infant Price Input */}
        <div className="flex  flex-col">
          <div className=''>Infant <span className="text-sm font-normal">(Under 2)</span></div>
          <div className='flex items-center  space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center rounded-l-md p-2 bg-gray-300'>
                <MdCurrencyRupee size={25} />
              </div>
              <input
                type="number"
                value={price.infant}
                onChange={(e) => handlePriceChange('infant', e.target.value)}
                className="outline-none w-full pl-3"
              />
            </div>
            <span className='text-sm'>/night</span>
          </div>
        </div>

        {/* Pet Price Input */}
        <div className="flex  flex-col ">
          <div className=''>Pet</div>
          <div className='flex items-center  space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center rounded-l-md p-2 bg-gray-300'>
                <MdCurrencyRupee size={25} />
              </div>
              <input
                type="number"
                value={price.pet}
                onChange={(e) => handlePriceChange('pet', e.target.value)}
                className="outline-none w-full pl-3"
              />
            </div>
            <span className='text-sm'>/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;