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

export default function MeetingBooked(props) {
  const {
    spaceInfo,
    deviceInfo,
    themeInfo,
    events,
    loadFromLocalStorage
  } = useAppStore();


  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage, spaceInfo]);
  let spaceIdparam = spaceInfo?.spaceId;
  let calendarparam = deviceInfo?.calendarId ;
  let themeparam = props.searchParams.themeId ? props.searchParams.themeId : "1";
  let currentDate = getCurrentDate();
  const result = addOneDay(currentDate);

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