import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import "./style.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Button from "../@common/Button";
import GoButton from "./GoButton";
import { useRouter } from "next/router";
import { bookMeeting, Meeting } from "@/services/BookMeetingService";
import {
  getCurrentHour,
  addMinutesToCurrentTime,
  getCurrentTimePlus1,
} from "./DateUtils";
import { Message } from "../FindRoomModal";
import { debug } from "console";
import { space } from "postcss/lib/list";
import { useMeetingInfo } from "@/app/context/MeetingInfoDataContext";
import { useAppStore } from "@/app/store/appStore";

dayjs.extend(utc);
const MeetingTime = ({ hour, time }) => {
  const val = time < 10 ? `0${time}` : time === 60 ? "00" : time;
  const processedHour = time === 60 ? "01" : "00";
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-2xl">
      <div className="flex justify-center items-center h-[300px]">
        <div className="circle">{`${processedHour}:${val}`}</div>
      </div>
    </div>
  );
};

export interface IMeetingDailer {
  onClose: () => void;
  setMessage: Dispatch<SetStateAction<Message | undefined>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  spaceId?: any;
  floorId?: number;
  buildingId?: number;
  orgId?: number;
  floorName?: string;
  maxAvailableTime: number;
  handleClick: any;
}

const MeetingDailer = ({
  onClose,
  setMessage,
  setSuccess,
  spaceId,
  floorId,
  buildingId,
  orgId,
  floorName,
  maxAvailableTime,
  handleClick,
}: IMeetingDailer) => {
  const { minute, hour } = addMinutesToCurrentTime(5);
  const [progressMinute, setProgressMinute] = useState(0);
  const { increasePollRateForDuration } = useAppStore.getState();
  const [progressHour, setProgressHour] = useState(hour);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (value) => {
    let progressMin = minute;
    if(value)
     progressMin = minute + value;
    setProgressMinute(value);
  };
  const {fetchMeetingInfo} = useMeetingInfo();

  const bookInstantMeeting = async () => {
    //debugger;
    //setTimeout(() => setIsDisabled(false), 3000);
    let startTime = getCurrentTimePlus1();
    const [hours, minutes] = startTime.split(':').map(Number);
    // Create a new Date object with today's date and the parsed time
    const now = new Date();
    const endTimecal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    let noofattendees =2;

    // Add progressMinutes to the endTimecal
    endTimecal.setMinutes(endTimecal.getMinutes() + progressMinute);
    let currentHr = getCurrentHour();
    let endtimehour= String(endTimecal.getHours()).padStart(2, '0');
    let endtimeminutes= String(endTimecal.getMinutes()).padStart(2, '0');
    let endTime = `${endtimehour}:${endtimeminutes}`;
    const participantsDummy: string[] = [];
    const getCurrentTimeZone = ():string => {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };  
    let calendarid;
    let spaceidtemp;
    let orgidtemp;
    let buildingidtemp;
    let floorIdtemp;
    if (typeof spaceId === "object" && spaceId !== null) {
        // Handle the case where spaceId is an object
        calendarid = spaceId.mappedCalendarIds?.[0];
        spaceidtemp = spaceId.spaceId;
        orgidtemp=  spaceId.orgId;
        buildingidtemp = spaceId.buildingId;
        floorIdtemp = spaceId.floorId;
    } else if (typeof spaceId === "number") {
        // Handle the case where spaceId is an integer
        calendarid = null; // or handle this case as needed
        spaceidtemp=spaceId;
        orgidtemp=orgId;
        buildingidtemp=buildingId;
        floorIdtemp =floorId;
    } else {
        // Handle unexpected cases
        calendarid = null; // Fallback value
    }


    //let calendarid =spaceId?.mappedCalendarIds[0];
    //let spaceidtemp = spaceId? spaceId :spaceId.spaceId;
    setIsDisabled(true);

    let meetingInfo = new Meeting(
      spaceidtemp,
      buildingidtemp,
      orgidtemp,
      floorIdtemp,
      noofattendees,
      startTime,
      endTime,
      "Instant Meeting",
      participantsDummy,
      "Instant Meeting booked by System",
      'New',
       '',
       getCurrentTimeZone(),
       calendarid,
    );
    let services = [];
    let parkings = [];
    let meetingResponse = await bookMeeting({
      meeting: meetingInfo,
      parkings: parkings,
      services: services,
    });
    increasePollRateForDuration(60000, 3000)

    onClose();
    setSuccess(true);
    setMessage({
      serverity: meetingResponse.result.serverity,
      text: meetingResponse.result.message,
    });
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const bookInstantMeetingClose = () => {
    onClose();
  };
  
  return (
    <div>
      <div className="flex flex-col items-center">
        <CircularSlider
          label="Meeting Time"
          min={0}
          renderLabelValue={<MeetingTime time={progressMinute} hour={0} />}
          knobPosition={"bottom"}
          max={maxAvailableTime}
          knobColor="#3182ce"
          progressColorFrom="#74eca4"
          progressColorTo="#3182ce"
          progressSize={20}
          trackColor="#f7fafc"
          trackSize={25}
          knobSize={35}
          dataIndex={progressMinute}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center mt-10">
          <div className="text-[#9eb1b3] text-xl">START TIME</div>
          <div className="mt-2 text-[#9eb1b3] text-3xl">
            {getCurrentTimePlus1()}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <GoButton title={"back"} onClick={bookInstantMeetingClose} />
        <Button disbabled={isDisabled} className={!isDisabled ?
                    "" : "opacity-50 cursor-not-allowed"}text="Book Now" handleClick={bookInstantMeeting} />
        <Button text="Book Later" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default MeetingDailer;
