'use client';

import { useState,useEffect } from "react";
import axios from "axios";
import GigCard from '../../components/GigCard';

export default function GigsPage(){
    
    const [gigs,setGigs]=useState([]);

    useEffect(()=>{
        const fetchGigs=async () =>{
            try {
                
                const response=await axios.get('http://localhost:5000/api/gigs');

                setGigs(response.data.data)
            } catch (error) {
                console.error('Failed to fetch gigs:', error);
            }
        };
        fetchGigs();
    },[]);
    return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Discover Gigs & Services</h1>
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}