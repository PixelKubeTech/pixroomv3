"use client";

import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import MeetingBookedClient from './MeetingBookedClient';
import { useAppStore } from '../store/appStore';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default  function MeetingBooked(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    events,
    activeMeeting,
    loadFromLocalStorage,
    startPolling,
    stopPolling
  } = useAppStore();


  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  const router = useRouter();

  useEffect(() => {
    startPolling();

    return () => {
      stopPolling(); 
    };
  }, [startPolling, stopPolling]);

  useEffect(() => {
      if ( !activeMeeting) {
        router.push("/meeting");
        return;
      } 
  }, [activeMeeting]);


  let calendarparam = deviceInfo?.calendarId;
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