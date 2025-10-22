// client/src/components/MentorshipCard.js
import Link from 'next/link';
import { UserCircle, CalendarClock,Clock } from 'lucide-react'; // Import icons
import Avatar from './Avatar.js';

export default function MentorshipCard({ session }) {
  // Simple function to format the date nicely
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get only the available slots
  const availableSlots = session.slots.filter(slot => !slot.isBooked);

  return (
    // 1. REMOVED the outer <Link> component. This is now just a div.
    <div className="bg-[var(--colors-edu-base-100)] dark:bg-[var(--colors-edu-base-900)] rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-[var(--colors-edu-neutral)]/20 dark:border-[var(--colors-edu-neutral)]/40 group hover:shadow-lg transition-shadow duration-300">
      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Mentor Info - Including the Link to profile */}
        <div className="flex items-center text-sm text-gray-500 mb-3 dark:text-gray-300">
          <Avatar size="md" /> {/* Use Avatar component */}
          <span className="ml-2"> {/* Added margin-left */}
            Offered by:
            {/* Link to public profile */}
            <Link
              href={`/profile/${session.mentor?._id}`}
              // 3. REMOVED stopPropagation as it's not needed now
              className="ml-1 font-medium text-[var(--colors-edu-neutral)] hover:underline hover:text-[var(--colors-edu-primary)] dark:text-gray-200 dark:hover:text-[var(--colors-edu-primary)]"
            >
              {session.mentor?.name || 'Unknown Mentor'}
            </Link>
          </span>
        </div>

        {/* 2. Session Title is now the primary Link */}
        <Link
          href={`/mentorship/${session._id}`}
          className="text-lg font-semibold text-[var(--colors-edu-base-content)] mb-2 truncate group-hover:text-[var(--colors-edu-primary)] transition-colors block dark:text-white"
        >
          {session.title}
        </Link>

        {/* Description - Limit lines shown */}
        <p className="text-sm text-[var(--colors-edu-neutral)] flex-grow mb-3 line-clamp-2 dark:text-gray-300">
          {session.description}
        </p>

        {/* Available Slots Section */}
        <div className="mt-auto border-t pt-3 border-t-gray-100 dark:border-t-gray-700"> {/* Pushed to bottom */}
          <h4 className="font-semibold text-xs mb-2 text-gray-500 uppercase flex items-center dark:text-gray-300">
            <CalendarClock size={14} className="mr-1.5" /> Available Slots
          </h4>
          <div className="space-y-1 text-xs">
            {availableSlots.length > 0 ? (
              availableSlots.slice(0, 2).map((slot) => ( // Show max 2 slots initially
                <span
                  key={slot._id}
                  className="block bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800"
                >
                  {formatDate(slot.startTime)} ({slot.duration}m)
                </span>
              ))
            ) : (
              <p className="text-gray-400 italic text-xs dark:text-gray-500">No available slots.</p>
            )}
            {availableSlots.length > 2 && (
              <span className="text-blue-500 text-xs font-medium block mt-1 dark:text-blue-300">+ {availableSlots.length - 2} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}