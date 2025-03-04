import { Categories } from "@/app/components/Categories";


import Link from "next/link";
import PostList from "./components/PostList";

export default function PostPage() {
  return (
    <div>
      <nav className="bg-white dark:bg-[#131414] fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold whitespace-nowrap dark:text-white">
          KKU-BLOG
        </Link>

        <div className="hidden md:flex space-x-6">
          <button className="bg-[#131414] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-300">Get started</button>
        </div>
      </div>
    </nav>
      <Categories />
      <PostList />
    </div>
  );
}
