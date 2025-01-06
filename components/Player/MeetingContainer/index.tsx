"use client";
import React, {useEffect } from "react";
import LowerContainer from "../LowerContainer";
import MeetingRoomInfo from "../MeetingRoomInfo";
import { useAppStore } from "@/app/store/appStore";

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
  setMeetingDate?: any;
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
  const{
    themeInfo,
  } = useAppStore();


  useEffect(() => {
    setLedColour(!props.booked ? themeInfo?.themedatajson?.availableStatusColor : themeInfo?.themedatajson?.occupiedStatusColor);
  }, [themeInfo]);

  return (

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
              setMeetingDate={props.setMeetingDate} 
            />
            <LowerContainer
                booked={props.booked}
                meetingInfo={props.meetingInfo}
              />
            </div>
        </div>
  );
};

export default MeetingContainer;
