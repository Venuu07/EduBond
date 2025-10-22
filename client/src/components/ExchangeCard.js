// client/src/components/ExchangeCard.js
import Link from 'next/link';
import { ArrowRightLeft, UserCircle } from 'lucide-react'; // Import UserCircle icon
import Avatar from './Avatar';

export default function ExchangeCard({ exchange }) {
  return (
    <div className="bg-[var(--colors-edu-base-100)] dark:bg-[var(--colors-edu-base-900)] rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-[var(--colors-edu-neutral)]/20 dark:border-[var(--colors-edu-neutral)]/30 group hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-4">
          <Avatar size="sm" />
          <span className="ml-2">
            <Link
              href={`/profile/${exchange.user?._id}`}
              className="font-medium text-[var(--colors-edu-neutral)] hover:underline hover:text-[var(--colors-edu-primary)] dark:text-[var(--colors-edu-neutral)]/90 dark:hover:text-[var(--colors-edu-primary)]"
            >
              {exchange.user?.name || 'Unknown User'}
            </Link>
          </span>
        </div>

        <Link href={`/exchanges/${exchange._id}`} className="block mb-2 group/link">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded group-hover/link:bg-yellow-100 transition-colors dark:bg-yellow-900/10 dark:border-yellow-700/30 dark:group-hover/link:bg-yellow-900/20">
            <p className="text-xs text-yellow-700 font-semibold mb-1 uppercase dark:text-yellow-300/90">Offering</p>
            <p className="font-semibold text-yellow-900 truncate group-hover/link:text-yellow-900 dark:text-yellow-200">{exchange.skillOffered}</p>
          </div>
        </Link>

        <div className="flex justify-center my-2">
          <ArrowRightLeft size={20} className="text-gray-400 dark:text-gray-500" />
        </div>

        <Link href={`/exchanges/${exchange._id}`} className="block mb-4 group/link">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded group-hover/link:bg-purple-100 transition-colors dark:bg-purple-900/10 dark:border-purple-700/30 dark:group-hover/link:bg-purple-900/20">
            <p className="text-xs text-purple-700 font-semibold mb-1 uppercase dark:text-purple-300/90">Seeking</p>
            <p className="font-semibold text-purple-900 truncate group-hover/link:text-purple-900 dark:text-purple-200">{exchange.skillSought}</p>
          </div>
        </Link>

        <div className="mt-auto pt-2 text-center">
          <Link href={`/exchanges/${exchange._id}`} className="text-xs text-[var(--colors-edu-primary)] dark:text-sky-400 hover:underline font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
