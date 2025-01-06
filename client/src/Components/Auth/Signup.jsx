import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    gender: "Male",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

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
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/signup`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/signup`;
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
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        setUser({ email: "", name: "", password: "", gender: "Male" });
        navigate("/auth/login");
      } else {
        const errorMessages = Array.isArray(responseData.message)
          ? responseData.message
          : [responseData.message];
        const combinedMessages = errorMessages.join("\n");
        toast.error(combinedMessages, {
          id: loadingToastId,
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error) {
      const errorMessages = Array.isArray(error.message)
        ? error.message
        : [error.message];
      const combinedMessages = errorMessages.join("\n");
      toast.error(combinedMessages, {
        id: loadingToastId,
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (response) => {
    const loadingToastId = toast.loading("Loading..."); // Define the toast
    const start = Date.now(); // Start time to calculate the delay

    try {


          const serverUrl = process.env.NODE_ENV === 'development'                   
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/gauth/google-login`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/gauth/google-login`

      const res = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success(responseData.msg, { id: loadingToastId });
        login(responseData.token, responseData.userId, responseData.verified);
      } else {
        throw new Error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      const elapsed = Date.now() - start;
      // Ensure at least 2 seconds of loading
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId); // Dismiss the toast after 2 seconds
      setIsLoading(false); // If applicable
    }
  };

  return (
    <div className="flex justify-center w-full ">
      <div className="flex  justify-center flex-col shadow-md border-2 rounded-lg w-80 md:w-[30%] bg-white my-10 p-5">
        <h1 className="w-full pb-5 flex items-center justify-center text-primarycolor text-2xl font-bold">
          Signup
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="w-full">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="email"
            required
            value={user.email}
            onChange={handleInput}
            className="bg-gray-200 w-full p-2 outline-none mb-2"
          />

          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            autoComplete="name"
            required
            value={user.name}
            onChange={handleInput}
            className="bg-gray-200 w-full p-2 outline-none mb-2"
          />

          <label htmlFor="gender" className="font-semibold">
            Gender
          </label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleInput}
            className="bg-gray-200 w-full p-2 outline-none mb-2 text-black"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="password" className="font-semibold">
            Password
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
                <RxEyeOpen
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <RxEyeClosed
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
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
            type="submit"
            className="bg-primarycolor w-full p-2 text-white font-semibold"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
        <div className="w-full mb-4 flex flex-col items-center">
          <h3>Or</h3>
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          </div>
        </div>

        <div>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-primarycolor text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
