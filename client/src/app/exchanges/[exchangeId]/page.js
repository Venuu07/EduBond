'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext.js';
import toast from 'react-hot-toast';
import DetailSkeleton from '../../../components/DetailSkeleton.js';
import { ArrowRightLeft, UserCircle } from 'lucide-react';
import EmptyState from '@/components/EmptyState.js';

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
  // Use consistent page background and padding
  <div className="bg-gray-100 min-h-screen py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Main Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl mx-auto">

        {/* --- Header Section --- */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">Skill Exchange Details</h1>
        {/* User Info */}
        <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
          <UserCircle size={16} className="mr-1.5 text-gray-400" />
          <span>Posted by: {exchange.user?.name || 'Unknown User'}</span>
        </div>

        {/* --- Offering/Seeking Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
          <div className="p-4 bg-green-100 border border-green-200 rounded text-center md:text-left">
            <p className="text-xs text-green-700 font-semibold mb-1 uppercase">Offering</p>
            <p className="text-lg font-semibold text-green-900 break-words">{exchange.skillOffered}</p>
          </div>
          <div className="flex justify-center">
            <ArrowRightLeft size={24} className="text-gray-500" />
          </div>
          <div className="p-4 bg-blue-100 border border-blue-200 rounded text-center md:text-right">
            <p className="text-xs text-blue-700 font-semibold mb-1 uppercase">Seeking</p>
            <p className="text-lg font-semibold text-blue-900 break-words">{exchange.skillSought}</p>
          </div>
        </div>

        {/* --- Description Section --- */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{exchange.description}</p>
        </div>

        {/* --- Interaction Section --- */}

        {/* Owner's View: Show Proposals */}
        {isOwner && (
          <div className="border-t border-gray-200 pt-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Proposals Received</h2>
            {exchange.status === 'open' ? (
              exchange.proposals?.length > 0 ? (
                <div className="space-y-3">
                  {exchange.proposals.map(proposal => (
                    proposal.user && (
                      <div key={proposal._id || proposal.user._id} className="flex justify-between items-center p-3 bg-white border rounded-md">
                        <span className="font-medium text-gray-700">{proposal.user.name || 'Unknown User'}</span>
                        <button
                          onClick={() => handleAccept(proposal.user._id)}
                          className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          Accept Swap
                        </button>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <EmptyState message="No proposals yet for this exchange." /> // Use EmptyState
              )
            ) : (
              <p className="text-green-600 font-semibold">You have matched with a user for this exchange.</p>
            )}
          </div>
        )}

        {/* Visitor's View: Show Propose Button */}
        {!isOwner && user && exchange.status === 'open' && (
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handlePropose}
              disabled={hasProposed}
              className={`w-full px-4 py-3 font-bold text-white rounded-md transition-colors ${
                hasProposed
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {hasProposed ? 'Already Proposed Swap' : 'Propose Swap'}
            </button>
          </div>
        )}

        {/* Message for matched/completed exchanges for visitors */}
        {!isOwner && exchange.status !== 'open' && (
          <div className="border-t border-gray-200 pt-6 text-center text-gray-500 italic">
            This skill exchange is no longer open.
          </div>
        )}
      </div> {/* End Card */}
    </div>
  </div>
)}