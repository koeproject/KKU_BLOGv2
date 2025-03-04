"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define `categories` array
const categories = [
  { name: "TV", icon: "📺" },
  { name: "Tablets", icon: "📱" },
  { name: "Audio", icon: "🎧" },
  { name: "Printers", icon: "🖨️" },
  { name: "Computer Accessories", icon: "⌨️" },
  { name: "Security & Wi-Fi", icon: "🔒" },
];

// Main Component
export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Categories />
      <PostList posts={posts} />
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-white dark:bg-[#131414] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="text-2xl font-semibold whitespace-nowrap dark:text-white">
          KKU-BLOG
        </Link>
        <div className="flex space-x-4">
          <Link href="/post" className="text-gray-300 hover:text-white">📄 โพสต์</Link>
          <Link href="/profile" className="text-gray-300 hover:text-white">👤 โปรไฟล์</Link>
        </div>
      </div>
    </nav>
  );
}

// Categories Component
function Categories() {
  return (
    <div className="bg-[#1f2021] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <br />
        <br />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button className="text-sm text-gray-300 border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
            See all categories
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#131414] text-2xl">
                {category.icon}
              </div>
              <p className="text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PostList Component
function PostList({ posts }: { posts: any[] }) {
  return (
    <div className="bg-[#1f2021] min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6">ข่าวล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-[#252627] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{post.desc}</p>
                </div>
                <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">{post.likes}</span>
                    <button className="text-gray-400 hover:text-red-500">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">ไม่มีโพสต์</p>
          )}
        </div>
      </div>
    </div>
  );
}
