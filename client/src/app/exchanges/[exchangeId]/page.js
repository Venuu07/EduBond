'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ArrowRightLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.js';
import toast from 'react-hot-toast';

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


 if(loading) return <div className='text-center p-10'>Loading ...</div>
    if(!exchange) return <div className='text-center p-10'>Exchange not found</div>

    const isOwner = user && exchange.user._id === user._id;
    const hasProposed = user && exchange.proposals?.some(p => p.user === user._id);
 return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Skill Exchange Details</h1>

        {/* Display Offered and Seeking Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
          <div className="p-4 bg-green-100 rounded text-center md:text-left">
            <p className="text-sm text-green-700 font-semibold">OFFERING</p>
            <p className="text-xl font-bold text-green-900">{exchange.skillOffered}</p>
          </div>
          <div className="flex justify-center">
            <ArrowRightLeft size={24} className="text-gray-500" />
          </div>
          <div className="p-4 bg-blue-100 rounded text-center md:text-right">
            <p className="text-sm text-blue-700 font-semibold">SEEKING</p>
            <p className="text-xl font-bold text-blue-900">{exchange.skillSought}</p>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{exchange.description}</p>
        </div>

        {/* --- Interaction Section (Conditional UI) --- */}

        {/* If the user is the owner */}
        {isOwner && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Proposals Received</h2>
            {exchange.status === 'open' ? (
              exchange.proposals?.length > 0 ? (
                <div className="space-y-3">
                  {exchange.proposals.map(proposal => (
                    <div key={proposal._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">{proposal.user.name || 'Loading...'}</span>
                      <button
                        onClick={() => handleAccept(proposal.user._id)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Accept Swap
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No proposals yet.</p>
              )
            ) : (
              <p className="text-green-600 font-semibold">You have matched with a user for this exchange.</p>
            )}
          </div>
        )}

        {/* If the user is NOT the owner and the exchange is open */}
        {!isOwner && user && exchange.status === 'open' && (
          <div className="border-t pt-6">
            <button
              onClick={handlePropose}
              disabled={hasProposed}
              className={`w-full px-4 py-3 font-bold text-white rounded-md transition-colors ${
                hasProposed
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {hasProposed ? 'Already Proposed Swap' : 'Propose Swap'}
            </button>
          </div>
        )}
        {/* Message for matched/completed exchanges for visitors */}
         {!isOwner && exchange.status !== 'open' && (
             <div className="border-t pt-6 text-center text-gray-500">
                This skill exchange is no longer open.
             </div>
         )}
      </div>
    </div>
  );
}