// client/src/components/MentorshipCard.js
import Link from 'next/link';

export default function MentorshipCard({ session }) {
  // Simple function to format the date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    // 1. Link now wraps the main div
    <Link href={`/mentorship/${session._id}`}>
      {/* 2. Add cursor-pointer for visual feedback */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between h-full cursor-pointer">
        <div>
          <div className="flex items-center mb-3">
            {/* Placeholder for mentor avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <span className="font-bold text-lg text-gray-800">{session.title}</span>
              <p className="text-sm text-gray-600">Offered by: {session.mentor.name}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">{session.description}</p>
          <h4 className="font-semibold text-sm mb-2 text-gray-700">Available Slots:</h4>
          <div className="space-y-1 max-h-24 overflow-y-auto text-xs">
            {session.slots.map((slot, index) => (
              !slot.isBooked && (
                <span key={index} className="block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {formatDate(slot.startTime)} ({slot.duration} mins)
                </span>
              )
            ))}
          </div>
        </div>
        {/* 3. The empty Link at the end is removed */}
      </div>
    </Link>
  );
}