"use client";

import axios from "axios";
import { useEffect, useState } from "react";



const Comments = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${postId}`);
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div className="mx-auto pt-10">
      <h2 className="text-3xl font-semibold text-white mb-4">ความคิดเห็น</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-[#1E1F22] text-white rounded-lg p-4 shadow-md mb-4 border border-[#2E2F33]"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{comment.user.username[0]}</span>
            </div>
            <h3 className="ml-2 font-semibold text-[#B16AFF]">{comment.user.username}</h3>
          </div>
          <p className="text-gray-300">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
