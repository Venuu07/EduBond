// client/src/components/Avatar.js
import { UserCircle } from 'lucide-react'; // Default icon

export default function Avatar({ size = 'md' }) {
  // Define sizes using Tailwind classes
  const sizeClasses = {
    sm: 'w-6 h-6', // Small, e.g., in lists
    md: 'w-8 h-8', // Medium, e.g., on cards
    lg: 'w-10 h-10', // Large, e.g., header
    xl: 'w-24 h-24', // Extra Large, e.g., profile page
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 48,
  }

  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden ${sizeClasses[size]}`}
    >
      {/* If user had an avatarUrl prop, we'd display an <img> here */}
      <UserCircle size={iconSize[size]} />
    </div>
  );
}