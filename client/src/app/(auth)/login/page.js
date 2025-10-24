'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import {useAuth} from '../../../context/AuthContext.js'
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors, setErrors] = useState({});
    const {login}=useAuth();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrors({});
        const loginToast = toast.loading('Logging in...');
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                email,
                password,
            });
            login(data.data); 
           toast.success('Login successful!', { id: loginToast });
        }
        catch(error){
        const message = error.response?.data?.message || 'Login failed';
      // --- NEW ERROR HANDLING ---
      if (error.response?.status === 401) {
        // Specifically for "Invalid email or password"
        setErrors({ general: message });
        toast.error(message, { id: loginToast });
      } else {
        // For other errors
        setErrors({ general: 'An unexpected error occurred.' });
        toast.error('An unexpected error occurred.', { id: loginToast });
      }
      console.error('Login failed:', error.response || error);
        }
    }
    return (
  // Apply backgrounds to the main container
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 px-4">
    {/* Card container with dark mode styles */}
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Heading with dark mode text color */}
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className="space-y-5"> {/* Slightly increased spacing */}

        {/* Email Field */}
        <div>
          {/* form-label should handle dark mode text via globals.css */}
          <label className="form-label">Email Address</label>
          {/* Input group for potential icon */}
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Mail size={18} className="text-gray-400 dark:text-gray-500" /> {/* Icon */}
             </div>
             {/* form-input should handle dark mode styles via globals.css */}
             <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Add pl-10 for icon padding
              className={`form-input pl-10 ${errors.general ? 'border-red-500' : ''}`}
              required
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="form-label">Password</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400 dark:text-gray-500" /> {/* Icon */}
             </div>
             <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               // Add pl-10 for icon padding
              className={`form-input pl-10 ${errors.general ? 'border-red-500' : ''}`}
              required
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Error Display - Ensure contrast in dark mode */}
        {errors.general && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
        )}

        {/* Button - Uses themed btn-primary */}
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      {/* Link to Register - Themed link colors */}
      <div className="text-center">
        <Link href="/register" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  </div>
);}