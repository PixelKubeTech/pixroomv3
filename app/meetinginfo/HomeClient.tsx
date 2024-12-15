"use client";

import React, { useEffect, useState } from 'react';

import { ISpace } from "../interface";
import MeetingInfoContainer from "@/components/Player/MeetingInfoContainer";
import { getCurrentDate } from "../utils/DateUtils";
import { useMeetingInfo } from "../context/MeetingInfoDataContext";

interface HomeClientProps {
  spaceInfo: ISpace.SpaceInfo;
  themeInfo: any;
  calendarId: string;
}

const HomeClient: React.FC<HomeClientProps> = ({ spaceInfo, themeInfo, calendarId }) => {
  const { meetingInfo, setMeetingDate } = useMeetingInfo();
  const currentDate = getCurrentDate();
    console.log("HomeClient", meetingInfo);
  return (
    <div
      className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`}
      style={{ backgroundImage: `url(../pixroom/assets/images/mainbg.png)` }}
    >
      <MeetingInfoContainer
        currentDate={currentDate}
        spaceInfo={spaceInfo}
        meetingInfo={meetingInfo || []}
        themeInfo={themeInfo}
        calendarId={calendarId}
        setMeetingDate={setMeetingDate}
      />
    </div>
  );
};

export default HomeClient;