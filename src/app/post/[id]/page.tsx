"use client"; // ✅ Add this line at the top

import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Comments from "@/app/components/Comments";
import { Post } from "@prisma/client";



export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null); // ✅
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
      fetchPost(id);
  }, [id]);

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
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
      <div className="mt-6 flex justify-between text-gray-400">
        <span>❤️ {post.like} ถูกใจ</span>
        
      </div>
      <Comments commentPostId={params.id} />  
    </div>
    </div>
  );
}
