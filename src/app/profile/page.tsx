import Link from "next/link";

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-[#131414] text-white p-6">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-[#131414] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            KKU-BLOG
          </Link>
          <div className="flex space-x-4">
            <Link href="/post" className="text-gray-300 hover:text-white">
              📄 โพสต์
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-white">
              👤 โปรไฟล์
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Profile Section */}
      <div className="mt-20 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {/* Left Profile Card */}
        <div className="bg-[#1f2021] p-6 rounded-lg w-full md:w-1/3 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">Chon Na Wee</h2>
            <p className="text-gray-400">
              0 โพสต์ • 0 ผู้ติดตาม • 0 กำลังติดตาม
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full shadow-md transition">
              แก้ไขโปรไฟล์
            </button>
            <button className="mt-2 bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-full shadow-md transition">
              กล่องข้อความ
            </button>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-2/3">
          {/* Post Input Box */}
          <div className="bg-[#1f2021] p-6 rounded-lg mb-6 shadow-lg">
            <div className="flex items-center gap-4">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-700"
              />
              <input
                type="text"
                placeholder="เล่าเรื่องราวของคุณ"
                className="bg-[#252627] text-white w-full px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex justify-around mt-4 text-gray-400">
              <button className="hover:text-white">📄 บทความ</button>
              <button className="hover:text-white">❓ คำถาม</button>
              <button className="hover:text-white">💬 ความคิดเห็น</button>
            </div>
          </div>

          {/* Add Post Button */}
          <div className="text-center mt-6">
            <Link href="/create-post">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full shadow-lg text-white text-lg font-semibold">
                ➕ สร้างโพสต์ใหม่
              </button>
            </Link>
          </div>

          {/* Placeholder for posts */}
          <div className="text-gray-400 text-center py-10 border-t border-gray-700">
            แชร์ไอเดียของคุณ เมื่อคุณแชร์โพสต์ โพสต์หลักจะแสดงที่นี่
          </div>
        </div>
      </div>

      {/* Sidebar Right (Pages, Notes, Ads) */}
      <div className="hidden md:block fixed right-0 top-16 w-1/4 p-6">
        <div className="bg-[#1f2021] p-4 rounded-lg mb-4 shadow-md">
          <h3 className="text-lg font-semibold">เพจ</h3>
          <button className="mt-2 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg w-full shadow-md">
            + สร้างเพจ
          </button>
        </div>
        <div className="bg-[#1f2021] p-4 rounded-lg mb-4 shadow-md">
          <h3 className="text-lg font-semibold">บันทึก</h3>
          <p className="text-gray-400">ไม่มีบันทึก</p>
        </div>
        <div className="bg-[#1f2021] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">My Blockdit Reserve™</h3>
          <p className="text-gray-400">ไม่มี Blockdit Reserve™</p>
        </div>
      </div>
    </div>
  );
}
