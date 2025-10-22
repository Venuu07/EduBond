// client/src/components/Header.js
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext.js';
import Avatar from './Avatar.js';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle.js';

export default function Header() {
  const { user, logout } = useAuth();

  return (
  // Add dark mode background and border styles
  <header className="sticky top-0 z-50 bg-[var(--colors-edu-base-100)] dark:bg-gray-800 shadow-sm border-b border-[var(--colors-edu-secondary)]/30 dark:border-gray-700">
    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
      {/* Logo/Brand Name */}
      <Link href="/">
        {/* Add dark mode text style */}
        <span className="text-2xl font-bold text-[var(--colors-edu-neutral)] dark:text-gray-100 hover:opacity-80 transition-opacity">
           EduBond
        </span>
      </Link>

      {/* Navigation Links & Toggler */}
      <div className="flex items-center space-x-4 sm:space-x-6"> {/* Adjusted spacing */}
        {/* Add dark mode text styles */}
        <Link href="/gigs" className="text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
          Gigs
        </Link>
        <Link href="/exchanges" className="text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
          Skill Exchange
        </Link>
        <Link href="/mentorship" className="text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
          Mentorship
        </Link>
        <Link href="/rooms" className="text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
          Rooms
        </Link>

        {/* --- Theme Toggle Button --- */}
        <ThemeToggle /> {/* Add the toggle button */}
        {/* ------------------------- */}

        {/* Conditional Auth Links */}
        {user ? (
          <>
            {/* Add dark mode text style */}
            <Link href="/profile" className="flex items-center text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
              <Avatar size="sm" />
              <span className="ml-1.5">{user.name}</span>
            </Link>
            <button
              onClick={logout}
              // Add dark mode hover if needed, primary color should stand out
              className="flex items-center text-[var(--colors-edu-primary)] hover:opacity-80 transition-opacity font-medium"
              title="Logout"
            >
              <LogOut size={18} className="mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Add dark mode text style */}
            <Link href="/login" className="text-[var(--colors-edu-neutral)] dark:text-gray-300 hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)] transition-colors font-medium">
              Login
            </Link>
            {/* Register button uses .btn-primary, which might need dark mode variants later */}
            <Link
              href="/register"
              className="btn-primary px-4 py-1.5 text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  </header>
);
}