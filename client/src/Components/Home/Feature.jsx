import React from "react";
import f11 from "../../assets/img/featured/f1/11.avif";
import f12 from "../../assets/img/featured/f1/12.avif";
import f13 from "../../assets/img/featured/f1/13.avif";
import f14 from "../../assets/img/featured/f1/14.avif";

import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-flip";

import { EffectFlip, Autoplay, Pagination, Navigation } from "swiper/modules";

const Feature = () => {
  return (
    <div className="px-10 mt-10 flex flex-col items-center ">

      <div className="flex">
        <h1 className="text-3xl max-md:text-xl text-white px-5 py-3 rounded-lg bg-primarycolor flex">
          Our Featured Tour
        </h1>
      </div>

      <ul className="w-full flex flex-wrap items-center justify-center mt-5">
      

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      <li className="bg-white px-3 m-2 cursor-pointer flex flex-col justify-center items-center shadow-md rounded-lg">
       <div className="w-full flex justify-between ">
        <div className="relative top-10 left-3  z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2"><FaRegStar size={15} color="black" /><span className="text-black text-sm">4.6</span></div>
        <FaHeart size={25} className=" text-black opacity-70 z-10 top-10 right-5 relative" />
        </div>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          effect={"flip"}
          modules={[EffectFlip, Pagination, Navigation]}
          className="flex h-64 w-72" // Define consistent height and width
        >
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f11}
              alt="Destination 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f12}
              alt="Destination 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f13}
              alt="Destination 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center ">
            <img
              src={f14}
              alt="Destination 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
        <h3 className="font-semibold text-dark-1">Guest house in Siridao</h3>
        <h3 className="text-sm text-gray-500">Raia The Beach House</h3>
      </li>

      
      

      </ul>

      
    </div>
  );
};

export default Feature;
