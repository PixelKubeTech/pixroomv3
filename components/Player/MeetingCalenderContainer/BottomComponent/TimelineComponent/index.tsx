import React, { useState, useEffect } from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";
import { useAppStore } from "@/app/store/appStore";

const isDateInPast = (date: Date): boolean => {
  const givenDate = new Date(date);
  const now = new Date();

  givenDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return givenDate < now;
};

function TimelineComponent(props) {
  const {
    themeInfo,
    selectedDate,
    setSelectedDate,
    upcomingEventsByDay,
  } = useAppStore();

  const [meetingInfo, setMeetingInfo] = useState<any[]>([]); //TODO Add typecheck instead of any
  useEffect(() => {
    if(isDateInPast(selectedDate)) {
      setSelectedDate(new Date());
    }
    const meetingInfo = upcomingEventsByDay[selectedDate.getDate()] ?? [];
    setMeetingInfo(meetingInfo);
  }, [selectedDate, upcomingEventsByDay]);

  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState<number>(-1);
  const handleMeetingBlockClick = (data) => {
    props.eventClick(data);
  };
  const { showFreeSlots } = props;
  //let meetingInfo = []; //upcomingEventsByDay[selectedDate.getDay()] ?? [];

  const sortedMeetingInfo = meetingInfo?.sort((a, b) => a.bookingDetails.from.localeCompare(b.bookingDetails.from));

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

  const freeSlots = showFreeSlots ? findFreeSlots(meetingInfo || []) : [];

  const themeData = themeInfo?.themedatajson;

  // Merge meetings and free slots, then sort
  const combinedList = [...sortedMeetingInfo, ...freeSlots].sort((a, b) => a.bookingDetails.from.localeCompare(b.bookingDetails.from));
  return (
    combinedList.length == 0? <div>No events for the day</div>:
    <div className={`h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2 thin-scrollbar`}>
      {combinedList.map((data, index) => (
        <MeetingBlock
          key={index}
          isAvailable={data.isAvailable}
          bookingDetails={data.bookingDetails}
          parentProps={props}
          themeInfo={themeData}
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