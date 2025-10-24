import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import TeamMemberCard from "./TeamMemberCard";

// Import new images
import img1 from "@/assets/img/employee.jpg";
import img2 from "@/assets/img/employee-2.jpg";
import img3 from "@/assets/img/employee-3.jpeg";
import img4 from "@/assets/img/employee-4.png";
import img5 from "@/assets/img/employee-5.png";

const TeamSection = () => {
  const { t, i18n } = useTranslation();

  const teamMembers = [
    {
      name: i18n.language === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
      title: t("teamRoles.managingDirector"),
      imgSrc: img3,
    },
    {
      name: i18n.language === "ar" ? "خالد عبدالله" : "Khaled Abdullah",
      title: t("teamRoles.productDesigner"),
      imgSrc: img2,
    },
    {
      name: i18n.language === "ar" ? "محمود حسن" : "Mahmoud Hassan",
      title: t("teamRoles.leadDeveloper"),
      imgSrc: img4,
    },
    {
      name: i18n.language === "ar" ? "عمر السيد" : "Omar Elsayed",
      title: t("teamRoles.marketingHead"),
      imgSrc: img5,
    },
    {
      name: i18n.language === "ar" ? "يوسف إبراهيم" : "Youssef Ibrahim",
      title: t("teamRoles.founderChairman"),
      imgSrc: img1,
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          el: ".team-swiper-pagination",
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        key={i18n.language}
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <TeamMemberCard {...member} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom container for the pagination bullets */}
      <div className="team-swiper-pagination mt-8 text-center"></div>
    </section>
  );
};

export default TeamSection;
