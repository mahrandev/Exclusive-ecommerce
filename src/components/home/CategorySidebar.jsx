import React from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  const allCategories = ['All', ...(categories || [])];

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {allCategories.map((category) => (
          <li key={category}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(category);
              }}
              className={`block px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
