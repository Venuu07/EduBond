'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {useAuth} from '../../../context/AuthContext.js';
import  toast  from 'react-hot-toast';
import Spinner from '@/components/Spinner.js';
import { UserCircle, CalendarClock, Clock } from 'lucide-react';
import Link from 'next/link.js';
export default function MentorshipDetailPage() {
    const params=useParams();
    const {sessionId}=params;
    const { user } = useAuth();

    const [session,setSession]=useState(null);
    const [loading,setLoading]=useState(true);
    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    const fetchSession = async () => {
    if (!sessionId) return;
    setLoading(true);
    const fetchToast = toast.loading('Fetching session details...');
    try {
        
        const { data } = await axios.get(`${API_URL}/api/mentorship/${sessionId}`);
        toast.success('Session details fetched!', { id: fetchToast });
        setSession(data.data);
    } catch (error) {
       toast.error(`Error: ${error.response.data.message}`, { id: fetchToast });
    }finally{
        setLoading(false);
    }
    };
    useEffect(() => {
    fetchSession();
    },[sessionId]);

    const handleBookSlot=async(slotId)=>{
        if(!user){

            toast.error('Please log in to book a slot.');
            return;
        }
       try {
      const bookToast = toast.loading('Booking slot...');
      await axios.put(`${API_URL}/api/mentorship/${sessionId}/book/${slotId}`);
    toast.success('Slot booked successfully!', { id: bookToast });
      fetchSession(); // Refresh data to show updated booking status
    } catch (error) {
      const message = error.response?.data?.message || 'Unknown error';
      toast.error(message, { id: bookToast });
    }
    }

    const formatDate = (dateString) => new Date(dateString).toLocaleString();

    if (loading) return <Spinner/>;
    if (!session) return <div className="text-center p-10">Mentorship session not found.</div>;

    const isMentor = user && session.mentor._id === user._id;
return (
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      {/* Add dark mode background and border */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto border dark:border-gray-700">

        {/* --- Header Section --- */}
        {/* Add dark mode text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{session.title}</h1>
        {/* Mentor Info - Add dark mode text and link styling */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400 dark:text-gray-500" />
          <span>Offered by:
             <Link href={`/profile/${session.mentor?._id}`} className="ml-1 font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)]">
               {session.mentor?.name || 'Unknown Mentor'}
             </Link>
          </span>
        </div>

        {/* --- Description Section --- */}
        {/* Add dark mode border and text */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{session.description}</p>
        </div>

        {/* --- Available Slots Section --- */}
        {/* Add dark mode border and text */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
             {/* Use Secondary color for icon */}
             <CalendarClock size={20} className="mr-2 text-[var(--colors-edu-secondary)] dark:text-purple-400"/> Available Time Slots
          </h2>
          <div className="space-y-3">
            {session.slots.map((slot) => (
              <div
                key={slot._id}
                // Add dark mode styles for slot backgrounds and borders
                className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                  slot.isBooked
                    ? 'bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600' // Booked style
                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700/50' // Available style
                }`}
              >
                {/* Slot Details - Add dark mode text colors */}
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{formatDate(slot.startTime)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                     <Clock size={14} className="mr-1 opacity-70"/> {slot.duration} minutes
                  </p>
                  {slot.isBooked && (
                     // Add dark mode text color
                     <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
                        Booked {slot.bookedBy ? `by ${slot.bookedBy.name}` : ''}
                     </p>
                  )}
                </div>
                {/* Booking Button (Conditional) - Use btn-primary style */}
                {!slot.isBooked && !isMentor && user && (
                  <button
                    onClick={() => handleBookSlot(slot._id)}
                    // Use primary button style, adjust padding/size
                    className="btn-primary px-4 py-2 text-sm w-full sm:w-auto"
                  >
                    Book Slot
                  </button>
                )}
              </div>
            ))}
            {/* Message if no slots are available - Add dark mode text */}
            {session.slots.filter(s => !s.isBooked).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4 italic">No available slots for this session.</p>
            )}
          </div>
        </div> {/* End Slots Section */}

      </div> {/* End Card */}
    </div>
  </div>
);
}