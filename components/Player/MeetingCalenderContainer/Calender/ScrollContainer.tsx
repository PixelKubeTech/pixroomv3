'use client'
import React, { useState } from "react";
import moment from "moment";
import Date from "./Date";


function ScrollContainer({margin = 4, size = 'LARGE'} : any) {

  const dateArr = Array.from(Array(50).keys())
  const [selectedDate, setselectedDate] = useState(moment().format('DD-MM-YYYY'));

  return (
    <div className={`py-${Math.floor(margin % 2)} max-w-full overflow-x-scroll flex  ${size === 'SMALL' ? 'no-scrollbar' : 'shadow-[0px_15px_10px_-15px_#999999]'}`}>
      {dateArr.map((data, idx) => (
        <Date
          key={`${idx} ${data}`}
          dateObj={moment().add(data , 'd')}
          selectedDate={selectedDate}
          setselectedDate={setselectedDate}
          size={size}
        />
      ))}
      {/* {nextMonthArr.map((data , idx) => <Date key={`${idx} ${data}`} dayofMonth={data}/>)} */}
    </div>
  );
}

export default ScrollContainer;
