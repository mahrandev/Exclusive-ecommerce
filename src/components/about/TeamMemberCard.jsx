import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const TeamMemberCard = ({ name, title, imgSrc }) => {
  return (
    <div className="text-start">
      <div className="mb-4 bg-gray-100">
        <img src={imgSrc} alt={name} className="w-full h-96 object-contain" />
      </div>
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="text-gray-600 mb-2">{title}</p>
      <div className="flex justify-start space-x-4">
        <a href="#" className="text-gray-500 hover:text-black"><Twitter /></a>
        <a href="#" className="text-gray-500 hover:text-black"><Instagram /></a>
        <a href="#" className="text-gray-500 hover:text-black"><Linkedin /></a>
      </div>
    </div>
  );
};

export default TeamMemberCard;
