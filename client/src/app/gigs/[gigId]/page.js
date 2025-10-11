'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';
import ApplicantsList from '../../../components/ApplicantsList.js'; // FIX 1

export default function GigDetailPage() {
  const params = useParams();
  const gigId = params.gigId;
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchGig = async () => {
    if (!gigId) return;
    try {
      const { data } = await axios.get(`${API_URL}/api/gigs/${gigId}`);
      setGig(data.data);
    } catch (error) {
      console.error('Failed to fetch gig details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGig();
  }, [gigId]);

  const handleApply = async () => {
    try {
      await axios.post(`${API_URL}/api/gigs/${gigId}/apply`);
      alert('Application successful!');
      fetchGig(); // Re-fetch the gig data to update the UI
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  const handleComplete=async () =>{
    try{
      await axios.put(`${API_URL}/api/gigs/${gigId}/complete`)

      alert('Gig marked as complete!');
      fetchGig();
    }
    catch(error){
       if (error.response && error.response.data) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert('An unexpected error occurred while completing the gig.');
      console.error('Complete Gig Error:', error);
    }
    }
  }

  // FIX 2: Corrected function structure
  const onAcceptApplicant = () => {
    fetchGig(); // Re-use the fetchGig function to refresh data
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!gig) return <div className="text-center p-10">Gig not found.</div>;

  const hasApplied = user && gig.applicants.some(app => app.user._id === user._id);
  const isOwner = user && gig.user._id === user._id;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Gig Details */}
        <h1 className="text-4xl font-bold mb-2">{gig.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{gig.description}</p>
        <div className="text-2xl font-bold text-gray-800">₹{gig.price}</div>

        {/* Apply Button (for non-owners) */}
        {user && !isOwner && gig.status === 'open' && (
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

        {/* --- FIX 3: OWNER'S DASHBOARD (Moved to the correct place) --- */}
 {isOwner && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Owner Dashboard</h2>

            {/* If the gig is still open, show the applicants list */}
            {gig.status === 'open' && (
              <div>
                <h3 className="text-lg font-bold mb-2">Applicants</h3>
                <ApplicantsList
                  applicants={gig.applicants}
                  gigId={gig._id}
                  onAccept={onAcceptApplicant}
                />
              </div>
            )}

            {/* If the gig has been assigned, show the "Mark as Complete" button */}
            {gig.status === 'assigned' && (
              <div>
                <p className="text-blue-600 font-semibold mb-4">
                  This gig has been assigned. You can now mark it as complete.
                </p>
                <button
                  onClick={handleComplete}
                  className="w-full px-4 py-3 font-bold text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Mark as Complete
                </button>
              </div>
            )}

            {/* If the gig is completed, show a confirmation message */}
            {gig.status === 'completed' && (
               <p className="text-green-600 font-semibold">
                This gig is completed. A portfolio item has been added for the student.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}