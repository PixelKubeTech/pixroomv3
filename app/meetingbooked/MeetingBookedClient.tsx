"use client";

import React, { useContext, useEffect } from 'react';

import { ISpace } from "../interface";
import MeetingContainer from '@/components/Player/MeetingContainer';
import { MeetingInfoContext } from '../context/MeetingInfoDataContext';
import { getCurrentDate } from "../utils/DateUtils";
import { useAppStore } from '../store/appStore';

interface MeetingBookedClientProps {
  spaceInfo: ISpace.SpaceInfo;
  themeInfo: any;
  calendarId: string;
}

const MeetingBookedClient: React.FC<MeetingBookedClientProps> = ({ spaceInfo, themeInfo, calendarId }) => {
  const {
    activeMeeting
  } = useAppStore();
  const { meetingInfo, setMeetingDate } = useContext(MeetingInfoContext);
  const currentDate = getCurrentDate();
  return (
    <div className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden bg-custom-gradient-busy`}>
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