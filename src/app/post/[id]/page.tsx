"use client"; // ✅ Add this line at the top

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import axios from "axios";

// Define Post interface


export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null); // ✅ Store a single post, not an array
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
      fetchPost(params.id);
  }, [id]);

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data); // ✅ Set a single post
    } catch (error) {
      console.error("Error fetching post:", error);
      router.push("/"); // Redirect if post is not found
    }
  };

  if (!post) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-400">{post.content}</p>
      <Image
        src={post.image}
        alt={post.title}
        width={700}
        height={400}
        className="rounded-lg mt-4"
      />
      <p className="mt-6 text-lg">{post.content}</p>
      <div className="mt-6 flex justify-between text-gray-400">
        <span>❤️ {post.like} ถูกใจ</span>
        <Link href="/" className="text-blue-400 hover:underline">
          🔙 กลับไปหน้าโพสต์
        </Link>
      </div>
    </div>
  );
}
