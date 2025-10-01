'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ArrowRightLeft } from 'lucide-react';

export default function ExchangeDetailPage() {
    const params=useParams();
    const {exchangeId}=params;

    const [exchange,setExchange]=useState(null);
    const [loading,setLoading]=useState(true);

    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if(exchangeId){
            const fetchExchange=async()=>{
                try {
                    const {data}=await axios.get(`${API_URL}/api/exchanges/${exchangeId}`);
                    setExchange(data.data);}
                catch (error) {
                    console.error('Failed to fetch exchange details:',error);
                }finally{
                    setLoading(false);
        }
    };
    fetchExchange();
}
},[exchangeId,API_URL]);

 if(loading) return <div className='text-center p-10'>Loading ...</div>
    if(!exchange) return <div className='text-center p-10'>Exchange not found</div>

 return(
    <div  className="container mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Skill Exchange Details</h1>
            <div className="p-4 bg-green-100 rounded mb-2">
                <p className="text-sm text-green-700 font-semibold">OFFERING</p>
                <p className="text-2xl font-bold text-green-900">{exchange.skillOffered}</p>

            </div>
            <div className='flex justify-center my-4'>
                <ArrowRightLeft size={24} className="text-gray-500"/>
            </div>
            <div className='p-4 bg-blue-100 rounded mb-6'>
                <p className="text-sm text-blue-700 font-semibold">SEEKING</p>
                <p className="text-2xl font-bold text-blue-900">{exchange.skillSought}</p>
            </div>

            <div className='border-t pt-6'>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{exchange.description}</p>
            </div>
            </div>
    </div>
 )
}