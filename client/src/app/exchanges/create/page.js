'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../components/withAuth.js';


function CreateExchangePage(){
    const [skillOffered,setSkillOffered]=useState('');
    const [skillSought,setSkillSought]=useState('');
    const [description,setDescription]=useState('');
    const router=useRouter();
    const API_URL=process.env.NEXT_PUBLIC_API_URL;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/exchanges`,{
                skillOffered,
                skillSought,
                description,
            });
            router.push('/exchanges');  
    }
        catch (error) {
            console.error('Failed to create exchange',error);
        }           
}
    return(
       <div className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Post a New Skill Exchange</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium">Skill You're Offering</label>
                 <input
              type="text"
              value={skillOffered}
              onChange={(e) => setSkillOffered(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium">Skill You're Seeking</label>
            <input
                type="text"
                value={skillSought}
                onChange={(e) => setSkillSought(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
            />
       </div>  
       <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows='4'
                required
            ></textarea>
            </div>
            <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
            Post Exchange
            </button>
        </form>
        </div>
         </div>
)}
export default withAuth(CreateExchangePage);