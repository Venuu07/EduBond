// client/src/app/page.js
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext.js';
import { ArrowRight, MessageSquareText, Briefcase, ArrowRightLeft, UserCheck } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  // Feature cards data with specific theme colors for icons
  const features = [
    { icon: <Briefcase className="w-8 h-8 text-[var(--colors-edu-primary)] mb-4" />, title: "Micro-Gigs", description: "Offer or find small paid tasks like logo design or tutoring." },
    { icon: <ArrowRightLeft className="w-8 h-8 text-[var(--colors-edu-accent)] mb-4" />, title: "Skill Exchange", description: "Swap knowledge like Python for Presentation Skills." },
    { icon: <UserCheck className="w-8 h-8 text-[var(--colors-edu-secondary)] mb-4" />, title: "Mentorship", description: "Book sessions with experienced peers for guidance." },
    { icon: <MessageSquareText className="w-8 h-8 text-blue-500 mb-4" />, title: "Interest Rooms", description: "Join communities for coding, hobbies, or exam prep." } // Using a distinct blue for rooms
  ];

  return (
    // Use a refined gradient or a clean background based on theme
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white via-purple-50 to-orange-50 dark:bg-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"> {/* Subtle Lavender/Coral tones */}
      <div className="container mx-auto px-6 py-16 sm:py-24 text-center">

        {/* Hero Section */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight tracking-tight">
          {/* Use primary color gradient */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--colors-edu-primary)] to-orange-500 dark:to-orange-400">
            Connect, Learn, & Grow
          </span>
          <br className="hidden md:block" /> with Your Campus Peers.
        </h1>
        <p className="text-lg text-[var(--colors-edu-neutral)] dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          EduBond is your exclusive student network for skill exchange, micro-gigs, mentorship, and collaboration within your college community.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {user ? (
            // Use btn-primary style (Coral)
            <Link href="/gigs" className="btn-primary px-8 py-3 text-lg inline-flex items-center group justify-center shadow hover:shadow-md transition-shadow transform hover:-translate-y-0.5 duration-300">
              Discover Opportunities
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              {/* Use btn-primary style (Coral) */}
              <Link href="/register" className="btn-primary px-8 py-3 text-lg inline-flex items-center group justify-center shadow hover:shadow-md transition-shadow transform hover:-translate-y-0.5 duration-300">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Secondary button using Accent color */}
              <Link
                href="/gigs"
                className="px-8 py-3 text-lg font-medium text-[var(--colors-edu-accent)] dark:text-[var(--colors-edu-accent)] bg-white dark:bg-gray-800 border border-[var(--colors-edu-accent)] dark:border-[var(--colors-edu-accent)]/70 rounded-md hover:bg-yellow-50 dark:hover:bg-gray-700/50 transition shadow-sm hover:shadow duration-300 transform hover:-translate-y-0.5"
              >
                Browse Gigs
              </Link>
            </>
          )}
        </div>

        {/* Polished Feature Highlights Section */}
        <div className="mt-24 sm:mt-32 text-left max-w-5xl mx-auto">
          {/* Themed heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-12">Your Campus Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              // Enhanced card styling with dark mode
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
              >
                {feature.icon} {/* Display themed icon */}
                {/* Themed text colors */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-sm text-[var(--colors-edu-neutral)] dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}