import React from 'react';
import { FaUser } from 'react-icons/fa';
import './meetingcard.css';

interface MeetingCardProps {
    time: string;
    title: string;
    bookedBy: string;
    participants: number;
  }
  
const MeetingCard: React.FC<MeetingCardProps> = ({ time, title, bookedBy, participants }) => {
  return (  
    <div className="meeting-card">
      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" alt="Tesla" className="logo" /> */}
      <div className="time">{time}</div>
      <div className="title">{title}</div>
      <div className="booked-by">Booked by {bookedBy}</div>
      <div className="participants">
        <FaUser className="user-icon" /> {participants}
      </div>
    </div>
  );
};

export default MeetingCard;