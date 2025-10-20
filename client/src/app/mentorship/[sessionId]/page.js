'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {useAuth} from '../../../context/AuthContext.js';
import  toast  from 'react-hot-toast';

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

    if (loading) return <Spinner />;
    if (!session) return <div className="text-center p-10">Mentorship session not found.</div>;

    const isMentor = user && session.mentor._id === user._id;

return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
        <p className="text-gray-600 mb-4">Offered by: {session.mentor.name}</p>
        <p className="mb-6">{session.description}</p>

        <h2 className="text-xl font-semibold mb-4 border-t pt-4">Available Time Slots</h2>
        <div className="space-y-3">
          {session.slots.map((slot) => (
            <div key={slot._id} className={`p-4 rounded-lg border flex justify-between items-center ${slot.isBooked ? 'bg-gray-100' : 'bg-green-50'}`}>
              <div>
                <p className="font-medium">{formatDate(slot.startTime)}</p>
                <p className="text-sm text-gray-600">{slot.duration} minutes</p>
                {slot.isBooked && <p className="text-xs text-red-600 font-semibold">Booked</p>}
              </div>
              {!slot.isBooked && !isMentor && user && ( // Show button if slot is free, user is logged in, and not the mentor
                <button
                  onClick={() => handleBookSlot(slot._id)}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Book Slot
                </button>
              )}
            </div>
          ))}
          {session.slots.filter(s => !s.isBooked).length === 0 && (
             <p className="text-gray-500">No available slots.</p>
          )}
        </div>
      </div>
    </div>
  );
}