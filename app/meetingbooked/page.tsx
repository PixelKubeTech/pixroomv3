import Image from 'next/image'
//import { Inter } from 'next/font/google'
import MeetingRoomInfo from '../../components/Player/MeetingRoomInfo'
import MeetingCalenderContainer from '../../components/Player/MeetingCalenderContainer'
import LowerContainer from '../../components/Player/LowerContainer'
import { SpaceService, EventService } from "@/services";
import { ISpace } from "../interface";
import { getCurrentDate } from "../utils/DateUtils";
//const inter = Inter({ subsets: ['latin'] })

export default async function MeetingBooked(props) {
  let spaceId = props.searchParams.spaceId ? props.searchParams.spaceId : "15"
  let currentDate = getCurrentDate();
  let response = await SpaceService.getSpaceInfo({
    spaceId: spaceId,
  });
  let meetingResponse = await EventService.getEventInstances({
    calendarId: "111",
    startTime: "03/01/2024",
    endTime: "03/31/2024",
  });
  let meetingInfo = meetingResponse
  let spaceInfo: ISpace.SpaceInfo = response.data;
  return (
    <div className={`min-h-[700px] h-screen max-h-screen w-screen p-4 box-border bg-cover `} style={{ backgroundImage: `url(../pixroom/assets/images/booked.jpg)` }}>
      <div className={`w-full h-full`}>
        <div id='modal-root' className={`w-full h-full flex flex-col bg-white/25 rounded-[40px]`}>
          <MeetingRoomInfo info={false} size={'SMALL'} booked={true}  spaceInfo={spaceInfo}/>
          <LowerContainer booked={true} meetingInfo={meetingInfo}/>
        </div>
      </div>
    </div>
  )
}
