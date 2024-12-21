

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);

    const start = Date.now();

    try {
      const serverUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000/api/auth/forgotpassword' 
        : 'https://deshdekho.onrender.com/api/auth/forgotpassword';
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        navigate(`/auth/resetpassword?user=${user.email}`);
        setUser({ email: "" });
      } else {
        throw new Error(responseData.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000 });
    } finally {
      setIsLoading(false);
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <div className='flex items-center justify-center p-5 flex-col shadow-md border-2 rounded-lg w-80 bg-white'>
        <h1 className='w-full pb-5 flex items-center justify-center text-primarycolor text-2xl font-bold'>
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className='w-full'>
          <label htmlFor="email" className='font-semibold'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='Enter email'
            autoComplete='email'
            required
            value={user.email}
            onChange={handleInput}
            className='bg-gray-200 w-full p-2 outline-none mb-2'
          />
          <button
            type='submit'
            className='bg-primarycolor w-full p-2 my-5 text-white font-semibold'
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
        <div>Already have an account?{" "}<Link to="/auth/login" className='font-semibold text-primarycolor text-sm'>Login</Link>
        <div>Don't have an account?{" "}<Link to="/auth/signup" className='font-semibold text-primarycolor text-sm'>Sign up</Link></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
