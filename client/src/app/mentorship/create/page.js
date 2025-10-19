'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth.js';

function OfferMentorshipPage(){
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');

    const[slotDate,setSlotDate]=useState('');
    const[slotTime,setSlotTime]=useState('');
    const[duration,setDuration]=useState(30);

    const router=useRouter();
    const API_URL=process.env.NEXT_PUBLIC_API_URL;
     
    const handleSubmit=async(e)=>{
        e.preventDefault();

 if(!slotDate || !slotTime){
        alert('Please select a date and time for the slot.');
        return;
}

const startTime=new Date(`${slotDate}T${slotTime}:00`);

const sessionData={
    title,
    description,
    slots:[{startTime,duration}]
};
        try {
      await axios.post(`${API_URL}/api/mentorship`, sessionData);
      router.push('/mentorship');
        } catch (error) {
          console.error('Failed to offer mentorship session:', error);
          alert(`Error:${error.response?.data?.message || 'could not create session'}`);  
        }
}
return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Offer a Mentorship Session</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium">Session Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full input" />
          </div>
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full input"></textarea>
          </div>
          {/* Slot Input (Simplified) */}
          <div className="border-t pt-4">
             <h3 className="text-lg font-semibold mb-2">Add Time Slot</h3>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input type="date" value={slotDate} onChange={e => setSlotDate(e.target.value)} required className="w-full input" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium">Time</label>
                    <input type="time" value={slotTime} onChange={e => setSlotTime(e.target.value)} required className="w-full input" />
                 </div>
             </div>
              <div>
                 <label className="block text-sm font-medium mt-2">Duration (minutes)</label>
                 <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} required min="15" step="15" className="w-full input" />
              </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Create Session Offering
          </button>
        </form>
      </div>
      {/* Simple Input Style */}
      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
        }
        .btn-primary {
           padding: 0.75rem 1rem;
           font-weight: bold;
           color: white;
           background-color: #3b82f6; /* blue-500 */
           border-radius: 0.375rem; /* rounded-md */
           transition: background-color 0.2s;
        }
        .btn-primary:hover {
           background-color: #2563eb; /* blue-600 */
        }
      `}</style>
    </div>
  );
}

export default withAuth(OfferMentorshipPage);