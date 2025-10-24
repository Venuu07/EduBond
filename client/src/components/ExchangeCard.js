// client/src/components/ExchangeCard.js
import Link from 'next/link';
import Avatar from './Avatar';
import { ArrowRightLeft } from 'lucide-react';

export default function ExchangeCard({ exchange }) {
  return (
    // Main Card: White background in light, dark gray in dark
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex flex-col flex-grow">

        {/* User Info: Use standard dark text in light, lighter gray in dark */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Avatar size="sm" />
          <span className="ml-2">
            <Link
              href={`/profile/${exchange.user?._id}`}
              // Use standard dark text in light, lighter gray in dark, primary hover
              className="font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)]"
            >
              {exchange.user?.name || 'Unknown User'}
            </Link>
          </span>
        </div>

        {/* Offering Section */}
        <Link href={`/exchanges/${exchange._id}`} className="block mb-2 group/link">
          {/* Lighter green background, darker text for readability */}
          <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded group-hover/link:bg-green-100 dark:group-hover/link:bg-green-900/50 transition-colors">
            <p className="text-xs text-green-700 dark:text-green-300 font-semibold mb-1 uppercase">Offering</p>
            {/* Darker text for readability */}
            <p className="font-semibold text-green-800 dark:text-green-100 truncate">{exchange.skillOffered}</p>
          </div>
        </Link>

        {/* Exchange Icon */}
        <div className="flex justify-center my-2">
          <ArrowRightLeft size={20} className="text-gray-400 dark:text-gray-500" />
        </div>

        {/* Seeking Section */}
        <Link href={`/exchanges/${exchange._id}`} className="block mb-4 group/link">
           {/* Lighter purple background, darker text for readability */}
          <div className="p-3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 rounded group-hover/link:bg-purple-100 dark:group-hover/link:bg-purple-900/50 transition-colors">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold mb-1 uppercase">Seeking</p>
             {/* Darker text for readability */}
            <p className="font-semibold text-purple-800 dark:text-purple-100 truncate">{exchange.skillSought}</p>
          </div>
        </Link>

        {/* View Details Link */}
        <div className="mt-auto pt-2 text-center">
          {/* Use primary color in light, distinct color in dark */}
          <Link href={`/exchanges/${exchange._id}`} className="text-xs text-[var(--colors-edu-primary)] dark:text-blue-400 hover:underline font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}