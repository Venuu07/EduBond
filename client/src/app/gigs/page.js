'use client';

import { useState,useEffect } from "react";
import axios from "axios";
import GigCard from '../../components/GigCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner.js';

export default function GigsPage(){
    
    const [gigs,setGigs]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchGigs=async () =>{
          setLoading(true)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs`);

                setGigs(response.data.data)
            } catch (error) {
                console.error('Failed to fetch gigs:', error);
            }
            finally{
              setLoading(false);
            }
        };
        fetchGigs();
    },[]);
    return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Discover Gigs & Services</h1>
         <Link href="/gigs/create">
             <span className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Create a Gig
             </span>
          </Link>
        </div>
          {loading ? (
          <Spinner />
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
        </div>
          )}
      </div>
    </div>
  );
}