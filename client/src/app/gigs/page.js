'use client';

import { useState,useEffect } from "react";
import axios from "axios";
import GigCard from '../../components/GigCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner.js';
import CardSkeleton from '../../components/CardSkeleton.js';
import EmptyState from '../../components/EmptyState.js';
import SearchFilterBar from '../../components/SearchFilterBar.js';

export default function GigsPage(){
    
    const [gigs,setGigs]=useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(()=>{
        const fetchGigs=async () =>{
          setLoading(true)
            try {
                const url = `${API_URL}/api/gigs?search=${encodeURIComponent(searchTerm)}`;
                console.log("Fetching Gigs from:", url); // Log the URL for debugging
                const { data } = await axios.get(url);
                setGigs(data.data);
            } catch (error) {
                console.error('Failed to fetch gigs:', error);
                setGigs([]);
            }
            finally{
              setLoading(false);
            }
        };
        fetchGigs();
    },[searchTerm, API_URL]);

    const handleSearch = (query) => {
        setSearchTerm(query); // Update the state when the debounced search happens
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Adjusted padding */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> {/* Flex layout for title/button */}
                    <h1 className="text-3xl font-bold text-gray-800">Discover Gigs</h1>
                    <Link href="/gigs/create">
                        <span className="btn-primary w-full sm:w-auto text-sm px-4 py-2"> {/* Use btn-primary style */}
                            + Create a Gig
                        </span>
                    </Link>
                </div>

                {/* 6. Render the SearchFilterBar */}
                <SearchFilterBar onSearch={handleSearch} placeholder="Search gigs by title or description..." />

                {/* Conditional Rendering: Loading, Empty, or Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : gigs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {gigs.map((gig) => (
                            <GigCard key={gig._id} gig={gig} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message={searchTerm ? `No gigs found for "${searchTerm}".` : "No gigs available right now."}
                        actionLink="/gigs/create"
                        actionText="Create a Gig"
                    />
                )}
            </div>
        </div>
    );
}