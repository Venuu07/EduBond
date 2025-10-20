'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';
import ApplicantsList from '../../../components/ApplicantsList.js'; // FIX 1
import toast from 'react-hot-toast';
import DetailSkeleton from '../../../components/DetailSkeleton.js';
import { UserCircle, IndianRupee } from 'lucide-react';

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
    const applyToast = toast.loading('Submitting application...');
    try {
      await axios.post(`${API_URL}/api/gigs/${gigId}/apply`);
     toast.success('Application successful!', { id: applyToast });
      fetchGig(); // Re-fetch the gig data to update the UI
    } catch (error) {
      const message = error.response?.data?.message || 'Application failed';
      toast.error(message, { id: applyToast });
      console.error('Application failed:', error.response || error);
    }
  };

  const handleComplete=async () =>{
    const completeToast = toast.loading('completing application...');
    try{
      await axios.put(`${API_URL}/api/gigs/${gigId}/complete`)

     toast.success('complete successful!', { id: completeToast });
      fetchGig();
    }
    catch(error){
      const message = error.response?.data?.message || 'completion failed';
      toast.error(message, { id:completeToast });
      console.error('completion failed:', error.response || error);
    }
  }

  // FIX 2: Corrected function structure
  const onAcceptApplicant = () => {
    fetchGig(); // Re-use the fetchGig function to refresh data
  };

  if (loading) return <DetailSkeleton />;
  if (!gig) return <div className="text-center p-10">Gig not found.</div>;

  const hasApplied = user && gig.applicants.some(app => app.user._id === user._id);
  const isOwner = user && gig.user._id === user._id;

  console.log("--- Gig Detail Page Render Check ---");
  console.log("Current User ID:", user?._id);
  console.log("Gig Owner ID:", gig?.user?._id);
  console.log("Is Owner:", isOwner);
  console.log("Gig Status:", gig?.status);
  console.log("Gig Applicants (Frontend):", gig?.applicants);
  console.log("------------------------------------");
  
  return (
  // Use a slightly different background for contrast
  <div className="bg-gray-100 min-h-screen py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto">

        {/* --- Header Section --- */}
        {/* Larger title, add space below */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{gig.title}</h1>
        {/* Mentor Info - subtle styling */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400" />
          <span>Offered by: {gig.user?.name || 'Unknown User'}</span>
        </div>

        {/* --- Main Content Section --- */}
        <div className="border-t border-gray-200 pt-6 space-y-6"> {/* Add top border and vertical spacing */}

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{gig.description}</p> {/* Increased line height */}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {gig.skills.map((skill) => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Price</h2>
            <div className="text-2xl font-bold text-gray-900 flex items-center">
              <IndianRupee size={20} className="mr-1"/>
              {gig.price}
            </div>
          </div>

        </div> {/* End Main Content Section */}

        {/* --- Interaction Section --- */}
        {/* Apply Button (for non-owners) */}
        {user && !isOwner && gig.status === 'open' && (
          <div className="mt-8 border-t border-gray-200 pt-6"> {/* Add top border */}
            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`w-full px-4 py-3 font-bold text-white rounded-md transition-colors ${
                hasApplied
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700' // Slightly darker blue
              }`}
            >
              {hasApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        )}

        {/* Owner's Dashboard */}
        {isOwner && (
          <div className="mt-8 border-t border-gray-200 pt-6 bg-gray-50 p-4 rounded-md"> {/* Added subtle background */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Dashboard</h2>

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

      </div> {/* End Card */}
    </div>
  </div>
)}