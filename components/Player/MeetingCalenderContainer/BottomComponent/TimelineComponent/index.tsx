import React, { useState, useEffect } from "react";
import MeetingBlock from "./MeetingBlocks";
import "./scrollbarthin.css";
import { useAppStore } from "@/app/store/appStore";
import { IEvent } from "@/app/interface/EventType";

interface TimelineProps {
  eventClick: (data: any) => void;
  showFreeSlots: boolean;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

const TimelineComponent: React.FC<TimelineProps> = (props) => {
  const { selectedDate, upcomingEventsByDay } = useAppStore();
  const [meetingInfo, setMeetingInfo] = useState<IEvent[]>([]); 
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState<number>(-1);

  useEffect(() => {
    const meetings = upcomingEventsByDay[selectedDate.getDate()] ?? [];
    const sortedMeetings = meetings.sort((a, b) =>
      a.bookingDetails.from.localeCompare(b.bookingDetails.from)
    );
    setMeetingInfo(sortedMeetings);
  }, [selectedDate, upcomingEventsByDay]);

  // Function to find free slots
  const findFreeSlots = (meetings: IEvent[]): IEvent[] => {
    const freeSlots: any[] = [];
    const dayStart = "08:00";
    const dayEnd = "20:00";
    let lastEndTime = dayStart;

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

    if (lastEndTime < dayEnd) {
      freeSlots.push({
        bookingDetails: {
          from: lastEndTime,
          to: dayEnd,
          meetingName: "Room Available",
        },
        isAvailable: true,
      });
    }

    return freeSlots;
  };

  // Merge meetings and free slots
  const freeSlots = props.showFreeSlots ? findFreeSlots(meetingInfo) : [];
  const combinedList = [...meetingInfo, ...freeSlots].sort((a, b) =>
    a.bookingDetails.from.localeCompare(b.bookingDetails.from)
  );

  return (
    <div className="h-full overflow-scroll max-h-100 flex flex-col basis-1/2 gap-2 thin-scrollbar">
      {combinedList.map((data, index) => (
        <MeetingBlock
          key={index}
          isAvailable={data.isAvailable}
          bookingDetails={data.bookingDetails}
          parentProps={props}
          onClick={props.eventClick}
          setStartTime={props.setStartTime}
          setEndTime={props.setEndTime}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          currentIndex={index}
          selectedMeetingIndex={selectedMeetingIndex}
          setSelectedMeetingIndex={setSelectedMeetingIndex}
        />
      ))}
    </div>
  );
};

export default TimelineComponent;
