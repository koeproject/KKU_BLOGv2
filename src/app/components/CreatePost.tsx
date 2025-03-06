"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import axios from "axios";
import { Category } from "@prisma/client";

export default function CreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(Number(session.user.id));
    }
    fetchCategories();
  }, [session]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/posts", { title, image, content, userId, categoryId });
      router.push("/");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  if (status !== "authenticated" || !session?.user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-[#131414] text-white p-6 flex flex-col items-center justify-center">
        <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mt-16">
          <h2 className="text-xl font-semibold mb-4 text-center">Create Post</h2>

          <div className="flex items-center space-x-3 mb-4">
            {session.user.profilePicture && (
              <Image
                src={session.user.profilePicture}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border border-gray-700"
              />
            )}
            <div>
              <p className="font-semibold">{session.user.username}</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Title"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {image ? (
            <div className="relative w-full mt-4">
              <Image src={image} alt="Uploaded" width={400} height={400} className="w-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setImage("")}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Remove
              </button>
            </div>
          ) : (
            <UploadDropzone
              className="mt-4"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  setImage(res[0].ufsUrl); // Use the correct URL key
                  console.log("Uploaded Image URL:", res[0].ufsUrl);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Upload Error: ${error.message}`);
              }}
            />
          )}

          <textarea
            placeholder="เพิ่มข้อความ"
            className="bg-[#252627] text-white w-full h-32 px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end items-center mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
