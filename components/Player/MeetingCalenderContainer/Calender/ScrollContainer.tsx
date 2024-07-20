'use client'
import React, { useContext, useState } from "react";
import moment from "moment";
import Date from "./Date";
import { MeetingDispatchContext } from '../../../../app/context/MeetingContext'
import "./scrollbarthincalendar.css";


function ScrollContainer({margin = 4, size = 'LARGE'} : any) {
  const calender:any = useContext(MeetingDispatchContext)
  const dateArr = Array.from(Array(50).keys())
  const [selectedDate, setselectedDate] = useState(moment().format('DD-MM-YYYY'));
  let setCalenderDate = () => {
    if (calender) {
      calender({
        type: "meeting_calender_date",
        payload: selectedDate
      });
    } else {
      console.error("Calendar context is null. Make sure the component is wrapped with MeetingProvider.");
    }
  }
  return (
    <div className={`py-${Math.floor(margin % 2)} max-w-full overflow-x-scroll flex no-scrollbar ${size === 'SMALL' ? 'no-scrollbar' : 'shadow-[0px_15px_10px_-15px_#999999]'}`}>
      {dateArr.map((data, idx) => (
        <Date
          key={`${idx} ${data}`}
          dateObj={moment().add(data , 'd')}
          selectedDate={selectedDate}
          setselectedDate={setselectedDate}
          size={size}
          setCalenderDate={setCalenderDate}
        />
      ))}
      {/* {nextMonthArr.map((data , idx) => <Date key={`${idx} ${data}`} dayofMonth={data}/>)} */}
    </div>
  );
}

export default ScrollContainer;
