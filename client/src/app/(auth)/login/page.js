'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import {useAuth} from '../../../context/AuthContext.js'



export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {login}=useAuth();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                email,
                password,
            });
            login(data.data); 
            console.log("login success")
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
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="form-label">
                            Email Address
                        </label>
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