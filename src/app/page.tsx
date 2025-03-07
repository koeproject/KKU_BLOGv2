'use client';
import { Categories } from "@/app/components/Categories";
import Link from "next/link";
import PostList from "./components/PostList";
import Navbar  from "./components/Navbar";
import { useState } from "react";

export default function PostPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // ✅ Category state
  const [sort, setSort] = useState("desc");
  return (
    <div>
      <Navbar />
      <Categories setCategory={setCategory} />
      <PostList sortParams={sort} searchParams={search} categoryParams={category} />
    </div>
  );
}
