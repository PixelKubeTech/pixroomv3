import React from 'react'
import CalenderFormComponent from './CalenderFormComponent'
import TimelineComponent from './TimelineComponent'
import { MeetingInfoContext } from '@/app/context/MeetingContext'

const meetingInfodata = [
  {
    isAvailable: false,
    bookingDetails: {
      from: "11:00",
      to: "12:00",
      duration: 1,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Selva ganesh",
    },
  },
  {
    isAvailable: false,
    bookingDetails: {
      from: "12:00",
      to: "15:00",
      duration: 3,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Sarah Iverson",
    },
  },
  {
    isAvailable: false,
    bookingDetails: {
      from: "16:00",
      to: "17:00",
      duration: 1,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Sarah Iverson",
    },
  },
  {
    isAvailable: false,
    bookingDetails: {
      from: "17:00",
      to: "18:00",
      duration: 1,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Sarah Iverson",
    },
  },
  {
    isAvailable: false,
    bookingDetails: {
      from: "19:00",
      to: "20:00",
      duration: 1,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Sarah Iverson",
    },
  },
];


function BottomComponent() {
  const [bookingDetails, setBookingDetails] = React.useState(null);

  const eventClick = (data) => {
    setBookingDetails(data.bookingDetails);
   };
   
  const meetingInfo = React.useContext(MeetingInfoContext) || meetingInfodata;
  return (
    <div className='flex px-8 h-[56%] meeting-info-context-scroll'>
        <TimelineComponent meetingInfo={meetingInfo} eventClick={eventClick}/>
        <CalenderFormComponent meetingInfo={meetingInfo} eventBookingDetails={bookingDetails}/>
    </div>
  )
}

export default BottomComponent