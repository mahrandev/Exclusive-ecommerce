
import { useTranslation } from "react-i18next";

const StorySection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="order-last lg:order-first py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-xl lg:ml-auto md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('aboutPage.ourStory')}</h1>
            <p className="mt-6 text-gray-800 leading-relaxed">
              {t('aboutPage.storyParagraph1')}
            </p>
            <p className="mt-4 text-gray-800 leading-relaxed">
              {t('aboutPage.storyParagraph2')}
            </p>
          </div>
        </div>

        <div className="order-first lg:order-last h-64 lg:h-full w-full bg-[#EB7EA8]">
        </div>
      </div>
    </section>
  );
};

export default StorySection;
