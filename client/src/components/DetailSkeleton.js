// client/src/components/DetailSkeleton.js
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function DetailSkeleton() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Title Skeleton */}
        <Skeleton height={36} width="70%" className="mb-4" />
        {/* Subtitle/User Skeleton */}
        <Skeleton height={20} width="40%" className="mb-6" />
        {/* Description Skeleton */}
        <Skeleton count={4} className="mb-2" />
        {/* Price/Key Info Skeleton */}
        <Skeleton height={28} width="30%" className="mb-6" />
        {/* Button/Interaction Skeleton */}
        <Skeleton height={48} className="mt-6" />
      </div>
    </div>
  );
}