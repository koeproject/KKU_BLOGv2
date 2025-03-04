
import Image from "next/image";

const posts = [
  {
    id: 1,
    author: "จันทร์ นักเขียน",
    time: "2 ชั่วโมงที่แล้ว",
    title: "ประสบการณ์ วังชาลอย",
    description: "รีวิว ซีรีส์และภาพยนตร์กำลังภายใน...",
    comments: 8,
    likes: 12,
    image: "/images/post-thumbnail.jpg",
    profile: "/images/profile.jpg",
  },
];

function ReadPost() {
  return (
    //main content
    <div className="max-w-5xl mx-auto pt-20 flex gap-6">

      {/* Blog Posts (Using Map Function) */}
      <main className="flex-1 px-6 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#1f2021] p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <Image
                src={post.profile}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full border border-gray-700"
              />
              <div>
                <h2 className="font-semibold">{post.author}</h2>
                <p className="text-sm text-gray-400">📅 {post.time}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-300">{post.description}</p>
            </div>
            <div className="mt-4">
              <Image
                src={post.image}
                alt="Post Thumbnail"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
              <span>💬 {post.comments} ความคิดเห็น</span>
              <span>❤️ {post.likes} ถูกใจ</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export { ReadPost };
