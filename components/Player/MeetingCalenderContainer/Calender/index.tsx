import React from "react";
import moment from "moment";
import ScrollContainer from "./ScrollContainer";
import { useAppStore } from "@/app/store/appStore";
function Calender({margin = 8, size = 'LARGE', setMeetingDate} : any) {
  const {
    selectedDate,
  } = useAppStore();

  const month = selectedDate.toLocaleString('default', { month: 'long' });
  return (
    <div className={`px-${margin} pt-${margin} flex flex-col`}>
      <div className="text-xl font-bold text-[#7f818d] px-2">{month}</div>
      <ScrollContainer size={size} setMeetingDate={setMeetingDate}/>
    </div>
  );
}

export default Calender;
