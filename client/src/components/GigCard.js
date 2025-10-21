// client/src/components/GigCard.js
import Link from 'next/link';
import { Briefcase, UserCircle, IndianRupee } from 'lucide-react'; // Import icons
import Avatar from './Avatar.js';

export default function GigCard({ gig }) {
 return (
  // 1. REMOVED the outer <Link> component. This is now just a div.
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 group hover:shadow-lg transition-shadow duration-300">

    {/* Placeholder Image Area */}
    <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      <Briefcase size={48} className="text-blue-500 opacity-70" /> {/* Gig icon */}
    </div>

    {/* Content Area */}
    <div className="p-4 flex flex-col flex-grow">

      {/* 2. Title is now the primary Link */}
      <Link
        href={`/gigs/${gig._id}`}
        className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors block" // Added block display
      >
        {gig.title}
      </Link>

      {/* User Info - Including the Link to profile */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Avatar size="sm" /> {/* Use the Avatar component */}
        {/* Link to public profile */}
        <Link
          href={`/profile/${gig.user?._id}`}
          // 3. REMOVED stopPropagation as it's not needed now
          className="ml-2 hover:underline hover:text-blue-600 font-medium text-gray-700" // Added styling
        >
          {gig.user?.name || 'Unknown User'}
        </Link>
      </div>

      {/* Skills Tags - Improved styling */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {gig.skills.slice(0, 3).map((skill) => ( // Show max 3 skills
          <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs font-medium rounded-full">
            {skill}
          </span>
        ))}
        {gig.skills.length > 3 && (
          <span className="text-gray-400 text-xs font-medium">+ {gig.skills.length - 3} more</span>
        )}
      </div>

      {/* Price - Positioned at the bottom */}
      <div className="mt-auto pt-2 text-right text-lg font-bold text-gray-700 flex items-center justify-end">
        <IndianRupee size={18} className="mr-0.5" /> {/* Rupee icon */}
        {gig.price}
      </div>
    </div>
  </div>
);
}