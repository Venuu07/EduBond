// client/src/app/rooms/create/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import withAuth from '../../../components/withAuth.js'; // Protect this page

const roomCategories = ['Academic', 'Career', 'Hobbies', 'General']; // Define categories

function CreateRoomPage() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General'); // Default category
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Helper to generate slug from name
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName)); // Auto-generate slug
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const loadingToast = toast.loading('Creating room...');

        const roomData = { name, slug, description, category };

        try {
            await axios.post(`${API_URL}/api/rooms`, roomData);
            toast.success('Room created successfully!', { id: loadingToast });
            router.push('/rooms'); // Redirect to room list on success
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create room';
            setErrors({ general: message }); // Show error in form
            toast.error(message, { id: loadingToast });
            console.error('Room creation failed:', error.response || error);
        }
    };

   return (
  // Apply page background and padding
  <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Card container with dark mode styles */}
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Heading with dark mode text */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create a New Chat Room</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Room Name */}
          <div>
            <label className="form-label">Room Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              // form-input handles dark mode styles
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              required
              placeholder="e.g., Competitive Programming"
            />
            {/* Error message with dark mode text */}
            {errors.name && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Slug (URL Identifier) */}
          <div>
            <label className="form-label">Room Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className={`form-input ${errors.slug ? 'border-red-500' : ''}`}
              required
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              title="Use lowercase letters, numbers, and hyphens only (e.g., competitive-programming)"
            />
            {/* Helper text with dark mode text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Auto-generated from name. Use lowercase letters, numbers, and hyphens.</p>
             {/* Error message with dark mode text */}
            {errors.slug && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.slug}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              maxLength="200"
              className={`form-input ${errors.description ? 'border-red-500' : ''}`}
              required
              placeholder="What is this room about?"
            ></textarea>
             {/* Error message with dark mode text */}
            {errors.description && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="form-label">Category</label>
            {/* Add dark mode styles for select dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              // Use form-input styles + custom select styling if needed
              className="form-input bg-white dark:bg-gray-700 dark:text-white"
            >
              {roomCategories.map((cat) => (
                // Add dark mode background for options if needed (browser support varies)
                <option key={cat} value={cat} className="dark:bg-gray-700">{cat}</option>
              ))}
            </select>
          </div>

          {/* General Errors */}
          {errors.general && (
            // Add dark mode text color
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
          )}

          {/* Button uses btn-primary style */}
          <button type="submit" className="btn-primary">
            Create Room
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default withAuth(CreateRoomPage); // Protect this page