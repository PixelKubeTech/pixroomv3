"use client";

import MeetingClient from "./MeetingClient";
import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import { useAppStore } from "../store/appStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DeviceNotRegistered from "@/components/common/DeviceNotRegisteredMessage";

export default function MeetingBooked(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    activeMeeting,
    fetchEvents,
    loadFromLocalStorage,
    startPolling,
    stopPolling
  } = useAppStore();


  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const router = useRouter();
  useEffect(() => {
    fetchEvents();
    startPolling();

    return () => {
      stopPolling(); 
    };
  }, [startPolling, stopPolling]);

  useEffect(() => {
    if ( activeMeeting) {
      router.push("/meetingbooked");
    } 
}, [activeMeeting]);

  let calendarparam = deviceInfo?.calendarId ;

  let themeResponse = themeInfo;

  if (!spaceInfo || !calendarparam) {
    return <DeviceNotRegistered/>
  }

  return (
    <MeetingInfoProvider calendarId={calendarparam}>
      <MeetingClient spaceInfo={spaceInfo} themeInfo={themeResponse} calendarId={calendarparam} />
    </MeetingInfoProvider>
  );
}