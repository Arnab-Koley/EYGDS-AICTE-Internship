import React, { useState,useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewListingIntro from "./NewListingIntro";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from "../../../Context/AuthContext";

import Step1Intro from "./Step1Intro";
import Step2Intro from "./Step2Intro";
import Step3Intro from "./Step3Intro";

import Step1Ques1 from "./Step1Ques1";
import Step1Ques2 from "./Step1Ques2";
import Step1Ques3 from "./Step1Ques3";
import Step1Ques4 from "./Step1Ques4";

import Step2Ques1 from "./Step2Ques1";
import Step2Ques2 from "./Step2Ques2";
import Step2Ques3 from "./Step2Ques3";

import Step3Ques1 from "./Step3Ques1";
import Step3Ques2 from "./Step3Ques2";
import Step3Ques3 from "./Step3Ques3";
import Step3Ques4 from "./Step3Ques4";
import Step3Ques5 from "./Step3Ques5";

const NewListing = () => {
  const {auth} = useContext(AuthContext);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavigation = (stepDirection) => {
    setDirection(stepDirection); 
    setCurrentScreen((prev) => prev + stepDirection);
  };


  const [listingData, setListingData] = useState({
    geography: [],
    propertyType: "",
    accommodationType: "",
    address: {
      country: "India",
      flatHouse: "",
      streetAddress: "",
      landmark: "",
      districtLocality: "",
      city: "",
      state: "",
      pinCode: "",
      specificLocation: {
        lat: 0,
        lng: 0,
      },
    },
    title: "",
    description: "",
    coverPhoto: "",
    basics: {
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: [],
    standoutAmenities: [],
    safetyItems: [],
    guestType: {
      adult: true,
      teen: true,
      child: true,
      infant: true,
      pet: true,
    },
    price: {
      adult: 300,
      teen: 200,
      child: 100,
      infant: 0,
      pet: 0,
    },
    safetyDetails: {
      exteriorSecurityCamera: false,
      noiseDecibelMonitor: false,
      weaponsOnProperty: false,
      safetyInfo: "",
    },
  });

  const updateListingData = (field, value) => {
    setListingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = async () => {
    if (isSubmitting) return;
  setIsSubmitting(true);
    const loadingToastId = toast.loading("Creating Listing...");
    const start = Date.now();
    try {
      const serverUrl =
          process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/createlisting`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/createlisting`;
  
      const token = localStorage.getItem("token");
  
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);

        setListingData({
          geography: [],
          propertyType: "",
          accommodationType: "",
          address: {
            country: "India",
            flatHouse: "",
            streetAddress: "",
            landmark: "",
            districtLocality: "",
            city: "",
            state: "",
            pinCode: "",
            specificLocation: "",
          },
          title: "",
          description: "",
          coverPhoto: "",
          basics: {
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
          },
          amenities: [],
          standoutAmenities: [],
          safetyItems: [],
          guestType: {
            adult: true,
            teen: true,
            child: true,
            infant: true,
            pet: true,
          },
          price: {
            adult: 300,
            teen: 200,
            child: 100,
            infant: 0,
            pet: 0,
          },
          safetyDetails: {
            exteriorSecurityCamera: false,
            noiseDecibelMonitor: false,
            weaponsOnProperty: false,
            safetyInfo: "",
          },
        });
  
        navigate(-1); 
      } else {
        throw new Error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000 });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsSubmitting(false);
    }
  };

  const screens = [
    <NewListingIntro handleNavigation={handleNavigation} />,
    <Step1Intro handleNavigation={handleNavigation} />,
    <Step1Ques1
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step1Ques2
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step1Ques3
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step1Ques4
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step2Intro handleNavigation={handleNavigation} />,
    <Step2Ques1
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step2Ques2
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step2Ques3
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step3Intro handleNavigation={handleNavigation} />,
    <Step3Ques1
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step3Ques2
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step3Ques3
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step3Ques4
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
    />,
    <Step3Ques5
      data={listingData}
      updateData={updateListingData}
      handleNavigation={handleNavigation}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />,
  ];

  const progressStep1 =
    currentScreen <= 2
      ? 0
      : currentScreen > 2 && currentScreen <= 5
      ? ((currentScreen - 2) / 4) * 100
      : 100;
  const progressStep2 =
    currentScreen <= 7
      ? 0
      : currentScreen > 7 && currentScreen <= 9
      ? ((currentScreen - 7) / 3) * 100
      : 100;
  const progressStep3 =
    currentScreen <= 11
      ? 0
      : currentScreen > 11 && currentScreen <= 14
      ? ((currentScreen - 11) / 4) * 100
      : 100;

  
     
      

  return (
    <div className=" overflow-x-hidden">
      <div className="w-full flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center border-dark-1 text-dark-1 rounded-full border-2 mt-10 ml-10 py-1 px-5"
        >
          <span className="text-xl">Exit</span>
        </button>
      </div>

      <div
        className={`flex my-10 space-x-5 max-md:space-x-2 px-10 ${
          currentScreen < 2 ? "hidden" : "block"
        }`}
      >
        <div className="relative w-full bg-gray-300 h-2 rounded">
          <motion.div
            className="h-full bg-blue-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progressStep1}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="relative w-full bg-gray-300 h-2 rounded">
          <motion.div
            className="h-full bg-blue-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progressStep2}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="relative w-full bg-gray-300 h-2 rounded">
          <motion.div
            className="h-full bg-blue-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progressStep3}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{
            opacity: 1,
            x:
              currentScreen < 1
                ? 0
                : direction === 1
                ? 300
                : direction === -1
                ? -300
                : 0,
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NewListing;
