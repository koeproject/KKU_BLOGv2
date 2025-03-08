"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use `useRouter`
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";




export default function Ownposts() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter(); // ✅ Initialize router inside the component
  useEffect(() => {
   
    fetchPosts(); 
  }, []);

  const fetchPosts = async () => {
    try {
      
      if (session) {
      const res = await axios.get(`/api/user/${session.user.id}/posts`);
      if (Array.isArray(res.data.posts)) {
        setPosts(res.data.posts); // ✅ Correct way to set only the posts array
      } else {
        console.error("Unexpected API response:", res.data);
      }
      }
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };



  return (
    <div className="bg-[#1f2021] min-h-screen py-10 px-6 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6">โพสต์ของคุณ</h2>
        <div className="overflow-x-auto">
          <table className=" container bg-[#252627] text-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-left ">
                <th className="p-3">รูปภาพ</th>
                <th className="p-3">ชื่อโพสต์</th>
                <th className="p-3">ไลค์</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post:any) => (
                <tr
                  key={post.id}
                  className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer"
                  onClick={() => router.push(`/post/${post.id}`)}
                >
                  <td className="p-3">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      "ไม่มีรูปภาพ"
                    )}
                  </td>
                  <td className="p-3 max-w-48">{post.title}</td>
                  <td className="p-3">{post.like}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
