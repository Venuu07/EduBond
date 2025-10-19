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
    return(
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-wrap gap-2" >
                {skills.map((skill,index)=>{
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1  text-sm font-medium rounded-full">
                        {skill}
                    </span>
                })}
            </div>

            <form onSubmit={handleAddSkill} className="mt-4 flex gap-2">
                <input
                 type="text"
                 value={newSkill}
                 onChange={(e)=> setNewSkill(e.target.value)}
                 placeholder="Add a new skill (e.g., Python)"
                 className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                 type='submit'
                 className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Add
                 </button>
            </form>
        </div>
    );
}
}