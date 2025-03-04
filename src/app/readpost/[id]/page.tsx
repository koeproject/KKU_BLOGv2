"use client"; // ✅ Add this line at the top

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Simulated Post Data (Replace this with API or database fetch later)
const posts = [
  {
    id: 1,
    title: "พฤติกรรมคนไทยในโลกออนไลน์ ปี 2025",
    desc: "marketThink",
    img: "/images/post1.jpg",
    likes: 28,
    content: "นี่คือเนื้อหาทั้งหมดของโพสต์เกี่ยวกับพฤติกรรมคนไทยในปี 2025...",
  },
  {
    id: 2,
    title: "การทูตแร่ธาตุหายากของปูติน",
    desc: "Right Style by Bom+",
    img: "/images/post1.jpg",
    likes: 26,
    content: "วิเคราะห์เชิงลึกเกี่ยวกับแร่ธาตุหายากและการเมืองระดับโลก...",
  },
];

export default function ReadPostPage() {
  const { id } = useParams(); // Get the post ID from URL
  const post = posts.find((p) => p.id === Number(id)); // Find the post

  if (!post) {
    return (
      <div className="text-center text-white mt-10">
        <h1>โพสต์นี้ไม่มีอยู่</h1>
        <Link href="/" className="text-blue-400 underline">
          กลับไปหน้าแรก
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#131414] min-h-screen text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-400">{post.desc}</p>
        <Image
          src={post.img}
          alt={post.title}
          width={700}
          height={400}
          className="rounded-lg mt-4"
        />
        <p className="mt-6 text-lg">{post.content}</p>
        <div className="mt-6 flex justify-between text-gray-400">
          <span>❤️ {post.likes} ถูกใจ</span>
          <Link href="/" className="text-blue-400 hover:underline">
            🔙 กลับไปหน้าโพสต์
          </Link>
        </div>
      </div>
    </div>
  );
}
