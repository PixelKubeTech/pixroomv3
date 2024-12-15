"use client";

import React, { useContext, useEffect } from 'react';

import { ISpace } from "../interface";
import MeetingContainer from '@/components/Player/MeetingContainer';
import { MeetingInfoContext } from '../context/MeetingInfoDataContext';
import { getCurrentDate } from "../utils/DateUtils";

interface MeetingBookedClientProps {
  spaceInfo: ISpace.SpaceInfo;
  themeInfo: any;
  calendarId: string;
}

const MeetingClient: React.FC<MeetingBookedClientProps> = ({ spaceInfo, themeInfo, calendarId }) => {
  const { meetingInfo, setMeetingDate } = useContext(MeetingInfoContext);
  const currentDate = getCurrentDate();
  console.log("MeetingClient", meetingInfo);
  return (
    <div
    className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`}
    style={{ backgroundImage: `url(../../pixroom/assets/images/mainbg.png)` }}
  >
      <MeetingContainer
        currentDate={currentDate}
        spaceInfo={spaceInfo}
        meetingInfo={meetingInfo || []}
        themeInfo={themeInfo}
        calendarId={calendarId}
        info={false}
        booked={false}
        setMeetingDate={setMeetingDate}
      />
    </div>
  );
};

export default MeetingClient;