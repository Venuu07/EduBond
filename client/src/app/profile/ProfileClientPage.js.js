// client/src/app/profile/ProfileClientPage.js

'use client'; // This directive is crucial

import PortfolioSection from '../../components/PortfolioSection.js';

import { useAuth } from '../../context/AuthContext.js';
import withAuth from '../../components/withAuth.js';
import SkillsManager from '../../components/SkillsManager.js';
import UserGigs from '../../components/UserGigs.js';
import Avatar from '../../components/Avatar.js';
import { Linkedin, Github, ExternalLink,Star } from 'lucide-react'; // Import icons for links
import { useState } from 'react';
import EditProfileForm from '../../components/EditProfileForm.js';

function ProfilePage() {
 const { user, setUser } = useAuth()
 console.log("Profile Page Render: User is:", user);
  const [isEditing, setIsEditing] = useState(false);

  

   const handleProfileUpdate = (updatedUserData) => {
        setUser(updatedUserData); // Update the global user state
        setIsEditing(false); // Close the edit form
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />);
        }
        // Basic half-star representation (could be improved with a half-star icon)
        if (halfStar) {
            stars.push(<Star key="half" size={16} className="text-yellow-400" />); // Partially filled look
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
        }
        return stars;
    };

 return (
    // This outer wrapper is necessary for the background to show through from the parent page
    <>
        {/* Container for the whole page content (no background applied here) */}
        <div className="container mx-auto p-4 sm:p-8">

            {/* --- 1. Profile Header (Full Width Card) --- */}
            {/* The primary card that displays user info and the edit button */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 relative border dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Avatar size="xl" />
                    <div className="flex-grow text-center sm:text-left">
                        {/* Name and Email */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{user.email}</p>

                        {/* --- Display Rating --- */}
                        {user.numReviews > 0 && (
                            <div className="flex items-center justify-center sm:justify-start mb-2">
                                <div className="flex mr-1">
                                    {renderStars(user.averageRating)}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {user.averageRating.toFixed(1)} ({user.numReviews} reviews)
                                </span>
                            </div>
                        )}
                        {/* Social Links */}
                        <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                            {user.socialLinks?.linkedin && (
                                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {user.socialLinks?.github && (
                                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    <Github size={20} />
                                </a>
                            )}
                            {user.socialLinks?.portfolio && (
                                <a href={user.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                {/* Edit Button */}
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-4 right-4 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {/* --- 2. Main Content Wrapper (Limits Width and Centers Content) --- */}
            <div className="max-w-4xl mx-auto space-y-6">

                {/* --- Edit Profile Form (Conditional) --- */}
                {isEditing && (
                    <EditProfileForm currentUser={user} onUpdateSuccess={handleProfileUpdate} />
                )}

                {/* --- Bio Section (Card) --- */}
                {!isEditing && user.bio && (
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">About Me</h2>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{user.bio}</p>
                    </div>
                )}

                {/* --- Skills Section --- */}
                <div className="pt-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">My Skills</h2>
                    <SkillsManager initialSkills={user.skills || []} />
                </div>

                {/* --- Portfolio Section --- */}
                <div className="pt-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">My Portfolio</h2>
                    <PortfolioSection userId={user._id} />
                </div>

                {/* --- Gigs Section --- */}
                <div className="pt-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">My Gigs</h2>
                    <UserGigs />
                </div>
            </div>
        </div>
    </>
);
}




export default withAuth(ProfilePage);