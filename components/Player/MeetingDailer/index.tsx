import React, { useState, useRef, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import "./style.css";
import GoButton from "./GoButton";

import {
  bookMeeting,
  Meeting,
  Parking,
  Service,
} from "@/services/BookMeetingService";
import {
  getCurrentHour,
  getCurrentTime,
  addMinutesToCurrentTime,
  getCurrentTimePlusHours,
  getCurrentTimePlus1,
} from "./DateUtils";
import { getCurrentMinutesPlus30 } from "@/app/utils/DateUtils";
const MeetingTime = ({ hour, time }) => {
  const val = time < 10 ? `0${time}` : time;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-2xl">
      <div className="circle-container">
        <div className="circle">{`${hour}:${val}`}</div>
      </div>
    </div>
  );
};

const MeetingDailer = ({  onClose, setMessage, setSuccess }) => {
  const {minute} = addMinutesToCurrentTime(15)
  const [time, setTime] = useState(minute);
  const {hour} = getCurrentTimePlusHours(0)
  console.log("Hour",hour)

  const handleChange = (value) => {
    setTime(value);
    //onTimeSelect(value);
  };

  // Service to save instant meeting
  const bookInstantMeeting = async () => {
    let startTime = getCurrentTimePlus1();
    console.log('startTime',startTime)
    let currentHr = getCurrentHour();
    let endTime = `${currentHr}:${time}`;
    let meetingInfo = new Meeting(
      15,
      19,
      31,
      startTime,
      endTime,
      "Instant Meeting",
      "Default Participants",
      ""
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
          // initialValue={15}
          //dataIndex={20}
          renderLabelValue={<MeetingTime time={time} hour={hour} />}
          knobPosition={"bottom"}
          //arcLength={180}
          max={60}
          //   stepSize={10}
          //   verticalOffset={0.5}
          //data={["5","10","15","20"]}
          knobColor="#3182ce"
          progressColorFrom="#74eca4"
          progressColorTo="#3182ce"
          progressSize={20}
          trackColor="#f7fafc"
          trackSize={25}
          knobSize={35}
          dataIndex={time}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center mt-10">
          <div className="time-label">START TIME</div>
          <div className="mt-2 time-value">{getCurrentTimePlus1()}</div>
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
