import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=" text-dark-1 text-sm text-center w-full flex flex-col items-center pb-5">
      <div className='bg-gray-300 h-[1px] w-[50%]'></div>
      <div className="flex w-full items-center justify-center space-x-10 max-md:flex-col max-md:space-y-2 mt-2">
      <p className=''>© 2025 Desh Dekho | All rights reserved</p>
      <ul className='space-x-3'>
        <Link to="/contact" className='hover:underline '>Contact</Link>
        <Link to="/privacy-policy" className='hover:underline '>privacy</Link>
        <Link to="/terms&conditions" className='hover:underline '>Terms</Link>
      </ul>
      </div>
    </div>
  );
}

export default Footer;
