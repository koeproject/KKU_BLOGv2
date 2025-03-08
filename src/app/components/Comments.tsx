"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CommentType } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Comments = ({ commentPostId }: { commentPostId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(Number(commentPostId));
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      const parsedId = Number(session.user.id);
      if (!isNaN(parsedId)) setUserId(parsedId);
    }
  }, [session]);

  useEffect(() => {
    fetchComments();
  }, [commentPostId]); // ✅ ดึงข้อมูลใหม่เมื่อ postId เปลี่ยน

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/comments/${commentPostId}`);
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        setError("รูปแบบข้อมูลไม่ถูกต้อง");
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการโหลดความคิดเห็น");
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("โปรดป้อนข้อความก่อนส่งความคิดเห็น");
      return;
    }

    try {
      await axios.post("/api/comments", { content, postId, userId });
      setContent(""); // ✅ เคลียร์ช่องป้อนข้อความหลังจากส่ง
      fetchComments(); // ✅ โหลดความคิดเห็นใหม่หลังจากส่ง
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("ไม่สามารถส่งความคิดเห็นได้");
    }
  };

  return (
    <div className="mx-auto pt-10">
      {session && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-white mb-4">
            เขียนความคิดเห็น
          </h2>
          <textarea
            placeholder="เพิ่มข้อความ"
            className="bg-[#252627] text-white w-full h-32 px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white mt-2"
          >
            ตกลง
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h2 className="text-3xl font-semibold text-white mb-4 mt-6">
        ความคิดเห็น
      </h2>

      {loading ? (
        <p className="text-gray-400">กำลังโหลดความคิดเห็น...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400">ยังไม่มีความคิดเห็น</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#1E1F22] text-white rounded-lg p-4 shadow-md mb-4 border border-[#2E2F33]"
          >
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                {comment.user.profilePicture ? (
                              <Image
                                src={comment.user.profilePicture}
                                alt="Profile"
                                width={128}
                                height={128}
                                className="rounded-full border-4 border-gray-600 shadow-lg"
                              />
                            ) : (
                              <span className="text-sm font-bold">
                  {comment.user?.username?.[0] || "?"}
                </span>
                            )}
                
              </div>
              <h3 className="ml-2 font-semibold text-[#B16AFF]">
                {comment.user?.username || "ไม่ระบุชื่อ"}
              </h3>
            </div>
            <p className="text-gray-300">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
