// src/pages/ContactPage.jsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumbs */}
      <div className="mb-12 text-sm text-gray-600 md:mb-16">
        <Link to="/" className="transition-colors hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Contact</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[360px_1fr] md:gap-8 lg:grid-cols-[400px_1fr] lg:gap-12">
        {/* Left Column - Contact Info */}
        <div className="h-fit rounded-md bg-white p-6 shadow-md md:p-8">
          {/* Call To Us Section */}
          <div className="border-b border-gray-500 pb-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-500 p-2.5">
                <Phone className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-semibold">Call To Us</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-900">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm text-gray-900">Phone: +88016111122222</p>
          </div>

          {/* Write To Us Section */}
          <div className="pt-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-500 p-2.5">
                <Mail className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-semibold">Write To US</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-900">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="mb-2 text-sm text-gray-900">
              Emails: customer@exclusive.com
            </p>
            <p className="text-sm text-gray-900">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="rounded-md bg-white p-6 shadow-md md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Fields Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                type="text"
                placeholder="Your Name *"
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
              <Input
                type="email"
                placeholder="Your Email *"
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
              <Input
                type="tel"
                placeholder="Your Phone *"
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
            </div>

            {/* Message Textarea */}
            <textarea
              className="w-full resize-none rounded-md border-none bg-gray-100 p-4 placeholder:text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Your Message"
              rows="8"
            ></textarea>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-md bg-red-500 px-12 py-6 text-base font-medium text-white transition-colors hover:bg-red-600"
              >
                Send Massage
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
