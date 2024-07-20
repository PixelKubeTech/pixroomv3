"use client";
import React, { useReducer } from "react";
import LowerContainer from "../LowerContainer";
import MeetingRoomInfo from "../MeetingRoomInfo";
import {
  MeetingContext,
  MeetingDispatchContext,
  MeetingInfoContext
} from "@/app/context/MeetingContext";
import { getCurrentDate } from "@/app/utils/DateUtils";
import {calenderReducer} from '../../../app/reducers/CalenderReducer'

interface MeetingProps {
  spaceInfo: object;
  meetingInfo: object;
  themeInfo:object;
  currentDate: string;
  calendarId: string;
  booked: boolean;
  info: boolean;
}

const MeetingContainer = (props: MeetingProps) => {
  const [calender, dispatch] = useReducer(calenderReducer, {
    meetingDate: getCurrentDate(),
  });
  let meetingContainerInfo:any={
    "spaceInfo":props.spaceInfo,
    "meetingInfo":props.meetingInfo,
    "themeInfo":props.themeInfo,
    "currentDate":props.currentDate
  }

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
              info={props.info}
              size={"SMALL"}
              booked={props.booked}
              spaceInfo={props.spaceInfo}
              themeInfo={props.themeInfo}
            />
            <LowerContainer booked={props.booked} meetingInfo={props.meetingInfo} themeInfo={props.themeInfo} calendarId={props.calendarId} />
          </div>
        </div>
        </MeetingInfoContext.Provider>
      </MeetingDispatchContext.Provider>
    </MeetingContext.Provider>
  );
};

export default MeetingContainer;
