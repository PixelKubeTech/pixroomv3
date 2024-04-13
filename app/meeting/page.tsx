import Image from "next/image";
//import { Inter } from 'next/font/google'
import MeetingRoomInfo from "../../components/Player/MeetingRoomInfo";
import MeetingCalenderContainer from "../../components/Player/MeetingCalenderContainer";
import LowerContainer from "../../components/Player/LowerContainer";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { SpaceService, EventService } from "@/services";
import MeetingContainer from "@/components/Player/MeetingContainer";
import { getCurrentDate,getStartEndOfMonth } from "../utils/DateUtils";
import { ISpace } from "../interface";


//const inter = Inter({ subsets: ['latin'] })

export default async function Home(props) {
  let spaceId = props.searchParams.spaceId ? props.searchParams.spaceId : "15"
  let currentDate = getCurrentDate()
  let response = await SpaceService.getSpaceInfo({
    spaceId:spaceId,
  });
  let [start,end] = getStartEndOfMonth()
  let meetingResponse = await EventService.getEventInstances({
    calendarId: "111",
    startTime: start,
    endTime: end,
  });

  let spaceInfo: ISpace.SpaceInfo = response.data;
  let meetingInfo = meetingResponse
  return (
    <div
      className={`min-h-[700px] h-screen max-h-screen w-screen p-4 box-border bg-cover `}
      style={{ backgroundImage: `url(../../assets/images/mainbg.png)` }}
    >
      <MeetingContainer currentDate={currentDate} spaceInfo={spaceInfo} meetingInfo={meetingInfo}/>
    </div>
  );
}
