// client/src/components/BookingsDashboard.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner.js'; // Make sure Spinner is imported
import EmptyState from './EmptyState.js';

export default function BookingsDashboard() {
  const [bookedSessions, setBookedSessions] = useState([]);
  const [offeredSessions, setOfferedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bookedRes = await axios.get(`${API_URL}/api/mentorship/mybookings`);
        setBookedSessions(bookedRes.data.data);

        const offeredRes = await axios.get(`${API_URL}/api/mentorship/myoffers`);
        setOfferedSessions(offeredRes.data.data);
      } catch (error) {
        console.error('Failed to fetch booking data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
  // Add dark mode background and border to the main container
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border dark:border-gray-700">

    {/* Sessions Booked by User (Mentee View) */}
    <div>
      {/* Add dark mode text color */}
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">My Booked Sessions</h3>
      {loading ? (
        <Spinner />
      ) : bookedSessions.length === 0 ? (
        <EmptyState message="You haven't booked any sessions yet." actionLink="/mentorship" actionText="Find a Mentor"/>
      ) : (
        <ul className="space-y-2">
          {bookedSessions.map(session => (
            // Add dark mode styles to list items
            <li key={session._id} className="text-sm p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              {/* Add dark mode text color */}
              <strong className="text-gray-900 dark:text-gray-100">{session.title}</strong>
              {/* Add dark mode text color */}
              <span className="text-gray-600 dark:text-gray-400"> with {session.mentor.name}</span>
              <br />
              {/* Add dark mode text color */}
              <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(session.bookedSlot?.startTime)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Sessions Offered by User (Mentor View) */}
    <div>
      {/* Add dark mode text color */}
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">My Offered Sessions (Booked Slots)</h3>
      {loading ? (
        <Spinner />
      ) : offeredSessions.length === 0 ? (
        <EmptyState message="You haven't offered any sessions yet." actionLink="/mentorship/create" actionText="Offer Mentorship"/>
      ) : (
        <ul className="space-y-4">
          {offeredSessions.map(session => (
            <li key={session._id}>
              {/* Add dark mode text color */}
              <strong className="block text-sm text-gray-900 dark:text-gray-100">{session.title}</strong>
              <ul className="pl-4 mt-1 space-y-1">
                {session.slots.filter(slot => slot.isBooked).map(slot => (
                  // Add dark mode styles to booked slot items
                  <li key={slot._id} className="text-xs p-1 border rounded bg-yellow-50 dark:bg-gray-700 dark:border-gray-600">
                     {/* Add dark mode text color */}
                    <span className="text-gray-700 dark:text-gray-300">Booked by: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{slot.bookedBy?.name || 'N/A'}</span>
                    {/* Add dark mode text color */}
                    <span className="text-gray-600 dark:text-gray-400"> at {formatDate(slot.startTime)}</span>
                  </li>
                ))}
                {/* Add dark mode text color */}
                {session.slots.filter(slot => slot.isBooked).length === 0 && <span className='text-xs text-gray-400 dark:text-gray-500'>No booked slots</span>}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}