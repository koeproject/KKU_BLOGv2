'use client';
import { Categories } from "@/app/components/Categories";
import Link from "next/link";
import PostList from "./components/PostList";
import Navbar  from "./components/Navbar";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function PostPage() {
  const { data: session, status } = useSession()
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [statusQ, setStatusQ] = useState("Published");
  return (
    <div>
      <Navbar />
      <Categories setCategory={setCategory} />
      <PostList sortParams={sort} searchParams={search} categoryParams={category} statusParams={statusQ} />

{session && (
 <div className="fixed bottom-10 right-3 z-20 flex flex-col gap-4">
 <Link href="/create-post">
   <button className="bg-[#A73B24] hover:bg-[#cc5a40] px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
     เขียนโพสต์
   </button>
 </Link>
 {session && session.user.role == "Admin" && (
 <Link href="/admin">
   <button className="bg-[#A73B24] hover:bg-[#cc5a40] px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
     ยืนยันโพสต์
   </button>
 </Link>)}
</div>

)}
      
    </div>
  );
}
