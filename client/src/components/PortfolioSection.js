// client/src/components/PortfolioSection.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.js';
import EmptyState from './EmptyState.js';
import { ExternalLink, Briefcase } from 'lucide-react';
import CardSkeleton from './CardSkeleton.js'; // Import skeleton

// Accept an optional userId prop
export default function PortfolioSection({ userId: propUserId }) {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Still need auth user as a fallback
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Determine which user ID to fetch for
    // If propUserId is provided, use it. Otherwise, use the logged-in user's ID.
    const userIdToFetch = propUserId || user?._id;

    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!userIdToFetch) {
                setLoading(false);
                return; // Don't fetch if no user ID is available
            }
            setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/portfolio/user/${userIdToFetch}`);
                setPortfolio(data.data);
            } catch (error) {
                console.error('Failed to fetch portfolio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [userIdToFetch, API_URL]); // Depend on the final ID to fetch

    if (loading) {
        // Show 2 skeleton cards
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <CardSkeleton />
                 <CardSkeleton />
             </div>
        );
    }

    if (portfolio.length === 0) {
        return <EmptyState message="No portfolio items to display yet." />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center mb-2">
                        <Briefcase size={18} className="text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm flex items-center"
                        >
                            View Project <ExternalLink size={14} className="ml-1" />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}