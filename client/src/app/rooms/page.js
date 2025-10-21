// client/src/app/rooms/page.js
'use client'; // Needed for hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Spinner from '../../components/Spinner.js'; // Import Spinner
import EmptyState from '../../components/EmptyState.js'; // Import EmptyState
import { MessageSquareText } from 'lucide-react'; // Icon for rooms
import { useAuth } from '../../context/AuthContext.js';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch the list of rooms from the backend when the page loads
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/rooms`);
        setRooms(data.data); // Assuming API response structure is { success: true, data: [...] }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        // Optionally show an error toast
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [API_URL]);

  return (
    <div className="container mx-auto p-8">
       <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Join a Room</h1>
           {/* Conditionally show Create Room button if user is logged in */}
           {user && (
              <Link href="/rooms/create">
                 <span className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                    + Create Room
                 </span>
              </Link>
           )}
       </div>

      {loading ? (
        <Spinner />
      ) : rooms.length === 0 ? (
        // Use EmptyState if no rooms are found (maybe link to a 'suggest a room' feature later)
        <EmptyState message="No chat rooms available yet." />
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Map over the fetched rooms and create a link/card for each */}
          {rooms.map((room) => (
            <Link href={`/chat/${room.slug}`} key={room.slug}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 h-full flex flex-col">
                 <div className="flex items-center mb-2">
                    <MessageSquareText size={20} className="text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{room.name}</h2>
                 </div>
                 <p className="text-gray-600 text-sm flex-grow line-clamp-2">{room.description}</p>
                 <span className="mt-3 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full self-start">{room.category}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}