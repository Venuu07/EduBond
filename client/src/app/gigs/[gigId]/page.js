'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.js';
import ApplicantsList from '../../../components/ApplicantsList.js'; // FIX 1
import toast from 'react-hot-toast';
import DetailSkeleton from '../../../components/DetailSkeleton.js';
import { UserCircle, IndianRupee } from 'lucide-react';
import LeaveReview from '../../../components/LeaveReview.js';
import Link from 'next/link'

export default function GigDetailPage() {
  const params = useParams();
  const gigId = params.gigId;
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);
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
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      {/* Add dark mode background and border */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto border dark:border-gray-700">

        {/* --- Header Section --- */}
        {/* Add dark mode text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{gig.title}</h1>
        {/* Add dark mode text for user link */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400 dark:text-gray-500" />
          <span>Offered by:
            <Link href={`/profile/${gig.user?._id}`} className="ml-1 font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)]">
               {gig.user?.name || 'Unknown User'}
            </Link>
          </span>
        </div>

        {/* --- Main Content Section --- */}
        {/* Add dark mode border */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">

          {/* Description */}
          <div>
            {/* Add dark mode text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
            {/* Add dark mode text */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{gig.description}</p>
          </div>

          {/* Skills */}
          <div>
             {/* Add dark mode text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {gig.skills.map((skill) => (
                // Use Mustard theme for skill tags + dark mode styles
                <span key={skill} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 px-3 py-1 text-xs font-medium rounded-full border border-yellow-200 dark:border-yellow-700/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            {/* Add dark mode text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Price</h2>
            {/* Add dark mode text */}
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <IndianRupee size={20} className="mr-1"/>
              {gig.price}
            </div>
          </div>

        </div> {/* End Main Content Section */}

        {/* --- Interaction Section --- */}
        {/* Apply Button (for non-owners) */}
        {user && !isOwner && gig.status === 'open' && (
           // Add dark mode border
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              onClick={handleApply}
              disabled={hasApplied}
              // Use btn-primary style from globals.css for consistency
              className={`w-full btn-primary py-3 ${hasApplied ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed hover:opacity-100' : ''}`}
            >
              {hasApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        )}

        {/* Owner's Dashboard */}
        {isOwner && (
           // Add dark mode border and background
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            {/* Add dark mode text */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Owner Dashboard</h2>

            {/* If the gig is still open, show the applicants list */}
            {gig.status === 'open' && (
              <div>
                 {/* Add dark mode text */}
                <h3 className="text-lg font-bold mb-2 dark:text-gray-200">Applicants</h3>
                 {/* ApplicantsList should handle its internal dark mode */}
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
                 {/* Add dark mode text */}
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                  This gig has been assigned. You can now mark it as complete.
                </p>
                <button
                  onClick={handleComplete}
                  // Use green button style with dark mode adjustments if needed
                  className="w-full px-4 py-3 font-bold text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-md transition-colors"
                >
                  Mark as Complete
                </button>
              </div>
            )}

            {/* If the gig is completed, show a confirmation message */}
            {gig.status === 'completed' && (
               // Add dark mode text
              <p className="text-green-600 dark:text-green-400 font-semibold">
                This gig is completed. A portfolio item has been added for the student.
              </p>
            )}
          </div>
        )}

        {/* --- Review Section (Show after completion for involved users) --- */}
        {gig.status === 'completed' && user && (gig.user._id === user._id || gig.assignedTo === user._id) && (
           // Add dark mode border
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {/* LeaveReview component should handle its own dark mode styles */}
            { gig.user._id === user._id ? (
              gig.assignedTo && (
                <LeaveReview
                  targetUserId={gig.assignedTo}
                  contextId={gig._id}
                  contextType="Gig"
                  onReviewSubmitted={() => console.log("Owner review submitted - TODO: Add logic to hide form")}
                />
              )
            ) : gig.assignedTo === user._id ? (
              <LeaveReview
                targetUserId={gig.user._id}
                contextId={gig._id}
                contextType="Gig"
                onReviewSubmitted={() => console.log("Assignee review submitted - TODO: Add logic to hide form")}
              />
            ) : null }
          </div>
        )}
        {/* ----------------------------------------------------------------- */}

      </div> {/* End Card */}
    </div>
  </div>
);
}