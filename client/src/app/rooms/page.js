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
    // Standard page background and padding
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header section with conditional button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Use Neutral text color, adjust dark mode color */}
          <h1 className="text-3xl font-bold text-[var(--colors-edu-neutral)] dark:text-gray-100">Join a Room</h1>
          {user && (
            <Link href="/rooms/create">
              {/* Use Primary button style */}
              <span className="btn-primary inline-flex justify-center w-full sm:w-auto text-sm px-5 py-2">
                 + Create Room
              </span>
            </Link>
          )}
        </div>

        {/* Conditional Rendering: Loading, Empty, or Grid */}
        {loading ? (
          <Spinner />
        ) : rooms.length === 0 ? (
          <EmptyState message="No chat rooms available yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Map over the fetched rooms and create a themed card link */}
            {rooms.map((room) => (
              <Link href={`/chat/${room.slug}`} key={room.slug} className="group block h-full">
                {/* Themed Room Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 h-full flex flex-col group-hover:-translate-y-1 duration-300">
                  <div className="flex items-center mb-2">
                     {/* Use Secondary color for icon */}
                     <MessageSquareText size={20} className="text-[var(--colors-edu-secondary)] mr-2" />
                     {/* Use dark text in light, light text in dark, Primary hover */}
                     <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-[var(--colors-edu-primary)] transition-colors">{room.name}</h2>
                  </div>
                   {/* Use Neutral text in light, lighter gray in dark */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow line-clamp-2 mb-3">{room.description}</p>
                  {/* Category Badge - Use Accent (Mustard) */}
                  <span className="mt-auto text-xs text-yellow-800 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900/40 px-2.5 py-0.5 rounded-full self-start border border-yellow-200 dark:border-yellow-700/50">{room.category}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}