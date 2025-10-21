// client/src/app/page.js
'use client'; 

import Link from 'next/link';
import { useAuth } from '../context/AuthContext.js'; // To potentially customize view for logged-in users

export default function HomePage() {
  const { user } = useAuth(); // Get user status

  return (
    // 1. Refined Gradient: Softer and more modern feel
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-6 py-16 text-center">

        {/* Hero Section */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
          Connect, Learn, & Grow <br className="hidden md:block" /> with Your Campus Peers.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          EduBond is your exclusive student network for 
          <span className="font-medium text-gray-700"> skill exchange</span>, 
          <span className="font-medium text-gray-700"> micro-gigs</span>, 
          <span className="font-medium text-gray-700"> mentorship</span>, and 
          <span className="font-medium text-gray-700"> collaboration</span>.
        </p>

        {/* Call to Action Buttons - Added subtle hover effect */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {user ? (
            // If logged in, show link to discover
            <Link href="/gigs" className="btn-primary px-8 py-3 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              Discover Opportunities
            </Link>
          ) : (
            // If logged out, show register and discover
            <>
              <Link href="/register" className="btn-primary px-8 py-3 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                Get Started
              </Link>
              <Link href="/gigs" className="px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-sm">
                Browse Gigs
              </Link>
            </>
          )}
        </div>

        {/* Feature Highlights Section - Now 4 columns and includes Clubs */}
        <div className="mt-24 text-left max-w-5xl mx-auto"> {/* Increased max-width */}
             <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">What can you do on EduBond?</h2>
             {/* 2. Updated Grid: Now 4 columns for larger screens */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Changed gap to 6 */}
                 
                 {/* 3. Added Hover Effects to all cards */}
                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.03]">
                     <h3 className="font-bold mb-2">🔄 Skill Exchange</h3>
                     <p className="text-sm text-gray-600">Swap knowledge like Python for Presentation Skills.</p>
                 </div>
                 
                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.03]">
                     <h3 className="font-bold mb-2">💼 Micro-Gigs</h3>
                     <p className="text-sm text-gray-600">Offer or find small paid tasks like logo design or tutoring.</p>
                 </div>
                 
                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.03]">
                     <h3 className="font-bold mb-2">🧑‍🏫 Mentorship</h3>
                     <p className="text-sm text-gray-600">Book sessions with experienced peers for guidance.</p>
                 </div>
                 
                 {/* 4. Added Clubs/Rooms Card */}
                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.03]">
                     <h3 className="font-bold mb-2">💬 Interest Clubs</h3>
                     <p className="text-sm text-gray-600">Join topic-based rooms to chat and collaborate.</p>
                 </div>

             </div>
        </div>

      </div>
    </div>
  );
}