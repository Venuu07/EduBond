
'use client';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Spinner from '@/components/Spinner.js';
import EmptyState from './EmptyState';

export default function PortfolioSection(){
    const[items,setItems]=useState([]);
    const API_URL=process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchPortfolio = async () => {
          setLoading(true);
            try {
                const{data} = await axios.get(`${API_URL}/api/portfolio`);
                setItems(data.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
            finally {
        setLoading(false); // 3. Set loading to false after fetch completes (success or fail)
      }
        };
        fetchPortfolio();
    }, [API_URL]);

     return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {loading ? (
        <Spinner />
        ) :
      items.length === 0 ? (
        <EmptyState
  message="Your completed work will appear here automatically after gigs/exchanges are marked complete."
  // No actionLink or actionText needed here
/>
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