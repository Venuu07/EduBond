'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../components/withAuth.js';


function CreateExchangePage(){
    const [skillOffered,setSkillOffered]=useState('');
    const [skillSought,setSkillSought]=useState('');
    const [description,setDescription]=useState('');
    const [errors,setErrors]=useState({});
    const router=useRouter();
    const API_URL=process.env.NEXT_PUBLIC_API_URL;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/exchanges`,{
                skillOffered,
                skillSought,
                description,
            });
            router.push('/exchanges');  
    }
        catch (error) {
            console.error('Failed to create exchange',error);
        }           
}
    return (
    // Apply page background and padding
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card container with dark mode styles */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Heading with dark mode text */}
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Post a New Skill Exchange</h1>
          <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}

            {/* Skill Offered Input */}
            <div>
              {/* Uses .form-label (handles dark mode via globals.css) */}
              <label className="form-label">Skill You're Offering</label>
              {/* Uses .form-input (handles dark mode via globals.css) */}
              <input
                type="text"
                value={skillOffered}
                onChange={(e) => setSkillOffered(e.target.value)}
                className={`form-input ${errors?.skillOffered ? 'border-red-500' : ''}`}
                required
                placeholder="e.g., Python Programming"
              />
              {/* Error message with dark mode text */}
              {errors?.skillOffered && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.skillOffered}</p>}
            </div>

            {/* Skill Sought Input */}
            <div>
              <label className="form-label">Skill You're Seeking</label>
              <input
                type="text"
                value={skillSought}
                onChange={(e) => setSkillSought(e.target.value)}
                className={`form-input ${errors?.skillSought ? 'border-red-500' : ''}`}
                required
                placeholder="e.g., Video Editing"
              />
              {/* Error message with dark mode text */}
              {errors?.skillSought && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.skillSought}</p>}
            </div>

            {/* Description Input */}
            <div>
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4" // Keep rows consistent
                maxLength="200" // Keep max length if desired
                className={`form-input ${errors?.description ? 'border-red-500' : ''}`}
                required
                placeholder="Describe the exchange details..."
              ></textarea>
              {/* Error message with dark mode text */}
              {errors?.description && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* General Error Display */}
            {errors?.general && (
              // Add dark mode error text
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
            )}

            {/* Button uses .btn-primary (handles dark mode via globals.css) */}
            <button type="submit" className="btn-primary">
              Post Exchange
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuth(CreateExchangePage);