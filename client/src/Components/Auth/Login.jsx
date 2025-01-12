

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { GoogleLogin } from '@react-oauth/google'; 
import { FaArrowCircleRight } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { login } = useContext(AuthContext);

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
                ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/login`
                : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/login`
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
                login(responseData.token, responseData.userId, responseData.profileImg, responseData.completed,responseData.account);
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

    const handleGoogleLogin = async (response) => {
        const loadingToastId = toast.loading("Loading..."); 
        const start = Date.now(); 
    
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
        
                login(responseData.token, responseData.userId,responseData.profileImg,responseData.completed,responseData.account);
            } else {
                throw new Error(responseData.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error(error.message, { id: loadingToastId });
        } finally {
            const elapsed = Date.now() - start;
     
            if (elapsed < 2000) {
                await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
            }
            toast.dismiss(loadingToastId); 
            setIsLoading(false); 
        }
    };


    
    return (
        <div className='flex flex-col w-full justify-center h-screen items-center'>
            <h1 className='text-2xl font-bold mb-5 text-primarycolor'>Welcome to Desh Dekho</h1>
            <div className='flex items-center justify-center p-5 flex-col shadow-md border-2 rounded-lg w-80 bg-white'>
                <h1 className='w-full pb-5 flex items-center justify-center text-primarycolor text-2xl font-bold'>Login</h1>
                <form onSubmit={handleSubmit} className='w-full'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
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
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter Your password'
                            autoComplete='off'
                            required
                            value={user.password}
                            onChange={handleInput}
                            className='bg-gray-200 w-full p-2 outline-none pr-10'
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {showPassword ? (
                                <RxEyeOpen className='cursor-pointer' onClick={togglePasswordVisibility} />
                            ) : (
                                <RxEyeClosed className='cursor-pointer' onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <button type='submit' className='bg-primarycolor w-full p-2 my-5 text-white font-semibold' disabled={isLoading}>Submit</button>
                </form>

                <div className="w-full mb-4">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => toast.error("Google login failed")}
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} 
                    />
                </div>
                

                <div>Don't have an account? <Link to="/auth/signup" className='font-semibold text-primarycolor text-sm'>Sign up</Link></div>
                <div>Forgot password? <Link to="/auth/forgotpassword" className='font-semibold text-primarycolor text-sm'>Click Here</Link></div>
            </div>
            <button
            onClick={() => navigate('/home')}
            className='bg-primarycolor rounded-full px-5 py-3 text-white flex items-center justify-center space-x-2 mt-5'
            >
            <h3>Continue as guest</h3>
            <FaArrowCircleRight size={20} />
            </button>
        </div>
    );
};

export default Login;
