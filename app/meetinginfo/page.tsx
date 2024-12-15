import HomeClient from "./HomeClient";
import { ISpace } from "../interface";
import { MeetingInfoProvider } from "../context/MeetingInfoDataContext";
import { SpaceService } from "@/services";
import { getCurrentDate } from "../utils/DateUtils";
import { getThemesById } from "@/services/ThemeService";

export default async function Home(props) {
  let spaceId = props.searchParams.spaceId ? props.searchParams.spaceId : "15";
  let calendarId = props.searchParams.calendarId ? props.searchParams.calendarId : "2";
  let themeid = props.searchParams.themeId ? props.searchParams.themeId : "1";

  let response = await SpaceService.getSpaceInfo({
    spaceId: spaceId,
  });

  let themeInfo = props != null && props.themeInfo != null ? props.themeInfo : await getThemesById({ Id: themeid });

  let spaceInfo: ISpace.SpaceInfo = response.data;

  return (
    <MeetingInfoProvider calendarId={calendarId}>
      <HomeClient spaceInfo={spaceInfo} themeInfo={themeInfo} calendarId={calendarId} />
    </MeetingInfoProvider>
  );
}