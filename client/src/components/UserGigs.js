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
    return(
        <div className="bg-white rounded-lg shadow-lg p-6">
            {gigs.length === 0 ? (
       <EmptyState
  message="You haven't created any gigs yet."
  actionLink="/gigs/create"
  actionText="Create Your First Gig"
/>
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