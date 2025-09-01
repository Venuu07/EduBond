'use client';

import { useState,useEffect } from "react";
import axios from "axios";

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
    return(
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Discover Gigs & Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {gigs.map((gig) => (
          <div key={gig._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{gig.title}</h2>
            <p className="text-gray-600">{gig.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}