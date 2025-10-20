// client/src/components/BookingsDashboard.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner.js'; // Make sure Spinner is imported

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
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Sessions Booked by User (Mentee View) */}
      <div>
        <h3 className="text-lg font-semibold mb-3">My Booked Sessions</h3>
        {loading ? (
          <Spinner />
        ) : bookedSessions.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven't booked any sessions yet.</p>
        ) : (
          <ul className="space-y-2">
            {bookedSessions.map(session => (
              <li key={session._id} className="text-sm p-2 border rounded bg-gray-50">
                <strong>{session.title}</strong> with {session.mentor.name}
                <br />
                <span className="text-xs">{formatDate(session.bookedSlot?.startTime)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sessions Offered by User (Mentor View) */}
      <div>
        <h3 className="text-lg font-semibold mb-3">My Offered Sessions (Booked Slots)</h3>
        {loading ? (
          <Spinner />
        ) : // Remove extra braces here
          offeredSessions.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven't offered any sessions yet.</p>
        ) : (
          <ul className="space-y-4">
            {offeredSessions.map(session => (
              <li key={session._id}>
                <strong className="block text-sm">{session.title}</strong>
                <ul className="pl-4 mt-1 space-y-1">
                  {session.slots.filter(slot => slot.isBooked).map(slot => (
                    <li key={slot._id} className="text-xs p-1 border rounded bg-yellow-50">
                      Booked by: {slot.bookedBy?.name || 'N/A'} at {formatDate(slot.startTime)}
                    </li>
                  ))}
                  {session.slots.filter(slot => slot.isBooked).length === 0 && <span className='text-xs text-gray-400'>No booked slots</span>}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}