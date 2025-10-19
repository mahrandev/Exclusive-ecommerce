import { Link, useLocation } from "react-router-dom";

// A simple mapping for display names
const breadcrumbNameMap = {
  'all-products': 'All Products',
  'contact': 'Contact',
  'about': 'About',
  'cart': 'Cart',
  'checkout': 'Checkout',
  'wishlist': 'Wishlist',
  'account': 'My Account',
  'signup': 'Sign Up',
  'login': 'Login',
};

const Breadcrumbs = ({ containerClassName = "mb-12 text-sm text-gray-600 md:mb-16" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't render breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 text-sm text-gray-600 md:mb-16">
      <Link to="/" className="transition-colors hover:text-gray-900">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <span key={name}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-gray-900">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className="transition-colors hover:text-gray-900"
              >
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;