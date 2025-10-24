'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext.js';
import toast from 'react-hot-toast';
import DetailSkeleton from '../../../components/DetailSkeleton.js';
import { ArrowRightLeft, UserCircle } from 'lucide-react';
import EmptyState from '@/components/EmptyState.js';
import Link from 'next/link';

export default function ExchangeDetailPage() {
    const params=useParams();
    const {exchangeId}=params;
    const { user } = useAuth();

    const [exchange,setExchange]=useState(null);
    const [loading,setLoading]=useState(true);

    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    const fetchExchange = async () => {
    if (!exchangeId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/exchanges/${exchangeId}`);
      setExchange(data.data);
    } catch (error) {
      console.error('Failed to fetch exchange details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, [exchangeId]); 

const handlePropose = async () => {
  const proposeToast = toast.loading('Proposing swap...');
    try {
     await axios.post(`${API_URL}/api/exchanges/${exchangeId}/propose`);
       toast.success('Swap proposed successfully!', { id: proposeToast });
        fetchExchange();
    } catch (error) {
        const message = error.response?.data?.message || 'Could not propose swap';
        toast.error(message, { id: proposeToast });
    }
}  

const handleAccept = async (proposalUserId) => {
  const acceptToast = toast.loading('Accepting proposal...');
    try {
        await axios.put(`${API_URL}/api/exchanges/${exchangeId}/accept`, { proposalUserId });
        toast.success('Proposal accepted!', { id: acceptToast });
        fetchExchange();
    } catch (error) {
        const message = error.response?.data?.message || 'Could not accept proposal';
        toast.error(message, { id: acceptToast });
    }
}


 if (loading) return <DetailSkeleton />;
    if(!exchange) return <div className='text-center p-10'>Exchange not found</div>

    const isOwner = user && exchange.user._id === user._id;
    const hasProposed = user && exchange.proposals?.some(p => p.user === user._id);
return (
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      {/* Add dark mode background and border */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto border dark:border-gray-700">

        {/* --- Header Section --- */}
        {/* Add dark mode text */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Skill Exchange Details</h1>
        {/* User Info - Add dark mode text and link styling */}
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400 dark:text-gray-500" />
          <span>Posted by:
             <Link href={`/profile/${exchange.user?._id}`} className="ml-1 font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-[var(--colors-edu-primary)] dark:hover:text-[var(--colors-edu-primary)]">
                 {exchange.user?.name || 'Unknown User'}
             </Link>
          </span>
        </div>

        {/* --- Offering/Seeking Section --- */}
        {/* Add dark mode styles */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
          {/* Offering */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/50 rounded text-center md:text-left">
            <p className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold mb-1 uppercase">Offering</p>
            <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-100 break-words">{exchange.skillOffered}</p>
          </div>
          {/* Icon */}
          <div className="flex justify-center">
            <ArrowRightLeft size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
           {/* Seeking */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 rounded text-center md:text-right">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold mb-1 uppercase">Seeking</p>
            <p className="text-lg font-semibold text-purple-800 dark:text-purple-100 break-words">{exchange.skillSought}</p>
          </div>
        </div>

        {/* --- Description Section --- */}
         {/* Add dark mode border and text */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{exchange.description}</p>
        </div>

        {/* --- Interaction Section --- */}

        {/* Owner's View: Show Proposals */}
        {isOwner && (
           // Add dark mode border, background, and text
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Proposals Received</h2>
            {exchange.status === 'open' ? (
              exchange.proposals?.length > 0 ? (
                <div className="space-y-3">
                  {exchange.proposals.map(proposal => (
                    proposal.user && (
                      // Add dark mode background, border, and text
                      <div key={proposal._id || proposal.user._id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-md">
                        <span className="font-medium text-gray-700 dark:text-gray-100">{proposal.user.name || 'Unknown User'}</span>
                        <button
                          onClick={() => handleAccept(proposal.user._id)}
                           // Adjust dark mode button style if needed
                          className="px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded dark:bg-green-700 dark:hover:bg-green-800"
                        >
                          Accept Swap
                        </button>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <EmptyState message="No proposals yet for this exchange." />
              )
            ) : (
               // Add dark mode text
              <p className="text-green-600 dark:text-green-400 font-semibold">You have matched with a user for this exchange.</p>
            )}
          </div>
        )}

        {/* Visitor's View: Show Propose Button */}
        {!isOwner && user && exchange.status === 'open' && (
          // Add dark mode border
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
             {/* Use btn-primary style, ensure it handles dark mode */}
            <button
              onClick={handlePropose}
              disabled={hasProposed}
              className={`w-full btn-primary py-3 ${
                hasProposed
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed hover:opacity-100'
                  : '' // btn-primary handles the active state
              }`}
            >
              {hasProposed ? 'Already Proposed Swap' : 'Propose Swap'}
            </button>
          </div>
        )}

        {/* Message for matched/completed exchanges for visitors */}
        {!isOwner && exchange.status !== 'open' && (
           // Add dark mode border and text
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-500 dark:text-gray-400 italic">
            This skill exchange is no longer open.
          </div>
        )}
      </div> {/* End Card */}
    </div>
  </div>
);
}