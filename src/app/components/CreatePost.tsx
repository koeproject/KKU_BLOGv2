"use client";

import Link from "next/link";
import Image from "next/image";

function CreatePost() {
  return (
    <div className="min-h-screen bg-[#131414] text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Post</h2>

        <div className="flex items-center space-x-3 mb-4">
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-gray-700"
          />
          <div>
            <p className="font-semibold">Profile Name</p>
            <p className="text-gray-400 text-sm">📍 role</p>
          </div>
        </div>

        <div className="bg-[#252627] p-4 rounded-lg text-center text-gray-400 cursor-pointer hover:bg-[#303233]">
          📷 add topic picture
        </div>

        <textarea
          placeholder="tell your story..."
          className="bg-[#252627] text-white w-full h-32 px-4 py-2 rounded-lg focus:outline-none mt-4"
        ></textarea>

        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-300 text-sm">➕ community tag</button>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { CreatePost };
