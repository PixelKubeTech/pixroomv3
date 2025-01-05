"use client";

import { addOneDay, getCurrentDate } from "../utils/DateUtils";

import { ISpace } from "../interface";
import MeetingBookedClient from './MeetingClient';
import MeetingClient from "./MeetingClient";
import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import { SpaceService } from "@/services";
import { getThemesById } from '@/services/ThemeService';
import { useAppStore } from "../store/appStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MeetingBooked(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    events,
    activeMeeting,
    nextMeeting,
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
    if ( activeMeeting) {
      router.push("/meetingbooked");
    } 
}, [activeMeeting]);

  let calendarparam = deviceInfo?.calendarId ;

  let themeResponse = themeInfo;

  if (!spaceInfo || !calendarparam) {
    return <div>No Space or Calendar Info</div>; 
  }

  return (
    <MeetingInfoProvider calendarId={calendarparam}>
      <MeetingClient spaceInfo={spaceInfo} themeInfo={themeResponse} calendarId={calendarparam} />
    </MeetingInfoProvider>
  );
}