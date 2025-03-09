"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";

interface PostListProps {
  categoryParams: string;
  searchParams: string;
  sortParams: string;
  statusParams: string;
}

export default function DraftPost({ categoryParams, searchParams, sortParams, statusParams }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [searchParams, sortParams, categoryParams, statusParams]);

  const fetchPosts = async () => {
    try {
      const query = new URLSearchParams({
        search: searchParams,
        sort: sortParams,
        category: categoryParams,
        status: statusParams || "",
      }).toString();
      const res = await axios.get(`/api/posts?${query}`);
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const approvePost = async (postId: string) => {
    try {
      await axios.put(`/api/posts/${postId}/approve`, { status: "Published" });
      fetchPosts();
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?")) {
        await axios.delete(`/api/posts/${postId}`);
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!session || session?.user?.role !== "Admin") return null;

  return (
    <div className="bg-[#1f2021] min-h-screen py-10 px-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6">โพสต์ที่รอยืนยัน</h2>
        <div className="overflow-x-auto">
          <table className="container bg-[#252627] text-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-3">รูปภาพ</th>
                <th className="p-3">ชื่อโพสต์</th>
                <th className="p-3">ไลค์</th>
                <th className="p-3">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer">
                  <td className="p-3">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                        unoptimized={true} // For external images
                      />
                    ) : (
                      "ไม่มีรูปภาพ"
                    )}
                  </td>
                  <td className="p-3 max-w-48" onClick={() => router.push(`/post/${post.id}`)}>
                    {post.title}
                  </td>
                  <td className="p-3">{post.like}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => approvePost(String(post.id))}
                    >
                      อนุมัติ
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => deletePost(String(post.id))}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
