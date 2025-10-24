'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MentorshipCard from '@/components/MentorshipCard';
import Spinner from '../../components/Spinner.js';
import CardSkeleton from '../../components/CardSkeleton.js';
import DetailSkeleton from '../../components/DetailSkeleton.js'
import EmptyState from '@/components/EmptyState.js';
import SearchFilterBar from '../../components/SearchFilterBar.js';

export default function MentorshipPage() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            try {
                // 3. Build URL with search query
                const url = `${API_URL}/api/mentorship?search=${encodeURIComponent(searchTerm)}`;
                console.log("Fetching Mentorships from:", url); // Debug log
                const { data } = await axios.get(url);
                setSessions(data.data);
            } catch (error) {
                console.error('Failed to fetch mentorship sessions:', error);
                setSessions([]); // Clear on error
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [searchTerm, API_URL]); // 4. Add searchTerm dependency

    // 5. Callback for the search bar
    const handleSearch = (query) => {
        setSearchTerm(query);
    };
if (loading) return <DetailSkeleton />;
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Adjusted padding */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> {/* Flex layout */}
                    <h1 className="text-3xl font-bold dark:text-gray-100">Mentorship Sessions</h1>
                     {/* Conditionally show Offer button if user is logged in */}
                     {/* We need useAuth here if we haven't imported it already */}
                     {/* Assuming useAuth is imported */}
                     {/* {user && ( */}
                        <Link href="/mentorship/create">
                            <span className="btn-primary w-full sm:w-auto text-sm px-4 py-2">
                                + Offer Mentorship
                            </span>
                        </Link>
                     {/* )} */}
                </div>

                {/* 6. Render the SearchFilterBar */}
                <SearchFilterBar onSearch={handleSearch} placeholder="Search sessions by title or description..." />

                {/* Conditional Rendering */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : sessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.map((session) => (
                            <MentorshipCard key={session._id} session={session} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message={searchTerm ? `No mentorship sessions found for "${searchTerm}".` : "No mentorship sessions available right now."}
                        actionLink="/mentorship/create"
                        actionText="Offer Mentorship"
                    />
                )}
            </div>
        </div>
    );
}