// client/src/app/profile/page.js (This is the file that serves /profile)
'use client'; // This page must be client-side to use Context and Hooks

import withAuth from '../../components/withAuth.js';
import ProfileClientPage from './ProfileClientPage.js'; // The core profile display (Header/Bio/Skills/Portfolio)
import BookingsDashboard from '../../components/BookingsDashboard.js'; // The Bookings content

// Define the main content component that displays the entire dashboard
function ProfileDashboardContent() {
  // ProfileClientPage contains the main content sections.
  // We render the additional sections below it for layout flexibility.

  return (
    <>
      {/* 1. Render the main profile content (which itself contains EditForm, Skills, etc.) */}
      <ProfileClientPage /> 
      
      {/* 2. Add the Bookings Dashboard component below the main profile */}
      <div className="container mx-auto p-8 pt-0">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">My Mentorship Bookings</h2>
          <BookingsDashboard />
        </div>
      </div>
    </>
  );
}

// 3. Export the component wrapped with withAuth
// This ensures the entire dashboard (ProfileClientPage + BookingsDashboard) is protected.
export default withAuth(ProfileDashboardContent);