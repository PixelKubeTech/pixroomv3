import Image from 'next/image'
import MeetingRoomInfo from '../../components/Player/MeetingRoomInfo'
import MeetingCalenderContainer from '../../components/Player/MeetingCalenderContainer'
import LowerContainer from '../../components/Player/LowerContainer'
import { SpaceService, EventService } from "@/services";
import { ISpace } from "../interface";
import { addOneDay, getCurrentDate, getStartEndOfMonth } from "../utils/DateUtils";
import { MeetingInfoProvider } from '../context/MeetingInfoDataContext';
import { getThemesById } from '@/services/ThemeService';
import MeetingContainer from '@/components/Player/MeetingContainer';
import { debug } from 'console';
import MeetingBookedClient from './MeetingBookedClient';

export default async function MeetingBooked(props) {
  let spaceIdparam = props.searchParams.spaceId ? props.searchParams.spaceId : "15"
  let calendarparam = props.searchParams.calendarId ? props.searchParams.calendarId : "3"
  let themeparam = props.searchParams.themeId ? props.searchParams.themeId : "1"
  let currentDate = getCurrentDate();
  const result = addOneDay(currentDate);

  
  let spaceresponse = await SpaceService.getSpaceInfo({
    spaceId:spaceIdparam,
  });
 
  if(calendarparam=='0' && spaceresponse?.data?.mappedCalendarIds?.length>0){
    calendarparam = spaceresponse.data.mappedCalendarIds[0];
  }
  let meetingInfo = await EventService.getEventInstances({
    calendarId: spaceresponse.data?.mappedCalendarIds?spaceresponse.data.mappedCalendarIds[0]:'1'
  });
  let spaceInfo: ISpace.SpaceInfo = spaceresponse.data;
  let themeResponse = props != null && props.themeInfo != null ? props.themeInfo : await getThemesById({ Id: themeparam });

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