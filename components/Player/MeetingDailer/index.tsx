import React, { Dispatch, SetStateAction, useState } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import "./style.css";
import GoButton from "./GoButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { bookMeeting, Meeting } from "@/services/BookMeetingService";
import {
  getCurrentHour,
  addMinutesToCurrentTime,
  getCurrentTimePlus1,
} from "./DateUtils";
import { Message } from "../FindRoomModal";
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
  spaceId?: number;
  floorId?: number;
  buildingId?: number;
  orgId?: number;
  floorName?: string;
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
}: IMeetingDailer) => {
  const { minute, hour } = addMinutesToCurrentTime(15);
  const [progressMinute, setProgressMinute] = useState(0);
  const [progressHour, setProgressHour] = useState(hour);
  console.log("Hour", hour);

  const handleChange = (value) => {
    const progressMin = minute + value;
    setProgressMinute(value);
  };


  // Service to save instant meeting
  const bookInstantMeeting = async () => {
    
    let startTime = getCurrentTimePlus1();
    console.log("startTime", startTime);

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
    const participantsDummy: string[] = ["Alice", "Bob", "Charlie"];
       
    let meetingInfo = new Meeting(
      spaceId,
      buildingId,
      orgId,
      floorId,
      noofattendees,
      startTime,
      endTime,
      "Instant Meeting",
      participantsDummy,
      "Instant Meeting booked by System",
      'New',
       '',
    );
    let services = [];
    let parkings = [];
    console.log("meetingInfo", meetingInfo);
    let meetingResponse = await bookMeeting({
      meeting: meetingInfo,
      parkings: parkings,
      services: services,
    });
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
    console.log("bookInstantMeetingClose");
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <CircularSlider
          label="Meeting Time"
          min={0}
          renderLabelValue={<MeetingTime time={progressMinute} hour={0} />}
          knobPosition={"bottom"}
          max={60}
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
        <GoButton title={"GO"} onClick={bookInstantMeeting} />
      </div>
    </div>
  );
};

export default MeetingDailer;
