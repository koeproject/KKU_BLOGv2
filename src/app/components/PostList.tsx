"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use `useRouter`

export default function PostList() {
  interface Post {
    id: number;
    image: string;
    title: string;
    like: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter(); // ✅ Initialize router inside the component

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="bg-[#1f2021] min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6">ข่าวล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#252627] rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => router.push(`/post/${post.id}`)} // ✅ Navigation now works
            >
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
              </div>
              <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-xs">{post.like}</span>
                  <button className="text-gray-400 hover:text-red-500">❤️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
