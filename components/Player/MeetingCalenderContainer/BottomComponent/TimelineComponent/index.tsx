import React,{useState,useEffect} from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";

const meetingInfo = [
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
function TimelineComponent(props) {
  let meetingInfo:any=null;
  if(props.meetingInfo!=null && props.meetingInfo.length>0)
    meetingInfo=props.meetingInfo;
  else if(props.meetingInfo!=null && props.meetingInfo.meetingInfo!=null && props.meetingInfo.meetingInfo.length>0)
    meetingInfo=props.meetingInfo.meetingInfo;
  return (
    <div className={`h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2 thin-scrollbar`} >
      {meetingInfo?.map((data) => (
        <MeetingBlock
          key={data.bookingDetails.from}
          isAvailabe={data.isAvailable}
          bookingDetails={data.bookingDetails}
          parentProps={props}
        />
      ))}
    </div>
  );
}

export default TimelineComponent;
