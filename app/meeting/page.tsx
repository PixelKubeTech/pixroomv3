import { addOneDay, getCurrentDate } from "../utils/DateUtils";

import { ISpace } from "../interface";
import MeetingBookedClient from './MeetingClient';
import MeetingClient from "./MeetingClient";
import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import { SpaceService } from "@/services";
import { getThemesById } from '@/services/ThemeService';

export default async function MeetingBooked(props) {
  let spaceIdparam = props.searchParams.spaceId ? props.searchParams.spaceId : "15";
  let calendarparam = props.searchParams.calendarId ? props.searchParams.calendarId : "3";
  let themeparam = props.searchParams.themeId ? props.searchParams.themeId : "1";
  let currentDate = getCurrentDate();
  const result = addOneDay(currentDate);

  let spaceresponse = await SpaceService.getSpaceInfo({
    spaceId: spaceIdparam,
  });

  if (calendarparam == '0' && spaceresponse?.data?.mappedCalendarIds?.length > 0) {
    calendarparam = spaceresponse.data.mappedCalendarIds[0];
  }

  let spaceInfo: ISpace.SpaceInfo = spaceresponse.data;
  let themeResponse = props != null && props.themeInfo != null ? props.themeInfo : await getThemesById({ Id: themeparam });

  return (
    <MeetingInfoProvider calendarId={calendarparam}>
      <MeetingClient spaceInfo={spaceInfo} themeInfo={themeResponse} calendarId={calendarparam} />
    </MeetingInfoProvider>
  );
}