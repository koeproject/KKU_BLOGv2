
"use client"
import { Category } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";


function Categories() {

  const [Categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/categories");
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="bg-[#1f2021] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <br />
        <br />
        {/* Flex container to move the button to the right */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Categories</h2>
          
        </div>
        {/* Category Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
          {Categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#131414] text-2xl">
                {category.image}
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
