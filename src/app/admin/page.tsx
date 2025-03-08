"use client";
import { Categories } from "@/app/components/Categories";
import Link from "next/link";
import DraftPost from "../components/DraftPost";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function PostPage() {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [statusQ, setStatusQ] = useState("Draft");
  return (
    <div>
      <Navbar />
      {session && session.user.role == "Admin" && (
        <DraftPost
          sortParams={sort}
          searchParams={search}
          categoryParams={category}
          statusParams={statusQ}
          
        />
      )}
    </div>
  );
}
