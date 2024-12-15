import React, { useContext, useEffect, useState } from "react";
import BottomComponent from "./BottomComponent";
import Calender from "./Calender";
import { getCurrentDate, reverseDate,addOneDay } from "@/app/utils/DateUtils";
import { MeetingContext } from "@/app/context/MeetingContext";
import { EventService } from "@/services";

function getMeetingDataByDate(meetingData:Array<any>,date:any){
  if((meetingData as any)?.success==false){ return []}
  let result =  meetingData.filter(item => item.date === date)
  return result;
}

function MeetingCalenderContainer({meetingInfo,themeInfo,calendarId,spaceInfo,showFreeSlots, setMeetingDate}:any) {
  const [meetingData,setEvent] = useState(meetingInfo);
  const[calendarIdparam,setCalendarId] = useState(calendarId);
  const currentDate = getCurrentDate()
  const [selectedMeetingInfo,setSelectMeetingInfo] = useState(getMeetingDataByDate(meetingData,reverseDate(currentDate)))
  const {meetingDate} = useContext(MeetingContext) || {}
  const [eventBookingDetails, setEventBookingDetails] = React.useState(null);
  let themeDataResponse;
  const [nextMeetingStartAt,setNextMeetingStartAt]=React.useState("");
  if (themeInfo && themeInfo.themedata) {
    try {
      themeDataResponse = JSON.parse(themeInfo.themedata);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      themeDataResponse = null; // or handle the error as needed
    }
  } else {
    themeDataResponse = null; // or handle the absence of data as needed
  }
  let showFindRoom=themeDataResponse!=null ? themeDataResponse.findRoom:true;
  let scrollSubject=themeDataResponse!=null  ? themeDataResponse.scrollSubject:true;
  let currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  const eventClick = (data) => {
   setEventBookingDetails(data.bookingDetails);
   };

   let [progress, setProgress] = React.useState(0);

  

  useEffect(() => {
    // Fetch meeting response
    const fetchMeetingResponse = async () => {
      try {
        let currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        const meetingList = await EventService.getEventInstances({
          calendarId: calendarIdparam ? calendarIdparam : '4'
        });
        setEvent(meetingList);
        if (meetingList.length > 0) {
          setSelectMeetingInfo(meetingList);
          meetingList.map((x,i)=>{
            if(x.date==currentDate && x.bookingDetails!=null &&  currentTime >= x.bookingDetails.from && currentTime < x.bookingDetails.to)
            {
              setEventBookingDetails(x.bookingDetails);
              setNextMeetingStartAt(meetingList[i+1].bookingDetails.from);
            }
          })
        } else {
          setSelectMeetingInfo([]);
        }
      } catch (error) {
        console.error('Error fetching event instances', error);
      }
    };

    fetchMeetingResponse();
  }, [meetingDate]);
  useEffect(() => {
    if(progress < 97) {
      setTimeout(() => setProgress(newVal1=>newVal1+1), 200)
    }
  });

// function MeetingCalenderContainer({showFreeSlots}) {
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
