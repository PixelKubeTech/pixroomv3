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

const MeetingBookedClient: React.FC<MeetingBookedClientProps> = ({ spaceInfo, themeInfo, calendarId }) => {
  const { meetingInfo, setMeetingDate } = useContext(MeetingInfoContext);
  const currentDate = getCurrentDate();
  return (
    <div className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden bg-gradient-to-r from-red-300 via-red-100 to-red-200`}>
      <MeetingContainer
        currentDate={currentDate}
        spaceInfo={spaceInfo}
        meetingInfo={meetingInfo || []}
        themeInfo={themeInfo}
        calendarId={calendarId}
        booked={true}
        info={false}
        setMeetingDate={setMeetingDate}
      />
    </div>
  );
};

export default MeetingBookedClient;