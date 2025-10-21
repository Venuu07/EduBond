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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
                </div>
                {/* Bio */}
                <div>
                    <label className="form-label">About Me (Bio)</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" className="form-input" placeholder="Tell us a bit about yourself..."></textarea>
                </div>
                {/* Social Links */}
                <div className="border-t pt-4 space-y-3">
                     <h3 className="text-md font-semibold text-gray-700">Social Links</h3>
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

                {errors.general && (
                    <p className="text-red-500 text-sm text-center">{errors.general}</p>
                )}

                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
}