import React from 'react'
import CalenderFormComponent from './CalenderFormComponent'
import TimelineComponent from './TimelineComponent'
import { MeetingInfoContext } from '@/app/context/MeetingContext'
import { getTime, getTimeSlots } from './CalenderFormComponent/utils';

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

function BottomComponent({showFreeSlots, meetingInfo = [], spaceInfo = {}}) {
  const [bookingDetails, setBookingDetails] = React.useState(null);
  const [startTime, setStartTime] = React.useState(getTimeSlots().hhStart + ":" + getTimeSlots().mmStart);
  const [endTime, setEndTime] = React.useState(getTimeSlots().hhEnd + ":" + getTimeSlots().mmEnd);

  const eventClick = (data) => {
    setBookingDetails(data.bookingDetails);
   };
   
  return (
    <div className='flex px-8 h-[56%] meeting-info-context-scroll'>
      <TimelineComponent meetingInfo={{meetingInfo}} eventClick={eventClick} showFreeSlots={showFreeSlots} setStartTime={setStartTime} setEndTime={setEndTime}/>
      <CalenderFormComponent meetingInfo={{meetingInfo}} spaceInfo={spaceInfo} eventBookingDetails={bookingDetails} startTime={startTime} endTime={endTime}/>
    </div>
  )
}

export default BottomComponent