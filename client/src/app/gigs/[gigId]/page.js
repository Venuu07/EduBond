'use client'

import { useState,useEffect } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import { useAuth } from '../../../context/AuthContext.js'; 

export default function GigDetailPage(){
    const params=useParams();
    const gigId=params.gigId;
    const {user}=useAuth();

    const[gig,setGig]=useState(null);
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        if(gigId){
            const fetchGig=async ()=>{
                try {
                  const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gigs/${gigId}`)  ;
                  setGig(data.data);
                } catch (error) {
                    console.error('Failed to fetch gig Details',error)
                } finally{
                    setLoading(false);
                }
            };
            fetchGig();
        }
    },[gigId]);

    const handleApply=async()=>{
        try {
            const api_url=process.env.NEXT_PUBLIC_API_URL;
            await axios.post(`${api_url}/api/gigs/${gigId}/apply`)
            alert('Application successful!');

            // Re-fetch the gig data to update the UI 
             const { data } = await axios.get(`${api_url}/api/gigs/${gigId}`);
            setGig(data.data);
                } catch (error) {
            alert(`Error: ${error.response.data.message}`);
        }
    }
    if(loading){
        return <div className="text-center p-10">Loading...</div>
    }

    if(!gig){
       return <div className="text-center p-10">Gig not found.</div>; 
    }
    return(
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">
                {gig.title}
            </h1>
            <p className="text-lg text-gray-700">{gig.description}</p>
            {/* We will add more details here later */}
        </div>
    )
}