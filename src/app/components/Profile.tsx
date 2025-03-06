"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Profile() {
const { data: session, status } = useSession()
  return (
    status === 'authenticated' &&
    session.user && (
    <div className="min-h-screen bg-[#131414] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-[#1f2021] w-full md:w-1/4 p-6 flex flex-col items-center">
        <div className="relative w-28 h-28">
          <Image
            src={session.user.profilePicture || "/images/profile.jpg"}
            alt="Profile"
            width={112}
            height={112}
            className="rounded-full border-4 border-gray-600 shadow-lg"
          />
          <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
            ✏️
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold">Chon Na Wee</h2>
        <p className="text-gray-400 text-sm">0 posted • 0 follower • 0 following</p>

        {/* Open Edit Profile Modal */}
       
        <button className="mt-2 w-full bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-full shadow-md transition">
          Inbox
        </button>

        {/* Sidebar Navigation */}
        <div className="mt-6 w-full">
          <nav className="flex flex-col gap-2">
            <Link href="/profile" className="text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg">
              🏠 Feed
            </Link>
            <Link href="/create-post" className="text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg">
              ➕ create post
            </Link>
            <Link href="/settings" className="text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg">
              ⚙️ settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Post Input Box */}
        <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <input
              type="text"
              placeholder="tell about your story..."
              className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-4 text-gray-400">
            <button className="hover:text-white">📄 Blog</button>
            <button className="hover:text-white">❓ Question</button>
            <button className="hover:text-white">💬 Comment</button>
          </div>
        </div>

        {/* Add Post Button */}
        <div className="text-center mt-6">
          <Link href="/create-post">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
              ➕ create new post
            </button>
          </Link>
        </div>

        {/* Placeholder for posts */}
        <br />
        <div className="text-gray-400 text-center py-10 border-t border-gray-700">
          📢 share your idea. Your idea will appear here.
        </div>
      </main>

      
    </div>
  )
  )
}

export default Profile ;
