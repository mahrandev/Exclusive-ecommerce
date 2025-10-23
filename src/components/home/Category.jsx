import { Link } from "react-router-dom";

const Category = ({
  category,
  isSelected,
  onSelectCategory,
  Icon,
}) => {
  return (
    <Link
      to={`/products/${category.slug}`}
      onClick={() => onSelectCategory(category.slug)}
      className={`flex flex-col items-center justify-center rounded border-2 p-6 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white ${        isSelected
          ? "border-red-500 bg-red-500 text-white"
          : "border-gray-300 bg-white text-gray-900"
      }`}
    >
      <div className="mb-3">{Icon && <Icon size={56} strokeWidth={1.5} />}</div>
      <span className="text-base font-normal" dir="auto">
        {category.name}
      </span>
    </Link>
  );
};

export default Category;