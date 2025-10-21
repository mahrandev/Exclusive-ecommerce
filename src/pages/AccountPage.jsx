import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import useAccountPageLogic from "@/hooks/useAccountPageLogic";
import ProfileForm from "@/components/account/ProfileForm";
import PasswordForm from "@/components/account/PasswordForm";

const AccountPage = () => {
  const {
    t,
    i18n,
    user,
    isLoadingProfile,
    isLoadingPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    registerProfile,
    handleSubmitProfile,
    errorsProfile,
    resetProfile,
    onSubmitProfile,
    registerPassword,
    handleSubmitPassword,
    errorsPassword,
    resetPassword,
    onSubmitPassword,
    getFullName,
  } = useAccountPageLogic();

  const isRtl = i18n.language === "ar";

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block py-2 transition-colors duration-300 ${
            isActive && to === "/account"
              ? "font-medium text-red-500"
              : "text-gray-900 hover:text-red-500"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-16">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <User size={32} />
          </div>
          <div className={isRtl ? "text-right" : "text-left"}>
            <h2 className="text-2xl font-bold md:text-3xl">
              {t("account.welcome")} {getFullName()}!
            </h2>
            <p className="mt-1 text-red-100">{t("managePreferences")}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumbs containerClassName="text-sm text-gray-500 mb-8" />

      <div className="flex flex-col gap-12 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col gap-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("account.manageAccount")}
              </h3>
              <ul className={`space-y-2 ${isRtl ? "pr-4" : "pl-4"}`}>
                <NavItem to="/account">{t("account.myProfile")}</NavItem>
                <NavItem to="#">{t("account.addressBook")}</NavItem>
                <NavItem to="#">{t("account.paymentOptions")}</NavItem>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("account.myOrders")}
              </h3>
              <ul className={`space-y-2 ${isRtl ? "pr-4" : "pl-4"}`}>
                <NavItem to="/cart">{t("account.myOrders")}</NavItem>
                <NavItem to="#">{t("account.myReturns")}</NavItem>
                <NavItem to="#">{t("account.myCancellations")}</NavItem>
              </ul>
            </div>
            <div>
              <NavLink
                to="/wishlist"
                className="text-lg font-semibold text-gray-900 hover:text-red-500"
              >
                {t("wishlist.title")}
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full space-y-8 md:w-3/4">
          <ProfileForm
            t={t}
            registerProfile={registerProfile}
            handleSubmitProfile={handleSubmitProfile}
            errorsProfile={errorsProfile}
            resetProfile={resetProfile}
            onSubmitProfile={onSubmitProfile}
            isLoadingProfile={isLoadingProfile}
          />

          <PasswordForm
            t={t}
            registerPassword={registerPassword}
            handleSubmitPassword={handleSubmitPassword}
            errorsPassword={errorsPassword}
            resetPassword={resetPassword}
            onSubmitPassword={onSubmitPassword}
            isLoadingPassword={isLoadingPassword}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
