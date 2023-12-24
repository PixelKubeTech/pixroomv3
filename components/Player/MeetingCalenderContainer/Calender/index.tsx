import React from "react";
import moment from "moment";
import ScrollContainer from "./ScrollContainer";
function Calender({margin = 8, size = 'LARGE'} : any) {
  const month = moment().format("MMMM");
  return (
    <div className={`px-${margin} pt-${margin} flex flex-col`}>
      <div className="text-xl font-bold text-[#7f818d] px-2">{month}</div>
      <ScrollContainer size={size}/>
    </div>
  );
}

export default Calender;
