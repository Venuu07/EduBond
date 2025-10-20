'use client';

import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import EmptyState from './EmptyState.js'; // Ensure correct import path

export default function ApplicantsList({ applicants, gigId, onAccept }) {
  // --- Initial Logs ---
  console.log("--- ApplicantsList Component Render ---");
  console.log("Received applicants prop:", applicants);
  console.log("Received gigId prop:", gigId);
  console.log("Is 'applicants' an array?", Array.isArray(applicants));
  console.log("Applicants length:", applicants?.length);
  // --------------------

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // --- handleAccept function ---
  const handleAccept = async (applicantId) => {
    const acceptToast = toast.loading('Accepting application...');
    try {
      await axios.put(`${API_URL}/api/gigs/${gigId}/accept`, { applicantId });
      toast.success('Application accepted!', { id: acceptToast });
      onAccept();
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || 'Could not accept'}`, { id: acceptToast });
    }
    // DO NOT put rendering logic or return statements here
  };
  // ---------------------------

  // --- MOVE THE EMPTY STATE CHECK HERE ---
  console.log("Checking if applicants array is empty...");
  if (!Array.isArray(applicants) || applicants.length === 0) {
    console.log("Condition TRUE: Rendering EmptyState.");
    return <EmptyState message="No applications yet for this gig." />;
  } else {
    console.log("Condition FALSE: Proceeding to render map.");
  }
  // ------------------------------------

  // --- Final Return Statement ---
  return (
    <div className="space-y-4">
      {applicants.map((app, index) => {
        console.log(`Rendering Applicant #${index + 1}: Name = ${app?.user?.name}`);
        return (
          app?.user && (
            <div key={app._id || app.user._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold">{app?.user?.name || 'Unknown User'}</span>
              <button
                onClick={() => handleAccept(app.user._id)}
                className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
                Accept
              </button>
            </div>
          )
        );
      })}
    </div>
  );
  // -----------------------------
}