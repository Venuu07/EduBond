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
    <div className="bg-gray-50 min-h-screen"> {/* Use standard background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Use standard padding */}
        {/* Header section with conditional button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[var(--colors-edu-neutral)]">Join a Room</h1> {/* Neutral text */}
          {user && (
            <Link href="/rooms/create">
              {/* Use btn-primary (Coral) with adjusted size/padding */}
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
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[var(--colors-edu-neutral)]/20 h-full flex flex-col group-hover:-translate-y-1 duration-300"> {/* Neutral border, hover effect */}
                  <div className="flex items-center mb-2">
                     <MessageSquareText size={20} className="text-[var(--colors-edu-secondary)] mr-2" /> {/* Lavender icon */}
                     <h2 className="text-xl font-semibold text-[var(--colors-edu-base-content)] truncate group-hover:text-[var(--colors-edu-primary)] transition-colors">{room.name}</h2> {/* Primary hover */}
                  </div>
                  <p className="text-[var(--colors-edu-neutral)] text-sm flex-grow line-clamp-2 mb-3">{room.description}</p> {/* Neutral text */}
                  {/* Category Badge - Using Accent (Mustard) */}
                  <span className="mt-auto text-xs text-yellow-800 bg-yellow-100 px-2.5 py-0.5 rounded-full self-start border border-yellow-200">{room.category}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}