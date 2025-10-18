// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import notfound from "@/assets/img/notfound.svg";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumbs */}
      <div className="mb-12 text-sm text-gray-600 md:mb-16">
        <Link to="/" className="transition-colors hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">404 Error</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-12 text-center md:py-16">
        {/* 404 Image/Text */}
        <div className="mb-8 md:mb-10">
          <img
            src={notfound}
            alt="404 Not Found"
            className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Error Message */}
        <h1 className="mb-4 max-w-xl text-2xl font-medium text-gray-900 md:mb-6 md:text-3xl">
          Your visited page not found. You may go home page.
        </h1>

        {/* Back Button */}
        <Button
          asChild
          className="mt-4 rounded-md bg-red-500 px-12 py-6 text-base font-medium text-white transition-colors hover:bg-red-600"
        >
          <Link to="/">Back to home page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
