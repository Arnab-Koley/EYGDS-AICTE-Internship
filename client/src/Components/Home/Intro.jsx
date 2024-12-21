import React from "react";
import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from '../../assets/img/img3.png'
import vid1 from "../../assets/video/vid1.mp4";

import { MdOutlineTravelExplore } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-cards"


import { EffectCards, Autoplay, Pagination, Navigation } from "swiper/modules";

const Intro = () => {
  return (
    <div className="flex justify-center mt-20 max-md:flex-col max-md:items-center ">
      
      <div className="md:w-1/3 max-md:px-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-bold text-4xl lg:text-5xl max-md:text-2xl">
          Travelling Opens the Door to Creating Memories
        </h1>
        <h3 className="text-gray-600 mt-5 md:text-lg">
          Explore new destinations, experience vibrant cultures, and create
          unforgettable moments. Start your journey today and cherish memories
          that last a lifetime.
        </h3>
        <button className="bg-primarycolor px-5 py-3 space-x-2 rounded-full flex items-center justify-center text-white mt-5"><MdOutlineTravelExplore size={20}/><span>Explore</span></button>
      </div>

      <div className=" md:w-1/3 max-md:mt-10  w-full " >
        <Swiper
         centeredSlides={true}
         grabCursor={true}
         loop={true}
         slidesPerView={'auto'}
          effect={"cards"}
          modules={[EffectCards, Pagination, Navigation]}
          className=" flex  w-48 z-5"
        >
          <SwiperSlide className="flex items-center justify-center">
              <img src={img1} alt="Destination 1" className="rounded-lg"/>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <img src={img2} alt="Destination 2" className="rounded-lg"/>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
              <img src={img3} alt="Destination 2" className="rounded-lg"/>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
              <img src={img3} alt="Destination 2" className="rounded-lg"/>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
              <img src={img3} alt="Destination 2" className="rounded-lg"/>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
              <img src={img3} alt="Destination 2" className="rounded-lg"/>
          </SwiperSlide>
          
        </Swiper>
       
      </div>

      
     
    </div>
  );
};

export default Intro;
