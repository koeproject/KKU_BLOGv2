"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function EditPassword() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (!session?.user?.id) {
      setError("User session not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(`/api/user/${session.user.id}/resetpassword`, {
        oldPassword,
        newPassword,
      });

      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => router.push("/"), 2000);
    } catch (error: any) {
      setError(error.response?.data?.error || "Error changing password. Please try again.");
    }
  };

  if (status !== "authenticated" || !session?.user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-[#131414] text-white p-6 flex flex-col items-center justify-center">
        <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mt-16">
          <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <input
            type="password"
            placeholder="Old Password"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none mt-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-end items-center mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
