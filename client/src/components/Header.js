import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <Link href="/">
          <div className="text-2xl font-bold text-gray-800">EduBond</div>
        </Link>
        <div>
            <Link href="/gigs" className="text-gray-800 hover:text-blue-500">
            Discover
          </Link>
        </div>
      </nav>
    </header>
  );
}