import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { MdVerifiedUser } from "react-icons/md";
import { MdError } from "react-icons/md";

const PhoneVerification = (props) => {
  const user = props.user;
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [initialOtp, setInitialOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [phoneVerified, setPhoneVerified] = useState(user.isPhoneVerified);
  const otpRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

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
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
      e.preventDefault();
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
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    setOtp(new Array(6).fill(""));
    const loadingToastId = toast.loading("Loading...");
    setIsLoading(true);
    const start = Date.now();
    try {
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${
              import.meta.env.VITE_API_DEVELOPMENT_URL
            }/auth/verifyphonerequest`
          : `${
              import.meta.env.VITE_API_PRODUCTION_URL
            }/auth/verifyphonerequest`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: `+91${phone}` }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        if (!initialOtp) {
          setInitialOtp(true);
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
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/verifyphone`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/verifyphone`;

      const token = localStorage.getItem("token");

      const otpString = otp.join("");

      const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: `+91${phone}`, otp: otpString }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        props.setUser((prev) => ({
          ...prev,
          phone: `+91${phone}`,
          isPhoneVerified: true,
        }));
        setOtp(new Array(6).fill(""));
        setPhoneVerified(true);
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
      {phoneVerified ? (
        <div className="flex items-center  space-x-1">
          <MdVerifiedUser className="text-green-600" size={25} />
          <span>Your Phone is verified</span>
        </div>
      ) : (
        <div>
          {initialOtp ? (
            <div className="mt-1 flex">
              <form onSubmit={handleSubmit} className="">
                <label htmlFor="otp" className="">
                  Enter the OTP sent to your phone
                </label>
                <h3 className="text-sm text-gray-500">
                  *(Check Email For OTP)
                </h3>
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
              <div className="flex items-center space-x-1 text-red-600 my-1">
                <MdError className="text-red-600" size={25} />
                <span>Your Phone is not verified yet</span>
              </div>
              <label htmlFor="phone" className="block mb-2">
                Enter your 10-digit mobile number
              </label>
              <div className="flex items-center mb-2">
                <span className="bg-gray-300 p-2 border border-gray-300 rounded-l">
                  +91
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full p-2 border border-gray-300 rounded-r outline-none"
                  placeholder="Enter mobile number"
                />
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

export default PhoneVerification;
