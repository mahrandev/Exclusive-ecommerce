import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { NavLink } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const appDownloadLink =
    "https://play.google.com/store/apps/details?id=com.example.app";

  return (
    <footer className="bg-primary-black text-primary-white pt-16 pb-6">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <NavLink to="/" className=" ">
            <h2 className="text-primary-red mb-4 text-2xl font-bold uppercase transition-colors">
              {t("exclusive")}
            </h2>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <p className="mb-4 text-lg font-medium">{t("footer.subscribe")}</p>
            <p className="mb-3 text-sm">{t("footer.subscribeOffer")}</p>
            <div className="relative">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="focus:border-primary-red w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm focus:outline-none"
              />
              <button className="hover:text-primary-red absolute top-1/2 -translate-y-1/2 text-white transition-colors ltr:right-2 rtl:left-2">
                {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{t("footer.support")}</h3>
            <ul className="space-y-3 text-sm">
              <li
                className="text-primary-white/70"
                dangerouslySetInnerHTML={{ __html: t("footer.address") }}
              ></li>
              <li>
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("footer.phone")}`}
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.phone")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{t("footer.account")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.myAccount")}
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.loginRegister")}
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.cart")}
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.wishlist")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.shop")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">
              {t("footer.quickLink")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.termsOfUse")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("footer.faq")}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  {t("header.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">
              {t("footer.downloadApp")}
            </h3>
            <p className="text-primary-white/70 mb-4 text-xs">
              {t("footer.appOffer")}
            </p>

            <div className="mb-6 flex items-start gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-white p-1">
                <QRCodeSVG
                  value={appDownloadLink}
                  size={72}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded border border-white px-2 py-1.5 transition-colors hover:bg-white hover:text-black"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] leading-tight opacity-80">
                      {t("footer.downloadOn")}
                    </p>
                    <p className="text-xs leading-tight font-semibold">
                      {t("footer.appStore")}
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 rounded border border-white px-2 py-1.5 transition-colors hover:bg-white hover:text-black"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z"
                      fill="#01D3FD"
                    />
                    <path
                      d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                      fill="#F87171"
                    />
                    <path
                      d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"
                      fill="#FBBF24"
                    />
                    <path
                      d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"
                      fill="#4ADE80"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] leading-tight opacity-80">
                      {t("footer.getItOn")}
                    </p>
                    <p className="text-xs leading-tight font-semibold">
                      {t("footer.googlePlay")}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex gap-4">{/* Social Media Icons */}</div>
          </div>
        </div>
      </div>

      <div className="border-primary-white/70 text-primary-white/70 mt-12 border-t pt-6 text-center text-sm">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
