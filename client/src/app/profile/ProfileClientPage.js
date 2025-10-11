// client/src/app/profile/ProfileClientPage.js

'use client'; // This directive is crucial

import PortfolioSection from '../../components/PortfolioSection.js';

import { useAuth } from '../../context/AuthContext.js';
import withAuth from '../../components/withAuth.js';
import SkillsManager from '../../components/SkillsManager.js';
import UserGigs from '../../components/UserGigs.js';

function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Skills</h2>
          <SkillsManager initialSkills={user.skills || []} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h2>
          <PortfolioSection />
        </div>

        {/* Gigs Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Gigs</h2>
          <UserGigs />
        </div>
      </div>
    </div>
  );
}

// Wrap the component with our authentication HOC
export default withAuth(ProfilePage);