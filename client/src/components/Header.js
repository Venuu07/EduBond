// client/src/components/Header.js
'use client'; // Needed for hooks

import Link from 'next/link';
import { useAuth } from '../context/AuthContext.js'; // Ensure .js extension
import { LogOut, UserCircle } from 'lucide-react'; // Icons for visual flair

export default function Header() {
  const { user, logout } = useAuth();

  return (
    // Add sticky positioning and a subtle bottom border/shadow
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/">
          <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">EduBond</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6"> {/* Increased spacing */}
          <Link href="/gigs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Gigs
          </Link>
          <Link href="/exchanges" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Skill Exchange
          </Link>
          <Link href="/mentorship" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Mentorship
          </Link>
          <Link href="/rooms" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Rooms
          </Link>

          {/* Conditional Auth Links/User Info */}
          {user ? (
            // If logged in, show profile link and logout button
            <>
              <Link href="/profile" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
                <Avatar size="lg" />
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-red-500 hover:text-red-700 transition-colors font-medium"
                title="Logout" // Tooltip for accessibility
              >
                <LogOut size={20} className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            // If logged out, show Login and Register buttons
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-semibold"
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