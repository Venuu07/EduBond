'use client';

import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export default function ApplicantsList({applicants,gigId,onAccept}) {
    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    const handleAccept=async(applicantId)=>{
        const acceptToast=toast.loading('Accepting application...');
        try{
            await axios.put(`${API_URL}/api/gigs/${gigId}/accept`,{applicantId});
            toast.success('Application accepted!', { id: acceptToast });
            onAccept();
}catch(error){
    toast.error(`Error: ${error.response.data.message}`, { id: acceptToast });
}

    if(applicants.length===0){
        return <p className="text-gray-500">No applications yet.</p>
    }
    return (
        <div className="space-y-4">
            {applicants.map((app)=>(
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
}