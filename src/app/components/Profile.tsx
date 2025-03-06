"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import PostList from "./PostList";

function Profile() {
const { data: session, status } = useSession()
  return (
    status === 'authenticated' &&
    session.user && (
    <div className="min-h-screen bg-[#131414] text-white flex flex-col md:flex-row mt-52">
      {/* Sidebar */}
      <aside className="bg-[#1f2021] w-full md:w-1/4 p-6 flex flex-col items-center">
        <div className="relative w-28 h-28">
          <Image
            src={session.user.profilePicture || '/images/default-profile.jpg'}
            alt="Profile"
            width={112}
            height={112}
            className="rounded-full border-4 border-gray-600 shadow-lg"
          />
          <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
            ✏️
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{session.user.username}</h2>
        <p> Role : {session.user.role}</p>
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-blue-500 text-white py-2 rounded mt-5"
          >
            Logout
          </button>

      </aside>


      <main className="flex-1 p-6">
      <PostList />
        <div className="text-center mt-6">
          <Link href="/create-post">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
              ➕ create new post
            </button>
          </Link>
          
        </div>
        
        <br />
       
      </main>

      
    </div>
  )
  )
}

export default Profile ;
