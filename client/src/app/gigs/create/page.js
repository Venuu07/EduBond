'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../components/withAuth.js';
import toast from 'react-hot-toast';

function CreateGigPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState('');
  const [price, setPrice] = useState(''); // Correctly destructured
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gigToast = toast.loading('Creating gig...');
    try {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      const api_url = process.env.NEXT_PUBLIC_API_URL;

      await axios.post(`${api_url}/api/gigs`, {
        title,
        description,
        skills: skillsArray,
        price: Number(price),
      });
     toast.success('gig creation successful!', { id: gigToast });
      router.push('/gigs');
    } catch (error) {
     const message = error.response?.data?.message || 'gig creation failed';
      toast.error(message, { id: gigToast }); // Replace loading with error
      console.error('Login failed:', error.response || error);
    }
  };

  return (
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Card container with dark mode styles */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Heading with dark mode text */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create a New Gig</h1>
        <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}

          {/* Title Input */}
          <div>
            {/* Uses .form-label (handles dark mode via globals.css) */}
            <label className="form-label">Gig Title</label>
            {/* Uses .form-input (handles dark mode via globals.css) */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`form-input ${errors?.title ? 'border-red-500' : ''}`} // Added error check
              placeholder="e.g., I will design a modern logo"
              required
            />
            {/* Add dark mode error text */}
            {errors?.title && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div>
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`form-input ${errors?.description ? 'border-red-500' : ''}`} // Added error check
              rows="4"
              required
              placeholder="Describe the service you're offering..." // Added placeholder
            ></textarea>
             {/* Add dark mode error text */}
            {errors?.description && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Skills Input */}
          <div>
            <label className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className={`form-input ${errors?.skills ? 'border-red-500' : ''}`} // Added error check
              placeholder="e.g., figma, canva, logo-design"
              required
            />
            {/* Add dark mode helper text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate skills with a comma.</p>
             {/* Add dark mode error text */}
            {errors?.skills && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.skills}</p>}
          </div>

          {/* Price Input */}
          <div>
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`form-input ${errors?.price ? 'border-red-500' : ''}`} // Added error check
              required
              min="0" // Ensure non-negative price
            />
             {/* Add dark mode error text */}
            {errors?.price && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* General Error Display */}
          {errors?.general && ( // Added optional chaining
            // Add dark mode error text
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
          )}

          {/* Button uses .btn-primary (handles dark mode via globals.css) */}
          <button type="submit" className="btn-primary">
            Create Gig
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default withAuth(CreateGigPage);