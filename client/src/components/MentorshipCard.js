// client/src/components/MentorshipCard.js
import Link from 'next/link';
import { UserCircle, CalendarClock } from 'lucide-react'; // Import icons
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
    <Link href={`/mentorship/${session._id}` }className="group">
      {/* Main card container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 group-hover:scale-[1.01]">
        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Mentor Info */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
           <Avatar size="md" /> {/* User icon */}
            <span>Offered by: {session.mentor?.name || 'Unknown Mentor'}</span>
          </div>

          {/* Session Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {session.title}
          </h3>

          {/* Description - Limit lines shown */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2"> {/* Show max 2 lines */}
            {session.description}
          </p>

          {/* Available Slots Section */}
          <div className="mt-auto border-t pt-3"> {/* Pushed to bottom */}
            <h4 className="font-semibold text-xs mb-2 text-gray-500 uppercase flex items-center">
              <CalendarClock size={14} className="mr-1.5" /> Available Slots
            </h4>
            <div className="space-y-1 text-xs">
              {availableSlots.length > 0 ? (
                availableSlots.slice(0, 2).map((slot) => ( // Show max 2 slots initially
                  <span key={slot._id} className="block bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    {formatDate(slot.startTime)} ({slot.duration}m)
                  </span>
                ))
              ) : (
                <p className="text-gray-400 italic">No available slots.</p>
              )}
              {availableSlots.length > 2 && (
                   <span className="text-blue-500 text-xs font-medium block">+ {availableSlots.length - 2} more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}