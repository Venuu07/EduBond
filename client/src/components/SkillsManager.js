'use client';
import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export default function SkillsManager({initialSkills}){
    const [skills,setSkills]=useState(initialSkills);
    const [newSkill,setNewSkill]=useState('');

    const handleAddSkill=async(e)=>{
        e.preventDefault();
        const AddSkillToast = toast.loading('Adding Skill ...');
        if(!newSkill.trim()) return;

        try {
            const {data}=await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/skills`,{
                skill:newSkill,
            });
            toast.success('Skill Added successfully!', { id: AddSkillToast });
            setSkills(data.data);
            setNewSkill('');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add skill';
            toast.error(message, { id: AddSkillToast });
    };
    return (
        // Add dark mode background and border
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border dark:border-gray-700">
            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 mb-4"> {/* Added mb-4 */}
                {/* Check if skills is an array before mapping */}
                {Array.isArray(skills) && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        // Add dark mode styles for tags
                        <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-3 py-1 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700">
                            {skill}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">No skills added yet.</p>
                )}
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="mt-4 flex gap-2 items-center border-t border-gray-100 dark:border-gray-700 pt-4"> {/* Add border-t */}
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill (e.g., Python)"
                    // Use form-input for consistency (handles dark mode)
                    className="form-input flex-grow"
                />
                <button
                    type="submit"
                    // Use btn-primary style, adjust size/padding if needed
                    className="btn-primary px-5 py-2 text-sm w-auto flex-shrink-0 disabled:opacity-50"
                    disabled={isSubmitting || !newSkill.trim()} // Disable while submitting or if input empty
                >
                    {isSubmitting ? 'Adding...' : 'Add'}
                </button>
            </form>
        </div>
    );
}
}