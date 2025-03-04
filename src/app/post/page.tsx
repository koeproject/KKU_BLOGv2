"use client";

import { Navbar } from "@/app/components/Navbar";
import { Categories } from "@/app/components/Categories";
import  PostList  from "@/app/components/PostList";

export default function PostPage() {
  return (
    <div>
      <Navbar />
      <Categories />
      <PostList />
    </div>
  );
}
