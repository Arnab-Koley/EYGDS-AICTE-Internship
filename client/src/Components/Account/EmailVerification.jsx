import React, { useContext, useState, useRef, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

import { MdVerifiedUser } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { MdError } from "react-icons/md";

const EmailVerification = (props) => {
  const user = props.user;
  const { auth, logout } = useContext(AuthContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [initialOtp, setinitialOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const [mailVerified, setMailVerified] = useState(user.isMailVerified);

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

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setOtp(new Array(6).fill(""));
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);
    const start = Date.now();
    try {
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${
              import.meta.env.VITE_API_DEVELOPMENT_URL
            }/auth/verifyemailrequest`
          : `${
              import.meta.env.VITE_API_PRODUCTION_URL
            }/auth/verifyemailrequest`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        if (!initialOtp) {
          setinitialOtp(true);
        }

        setTimer(60);
      } else {
        throw new Error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000 });
    } finally {
      setIsLoading(false);
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);
    const start = Date.now();
    try {
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/verifyemail`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/verifyemail`;

      const token = localStorage.getItem("token");

      const otpString = otp.join("");

      const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const responseData = await response.json();
      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        props.setUser((prev) => ({ ...prev, isMailVerified: true }));
        setOtp(new Array(6).fill(""));
        setMailVerified(true);

      } else {
        const errorMessages = Array.isArray(responseData.message)
          ? responseData.message
          : [responseData.message];
        toast.error(errorMessages.join("\n"), {
          id: loadingToastId,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000 });
    } finally {
      setIsLoading(false);
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div>
      {mailVerified ? (
        <div className="flex items-center space-x-1">
          <MdVerifiedUser className="text-green-600" size={25}/>
          <span>Your Email is verified</span>
        </div>
      ) : (
        <div className="">
          {initialOtp ? (
            <div className="mt-1 flex">
              <form onSubmit={handleSubmit} className="">
                <label htmlFor="otp" className="">
                  Enter the OTP sent to your email
                </label>
                <div className="flex justify-between my-2">
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

                <button
                  onClick={handleOtpRequest}
                  className={`${
                    timer > 0 ? "bg-gray-500" : "bg-primarycolor"
                  } w-full p-1 text-white font-semibold`}
                  disabled={isLoading || timer > 0}
                >
                  Request New OTP {timer > 0 && `(${timer}s)`}
                </button>

                <button
                  type="submit"
                  className="bg-primarycolor w-full p-1 mt-2 text-white font-semibold"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="">
              <div className="flex items-center  space-x-1 text-red-600 my-1">
                <MdError className="text-red-600" size={25} />
                <span>Your Email is not verified yet</span>
              </div>

              <form onSubmit={handleOtpRequest} className="w-full">
                <button
                  type="submit"
                  className="bg-primarycolor p-1 w-full text-white font-semibold"
                  disabled={isLoading}
                >
                  Verify Now
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
