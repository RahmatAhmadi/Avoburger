import React from "react";
import { FaEllipsisV } from "react-icons/fa";

interface CategoryFilterProps {
  categories: { name: string; icon: React.ReactNode }[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center justify-between bg-white px-5 mb-10 rounded-xl">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-center space-x-2 py-6 px-4 ${
              activeCategory === category.name
                ? "border-b-4 border-slate-800"
                : ""
            }`}
            onClick={() => onCategoryClick(category.name)}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <FaEllipsisV className="text-gray-800" />
    </div>
  );
}
