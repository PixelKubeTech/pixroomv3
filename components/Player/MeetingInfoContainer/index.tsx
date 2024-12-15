"use client";
import React,{useReducer} from "react";
import MeetingRoomInfo from "../../../components/Player/MeetingRoomInfo";
import MeetingCalenderContainer from "../../../components/Player/MeetingCalenderContainer";
import { calenderReducer } from "../../../app/reducers/CalenderReducer";
import {
  MeetingInfoContext,
  MeetingContext,
  MeetingDispatchContext,
} from "@/app/context/MeetingContext";
import { getCurrentDate } from "@/app/utils/DateUtils";

const MeetingInfoContainer = ({ spaceInfo, meetingInfo,themeInfo,currentDate,calendarId, setMeetingDate = () => {} } : any) => {

  let meetingContainerInfo: any = {
    "spaceInfo": spaceInfo ? spaceInfo : null,
    "meetingInfo": meetingInfo ? meetingInfo : null,
    "themeInfo": themeInfo && themeInfo.themedata ? (() => {
      try {
        return JSON.parse(themeInfo.themedata);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    })() : null,
    "currentDate":currentDate
  };

 const [calender, dispatch] = useReducer(calenderReducer, {
        meetingDate: getCurrentDate(),
      });
  return (
    <MeetingContext.Provider value={calender}>
      <MeetingDispatchContext.Provider value={dispatch}>
        <MeetingInfoContext.Provider value={meetingContainerInfo}>
          <div className={`w-full h-full`}>
            <div
              id="modal-root"
              className={`w-full h-full flex flex-col bg-white/25 rounded-[40px]`}
            >
              <MeetingRoomInfo
                info
                spaceInfo={spaceInfo}
                meetingInfo={meetingInfo}
                themeInfo={themeInfo}
              />
              <MeetingCalenderContainer meetingInfo={meetingInfo} themeInfo={themeInfo} calendarId={calendarId} spaceInfo={spaceInfo} showFreeSlots setMeetingDate={setMeetingDate}/>
            </div>
          </div>
        </MeetingInfoContext.Provider>
      </MeetingDispatchContext.Provider>
    </MeetingContext.Provider>
  );
};

export default MeetingInfoContainer;
