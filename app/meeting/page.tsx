import Image from "next/image";
//import { Inter } from 'next/font/google'
import MeetingRoomInfo from "../../components/Player/MeetingRoomInfo";
import MeetingCalenderContainer from "../../components/Player/MeetingCalenderContainer";
import LowerContainer from "../../components/Player/LowerContainer";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { SpaceService, EventService } from "@/services";
import MeetingContainer from "@/components/Player/MeetingContainer";
import { getCurrentDate,getStartEndOfMonth,addOneDay } from "../utils/DateUtils";
import { ISpace } from "../interface";
import { getThemesById } from "@/services/ThemeService";


//const inter = Inter({ subsets: ['latin'] })

export default async function Home(props) {
  let spaceIdparam = props.searchParams.spaceId ? props.searchParams.spaceId : "32"
  let calendarparam = props.searchParams.calendarId ? props.searchParams.calendarId : "0"
  let themeparam = props.searchParams.themeId ? props.searchParams.themeId : "1"
  console.log("calendarid", calendarparam);
  console.log("themeparam", themeparam);
  let currentDate = getCurrentDate()
  let response = await SpaceService.getSpaceInfo({
    spaceId:spaceIdparam,
  });
 
  if(calendarparam=='0' && response?.data?.mappedCalendarIds?.length>0){
    calendarparam = response.data.mappedCalendarIds[0];
  }
  const starttime = currentDate ? addOneDay(currentDate,true) : new Date();
  const enddate = currentDate ? addOneDay(currentDate) : new Date();

  let meetingResponse = await EventService.getEventInstances({
    calendarId: response.data?.mappedCalendarIds?response.data.mappedCalendarIds[0]:'1',
    startTime: starttime,
    endTime: enddate,
  });

  let themeResponse = props!=null && props.themeInfo!=null?props.themeInfo:await getThemesById({ Id: themeparam });
  let spaceInfo: ISpace.SpaceInfo = response.data;
  let meetingInfo = meetingResponse
  return (
    <div
      className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`}
      style={{ backgroundImage: `url(../../pixroom/assets/images/mainbg.png)` }}
    >
      <MeetingContainer currentDate={currentDate} spaceInfo={spaceInfo} meetingInfo={meetingInfo} themeInfo={themeResponse} calendarId={calendarparam} booked={false} info={false}/>
    </div>
  );
}
