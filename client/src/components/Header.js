'use client'; // Required because we are using a hook (useAuth)

import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // 1. Import our custom auth hook

export default function Header() {
  const { user, logout } = useAuth(); // 2. Get the user and logout function from the context

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold text-gray-800">EduBond</div>
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/gigs" className="text-gray-800 hover:text-blue-500">
            Discover-Gigs
          </Link>
          <Link href="/exchanges" className="text-gray-800 hover:text-blue-500">
            Skill-Exchange
          </Link>

          <Link href="/chat" className="text-gray-800 hover:text-blue-500">
          chat
          </Link>
          {/* 3. This is our conditional logic */}
          {user ? (
            
            <>
              <Link href="/profile" className="text-gray-800 hover:text-blue-500">
                Profile
              </Link>
              <button
                onClick={logout} 
                className="text-gray-800 hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            
            <>
              <Link href="/login" className="text-gray-800 hover:text-blue-500">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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