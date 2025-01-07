"use client";

import HomeClient from "./HomeClient";
import { ISpace } from "../interface";
import { MeetingInfoProvider } from "../context/MeetingInfoDataContext";
import { SpaceService } from "@/services";
import { getCurrentDate } from "../utils/DateUtils";
import { getThemesById } from "@/services/ThemeService";
import { useAppStore } from "../store/appStore";
import { useEffect } from "react";

export default function Home(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    loadFromLocalStorage
  } = useAppStore();


  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
  let calendarId = deviceInfo?.calendarId;
  
  if (!spaceInfo || !calendarId) {
    return <div>Device is not registered.</div>; 
  }
  return (
    <MeetingInfoProvider calendarId={calendarId}>
      <HomeClient spaceInfo={spaceInfo} themeInfo={themeInfo} calendarId={calendarId} />
    </MeetingInfoProvider>
  );
}