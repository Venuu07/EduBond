'use client'

import { useState } from "react"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const router = useRouter(); 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                name,
                email,
                password,
            });
            console.log('Registration successful',data);

             router.push('/login'); 

        }
        catch (error) {
        if (error.response) {
          // The server responded with an error status code (4xx, 5xx)
          console.error('Registration failed. Server responded with:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else if (error.request) {
          // The request was made, but no response was received
          // This often means the backend server is down or unreachable
          console.error('Registration failed. No response from server:', error.request);
        } else {
          // Something else happened setting up the request
          console.error('Registration failed. Error:', error.message);
        }
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