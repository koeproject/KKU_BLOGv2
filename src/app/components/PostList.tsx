
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1, // Add unique IDs for each post
    title:
      "สรุป 12 อินไซต์ พฤติกรรมคนไทย บนโลกออนไลน์ ปี 2025 จาก DataReportal 161 หน้า ในโพสต์เดียว",
    desc: "marketThink",
    img: "/images/post1.jpg",
    likes: 28,
  },
  {
    id: 2,
    title: "“การทูตแร่ธาตุหายาก” ของปูติน",
    desc: "Right Style by Bom+",
    img: "/images/post1.jpg",
    likes: 26,
  },
  {
    id: 3,
    title: "AOT–WHA หรือจะเป็นการเมืองพาชวย!",
    desc: "ฐานเศรษฐกิจ",
    img: "/images/post1.jpg",
    likes: 33,
  },
];

function PostList() {
  return (
    <div className="bg-[#1f2021] min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-6">ข่าวล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/readpost/${post.id}`} legacyBehavior>
              <a className="bg-[#252627] rounded-lg overflow-hidden shadow-lg block">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{post.desc}</p>
                </div>
                <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">{post.likes}</span>
                    <button className="text-gray-400 hover:text-red-500">
                      ❤️
                    </button>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PostList };
