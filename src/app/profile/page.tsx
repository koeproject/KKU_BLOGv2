"use client"

import  Navbar  from "@/app/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Profile from "../components/Profile";

  export default function ProfilePage() {

    
    const { data: session, status } = useSession()
    const router = useRouter()
  
    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/')
      }
    }, [status, router])
  
    return (
      status === 'authenticated' &&
      session.user && (

        <div className="flex h-screen items-center justify-center pt-36">
  
        <Navbar />
        <div className="h-12"></div>
        <Profile />
      
        </div>
        
      )
    );
  }


