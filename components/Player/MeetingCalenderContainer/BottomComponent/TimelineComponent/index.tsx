import React, { useState, useEffect } from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";
import { useAppStore } from "@/app/store/appStore";

function TimelineComponent(props) {
    const {
      spaceInfo,
      deviceInfo,
      themeInfo,
      events,
      selectedDay,
      upcomingEventsByDay,
      loadFromLocalStorage
    } = useAppStore();

    useEffect(() => {
      loadFromLocalStorage();
    }, [selectedDay]);

  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState<number>(-1);
  const handleMeetingBlockClick = (data) => {
    props.eventClick(data);
  };
  const { showFreeSlots } = props;
  let meetingInfo: any = null;

  if (props.meetingInfo != null && props.meetingInfo.length > 0) meetingInfo = props.meetingInfo;
  else if (
    props.meetingInfo != null &&
    props.meetingInfo.meetingInfo != null 
    //&&
    //props.meetingInfo.meetingInfo.length > 0
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
  
    //const freeSlots = findFreeSlots(meetingInfo || []);
    const freeSlots = showFreeSlots ? findFreeSlots(meetingInfo || []) : [];
  
    // Merge meetings and free slots, then sort
    const combinedList = [...meetingInfo, ...freeSlots].sort((a, b) => a.bookingDetails.from.localeCompare(b.bookingDetails.from));
  return (
    <div className={`h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2 thin-scrollbar`}>
      {upcomingEventsByDay[selectedDay]?.map((data, index) => (
        <MeetingBlock
          key={index}
          isAvailable={data.isAvailable}
          bookingDetails={data.bookingDetails}
          parentProps={props}
          onClick={handleMeetingBlockClick}
          setStartTime={props.setStartTime}
          setEndTime={props.setEndTime}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}s
          currentIndex={index}
          selectedMeetingIndex={selectedMeetingIndex}
          setSelectedMeetingIndex={setSelectedMeetingIndex}
        />
      ))}
    </div>
  );
}

export default TimelineComponent;