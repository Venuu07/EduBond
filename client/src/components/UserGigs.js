'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GigCard from './GigCard';
import EmptyState from './EmptyState';

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
   return (
  // Add dark mode background and border to the main container
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border dark:border-gray-700">
    {gigs.length === 0 ? (
      // EmptyState should handle its own dark mode styles internally
      <EmptyState
        message="You haven't created any gigs yet."
        actionLink="/gigs/create"
        actionText="Create Your First Gig"
      />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          // GigCard component already has its dark mode styles defined within it
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    )}
  </div>
);
}