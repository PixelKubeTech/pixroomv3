import React from 'react';
import { FaUser } from 'react-icons/fa';

interface MeetingCardFreeProps {
  nextMeetingStartAt: string; 
}

const RoomFreeCard: React.FC<MeetingCardFreeProps> = ({ nextMeetingStartAt }) => {
  return (
    <div className="pl-[76px] mt-auto mb-auto">
      <div className="text-[54px] font-bold mb-2.5">
        Meeting Room Available until {nextMeetingStartAt}
      </div>
    </div>
  );
};

export default RoomFreeCard;
