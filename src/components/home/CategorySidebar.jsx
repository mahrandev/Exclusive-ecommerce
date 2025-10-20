import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryMapping } from '@/data/categoryMapping';

const categoryTranslationKeys = {
  "Woman's Fashion": "categories.womansFashion",
  "Men's Fashion": "categories.mensFashion",
  "Mobiles": "categories.mobiles",
  "Home & Lifestyle": "categories.homeLifestyle",
  "Glasses": "categories.glasses",
  "Sports & Outdoor": "categories.sportsOutdoor",
  "Laptops & Computers": "categories.computers",
  "Groceries & Pets": "categories.groceriesPets",
  "Health & Beauty": "categories.healthBeauty",
};

const CategorySidebar = ({ selectedCategory, onSelectCategory }) => {
  const { t } = useTranslation();
  const mainCategories = ['All', ...Object.keys(categoryMapping)];

  const getTranslatedCategory = (category) => {
    if (category === 'All') return t('categorySidebar.all');
    const key = categoryTranslationKeys[category];
    return key ? t(key) : category;
  };

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4">
      <h2 className="text-lg font-bold mb-4">{t('categorySidebar.categories')}</h2>
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
                {getTranslatedCategory(category)}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
