"use client"

import  Navbar  from "@/app/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Profile from "../../components/Profile";
import EditProfile from "@/app/components/EditProfile";

  export default function ProfileEdit() {

    
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

        <div className="">
        <Navbar />
        <div className="flex justify-self-center"><EditProfile /></div>
        </div>
        
        
        
      )
    );
  }


