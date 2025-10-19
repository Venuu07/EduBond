import ProfileClientPage from './ProfileClientPage.js';
import BookingsDashboard from '../../components/BookingsDashboard.js';

export default function Page() {
 return (
    <>
      <ProfileClientPage />
      {/* Add the Bookings Dashboard below the main profile content */}
      <div className="container mx-auto p-8 pt-0"> {/* Use pt-0 to avoid double padding */}
         <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Mentorship Bookings</h2>
            <BookingsDashboard />
          </div>
      </div>
    </>
  );
}