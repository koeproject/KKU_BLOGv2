"use client";

import Link from "next/link";

function Navbar() {

  return (
    <nav className="bg-white dark:bg-[#131414] fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold whitespace-nowrap dark:text-white">
          KKU-BLOG
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/post" className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white transition">
            📄 โพสต์
          </Link>
          <Link href="/profile" className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white transition">
            👤 โปรไฟล์
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
