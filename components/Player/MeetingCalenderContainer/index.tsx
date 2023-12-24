import React from "react";
import BottomComponent from "./BottomComponent";
import Calender from "./Calender";

function MeetingCalenderContainer() {
  return (
    <div className="box-border h-full bg-white/30 mx-8 mt-4 mb-6 rounded-[40px] p-4 flex flex-col flex-auto min-h-0">
      <form className="border-none p-0">
        <input className="nosubmit w-full h-[40px] rounded-[20px] p-4 pl-[40px]" />
      </form>
      <Calender />
      <BottomComponent />
    </div>
  );
}

export default MeetingCalenderContainer;
