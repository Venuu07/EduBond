// client/src/components/GigCard.js
import Link from 'next/link';
import { Briefcase, UserCircle, IndianRupee } from 'lucide-react'; // Import icons

export default function GigCard({ gig }) {
  return (
    <Link href={`/gigs/${gig._id}`}>
      {/* Main card container with enhanced styling */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
        
        {/* Placeholder Image Area */}
        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
             <Briefcase size={48} className="text-blue-500 opacity-70" /> {/* Gig icon */}
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title - Increased size, bold, truncate long titles */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {gig.title}
          </h3>

          {/* User Info */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <UserCircle size={16} className="mr-1.5 text-gray-400" /> {/* User icon */}
            <span>{gig.user?.name || 'Unknown User'}</span>
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
             <IndianRupee size={18} className="mr-0.5"/> {/* Rupee icon */}
             {gig.price}
          </div>
        </div>
      </div>
    </Link>
  );
}