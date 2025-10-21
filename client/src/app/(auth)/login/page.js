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
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                 <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="form-label">
                            Email Address
                        </label>
                       <div className="input-group"> {/* Wrap input and icon */}
              <div className="input-icon"> {/* Icon container */}
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // Add input-with-icon class and check for errors
                className={`form-input input-with-icon ${errors.general ? 'border-red-500' : ''}`}
                required
                placeholder="you@example.com" // Add placeholder text
              />
            </div>
          </div>
       <div>
            <label className="form-label">Password</label>
             <div className="input-group">
               <div className="input-icon">
                 <Lock size={18} className="text-gray-400" />
               </div>
               <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input input-with-icon ${errors.general ? 'border-red-500' : ''}`}
                required
                placeholder="••••••••" // Add placeholder text
              />
            </div>
          </div>    
        {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}      
               <button
               type="submit"
               className="btn-primary"
          >
            Login
          </button>
                 </form>
            <div className="text-center">
          <Link href="/register" className="text-sm text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
            </div>
        </div>
    );
}