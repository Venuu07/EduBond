'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth.js';

function OfferMentorshipPage(){
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
  const [errors, setErrors] = useState({});
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
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Card container with dark mode styles */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Heading with dark mode text */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Offer a Mentorship Session</h1>
        <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}

          {/* Title Input */}
          <div>
            <label className="form-label">Session Title</label>
            {/* Uses .form-input from globals.css */}
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={`form-input ${errors?.title ? 'border-red-500' : ''}`} placeholder="e.g., Resume Review"/>
            {errors?.title && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div>
            <label className="form-label">Description</label>
            {/* Uses .form-input from globals.css */}
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className={`form-input ${errors?.description ? 'border-red-500' : ''}`} placeholder="What will you cover in this session?"></textarea>
            {errors?.description && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Slot Input Section */}
          {/* Add dark mode border */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
             {/* Add dark mode text */}
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Add Time Slot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Date</label>
                {/* Uses .form-input from globals.css */}
                <input type="date" value={slotDate} onChange={e => setSlotDate(e.target.value)} required className={`form-input ${errors?.slotDate ? 'border-red-500' : ''}`} />
                {errors?.slotDate && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.slotDate}</p>}
              </div>
              <div>
                <label className="form-label">Time</label>
                {/* Uses .form-input from globals.css */}
                <input type="time" value={slotTime} onChange={e => setSlotTime(e.target.value)} required className={`form-input ${errors?.slotTime ? 'border-red-500' : ''}`} />
                {errors?.slotTime && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.slotTime}</p>}
              </div>
            </div>
            <div className="mt-4"> {/* Added margin-top */}
              <label className="form-label">Duration (minutes)</label>
              {/* Uses .form-input from globals.css */}
              <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} required min="15" step="15" className={`form-input ${errors?.duration ? 'border-red-500' : ''}`} />
              {errors?.duration && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.duration}</p>}
            </div>
          </div>

          {/* General Error Display */}
          {errors?.general && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
          )}

          {/* Button uses .btn-primary from globals.css */}
          <button type="submit" className="btn-primary">
            Create Session Offering
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default withAuth(OfferMentorshipPage);