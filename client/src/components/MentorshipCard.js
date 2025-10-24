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
  // Main Card Div: Ensure base white bg and dark mode bg
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow duration-300">
    {/* Content Area */}
    <div className="p-4 flex flex-col flex-grow">

      {/* Mentor Info Link: Set explicit light/dark text colors */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <Avatar size="md" />
        <span className="ml-2">
          Offered by:
          <Link
            href={`/profile/${session.mentor?._id}`}
            // Use explicit text colors, primary hover
            className="ml-1 font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)]"
          >
            {session.mentor?.name || 'Unknown Mentor'}
          </Link>
        </span>
      </div>

      {/* Session Title Link: Set explicit light/dark text colors */}
      <Link
        href={`/mentorship/${session._id}`}
        className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate group-hover:text-[var(--colors-edu-primary)] transition-colors block"
      >
        {session.title}
      </Link>

      {/* Description: Set explicit light/dark text colors */}
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow mb-3 line-clamp-2">
        {session.description}
      </p>

      {/* Available Slots Section */}
      <div className="mt-auto border-t pt-3 border-gray-100 dark:border-gray-700">
        <h4 className="font-semibold text-xs mb-2 text-gray-500 dark:text-gray-400 uppercase flex items-center">
          <CalendarClock size={14} className="mr-1.5" /> Available Slots
        </h4>
        <div className="space-y-1 text-xs">
          {availableSlots.length > 0 ? (
            availableSlots.slice(0, 2).map((slot) => (
              // Use Lavender theme for slots
              <span
                key={slot._id}
                className="block bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-700/50"
              >
                {formatDate(slot.startTime)} ({slot.duration}m)
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic text-xs">No available slots.</p> // Dark mode text
          )}
          {availableSlots.length > 2 && (
             // Use Primary color for "+ more" link
            <span className="text-[var(--colors-edu-primary)] dark:text-blue-400 text-xs font-medium block mt-1">+ {availableSlots.length - 2} more</span>
          )}
        </div>
      </div>
    </div>
  </div>
);
}