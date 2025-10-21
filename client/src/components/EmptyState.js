import Link from 'next/link'; // 1. Import Link
import { Inbox } from 'lucide-react';

export default function EmptyState({ message, actionLink, actionText }) {
  return (
    <div className="text-center py-10 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <Inbox size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-500 mb-4">{message}</p>
      {/* 2. Use the Link component */}
      {actionLink && actionText && (
        <Link href={actionLink} className="text-blue-600 hover:underline font-medium">
          {actionText}
        </Link>
      )}
    </div>
  );
}