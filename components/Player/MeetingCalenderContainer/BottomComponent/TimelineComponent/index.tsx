import React from "react";
import MeetingBlock from "./MeetingBlocks";
const meetingInfo = [
  {
    isAvailable: false,
    bookingDetails: {
      from: "11:00",
      to: "12:00",
      duration: 1,
      meetingName: "Ceo Conference Call",
      bookingPersonName: "Sarah Iverson",
    },
  },
  {
    isAvailable: true,
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
function TimelineComponent({ className }: any) {
  return (
    <div className={`h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2`} >
      {meetingInfo.map((data) => (
        <MeetingBlock
          key={data.bookingDetails.from}
          isAvailabe={data.isAvailable}
          bookingDetails={data.bookingDetails}
        />
      ))}
    </div>
  );
}

export default TimelineComponent;
