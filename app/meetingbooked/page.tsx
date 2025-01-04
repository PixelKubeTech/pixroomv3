"use client";

import { addOneDay, getCurrentDate, getStartEndOfMonth } from "../utils/DateUtils";
import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import MeetingBookedClient from './MeetingBookedClient';
import { useAppStore } from '../store/appStore';
import { useEffect } from 'react';

export default  function MeetingBooked(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    events,
    loadFromLocalStorage
  } = useAppStore();


  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  let spaceIdparam = spaceInfo?.spaceId
  let calendarparam = deviceInfo?.calendarId;
  let currentDate = getCurrentDate();
  const result = addOneDay(currentDate);

  let meetingInfo = events;
  let themeResponse = themeInfo;

  if (!calendarparam || !spaceInfo){
      return <div>Loading...</div>; 
  }
  return (
    <MeetingInfoProvider calendarId={calendarparam}>
      <MeetingBookedClient
        spaceInfo={spaceInfo}
        themeInfo={themeResponse}
        calendarId={calendarparam}
      />
    </MeetingInfoProvider>
  );
}