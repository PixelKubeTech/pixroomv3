import React from 'react';
import { FaUser } from 'react-icons/fa';

interface MeetingCardProps {
    time: string;
    title: string;
    bookedBy: string;
    participants: number;
  }
  
const MeetingCard: React.FC<MeetingCardProps> = ({ time, title, bookedBy, participants }) => {
  return (  
    <div className="pl-[76px] mt-auto mb-auto">
    <div className="text-4xl font-extralight mb-1.5">{time}</div>
    <div className="text-[54px] font-bold mb-2.5">{title}</div>
    <div className="text-base font-semibold text-[#7d7d7d] mb-5">Booked by {bookedBy}</div>
    <div className="flex items-center text-lg">
      <FaUser className="mr-[5px]" />
        <span>{participants}</span>
      </div>
    </div>
  );
};

export default MeetingCard;