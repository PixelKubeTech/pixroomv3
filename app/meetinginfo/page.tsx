
import Image from "next/image";
//import { Inter } from 'next/font/google'

import { SpaceService, EventService } from "@/services";
import MeetingContainer from "@/components/Player/MeetingContainer";
import { ISpace } from "../interface";
import MeetingInfoContainer from "@/components/Player/MeetingInfoContainer";
import { getThemesById } from "@/services/ThemeService";
import client from "../urql.client";
import { addOneDay, getCurrentDate, getStartEndOfMonth } from "../utils/DateUtils";


//const inter = Inter({ subsets: ['latin'] })

export default async function Home(props) {
  let spaceId = props.searchParams.spaceId ? props.searchParams.spaceId : "15"
  let calendarId = props.searchParams.calendarId ? props.searchParams.calendarId : "2"
  let themeid= props.searchParams.themeId ? props.searchParams.themeId : "1"
  let currentDate = getCurrentDate();
  const starttime = currentDate ? addOneDay(currentDate,true) : currentDate;
  const enddate = currentDate ? addOneDay(currentDate) : currentDate;
  let response = await SpaceService.getSpaceInfo({
    spaceId: spaceId,
  });
  let meetingResponse = await EventService.getEventInstances({
    calendarId: calendarId,
    startTime: starttime,
    endTime: enddate,
  });
  let spaceInfo: ISpace.SpaceInfo = response.data;
  let meetingInfo = meetingResponse;
  let themeInfo = props!=null && props.themeInfo!=null?props.themeInfo:await getThemesById({ Id: themeid});
  return (
    <div
      className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`}
      style={{ backgroundImage: `url(../pixroom/assets/images/mainbg.png)` }}
    >
      <MeetingInfoContainer spaceInfo={spaceInfo} meetingInfo={meetingInfo} themeInfo={themeInfo}/>
    </div>
  );
}
