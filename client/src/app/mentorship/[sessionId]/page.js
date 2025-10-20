'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {useAuth} from '../../../context/AuthContext.js';
import  toast  from 'react-hot-toast';
import Spinner from '@/components/Spinner.js';
import { UserCircle, CalendarClock, Clock } from 'lucide-react';

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
  // Use consistent page background and padding
  <div className="bg-gray-100 min-h-screen py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto">

        {/* --- Header Section --- */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{session.title}</h1>
        {/* Mentor Info */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400" />
          <span>Offered by: {session.mentor?.name || 'Unknown Mentor'}</span>
        </div>

        {/* --- Description Section --- */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{session.description}</p>
        </div>

        {/* --- Available Slots Section --- */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
             <CalendarClock size={20} className="mr-2 text-blue-600"/> Available Time Slots
          </h2>
          <div className="space-y-3">
            {session.slots.map((slot) => (
              <div
                key={slot._id}
                className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                  slot.isBooked ? 'bg-gray-100 border-gray-200' : 'bg-green-50 border-green-200'
                }`}
              >
                {/* Slot Details */}
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium text-gray-800">{formatDate(slot.startTime)}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                     <Clock size={14} className="mr-1 opacity-70"/> {slot.duration} minutes
                  </p>
                  {/* Show who booked it if applicable */}
                  {slot.isBooked && (
                     <p className="text-xs text-red-600 font-semibold mt-1">
                        Booked {slot.bookedBy ? `by ${slot.bookedBy.name}` : ''}
                     </p>
                  )}
                </div>
                {/* Booking Button (Conditional) */}
                {!slot.isBooked && !isMentor && user && (
                  <button
                    onClick={() => handleBookSlot(slot._id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  >
                    Book Slot
                  </button>
                )}
              </div>
            ))}
            {/* Message if no slots are available */}
            {session.slots.filter(s => !s.isBooked).length === 0 && (
              <p className="text-center text-gray-500 py-4 italic">No available slots for this session.</p>
            )}
          </div>
        </div> {/* End Slots Section */}

      </div> {/* End Card */}
    </div>
  </div>
);
}