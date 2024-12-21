import React from 'react';
import { PiSmileySad } from "react-icons/pi";
import { Link } from 'react-router-dom';

const NavigationError = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-5 mt-20">
      <h1 className="text-4xl font-semibold text-gray-800">😔 Oops!</h1>
      <p className="text-xl text-gray-600 mt-2">We can't seem to find the page you're looking for.</p>
      <p className="text-lg text-red-500 mt-2">Error code: 404</p>

      <p className="mt-4 text-lg text-gray-700">Here are some helpful links instead:</p>

      <div className="mt-5 space-x-5">
        <Link to="/home" className="text-primarycolor font-semibold hover:underline">Home</Link>
        <Link to="/tour" className="text-primarycolor font-semibold hover:underline">Tour</Link>
        <Link to="/help" className="text-primarycolor font-semibold hover:underline">Help Center</Link>
      </div>
    </div>
  );
};

export default NavigationError;
