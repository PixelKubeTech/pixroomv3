import Image from "next/image";
//import { Inter } from 'next/font/google'

import { SpaceService, EventService } from "@/services";
import MeetingContainer from "@/components/Player/MeetingContainer";
import { getCurrentDate } from "../utils/DateUtils";
import { ISpace } from "../interface";
import MeetingInfoContainer from "@/components/Player/MeetingInfoContainer";


//const inter = Inter({ subsets: ['latin'] })

export default async function Home(props) {
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
  let spaceInfo: ISpace.SpaceInfo = response.data;
  let meetingInfo = meetingResponse;
  return (
    <div
      className={`min-h-[700px] h-screen max-h-screen w-screen p-4 box-border bg-cover`}
      style={{ backgroundImage: `url(../assets/images/mainbg.png)` }}
    >
      <MeetingInfoContainer spaceInfo={spaceInfo} meetingInfo={meetingInfo}/>
    </div>
  );
}
