import React,{useState,useEffect} from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";




function TimelineComponent(props) {

  const handleMeetingBlockClick = (data) => {
    props.eventClick(data)
  };
  
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
          onClick={handleMeetingBlockClick}
        />
      ))}
    </div>
  );
}

export default TimelineComponent;
