'use client'

import {useAuth} from '../context/AuthContext.js'
import { useRouter } from 'next/navigation.js'
import { useEffect } from 'react'
import Spinner from './Spinner.js';

const withAuth=(WrappedComponent)=>{
    return (props)=>{
        const {user,isLoading}=useAuth();
        const router=useRouter();

        useEffect(()=>{

           if (!isLoading && !user) {
        router.push('/login');
      }
        },[user,router,isLoading]);
        if (isLoading) {
        return <Spinner />;
    }
        return user?<WrappedComponent {...props}/>:null;
    }
}

export default withAuth;