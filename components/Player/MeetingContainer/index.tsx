"use client";
import React, { useReducer,useEffect } from "react";
import LowerContainer from "../LowerContainer";
import MeetingRoomInfo from "../MeetingRoomInfo";
import {
  MeetingContext,
  MeetingDispatchContext,
  MeetingInfoContext
} from "@/app/context/MeetingContext";
import { getCurrentDate } from "@/app/utils/DateUtils";
import {calenderReducer} from '../../../app/reducers/CalenderReducer'

interface ThemeInfo {
  themedata?: string;
}

interface MeetingProps {
  spaceInfo: object;
  meetingInfo: object;
  themeInfo:ThemeInfo;
  currentDate: string;
  calendarId: string;
  booked: boolean;
  info: boolean;
}

function setLedColour(hexValue) {
  // Send a JSON-formatted message with the color value
  if (window.ledController && window.ledController.postMessage) {
      window.ledController.postMessage(JSON.stringify({ action: 'setLedColour', color: hexValue }));
  } else {
      console.log("ledController is not available");
  }
}

const MeetingContainer = (props: MeetingProps) => {
  const [calender, dispatch] = useReducer(calenderReducer, {
    meetingDate: getCurrentDate(),
  });
  let meetingContainerInfo: any = {
    spaceInfo: props.spaceInfo,
    meetingInfo: props.meetingInfo,
    themeInfo: props.themeInfo,
    currentDate: props.currentDate,
  };

  useEffect(() => {
    const themeinfotemp = props.themeInfo?.themedata
      ? (() => {
          try {
            return JSON.parse(props.themeInfo.themedata);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        })()
      : null;
    setLedColour(!props.booked ? themeinfotemp?.availableStatusColor : themeinfotemp?.occupiedStatusColor);
  }, [props.meetingInfo]);

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
              meetingInfo={props.meetingInfo}     
            />
            <LowerContainer
                booked={props.booked}
                spaceInfo={props.spaceInfo}
                meetingInfo={props.meetingInfo}
                themeInfo={props.themeInfo}
                calendarId={props.calendarId}
              />
            </div>
        </div>
        </MeetingInfoContext.Provider>
      </MeetingDispatchContext.Provider>
    </MeetingContext.Provider>
  );
};

export default MeetingContainer;
