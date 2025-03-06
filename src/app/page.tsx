import { Categories } from "@/app/components/Categories";
import Link from "next/link";
import PostList from "./components/PostList";
import Navbar  from "./components/Navbar";

export default function PostPage() {
  return (
    <div>
      <Navbar />
      <Categories />
      <PostList />
    </div>
  );
}
