'use client';

import axios from 'axios';

export default function ApplicantsList({appllicants,gigId,onAccept}) {
    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    const handleAccept=async(applicantId)=>{
        try{
            await axios.put(`${API_URL}/api/gigs/${gigId}/accept`,{applicantId});
            alert('Applicant accepted !');
            onAccept();
}catch(error){
    alert(`Error: ${error.response.data.message }`);
    
}}

    if(appllicants.length===0){
        return <p className="text-gray-500">No applications yet.</p>
    }
    return (
        <div className="space-y-4">
            {appllicants.map((app)=>(
                <div key={app._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">{app.user.name}</span>
                    <button
                        onClick={() => handleAccept(app.user._id)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
                        Accept
                        </button>
                </div>
            ))}
        </div>
    );
}