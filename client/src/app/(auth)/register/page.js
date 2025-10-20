'use client'

import { useState } from "react"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

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
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" >
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e)=> setName(e.target.value)}
                          className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                        required />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                        required
                        />
                       {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>} 
                    </div>
                    {/* --- Display General Errors --- */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          {/* ----------------------------- */}
                    <button
                     type="submit"
                     className="btn-primary"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center">
                    <Link href="/login" className="text-sm text-blue-500 hover:underline" >
                    Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}