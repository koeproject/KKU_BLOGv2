"use client";

import { Category } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

interface CategoriesProps {
  setCategory: (category: string) => void;
}

function Categories({ setCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategory(categoryName);
    setSelectedCategory(categoryName);
  };

  const handleReset = () => {
    setCategory("");
    setSelectedCategory(null);
  };

  return (
    <div className="bg-[#1f2021] text-white py-10 px-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center space-y-2 cursor-pointer focus:outline-none p-2 rounded-lg border-2 ${
                selectedCategory === category.name ? "border-red-500" : "border-transparent"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#131414] text-2xl">
                {category.image}
              </div>
              <p className="text-sm">{category.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Categories };
