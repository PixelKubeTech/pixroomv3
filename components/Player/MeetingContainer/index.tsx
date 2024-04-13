"use client";
import React, { useReducer } from "react";
import LowerContainer from "../LowerContainer";
import MeetingRoomInfo from "../MeetingRoomInfo";
import {
  MeetingContext,
  MeetingDispatchContext,
} from "@/app/context/MeetingContext";
import { getCurrentDate } from "@/app/utils/DateUtils";
import {calenderReducer} from '../../../app/reducers/CalenderReducer'

interface MeetingProps {
  spaceInfo: object;
  meetingInfo: object;
  currentDate: string;
}

const MeetingContainer = (props: MeetingProps) => {
  const [calender, dispatch] = useReducer(calenderReducer, {
    meetingDate: getCurrentDate(),
  });
  return (
    <MeetingContext.Provider value={calender}>
      <MeetingDispatchContext.Provider value={dispatch}>
        <div className={`w-full h-full`}>
          <div
            id="modal-root"
            className={`w-full h-full flex flex-col bg-white/25 rounded-[40px]`}
          >
            <MeetingRoomInfo
              info={false}
              size={"SMALL"}
              spaceInfo={props.spaceInfo}
            />
            <LowerContainer meetingInfo={props.meetingInfo} />
          </div>
        </div>
      </MeetingDispatchContext.Provider>
    </MeetingContext.Provider>
  );
};

export default MeetingContainer;
