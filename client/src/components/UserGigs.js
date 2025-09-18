'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GigCard from './GigCard';

export default function UserGigs(){
    const [gigs, setGigs] = useState([]);

    useEffect(()=>{
        const fetchMyGigs=async ()=>{
            try {
                const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/mygigs`);
                setGigs(data.data);
            } catch (error) {
                console.error('Failed to fetch user gigs: ',error);
            }
        };
        fetchMyGigs();
    },[]);
    return(
        <div className="bg-white rounded-lg shadow-lg p-6">
            {gigs.length === 0 ? (
        <p className="text-gray-500">You have not created any gigs yet.</p>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
    )}
    </div>
    );
}