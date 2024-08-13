import React, { useState, useEffect } from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";

function TimelineComponent(props) {
  const handleMeetingBlockClick = (data) => {
    props.eventClick(data);
  };

  let meetingInfo: any = null;
  if (props.meetingInfo != null && props.meetingInfo.length > 0) meetingInfo = props.meetingInfo;
  else if (
    props.meetingInfo != null &&
    props.meetingInfo.meetingInfo != null &&
    props.meetingInfo.meetingInfo.length > 0
  )
    meetingInfo = props.meetingInfo.meetingInfo;
    meetingInfo = meetingInfo?.sort((a, b) => a.bookingDetails.from.localeCompare(b.bookingDetails.from));

    const findFreeSlots: any = (meetings) => {
      const freeSlots: any = [];
      let lastEndTime = "08:00";
  
      meetings.forEach((meeting) => {
        if (lastEndTime < meeting.bookingDetails.from) {
          freeSlots.push({
            bookingDetails: {
              from: lastEndTime,
              to: meeting.bookingDetails.from,
              meetingName: "Room Available",
            },
            isAvailable: true,
          });
        }
        lastEndTime = meeting.bookingDetails.to;
      });
  
      // Check for free time after the last meeting till 8 PM
      if (lastEndTime < "20:00") {
        freeSlots.push({
          bookingDetails: {
            from: lastEndTime,
            to: "20:00",
            meetingName: "Room Available",
          },
          isAvailable: true,
        });
      }
  
      return freeSlots;
    };
  
    const freeSlots = findFreeSlots(meetingInfo || []);
  
    // Merge meetings and free slots, then sort
    const combinedList = [...meetingInfo, ...freeSlots].sort((a, b) => a.bookingDetails.from.localeCompare(b.bookingDetails.from));
  return (
    <div className={`h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2 thin-scrollbar`}>
      {combinedList?.map((data) => (
        <MeetingBlock
          key={data.bookingDetails.from}
          isAvailable={data.isAvailable}
          bookingDetails={data.bookingDetails}
          parentProps={props}
          onClick={handleMeetingBlockClick}
        />
      ))}
    </div>
  );
}

export default TimelineComponent;