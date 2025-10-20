'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MentorshipCard from '@/components/MentorshipCard';
import Spinner from '../../components/Spinner.js';
import CardSkeleton from '../../components/CardSkeleton.js';

export default function MentorshipPage() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchSessions = async () => {
          setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/mentorship`);
                setSessions(data.data);
            } catch (error) {
                console.error('Failed to fetch mentorship sessions:', error);
            }
            finally {
        setLoading(false); // Stop loading
      }
        };
        fetchSessions();
    }, [API_URL]);

    return (
     <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mentorship Sessions</h1>
          <Link href="/mentorship/create">
            <span className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Offer Mentorship
            </span>
          </Link>
        </div>
        {loading ? (
        // Show a grid of skeletons while loading
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => ( // Show 6 skeletons
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        // Show the actual mentorship cards once loaded
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.length > 0 ? ( // Check if there are any sessions
            sessions.map((session) => (
              <MentorshipCard key={session._id} session={session} />
            ))
          ) : ( // If no sessions, show a message
            <p className="col-span-full text-center text-gray-500 py-10">No mentorship sessions found.</p>
          )}
        </div>
      )}
      {/* ---------------------------------- */}
    </div>
  </div>
)}