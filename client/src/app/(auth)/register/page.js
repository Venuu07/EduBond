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

    const handleSubmit=async(e)=>{
        e.preventDefault();
      const registerToast= toast.loading('Submitting application...');
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
        const message = error.response?.data?.message || 'register failed';
      toast.error(message, { id: registerToast }); // Replace loading with error
      console.error('Login failed:', error.response || error);
      }
    };
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" >
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e)=> setName(e.target.value)}
                          className="form-input"
                        required />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                      
                        required
                      />
                  </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                        />
                    </div>
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