"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import Ownposts from "./Ownposts";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";

function Profile() {
  
  const { data: session, status } = useSession();
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    if (session) {
      fetchUser()
    }
  }, [])

    const fetchUser = async () => {
    try {
      if (session) {
        const res = await axios.get(`/api/user/${session.user.id}`)
        setUser(res.data)
      }
      
    } catch (error) {
      console.error(error)
    }
  };
  return (
    status === "authenticated" &&
    session.user && (
      <div className="bg-[#131414] text-white flex flex-col md:flex-row mt-20 container mx-auto p-6">
        {/* Sidebar */}
        <div className="bg-[#1f2021] w-full md:w-2/5 p-6 flex flex-col items-center rounded-lg shadow-lg">
          <div className="relative w-32 h-32">
            {user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full border-4 border-gray-600 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center">
                <span className="text-gray-300">No Image</span>
              </div>
            )}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{user.username}</h2>
          <p className="mt-2 text-gray-400">Role: {user.role}</p>
          <p className="mt-1 text-gray-400">Bio: {user.bio}</p>
          <p className="mt-1 text-gray-400">Contact: {user.contact}</p>
            
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-5 transition-all">
          <Link href={`/profile/edit`}>
            Edit Profile
            </Link>
          </button>
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded mt-3 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Posts Section */}
        <div className="flex-1 p-6">
          
          <Ownposts />
        </div>
      </div>
    )
  );
}

export default Profile;
