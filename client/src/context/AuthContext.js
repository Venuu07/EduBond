'use client';

import { createContext,useState,useEffect,useContext } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const AuthContext =createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router=useRouter();

    useEffect(()=>{
        const checkUserLoggedIn=async()=>{
            const token=localStorage.getItem('userToken');
            if(token){
                try {
                 axios.defaults.headers.common['Authorization']=`Bearer ${token}`;

                 const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`)
                 setUser(data.data);
                } catch (error) {
                    console.error('Failed to fetch user',error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        checkUserLoggedIn();
    },[]);

    const login=(userData)=>{
        localStorage.setItem('userToken',userData.token);
        axios.defaults.headers.common['Authorization']=`Bearer ${userData.token}`;
        setUser(
            {
            name: userData.name,
            email:userData.email,
            _id:userData._id
        });
        router.push('/');
        setIsLoading(false);
    };
    const logout=()=>{
        localStorage.removeItem('userToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        router.push('/login');
        setIsLoading(false);
    }

    return(
        <AuthContext.Provider value={{user,login,logout,setUser,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}