import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const ContactPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs />

      <div className="grid gap-6 md:grid-cols-[360px_1fr] md:gap-8 lg:grid-cols-[400px_1fr] lg:gap-12">
        <div className="h-fit rounded-md bg-white p-6 shadow-md md:p-8">
          <div className="border-b border-gray-500 pb-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-500 p-2.5">
                <Phone className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-semibold">{t('contactPage.callUs')}</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-900">
              {t('contactPage.availability')}
            </p>
            <p className="text-sm text-gray-900">{t('contactPage.phoneLabel')}</p>
          </div>

          <div className="pt-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-500 p-2.5">
                <Mail className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-semibold">{t('contactPage.writeToUs')}</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-900">
              {t('contactPage.formPrompt')}
            </p>
            <p className="mb-2 text-sm text-gray-900">
              {t('contactPage.emailsLabel1')}
            </p>
            <p className="text-sm text-gray-900">
              {t('contactPage.emailsLabel2')}
            </p>
          </div>
        </div>

        <div className="rounded-md bg-white p-6 shadow-md md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                type="text"
                placeholder={t('contactPage.namePlaceholder')}
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
              <Input
                type="email"
                placeholder={t('contactPage.emailPlaceholder')}
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
              <Input
                type="tel"
                placeholder={t('contactPage.phonePlaceholder')}
                required
                className="h-12 border-none bg-gray-100 px-4 placeholder:text-gray-700 focus-visible:ring-2 focus-visible:ring-red-500"
              />
            </div>

            <textarea
              className="w-full resize-none rounded-md border-none bg-gray-100 p-4 placeholder:text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder={t('contactPage.messagePlaceholder')}
              rows="8"
            ></textarea>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-md bg-red-500 px-12 py-6 text-base font-medium text-white transition-colors hover:bg-red-600"
              >
                {t('contactPage.sendMessage')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
