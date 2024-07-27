import Image from 'next/image'
//import { Inter } from 'next/font/google'
import MeetingRoomInfo from '../../components/Player/MeetingRoomInfo'
import MeetingCalenderContainer from '../../components/Player/MeetingCalenderContainer'
import LowerContainer from '../../components/Player/LowerContainer'
import { SpaceService, EventService } from "@/services";
import { ISpace } from "../interface";
import { addOneDay, getCurrentDate, getStartEndOfMonth } from "../utils/DateUtils";
import { getThemesById } from '@/services/ThemeService';
import MeetingContainer from '@/components/Player/MeetingContainer';
//const inter = Inter({ subsets: ['latin'] })

export default async function MeetingBooked(props) {
  let spaceIdparam = props.searchParams.spaceId ? props.searchParams.spaceId : "15"
  let calendarparam = props.searchParams.calendarId ? props.searchParams.calendarId : "3"
  let themeparam = props.searchParams.themeId ? props.searchParams.themeId : "1"
  let currentDate = getCurrentDate();
  let spaceresponse = await SpaceService.getSpaceInfo({
    spaceId:spaceIdparam,
  });
 
  if(calendarparam=='0' && spaceresponse?.data?.mappedCalendarIds?.length>0){
    calendarparam = spaceresponse.data.mappedCalendarIds[0];
  }
  const starttime = currentDate ? addOneDay(currentDate,true) : currentDate;
  const enddate = currentDate ? addOneDay(currentDate) : currentDate;

  let meetingInfo = await EventService.getEventInstances({
    calendarId: spaceresponse.data?.mappedCalendarIds?spaceresponse.data.mappedCalendarIds[0]:'1',
    startTime: starttime,
    endTime: enddate,
  });
  //let meetingInfo = meetingResponse
  let spaceInfo: ISpace.SpaceInfo = spaceresponse.data;
  let themeResponse = props!=null && props.themeInfo!=null?props.themeInfo:await getThemesById({ Id:themeparam });
  // return (
  //   <div className={`min-h-[700px] h-screen max-h-screen w-screen p-4 box-border bg-cover `} style={{ backgroundImage: `url(../pixroom/assets/images/booked.jpg)` }}>
  //     <div className={`w-full h-full`}>
  //       <div id='modal-root' className={`w-full h-full flex flex-col bg-white/25 rounded-[40px]`}>
  //         <MeetingRoomInfo info={false} size={'SMALL'} booked={true}  spaceInfo={spaceInfo} themeInfo={themeResponse}/>
  //         <LowerContainer booked={true} meetingInfo={meetingInfo} themeInfo={themeResponse} calendarId={calendarparam} />
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className={`h-screen max-h-screen w-screen p-4 box-border bg-cover overflow-y-hidden`} style={{ backgroundImage: `url(../pixroom/assets/images/booked.jpg)` }}>
      <MeetingContainer currentDate={currentDate} spaceInfo={spaceInfo} meetingInfo={meetingInfo} themeInfo={themeResponse} calendarId= {calendarparam} booked={true} info={false}/>
    </div>
  );
}


