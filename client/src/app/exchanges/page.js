// client/src/app/exchanges/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ExchangeCard from '../../components/ExchangeCard.js'; // 1. Import the new component
 import toast from 'react-hot-toast';
 import Spinner from '../../components/Spinner.js';

export default function ExchangesPage() {
  const [exchanges, setExchanges] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      const fetchToast = toast.loading('Fetching exchanges...');
      try {
        const { data } = await axios.get(`${API_URL}/api/exchanges`);
        setExchanges(data.data);
        toast.success('Exchanges fetched successfully!', { id: fetchToast });
      } catch (error) {
        const message = error.response?.data?.message || 'fetching exchange failed failed';
      toast.error(message, { id: fetchToast }); // Replace loading with error
      console.error('Login failed:', error.response || error);
      }
      finally {
        setLoading(false); // Stop loading
      }
    };
    fetchExchanges();
  }, [API_URL]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Skill Exchange</h1>
          <Link href="/exchanges/create">
            <span className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Post an Exchange
            </span>
          </Link>
        </div>
        
        {loading ? (
          <Spinner />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* 2. Replace the old div with our new card component */}
          {exchanges.map((exchange) => (
            <ExchangeCard key={exchange._id} exchange={exchange} />
          ))}
        </div>
        )}
      </div>
    </div>
  );
}