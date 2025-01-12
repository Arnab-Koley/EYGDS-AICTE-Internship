import React, { useState } from 'react';
import { MdCurrencyRupee } from "react-icons/md";

const Step3Ques4 = ({ data, updateData, handleNavigation }) => {
  const [price, setPrice] = useState(data.price);

  const handlePriceChange = (guestType, value) => {
   
    let numericValue = value.trim(); 
    if (numericValue === "") {
      numericValue = "0";
    } else {
      numericValue = numericValue.replace(/^0+/, "");
    }
  
    setPrice((prevPrice) => {
      const updatedPrice = { ...prevPrice, [guestType]: numericValue };
      updateData('price', updatedPrice); 
      return updatedPrice;
    });
  };
  
  

  return (
    <div className="flex flex-col lg:px-80 px-20 max-md:px-5">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
      Now, set your price
      </h1>
      <p className="text-center mt-2">You can change it anytime.</p>

      <div className="space-y-5 mt-10 text-xl max-sm:text-base font-medium">
        


        <div className="flex items-center justify-between">
          <div className='w-2/5'>Adult <span className="text-base font-normal">(Age 18+)</span></div>
          <div className='flex items-center w-3/5 space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center  rounded-l-md p-2 bg-gray-300'>
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

        <div className="flex items-center justify-between">
          <div className='w-2/5'>Teen <span className="text-base font-normal">(13-17)</span></div>
          <div className='flex items-center w-3/5 space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center  rounded-l-md p-2 bg-gray-300'>
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

        <div className="flex items-center justify-between">
          <div className='w-2/5'>Child <span className="text-base font-normal">(2-12)</span></div>
          <div className='flex items-center w-3/5 space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center  rounded-l-md p-2 bg-gray-300'>
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


        <div className="flex items-center justify-between">
          <div className='w-2/5'>Infant <span className="text-base font-normal">(Under 2)</span></div>
          <div className='flex items-center w-3/5 space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center  rounded-l-md p-2 bg-gray-300'>
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

  
        <div className="flex items-center justify-between">
          <div className='w-2/5'>Pet</div>
          <div className='flex items-center w-3/5 space-x-1'>
            <div className='border-2 rounded-md flex items-center'>
              <div className='flex items-center justify-center  rounded-l-md p-2 bg-gray-300'>
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

export default Step3Ques4;
