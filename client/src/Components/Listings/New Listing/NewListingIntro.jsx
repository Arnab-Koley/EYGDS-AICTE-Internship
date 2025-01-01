import React from 'react';
import step1img from '../../../assets/img/step1.png';
import step2img from '../../../assets/img/step2.png';
import step3img from '../../../assets/img/step3.png';


const NewListingIntro = ({ handleNavigation }) => {

  return (
    <div className="w-full">
      
      <div className=' flex max-md:flex-col'>
      <div className='md:w-1/2  flex items-center md:p-10 max-md:px-10 max-md:pt-5'>
          <h1 className='lg:text-5xl text-4xl max-md:text-2xl '>It's easy to get started on Desh Dekho</h1>
      </div>
      <div className='md:w-1/2 md:p-10 max-md:px-10 max-md:py-5 '>
          <div className='flex space-x-3'>
            <h2 className='text-2xl max-md:text-xl font-semibold'>1</h2>
            <div className='flex flex-col'>
              <h3 className='text-2xl max-md:text-xl font-semibold mb-2'>Tell us about your place</h3>
              <p className='md:text-xl'>Share some basic info, such as type of your property & where it is</p>
            </div>
            <img src={step1img} alt="" className='h-28' />
          </div>
          <div className='h-[1px] bg-gray-500 w-full my-3'></div>
          <div className='flex space-x-3'>
            <h2 className='text-2xl max-md:text-xl font-semibold'>2</h2>
            <div className='flex flex-col'>
              <h3 className='text-2xl max-md:text-xl font-semibold mb-2'>Make it stand out</h3>
              <p className='md:text-xl'>Add photo, title and description </p>
            </div>
            <img src={step2img} alt="" className='h-28' />
          </div>
          <div className='h-[1px] bg-gray-500 w-full my-3'></div>
          <div className='flex space-x-3'>
            <h2 className='text-2xl max-md:text-xl font-semibold'>3</h2>
            <div className='flex flex-col'>
              <h3 className='text-2xl max-md:text-xl font-semibold mb-2'>Finish up and publish</h3>
              <p className='md:text-xl'>Give more details, set price then publish your listing.</p>
            </div>
            <img src={step3img} alt="" className='h-28' />
          </div>
      </div>
      </div>
      <div className='w-full flex justify-end pr-16 max-md:pr-10 pb-5'>
        <button
          onClick={() => handleNavigation(1)}
          className="bg-primarycolor text-white px-6 py-3 rounded-lg text-xl"
        >
          Get Started
        </button>
      </div>
      
    </div>
  );
};

export default NewListingIntro;
