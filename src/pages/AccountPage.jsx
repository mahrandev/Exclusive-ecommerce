import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import useAuthStore from "@/store/authStore"; // Import auth store

const AccountPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore((state) => state); // Get user from store

  const userFullName = user
    ? `${user.user_metadata?.firstName || ''} ${user.user_metadata?.lastName || ''}`.trim()
    : "User";

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block transition-colors duration-300 ${
            isActive
              ? "text-red-500 font-medium"
              : "text-gray-500 hover:text-black"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-16">
      {/* Breadcrumb & Welcome */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs containerClassName="text-sm text-gray-500" />
        <p className="text-sm">
          {t("account.welcome")}{" "}
          <span className="font-medium text-red-500">{userFullName}</span>
        </p>
      </div>

      <div className="flex flex-col gap-12 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col gap-6">
            <div>
              <h3 className="mb-3 font-medium text-lg">{t("account.manageAccount")}</h3>
              <ul className="space-y-3 pl-4">
                <NavItem to="/account">{t("account.myProfile")}</NavItem>
                <NavItem to="#">{t("account.addressBook")}</NavItem>
                <NavItem to="#">{t("account.paymentOptions")}</NavItem>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-medium text-lg">{t("account.myOrders")}</h3>
              <ul className="space-y-3 pl-4">
                <NavItem to="/cart">{t("account.myOrders")}</NavItem>
                <NavItem to="#">{t("account.myReturns")}</NavItem>
                <NavItem to="#">{t("account.myCancellations")}</NavItem>
              </ul>
            </div>
            <div>
              <NavLink
                to="/wishlist"
                className="font-medium text-lg text-gray-800 hover:text-black"
              >
                {t("wishlist.title")}
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Edit Profile Form */}
        <main className="w-full rounded-md p-4 shadow-lg sm:p-8 md:w-3/4">
          <h2 className="mb-6 text-xl font-medium text-red-500">
            {t("account.editProfile")}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
            }}
          >
            {/* Personal Info */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("account.firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={user?.user_metadata?.firstName || ""}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("account.lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue={user?.user_metadata?.lastName || ""}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("account.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={user?.email || ""}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t("account.address")}
                </label>
                <input
                  type="text"
                  id="address"
                  defaultValue={user?.user_metadata?.address || ""}
                  placeholder="Your address"
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Password Change */}
            <div className="mb-6 border-t pt-6">
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder={t("account.currentPassword")}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  placeholder={t("account.newPassword")}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  placeholder={t("account.confirmPassword")}
                  className="w-full rounded-md border bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="rounded-md px-8 py-3 transition-colors hover:bg-gray-100"
              >
                {t("account.cancel")}
              </button>
              <button
                type="submit"
                className="rounded-md bg-red-500 px-8 py-3 text-white transition-colors hover:bg-red-600"
              >
                {t("account.saveChanges")}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;

