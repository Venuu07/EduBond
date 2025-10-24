// client/src/components/EditProfileForm.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditProfileForm({ currentUser, onUpdateSuccess }) {
    // Initialize state with current user data
    const [name, setName] = useState(currentUser.name);
    const [bio, setBio] = useState(currentUser.bio || '');
    const [linkedin, setLinkedin] = useState(currentUser.socialLinks?.linkedin || '');
    const [github, setGithub] = useState(currentUser.socialLinks?.github || '');
    const [portfolio, setPortfolio] = useState(currentUser.socialLinks?.portfolio || '');
    const [errors, setErrors] = useState({});

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const loadingToast = toast.loading('Updating profile...');

        const updatedData = {
            name,
            bio,
            socialLinks: { linkedin, github, portfolio }
        };

        try {
            const { data } = await axios.put(`${API_URL}/api/users/profile`, updatedData);
            toast.success('Profile updated!', { id: loadingToast });
            onUpdateSuccess(data.data); // Pass updated user data back to parent
        } catch (error) {
            const message = error.response?.data?.message || 'Update failed';
            setErrors({ general: message });
            toast.error(message, { id: loadingToast });
            console.error('Profile update failed:', error.response || error);
        }
    };

   return (
  // Add dark mode background and border to the main container
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-blue-200 dark:border-gray-700">
    {/* Add dark mode text color */}
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Profile</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        {/* form-label handles dark mode via globals.css */}
        <label className="form-label">Name</label>
        {/* form-input handles dark mode via globals.css */}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
      </div>
      {/* Bio */}
      <div>
        <label className="form-label">About Me (Bio)</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" className="form-input" placeholder="Tell us a bit about yourself..."></textarea>
      </div>
      {/* Social Links */}
      {/* Add dark mode border color */}
      <div className="border-t dark:border-gray-700 pt-4 space-y-3">
         {/* Add dark mode text color */}
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Social Links</h3>
        <div>
          <label className="form-label">LinkedIn Profile URL</label>
          <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="form-input" placeholder="https://linkedin.com/in/..." />
        </div>
        <div>
          <label className="form-label">GitHub Profile URL</label>
          <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} className="form-input" placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="form-label">Personal Website/Portfolio URL</label>
          <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="form-input" placeholder="https://your-site.com" />
        </div>
      </div>

      {/* Error message - Add dark mode text color */}
      {errors.general && (
        <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
      )}

      {/* Button uses btn-primary style from globals.css */}
      <button type="submit" className="btn-primary">
        Save Changes
      </button>
    </form>
  </div>
);
}