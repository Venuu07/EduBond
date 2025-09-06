import Link from 'next/link';

export default function GigCard({gig}) {
    return(
         // We'll wrap the card in a Link to make it clickable later
         <Link href={`/gigs/${gig._id}`}>
         <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
             {/* Placeholder for an image */}
             <div className="w-full h-48 bg-gray-200"></div>
             <div className="p-4">
              <div className="flex items-center mb-2">
                {/* Placeholder for user avatar */}
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <span className="font-semibold text-gray-700">{gig.user.name} </span>
              </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {gig.title}
        </h3>

        <div  className="flex flex-wrap gap-2 mb-4">
         {gig.skills.map((skill)=>(
            <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs font-semibold rounded-full">
              {skill}
            </span>
         ))}
        </div>
        <div className="text-right text-xl font-bold text-gray-800">
          ₹{gig.price}
        </div  >
             </div>
         </div>
        </Link>
    );
}