"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import axios from "axios";
import { Category, User } from "@prisma/client";

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [contact, setContact] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    try {
      if (session?.user.id) {
        const res = await axios.get(`/api/user/${session.user.id}`);
        setUser(res.data);

        // ✅ ตั้งค่า state หลังจากได้ข้อมูล user
        setUsername(res.data.username || "");
        setBio(res.data.bio || "");
        setProfilePicture(res.data.profilePicture || "");
        setContact(res.data.contact || "");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!session?.user.id) return;
      // ปรับ post เป็น put
      await axios.put(`/api/user/${session.user.id}`, {
        username,
        bio,
        profilePicture,
        contact,
      });

      router.push("/");
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  if (status !== "authenticated" || !session?.user) return null;

  return (
    <form onSubmit={handleSubmit} >
      <div className="min-h-screen bg-[#131414] text-white p-6 flex flex-col items-center justify-center  ">
        <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mt-16">
          <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

          <div className="flex items-center space-x-3 mb-4">
            {profilePicture && (
              <Image
                src={profilePicture}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border border-gray-700"
              />
            )}
            <div>
              <p className="font-semibold">{username}</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Username"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            className="bg-[#252627] text-white w-full h-32 px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            type="text"
            placeholder="Contact"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {profilePicture ? (
            <div className="relative w-full mt-4">
              <Image src={profilePicture} alt="Uploaded" width={400} height={400} className="w-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setProfilePicture("")}
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
                  setProfilePicture(res[0].ufsUrl);
                  console.log("Uploaded Image URL:", res[0].ufsUrl);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Upload Error: ${error.message}`);
              }}
            />
          )}

          <div className="flex justify-end items-center mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
