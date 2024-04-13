"use client";
import React,{useReducer} from "react";
import MeetingRoomInfo from "../../../components/Player/MeetingRoomInfo";
import MeetingCalenderContainer from "../../../components/Player/MeetingCalenderContainer";
import {
  MeetingInfoContext,
  MeetingContext,
  MeetingDispatchContext,
} from "@/app/context/MeetingContext";
import { getCurrentDate } from "@/app/utils/DateUtils";
import { calenderReducer } from "../../../app/reducers/CalenderReducer";
const MeetingInfoContainer = ({ spaceInfo, meetingInfo }) => {
    const [calender, dispatch] = useReducer(calenderReducer, {
        meetingDate: getCurrentDate(),
      });
  return (
    <MeetingContext.Provider value={calender}>
      <MeetingDispatchContext.Provider value={dispatch}>
        <MeetingInfoContext.Provider value={meetingInfo}>
          <div className={`w-full h-full`}>
            <div
              id="modal-root"
              className={`w-full h-full flex flex-col bg-white/25 rounded-[40px]`}
            >
              <MeetingRoomInfo
                info
                spaceInfo={spaceInfo}
                meetingInfo={meetingInfo}
              />
              <MeetingCalenderContainer />
            </div>
          </div>
        </MeetingInfoContext.Provider>
      </MeetingDispatchContext.Provider>
    </MeetingContext.Provider>
  );
};

export default MeetingInfoContainer;
