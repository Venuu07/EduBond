// client/src/components/GigCard.js
import Link from 'next/link';
import { Briefcase, UserCircle, IndianRupee } from 'lucide-react'; // Import icons
import Avatar from './Avatar.js';

export default function GigCard({ gig }) {
  return (
    // 1. REMOVED the outer <Link> component. This is now just a div.
    <div className="bg-[var(--colors-edu-base-100)] dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-[var(--colors-edu-neutral)]/20 dark:border-gray-700 group hover:shadow-lg transition-shadow duration-300">

      {/* Placeholder Image Area */}
      <div className="w-full h-40 bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 dark:bg-gradient-to-br dark:from-purple-900 dark:via-purple-800 dark:to-indigo-900 flex items-center justify-center">
        <Briefcase size={48} className="text-blue-500 opacity-70 dark:text-blue-300" /> {/* Gig icon */}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">

        {/* 2. Title is now the primary Link */}
        <Link
          href={`/gigs/${gig._id}`}
          className="text-lg font-semibold text-[var(--colors-edu-base-content)] dark:text-gray-100 mb-2 truncate group-hover:text-[var(--colors-edu-primary)] dark:group-hover:text-[var(--colors-edu-primary)] transition-colors block"
        >
          {gig.title}
        </Link>

        {/* User Info - Including the Link to profile */}
        <div className="flex items-center text-sm text-[var(--colors-edu-neutral)] dark:text-gray-400 mb-3">
          <Avatar size="sm" /> {/* Use the Avatar component */}
          {/* Link to public profile */}
          <Link
            href={`/profile/${gig.user?._id}`}
            // 3. REMOVED stopPropagation as it's not needed now
            className="ml-2 hover:underline hover:text-[var(--colors-edu-primary)] font-medium text-[var(--colors-edu-neutral)] dark:text-gray-300 dark:hover:text-[var(--colors-edu-primary)]"
          >
            {gig.user?.name || 'Unknown User'}
          </Link>
        </div>

        {/* Skills Tags - Improved styling */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {gig.skills.slice(0, 3).map((skill) => ( // Show max 3 skills
            <span
              key={skill}
              className="bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 px-2 py-0.5 text-xs font-medium rounded-full border border-yellow-200 dark:border-gray-600"
            >
              {skill}
            </span>
          ))}
          {gig.skills.length > 3 && (
            <span className="text-gray-400 text-xs font-medium dark:text-gray-400">+ {gig.skills.length - 3} more</span>
          )}
        </div>

        {/* Price - Positioned at the bottom */}
        <div className="mt-auto pt-2 text-right text-lg font-bold text-[var(--colors-edu-neutral)] dark:text-gray-100 flex items-center justify-end">
          <IndianRupee size={18} className="mr-0.5 text-[var(--colors-edu-neutral)] dark:text-yellow-300" /> {/* Rupee icon */}
          {gig.price}
        </div>
      </div>
    </div>
  );
}