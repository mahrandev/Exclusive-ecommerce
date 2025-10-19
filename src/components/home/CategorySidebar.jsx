import React from 'react';
import { categoryMapping } from '@/data/categoryMapping';

const CategorySidebar = ({ selectedCategory, onSelectCategory }) => {
  const mainCategories = ['All', ...Object.keys(categoryMapping)];

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {mainCategories.map((category) => {
          const isSelected = JSON.stringify(selectedCategory) === JSON.stringify(category === 'All' ? 'All' : categoryMapping[category]);

          return (
            <li key={category}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (category === 'All') {
                    onSelectCategory('All');
                  } else {
                    onSelectCategory(categoryMapping[category]);
                  }
                }}
                className={`block px-4 py-2 rounded-md ${
                  isSelected
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
