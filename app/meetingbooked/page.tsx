import Image from 'next/image'
import MeetingRoomInfo from '../../components/Player/MeetingRoomInfo'
import MeetingCalenderContainer from '../../components/Player/MeetingCalenderContainer'
import LowerContainer from '../../components/Player/LowerContainer'
import { SpaceService, EventService } from "@/services";
import { ISpace } from "../interface";
import { addOneDay, getCurrentDate, getStartEndOfMonth } from "../utils/DateUtils";
import { getThemesById } from '@/services/ThemeService';
import MeetingContainer from '@/components/Player/MeetingContainer';
import { debug } from 'console';

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
  let themeResponse = props!=null && props.themeInfo!=null?props.themeInfo:await getThemesById({ Id:themeparam });
  return (
    <div className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`}>
      <img src={"/pixroom/assets/images/booked.jpg"} className='meeting-booked-background'/>
      <MeetingContainer currentDate={currentDate} spaceInfo={spaceInfo} meetingInfo={meetingInfo} themeInfo={themeResponse} calendarId= {calendarparam} booked={true} info={false}/>
    </div>
  );
}


