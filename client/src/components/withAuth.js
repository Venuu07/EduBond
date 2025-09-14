'use client'

import {useAuth} from '../context/AuthContext.js'
import { useRouter } from 'next/navigation.js'
import { useEffect } from 'react'

const withAuth=(WrappedComponent)=>{
    return (props)=>{
        const {user}=useAuth();
        const router=useRouter();

        useEffect(()=>{

            if(!user){
                router.push('/login');
            }
        },[user,router])
        return user?<WrappedComponent {...props}/>:null;
    }
}

export default withAuth;