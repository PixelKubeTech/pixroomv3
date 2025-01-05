import React, {useEffect } from "react";
import BottomComponent from "./BottomComponent";
import Calender from "./Calender";

function getMeetingDataByDate(meetingData:Array<any>,date:any){
  if((meetingData as any)?.success==false){ return []}
  let result =  meetingData.filter(item => item.date === date)
  return result;
}

function MeetingCalenderContainer({meetingInfo,themeInfo,calendarId,spaceInfo,showFreeSlots, setMeetingDate}:any) {

   let [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if(progress < 97) {
      setTimeout(() => setProgress(newVal1=>newVal1+1), 200)
    }
  });

  return (
    <div className="box-border h-full bg-white/30 mx-8 mt-4 mb-6 rounded-[40px] p-4 flex flex-col flex-auto min-h-0">
      <form className="border-none p-0">
        <input className="nosubmit w-full h-[40px] rounded-[20px] p-4 pl-[40px]" />
      </form>
      <Calender setMeetingDate={setMeetingDate}/>
      <BottomComponent showFreeSlots={showFreeSlots} meetingInfo={meetingInfo} spaceInfo={spaceInfo}/>
    </div>
  );
}

export default MeetingCalenderContainer;
