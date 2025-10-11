
'use client';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function PortfolioSection(){
    const[items,setItems]=useState([]);
    const API_URL=process.env.NEXT_PUBLIC_API_URL;

    useEffect(()=>{
        const fetchPortfolio = async () => {
            try {
                const{data} = await axios.get(`${API_URL}/api/portfolio`);
                setItems(data.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio();
    }, [API_URL]);

     return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {items.length === 0 ? (
        <p className="text-gray-500">Your completed work will appear here automatically.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="border-b pb-2">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}