

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

const ResetPassword = () => {
  const queryParams = new URLSearchParams(location.search);
  const useremail = queryParams.get('user');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [user, setUser] = useState({
    password: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [getOtp, setGetOtp] = useState({
    email: useremail,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state for OTP request
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [timer]);

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        otpRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };


  const handleOtpPaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
  
    if (/^\d{6}$/.test(pastedData)) {
      // If pasted data is exactly 6 digits
      const newOtp = pastedData.split("");
      setOtp(newOtp);
  
      // Automatically focus the last input
      otpRefs.current[5]?.focus();
      e.preventDefault(); // Prevent default paste behavior
    }
  };
  
  

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "password") {
      validatePassword(value);
    }
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@&!%*?$]/.test(password),
    };
    setPasswordValidation(validation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);
    const start = Date.now();
    try {
        
        const serverUrl = process.env.NODE_ENV === 'development'                   
        ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/resetpassword`
        : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/resetpassword`

      const otpString = otp.join("");

      const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpString, ...user }),
      });

      const responseData = await response.json();
      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        setOtp(new Array(6).fill(""));
        setUser({ password: "" });
        navigate('/auth/login');
      } else {
        const errorMessages = Array.isArray(responseData.message) ? responseData.message : [responseData.message];
        toast.error(errorMessages.join("\n"), { id: loadingToastId, duration: 5000 });
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

  const handleNewOtpSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);

    const start = Date.now();

    try {

        const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/forgotpassword`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/forgotpassword`;
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getOtp),
      });

      const responseData = await response.json();

      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        setTimer(60); // Reset the timer after requesting a new OTP
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex items-center justify-center p-5 flex-col shadow-md border-2 rounded-lg w-80  bg-white">
        <h1 className="w-full pb-5 flex items-center justify-center text-primarycolor text-2xl font-bold">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="otp" className="font-semibold">
            OTP
          </label>
          <div className="flex justify-between mb-5">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpInput(e, index)}
                onPaste={handleOtpPaste}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
                className="bg-gray-200 w-10 h-10 text-center text-lg outline-none"
                required
              />
            ))}
          </div>

          <label htmlFor="password" className="font-semibold">
            New Password
          </label>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your password"
              autoComplete="new-password"
              required
              value={user.password}
              onChange={handleInput}
              className="bg-gray-200 w-full p-2 outline-none pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {showPassword ? (
                <RxEyeOpen className="cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <RxEyeClosed className="cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>

          <ul className="text-xs list-disc pl-5 my-5">
            <li
              className={
                passwordValidation.length ? "text-green-600" : "text-red-600"
              }
            >
              Password must be at least 6 characters long.
            </li>
            <li
              className={
                passwordValidation.uppercase ? "text-green-600" : "text-red-600"
              }
            >
              Password must include at least 1 uppercase letter.
            </li>
            <li
              className={
                passwordValidation.lowercase ? "text-green-600" : "text-red-600"
              }
            >
              Password must include at least 1 lowercase letter.
            </li>
            <li
              className={
                passwordValidation.number ? "text-green-600" : "text-red-600"
              }
            >
              Password must include at least 1 number.
            </li>
            <li
              className={
                passwordValidation.specialChar
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              Password must include at least 1 special character (@,&,!,%,*,? or
              $).
            </li>
          </ul>

          <button
            onClick={handleNewOtpSubmit}
            className={`${timer>0 ? 'bg-gray-500': 'bg-primarycolor'} w-full p-2 text-white font-semibold`}
            disabled={isLoading || timer > 0} // Disable the button while the timer is active
          >
            Request New OTP {timer > 0 && `(${timer}s)`}
          </button>

          <button
            type="submit"
            className="bg-primarycolor w-full p-2 mb-5 mt-2 text-white font-semibold"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
        <div>Already have an account?{" "}<Link to="/auth/login" className='font-semibold text-primarycolor text-sm'>Login</Link></div>
        <div>Don't have an account?{" "}<Link to="/auth/signup" className='font-semibold text-primarycolor text-sm'>Sign up</Link></div>
      </div>
    </div>
  );
};

export default ResetPassword;
