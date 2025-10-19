'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '../../../components/withAuth.js';

function CreateGigPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [price, setPrice] = useState(''); // Correctly destructured
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      const api_url = process.env.NEXT_PUBLIC_API_URL;

      await axios.post(`${api_url}/api/gigs`, {
        title,
        description,
        skills: skillsArray,
        price: Number(price),
      });

      router.push('/gigs');
    } catch (error) {
      console.error('Failed to create gig:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create a New Gig</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="form-label">Gig Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="e.g., I will design a modern logo"
              required
            />
          </div>
          {/* Description Input */}
          <div>
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Skills Input */}
          <div>
            <label className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="form-input"
              placeholder="e.g., figma, canva, logo-design"
              required
            />
          </div>
          {/* Price Input */}
          <div>
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Gig
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreateGigPage);