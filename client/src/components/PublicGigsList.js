// client/src/components/PublicGigsList.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GigCard from './GigCard.js'; // Re-use the card
import EmptyState from './EmptyState.js';
import CardSkeleton from './CardSkeleton.js';

export default function PublicGigsList({ userId }) {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchGigs = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/gigs/user/${userId}`);
                setGigs(data.data);
            } catch (error) {
                console.error("Failed to fetch user's public gigs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGigs();
    }, [userId, API_URL]);

    if (loading) {
        return (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
             </div>
        );
    }

    if (gigs.length === 0) {
        return <EmptyState message="This user has no open gigs available." />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
            ))}
        </div>
    );
}