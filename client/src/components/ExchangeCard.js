// client/src/components/ExchangeCard.js
import Link from 'next/link';
import { ArrowRightLeft, UserCircle } from 'lucide-react'; // Import UserCircle icon
import Avatar from './Avatar';

export default function ExchangeCard({ exchange }) {
 return (
  // 1. REMOVED the outer <Link> component. This is now just a div.
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 group hover:shadow-lg transition-shadow duration-300">
    {/* Content Area */}
    <div className="p-4 flex flex-col flex-grow">

      {/* User Info - Including the Link to profile */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Avatar size="sm" /> {/* Use Avatar component */}
        <span className="ml-2"> {/* Added margin-left */}
          {/* Link to public profile */}
          <Link
            href={`/profile/${exchange.user?._id}`}
            // 3. REMOVED stopPropagation as it's not needed now
            className="font-medium text-gray-700 hover:underline hover:text-blue-600" // Added styling
          >
            {exchange.user?.name || 'Unknown User'}
          </Link>
        </span>
      </div>

      {/* Offering Section - Make this the primary link */}
      <Link href={`/exchanges/${exchange._id}`} className="block mb-2 group/link">
        <div className="p-3 bg-green-50 border border-green-200 rounded group-hover/link:bg-green-100 transition-colors">
          <p className="text-xs text-green-700 font-semibold mb-1 uppercase">Offering</p>
          <p className="font-semibold text-green-900 truncate group-hover/link:text-green-900">{exchange.skillOffered}</p>
        </div>
      </Link>

      {/* Exchange Icon */}
      <div className="flex justify-center my-2">
        <ArrowRightLeft size={20} className="text-gray-400" />
      </div>

      {/* Seeking Section - Also make this link for better click area */}
      <Link href={`/exchanges/${exchange._id}`} className="block mb-4 group/link">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded group-hover/link:bg-blue-100 transition-colors">
          <p className="text-xs text-blue-700 font-semibold mb-1 uppercase">Seeking</p>
          <p className="font-semibold text-blue-900 truncate group-hover/link:text-blue-900">{exchange.skillSought}</p>
        </div>
      </Link>

      {/* View Details Text Placeholder (using mt-auto) */}
      <div className="mt-auto pt-2 text-center">
        <Link href={`/exchanges/${exchange._id}`} className="text-xs text-blue-500 hover:underline">
           View Details
        </Link>
      </div>
    </div>
  </div>
);
}