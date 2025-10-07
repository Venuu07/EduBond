
import Link from 'next/link';

// For now, we'll use a simple, hardcoded list of rooms.
const chatRooms = [
    {name: 'General', path: 'general'},
    {name:'Coding & Dev',path:'coding'},
    {name:'UPSC Aspirants',path:'upsc'},
    {name:'Gaming Zone',path:'gaming'},
];

export default function RoomsPage() {
    return(
        <div className='container mx-auto p-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>Join a Room</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {chatRooms.map((room) => (
                    <Link href={`/chat/${room.path}`} key={room.path}>
                        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer'>
                            <h2 className='text-xl font-bold'>{room.name}</h2>
                        </div>
                        </Link>
                ))}
            </div>
        </div>
    )
}