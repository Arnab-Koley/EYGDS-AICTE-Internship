import React from "react";
import { RiRoadMapFill } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";

const Service = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-24 max-md:mt-10">
      <h1 className="font-semibold  my-10 max-md:my-8 text-3xl max-md:text-2xl border-2 border-primarycolor px-5 py-2 rounded-lg text-primarycolor hover:bg-primarycolor hover:text-white cursor-pointer">
        What we serve
      </h1>
      <ul className="w-full flex flex-wrap items-center justify-center">
        <li className=" shadow-md p-3 flex items-center justify-center flex-col text-center w-64  h-52 bg-white rounded-lg m-1 border-2 hover:scale-110 hover:border-primarycolor cursor-pointer">
          <div className=" border-2 border-primarycolor p-3 rounded-full text-primarycolor">
            <RiRoadMapFill size={25} />
          </div>
          <h3 className="my-3 text-sm font-semibold">
            Handpicked Destinations
          </h3>
          <p className="text-xs">
            Discover a wide range of beautiful and unique destinations curated
            just for you. From scenic mountains to pristine beaches, we have it
            all.
          </p>
        </li>

        <li className="shadow-md p-3 flex items-center justify-center flex-col text-center w-64  h-52 bg-white rounded-lg m-1 border-2 hover:scale-110 hover:border-primarycolor cursor-pointer">
          <div className=" border-2 border-primarycolor p-3 rounded-full text-primarycolor">
            <IoTicketOutline size={25} />
          </div>
          <h3 className="my-3 text-sm font-semibold">
            Seamless Booking Experience
          </h3>
          <p className="text-xs">
            Enjoy a hassle-free booking process with our easy-to-use platform.
            Reserve rooms, tours, and activities in just a few clicks.
          </p>
        </li>

        <li className=" shadow-md p-3 flex items-center justify-center flex-col text-center w-64  h-52 bg-white rounded-lg m-1 border-2 hover:scale-110 hover:border-primarycolor cursor-pointer">
          <div className=" border-2 border-primarycolor p-3 rounded-full text-primarycolor">
            <FaMoneyBillWave size={25} />
          </div>
          <h3 className="my-3 text-sm font-semibold">Affordable Packages</h3>
          <p className="text-xs">
            Explore budget-friendly travel packages without compromising on
            comfort or experience. We offer plans for every budget.
          </p>
        </li>

        <li className=" shadow-md p-3 flex items-center justify-center flex-col text-center w-64  h-52 bg-white rounded-lg m-1 border-2 hover:scale-110 hover:border-primarycolor cursor-pointer">
          <div className=" border-2 border-primarycolor p-3 rounded-full text-primarycolor">
            <RiCustomerService2Fill size={25} />
          </div>
          <h3 className="my-3 text-sm font-semibold">24/7 Customer Support</h3>
          <p className="text-xs">
            Our team is available round-the-clock to assist you with queries,
            bookings, and any unforeseen travel issues.
          </p>
        </li>

        <li className=" shadow-md p-3 flex items-center justify-center flex-col text-center w-64  h-52 bg-white rounded-lg m-1 border-2 hover:scale-110 hover:border-primarycolor cursor-pointer">
          <div className=" border-2 border-primarycolor p-3 rounded-full text-primarycolor">
            <MdVerifiedUser size={25} />
          </div>
          <h3 className="my-3 text-sm font-semibold">
            Verified Accommodations & Hosts
          </h3>
          <p className="text-xs">
            Stay worry-free with trusted and verified hosts. All accommodations
            are checked to ensure safety and quality for our travelers.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Service;
