import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loadingToastId = toast.loading("Verifying...");

    try {
      const serverUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000/api/auth/verifyotp' 
        : 'https://deshdekho.onrender.com/api/auth/verifyotp';
        
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.msg);
        // Redirect to login page after successful verification
        navigate("/auth/login");
      } else {
        toast.error(responseData.message, { id: loadingToastId, duration: 5000, position: 'top-center' });
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000, position: 'top-center' });
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <div className='flex items-center justify-center p-5 flex-col shadow-md border-2 rounded-lg w-80 bg-white'>
        <h1 className='w-full pb-5 flex items-center justify-center text-primarycolor text-2xl font-bold'>
          Email Verification
        </h1>
        <form onSubmit={handleVerify} autoComplete="on" className='w-full'>
          <label htmlFor="verificationCode" className='font-semibold'>Verification Code</label>
          <input
            type='text'
            name='verificationCode'
            placeholder='Enter verification code'
            required
            value={verificationCode}
            onChange={handleInput}
            className='bg-gray-200 w-full p-2 outline-none mb-2'
          />

          <button
            type='submit'
            className='bg-primarycolor w-full p-2 text-white font-semibold'
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
