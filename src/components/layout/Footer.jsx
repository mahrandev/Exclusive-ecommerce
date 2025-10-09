// src/components/layout/Footer.jsx

import { QrCodeIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const appDownloadLink =
    "https://play.google.com/store/apps/details?id=com.example.app"; // Replace with actual link
  return (
    <footer className="bg-primary-black text-primary-white pt-16 pb-6">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Logo Section - خارج الـ Grid */}
        <div className="mb-8">
          <NavLink to="/" className=" ">
            <h2 className="text-primary-white hover:text-primary-red mb-4 text-2xl font-bold transition-colors">
              Exclusive
            </h2>
          </NavLink>
        </div>

        {/* Grid responsive: 1 col on mobile, 2 cols on md, 4 cols on lg, 5 cols on xl */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Column 1 - Subscribe */}
          <div>
            <p className="mb-4 text-lg font-medium">Subscribe</p>
            <p className="mb-3 text-sm">Get 10% off your first order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:border-primary-red w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm focus:outline-none"
              />
              <button className="hover:text-primary-red absolute top-1/2 right-2 -translate-y-1/2 text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-primary-white/70">
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </li>
              <li>
                <a
                  href="mailto:exclusive@gmail.com"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  exclusive@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801588888999"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  +88015-88888-9999
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Account */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Account</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Login / Register
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Quick Link */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Link</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Terms Of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-primary-white/70 hover:text-primary-red transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 - Download App */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Download App</h3>
            <p className="text-primary-white/70 mb-4 text-xs">
              Save $3 with App New User Only
            </p>

            {/* QR Code and App Store Buttons */}
            <div className="mb-6 flex items-start gap-2">
              {/* QR Code Placeholder */}
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-white p-1">
                <QRCodeSVG
                  value={appDownloadLink}
                  size={72} // حجم أصغر قليلاً ليناسب المساحة
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H" // جودة عالية
                />
              </div>

              {/* App Store Buttons */}
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
                      Download on the
                    </p>
                    <p className="text-xs leading-tight font-semibold">
                      App Store
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
                    {/* الجزء الأزرق */}
                    <path
                      d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z"
                      fill="#01D3FD"
                    />
                    {/* الجزء الأحمر */}
                    <path
                      d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                      fill="#F87171"
                    />
                    {/* الجزء الأصفر */}
                    <path
                      d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"
                      fill="#FBBF24"
                    />
                    {/* الجزء الأخضر */}
                    <path
                      d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"
                      fill="#4ADE80"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] leading-tight opacity-80">
                      GET IT ON
                    </p>
                    <p className="text-xs leading-tight font-semibold">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-primary-white/70 hover:text-primary-red transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-white/70 hover:text-primary-red transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-white/70 hover:text-primary-red transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-white/70 hover:text-primary-red transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-primary-white/70 text-primary-white/70 mt-12 border-t pt-6 text-center text-sm">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
