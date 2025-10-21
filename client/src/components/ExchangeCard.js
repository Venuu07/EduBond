// client/src/components/ExchangeCard.js
import Link from 'next/link';
import { ArrowRightLeft, UserCircle } from 'lucide-react'; // Import UserCircle icon

export default function ExchangeCard({ exchange }) {
  return (
    <Link href={`/exchanges/${exchange._id}`} className="group">
      {/* Main card container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 group-hover:scale-[1.01]">
        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow">
          {/* User Info */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
  <Avatar size="sm" /> {/* Use Avatar component */}
  <span className="ml-2"> {/* Added margin-left */}
    {/* Link to public profile, stop propagation to prevent card link */}
    <Link
      href={`/profile/${exchange.user?._id}`}
      onClick={(e) => e.stopPropagation()}
      className="font-medium text-gray-700 hover:underline hover:text-blue-600" // Added styling
    >
      {exchange.user?.name || 'Unknown User'}
    </Link>
  </span>
</div>

          {/* Offering Section */}
          <div className="p-3 bg-green-50 border border-green-200 rounded mb-2">
            <p className="text-xs text-green-700 font-semibold mb-1">OFFERING</p>
            <p className="font-semibold text-green-900 truncate">{exchange.skillOffered}</p>
          </div>

          {/* Exchange Icon */}
          <div className="flex justify-center my-2">
            <ArrowRightLeft size={20} className="text-gray-400" />
          </div>

          {/* Seeking Section */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <p className="text-xs text-blue-700 font-semibold mb-1">SEEKING</p>
            <p className="font-semibold text-blue-900 truncate">{exchange.skillSought}</p>
          </div>

          {/* View Details Button Placeholder (using mt-auto) */}
          <div className="mt-auto pt-2 text-center">
            <span className="text-xs text-blue-500 group-hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}