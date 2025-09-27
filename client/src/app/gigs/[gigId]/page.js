'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';

export default function GigDetailPage() {
  const params = useParams();
  const gigId = params.gigId;
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the API URL from the environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (gigId) {
      const fetchGig = async () => {
        try {
          // Use the API_URL variable
          const { data } = await axios.get(`${API_URL}/api/gigs/${gigId}`);
          setGig(data.data);
        } catch (error) {
          console.error('Failed to fetch gig details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchGig();
    }
  }, [gigId]);

  const handleApply = async () => {
    try {
      // Use the API_URL variable
      await axios.post(`${API_URL}/api/gigs/${gigId}/apply`);
      alert('Application successful!');
      
      // Re-fetch the gig data to update the UI
      const { data } = await axios.get(`${API_URL}/api/gigs/${gigId}`);
      setGig(data.data);
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!gig) return <div className="text-center p-10">Gig not found.</div>;

  const hasApplied = user && gig.applicants.some(app => app.user === user._id);
  const isOwner = user && gig.user._id === user._id;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{gig.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{gig.description}</p>
        <div className="text-2xl font-bold text-gray-800">₹{gig.price}</div>
        
        {user && !isOwner && (
          <div className="mt-6">
            <button 
              onClick={handleApply}
              disabled={hasApplied}
              className={`w-full px-4 py-3 font-bold text-white rounded-md transition-colors ${
                hasApplied 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {hasApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}