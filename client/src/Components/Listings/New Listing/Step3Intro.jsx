import React, { useRef, useEffect } from 'react';
import step1video from '../../../assets/video/step2.mp4';
import { IoIosArrowRoundBack } from "react-icons/io";

const Step3Intro = ({ handleNavigation }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div>
      <div className="w-full flex max-md:flex-col max-md:space-y-5 ">
      <div className="md:w-1/2 flex flex-col mx-32 max-md:mx-10 justify-center space-y-3   ">
        <h3 className='text-xl font-semibold'>Step 3</h3>
        <h1 className='lg:text-5xl text-4xl max-md:text-2xl '>Finish up and publish</h1>
        <p className=' text-2xl md:text-xl max-md:text-base'>
        Finally, you'll set some more details, set up pricing and publish your listing.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <video
          ref={videoRef}
          src={step1video}
          className="h-80 max-md:h-52 border-none"
          controls={false}
          loop={false}
          onEnded={() => console.log("Video has ended")}
        />
      </div>
    </div>
    <div className='flex justify-between px-32 max-md:px-10 py-10 max-md:py-5 items-center'>
      <button onClick={() => handleNavigation(-1)} className=' border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1'>
      <IoIosArrowRoundBack size={25}/>
        <span>Back</span>
        </button>
      <button onClick={() => handleNavigation(1)} className='bg-primarycolor text-white px-10 py-3 rounded-lg text-2xl'>Next</button>
    </div>
    </div>
  );
};

export default Step3Intro;
