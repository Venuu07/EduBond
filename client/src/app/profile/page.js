import { useAuth } from "../../context/AuthContext";
import withAuth from '../../components/withAuth.js';

function ProfilePage(){
    const {user}=useAuth();

    if(!user) return null;

    return(
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-6">
                         {/* Placeholder for Profile Picture */}
                        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </div>
                  {/* We will add more sections here for Skills, Portfolio, Gigs, etc. */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Skills</h2>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <p className="text-gray-500">
                           Gigs you've created will appear here... 
                        </p>
                    </div>
                  </div>

            </div>
        </div>
    )
}


export default withAuth(ProfilePage);