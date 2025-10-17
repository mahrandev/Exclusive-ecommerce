import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TeamMemberCard from './TeamMemberCard';

// Import new images
import img1 from '@/assets/img/employee.jpg';
import img2 from '@/assets/img/employee-2.jpg';
import img3 from '@/assets/img/employee-3.jpeg';
import img4 from '@/assets/img/employee-4.png';
import img5 from '@/assets/img/employee-5.png';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Emma Watson',
      title: 'Managing Director',
      imgSrc: img3,
    },
    {
      name: 'Will Smith',
      title: 'Product Designer',
      imgSrc: img2,
    },
    {
      name: 'John Doe',
      title: 'Lead Developer',
      imgSrc: img4,
    },
    {
      name: 'Jane Smith',
      title: 'Marketing Head',
      imgSrc: img5,
    },
    {
      name: 'Tom Cruise',
      title: 'Founder & Chairman',
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
          el: '.team-swiper-pagination', // Custom container selector
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
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <TeamMemberCard {...member} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom container for the pagination bullets */}
      <div className="team-swiper-pagination text-center mt-8"></div>
    </section>
  );
};

export default TeamSection;

