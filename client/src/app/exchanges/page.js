// client/src/app/exchanges/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ExchangeCard from '../../components/ExchangeCard.js'; // 1. Import the new component
 import toast from 'react-hot-toast';
 import Spinner from '../../components/Spinner.js';
 import CardSkeleton from '../../components/CardSkeleton.js';
import EmptyState from '../../components/EmptyState.js';
import SearchFilterBar from '../../components/SearchFilterBar.js';

export default function ExchangesPage() {
  const [exchanges, setExchanges] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
        const fetchExchanges = async () => {
            setLoading(true);
            try {
                // 3. Build URL with search query
                const url = `${API_URL}/api/exchanges?search=${encodeURIComponent(searchTerm)}`;
                console.log("Fetching Exchanges from:", url); // Debug log
                const { data } = await axios.get(url);
                setExchanges(data.data);
            } catch (error) {
                console.error('Failed to fetch exchanges:', error);
                setExchanges([]); // Clear on error
            } finally {
                setLoading(false);
            }
        };

        fetchExchanges();
    }, [searchTerm, API_URL]); // 4. Add searchTerm dependency

    // 5. Callback for the search bar
    const handleSearch = (query) => {
        setSearchTerm(query);
    };
  return (
        <div className="min-h-screen dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold dark:text-gray-100">Skill Exchange</h1>
                    <Link href="/exchanges/create">
                        <span className="btn-primary w-full sm:w-auto text-sm px-4 py-2">
                            + Propose an Exchange
                        </span>
                    </Link>
                </div>

                {/* 6. Render the SearchFilterBar */}
                <SearchFilterBar onSearch={handleSearch} placeholder="Search by skills offered, sought, or description..." />

                {/* Conditional Rendering */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : exchanges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exchanges.map((exchange) => (
                            <ExchangeCard key={exchange._id} exchange={exchange} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message={searchTerm ? `No exchanges found for "${searchTerm}".` : "No skill exchanges proposed yet."}
                        actionLink="/exchanges/create"
                        actionText="Propose an Exchange"
                    />
                )}
            </div>
        </div>
    );
}