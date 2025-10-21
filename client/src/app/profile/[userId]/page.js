// client/src/app/profile/[userId]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Avatar from '../../../components/Avatar.js';
import Spinner from '../../../components/Spinner.js';
import { Linkedin, Github, ExternalLink, Star } from 'lucide-react';

// Reusable Star rendering function (same as before)
const renderStars = (rating) => {
    // ... (copy the renderStars function here) ...
     const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />);
    }
    if (halfStar) {
        stars.push(<Star key="half" size={16} className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    return <div className="flex">{stars}</div>; // Wrap stars in a div
};


export default function UserProfilePage() {
    const params = useParams();
    const userId = params.userId;

    const [profileUser, setProfileUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            setLoading(true);
            try {
                // Fetch profile data and reviews concurrently
                const [profileRes, reviewsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/users/${userId}`),
                    axios.get(`${API_URL}/api/reviews/user/${userId}`)
                ]);
                setProfileUser(profileRes.data.data);
                setReviews(reviewsRes.data.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
                // Handle profile not found error specifically?
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId, API_URL]);

    if (loading) return <Spinner />;
    if (!profileUser) return <div className="text-center p-10">User profile not found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Profile Header --- */}
                 <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar size="xl" />
                        <div className="flex-grow text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{profileUser.name}</h1>
                            {/* Optional: Add 'Member Since' */}
                            <p className="text-sm text-gray-500 mb-1">
                                Member since {new Date(profileUser.createdAt).toLocaleDateString()}
                            </p>
                            {/* Rating Display */}
                            {profileUser.numReviews > 0 && (
                                <div className="flex items-center justify-center sm:justify-start mb-2">
                                    {renderStars(profileUser.averageRating)}
                                    <span className="text-sm text-gray-600 font-medium ml-2">
                                        {profileUser.averageRating.toFixed(1)} ({profileUser.numReviews} reviews)
                                    </span>
                                </div>
                            )}
                            {/* Social Links */}
                            <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                                 {/* ... social link icons using profileUser.socialLinks ... */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bio Section --- */}
                {profileUser.bio && (
                     <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{profileUser.bio}</p>
                    </div>
                )}

                {/* --- Skills Section --- */}
                {profileUser.skills?.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {profileUser.skills.map((skill) => (
                                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Reviews Section --- */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                     <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews Received ({reviews.length})</h2>
                     {reviews.length > 0 ? (
                         <div className="space-y-4 max-h-96 overflow-y-auto">
                             {reviews.map((review) => (
                                 <div key={review._id} className="border-b border-gray-200 pb-3">
                                    <div className="flex items-center mb-1">
                                        {renderStars(review.rating)}
                                        <span className="text-sm font-semibold ml-2">{review.authorUser?.name || 'Anonymous'}</span>
                                        <span className="text-xs text-gray-400 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                     {review.comment && <p className="text-gray-600 text-sm italic">"{review.comment}"</p>}
                                 </div>
                             ))}
                         </div>
                     ) : (
                         <p className="text-gray-500 italic">No reviews yet.</p>
                     )}
                </div>

            </div>
        </div>
    );
}