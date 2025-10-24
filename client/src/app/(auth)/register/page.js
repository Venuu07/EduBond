'use client'

import { useState } from "react"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { User, Mail, Lock } from 'lucide-react';

export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const router = useRouter(); 
    const [errors, setErrors] = useState({});

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrors({});
      const registerToast= toast.loading('Creating account...');
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                name,
                email,
                password,
            });
            toast.success('Register successful!', { id: registerToast });

             router.push('/login'); 

        }
        catch (error) {
       const message = error.response?.data?.message || 'Registration failed';
      // --- NEW ERROR HANDLING ---
      if (error.response?.status === 400 || error.response?.status === 409) {
        // If it's a validation error or conflict, store the message
        // (Assuming backend sends a simple message for now)
        // A more robust backend might send an object like { email: 'Email already exists' }
        setErrors({ general: message });
        toast.error(message, { id: registerToast });
      }else{
        toast.error('An unexpected error occurred.', { id: registerToast });
      }
      console.error('Registration failed:', error.response || error);
      }
    };
   return (
  // Apply backgrounds to the main container
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 px-4">
    {/* Card container with dark mode styles */}
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Heading with dark mode text color */}
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4"> {/* Adjusted spacing */}

        {/* Name Field */}
        <div>
          {/* form-label should handle dark mode text via globals.css */}
          <label className="form-label">Name</label>
          <div className="relative"> {/* Input group for icon */}
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <User size={18} className="text-gray-400 dark:text-gray-500" /> {/* Icon */}
             </div>
             {/* form-input should handle dark mode styles via globals.css */}
             <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // Add pl-10 for icon padding
              className={`form-input pl-10 ${errors.name ? 'border-red-500' : ''}`}
              required
              placeholder="Your Name" // Add placeholder
            />
          </div>
          {/* Error message with dark mode text */}
          {errors.name && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="form-label">Email Address</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Mail size={18} className="text-gray-400 dark:text-gray-500" /> {/* Icon */}
             </div>
             <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Add pl-10 for icon padding
              className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
              required
              placeholder="you@example.com" // Add placeholder
            />
          </div>
           {/* Error message with dark mode text */}
          {errors.email && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>}
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
              className={`form-input pl-10 ${errors.password ? 'border-red-500' : ''}`}
              required
              placeholder="••••••••" // Add placeholder
            />
          </div>
           {/* Error message with dark mode text */}
          {errors.password && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* --- Display General Errors --- */}
        {errors.general && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
        )}
        {/* ----------------------------- */}

        {/* Button - Uses themed btn-primary */}
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>

      {/* Link to Login - Themed link colors */}
      <div className="text-center">
        <Link href="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  </div>
)}