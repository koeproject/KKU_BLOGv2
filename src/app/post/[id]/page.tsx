"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Comments from "@/app/components/Comments";
import { CategoryType, PostType, TagType } from "@/app/utils/types";
import { useSession } from "next-auth/react";

export default function PostPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [post, setPost] = useState<PostType | null>(null);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [tags, setTags] = useState<TagType[]>([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const deletePost = async (postId: string) => {
    try {
      if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?")) {
        await axios.delete(`/api/posts/${postId}`);
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const like = async (postId: string, currentLikes: number) => {
    try {
      await axios.put(`/api/posts/${postId}/like`, { like: currentLikes + 1 });
      fetchPost(id);
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
      setCategory(res.data.category);
      setTags(res.data.tags.map((t: any) => t.tag)); // ✅ Extract tag names
    } catch (error) {
      console.error("Error fetching post:", error);
      router.push("/");
    }
  };

  if (!post) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={700}
            height={400}
            className="rounded-lg mt-4"
          />
        )}

        <p className="mt-6 text-lg">{post.content}</p>

        <div className="mt-6 flex flex-row justify-between items-center text-gray-400">
          <div className="flex flex-col">
            <p>โพสต์โดย {post.user.username}</p>
            <p>Category: {category?.name}</p>
            <p>Tags: {tags.map((tag) => tag.name).join(", ") || "No tags"}</p>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            onClick={() => like(String(post.id), post.like)}
          >
            ❤️ {post.like} ถูกใจ
          </button>
        </div>

        <Comments commentPostId={params.id} />
      </div>

      {session &&
        (session.user.role === "Admin" ||
          Number(session.user.id) === post.userId) && (
          <div className="fixed bottom-10 right-3 z-20 flex flex-col gap-4">
            <button
              className="bg-[#A73B24] hover:bg-[#cc5a40] px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold"
              onClick={() => deletePost(String(post.id))}
            >
              ลบโพสต์
            </button>
          </div>
        )}
    </div>
  );
}
