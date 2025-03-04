const categories = [
  { name: "TV", icon: "📺" },
  { name: "Tablets", icon: "📱" },
  { name: "Audio", icon: "🎧" },
  { name: "Printers", icon: "🖨️" },
  { name: "Computer Accessories", icon: "⌨️" },
  { name: "Security & Wi-Fi", icon: "🔒" },
];

function Categories() {
  return (
    <div className="bg-[#1f2021] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <br />
        <br />
        {/* Flex container to move the button to the right */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button className="text-sm text-gray-300 border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
            See all categories
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#131414] text-2xl">
                {category.icon}
              </div>
              <p className="text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Categories };
