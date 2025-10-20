import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Breadcrumbs = ({ containerClassName = "mb-12 text-sm text-gray-600 md:mb-16" }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbNameMap = {
    products: t("breadcrumbs.allProducts"),
    contact: t("breadcrumbs.contact"),
    about: t("breadcrumbs.about"),
    cart: t("breadcrumbs.cart"),
    checkout: t("breadcrumbs.checkout"),
    wishlist: t("breadcrumbs.wishlist"),
    account: t("breadcrumbs.account"),
    signup: t("breadcrumbs.signup"),
    login: t("breadcrumbs.login"),
  };

  return (
    <div className={containerClassName}>
      <Link to="/" className="transition-colors hover:text-gray-900">
        {t("breadcrumbs.home")}
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <span key={name}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-gray-900">{displayName}</span>
            ) : (
              <Link to={routeTo} className="transition-colors hover:text-gray-900">
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