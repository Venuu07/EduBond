'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const router=useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post('http://localhost:5000/api/users/login',{
                email,
                password,
            });
            console.log('Login successful:', data);

            //save tokenn
             localStorage.setItem('userToken', data.data.token);

             router.push('/')
        }
        catch(error){
        if (error.response) {
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
        console.error('Login failed (no response):', error.request);
      } else {
        console.error('Login failed (generic error):', error.message);
      }
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                 <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>
                 <form onSubmit={handleSubmit} className="space-y=6">
                    <div>
                        <label className="block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                        />
                    </div>
               <button
               type="submit"
               className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
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