// client/src/app/profile/ProfileClientPage.js

'use client'; // This directive is crucial

import PortfolioSection from '../../components/PortfolioSection.js';

import { useAuth } from '../../context/AuthContext.js';
import withAuth from '../../components/withAuth.js';
import SkillsManager from '../../components/SkillsManager.js';
import UserGigs from '../../components/UserGigs.js';
import Avatar from '../../components/Avatar.js';
import { Linkedin, Github, ExternalLink } from 'lucide-react'; // Import icons for links
import { useState } from 'react';
import EditProfileForm from '../../components/EditProfileForm.js';

function ProfilePage() {
 const { user, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

   const handleProfileUpdate = (updatedUserData) => {
        setUser(updatedUserData); // Update the global user state
        setIsEditing(false); // Close the edit form
    };

 return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 sm:p-8"> {/* Adjusted padding */}

                {/* --- Profile Header --- */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 relative"> {/* Added mb-6 */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar size="xl" />
                        <div className="flex-grow text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                            {/* Social Links */}
                            <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                                {user.socialLinks?.linkedin && (
                                    <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {user.socialLinks?.github && (
                                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                        <Github size={20} />
                                    </a>
                                )}
                                {user.socialLinks?.portfolio && (
                                    <a href={user.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Edit Button */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="absolute top-4 right-4 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {/* --- Edit Profile Form (Conditional) --- */}
                {isEditing && (
                    <EditProfileForm currentUser={user} onUpdateSuccess={handleProfileUpdate} />
                )}

                {/* --- Bio Section (Display only if not editing) --- */}
                {!isEditing && user.bio && (
                     <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">About Me</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
                    </div>
                )}


                {/* --- Skills Section --- */}
                <div className="mb-6"> {/* Added mb-6 */}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">My Skills</h2>
                    <SkillsManager initialSkills={user.skills || []} />
                </div>

                {/* --- Portfolio Section --- */}
                <div className="mb-6"> {/* Added mb-6 */}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">My Portfolio</h2>
                    <PortfolioSection />
                </div>

                {/* --- Gigs Section --- */}
                <div className="mb-6"> {/* Added mb-6 */}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">My Gigs</h2>
                    <UserGigs />
                </div>
                 {/* Note: BookingsDashboard is rendered in the parent layout page */}
            </div>
        </div>
    );
}




export default withAuth(ProfilePage);