"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(""); // ✅ Error state
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Disable button during signup

    if (password !== confirmpassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/auth/signup", { email, password, username });
      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-24 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="gap-3 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>} {/* ✅ Error message */}

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
          id="confirmpassword"
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
          placeholder="Confirm Password"
          className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
        />

        <button
          type="submit"
          className={`px-6 py-2 rounded-lg text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? "กำลังสมัครสมาชิก..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
