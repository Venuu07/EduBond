// client/src/components/CardSkeleton.js
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import base styles

export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-200 p-4">
      {/* Mimic Image/Icon Area */}
      <Skeleton height={160} className="mb-4" />

      {/* Mimic Title */}
      <Skeleton height={24} width="80%" className="mb-2" />

      {/* Mimic User Info */}
      <Skeleton height={16} width="50%" className="mb-3" />

      {/* Mimic Tags/Slots */}
      <div className="flex gap-2 mb-4">
        <Skeleton height={20} width={60} />
        <Skeleton height={20} width={50} />
        <Skeleton height={20} width={70} />
      </div>

      {/* Mimic Price/Button */}
      <div className="mt-auto pt-2">
        <Skeleton height={28} width="30%" style={{ marginLeft: 'auto' }} />
      </div>
    </div>
  );
}