"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import Devices from "../Devices";
import ReportFaultModal from "../ReportFaultModal";
import { Modal } from "../Modals/FindRoom";
import Calender from "../MeetingCalenderContainer/Calender";
import Clock from "@/components/common/Clock2";
import { useSearchParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import { EventService } from "@/services";
import { useAppStore } from "@/app/store/appStore";
export function MeetingRoomInfoReducer(state, action) {
  console.log("state", state);
  if (action.type === "selected_device") {
    return {
      ...state,
      selectedDevice: action.payload,
    };
  }
  throw Error("Unknown action.");
}
interface Message {
  serverity?: string;
  text?: string;
}
interface Interval {
  start: number;
  end: number;
}

const convertTimeToDegrees = (timestamp) => {
  const [hours, minutes] = timestamp.split(":");
  const adjustedHours = hours % 12; // Convert to 12-hour format
  const hourDegrees = adjustedHours * 30; // Each hour is 30 degrees
  const minuteDegrees = minutes * 0.5;   // Each minute is 0.5 degrees
  const totalDegrees = (hourDegrees + minuteDegrees + 270) % 360;

  return totalDegrees;
};

function MeetingRoomInfo({
  info,
  size = "LARGE",
  booked,
  meetingInfo,
  setMeetingDate,
}: any) {
  const {
    spaceInfo,
    themeInfo,
    deviceInfo,
    intervalsForAnalogClock,
    loadFromLocalStorage
  } = useAppStore();
  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  const [busyIntervals, setBusyIntervals] = useState<Interval[]>([]);;

  useEffect(() => {
    setBusyIntervals(intervalsForAnalogClock);
  }, [intervalsForAnalogClock]);
  const themeDataResponse = themeInfo?.themedatajson;
  const enableFaultReporting = themeDataResponse?.enableFaultReporting;

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  const [meetingInfoState, dispatch] = useReducer(MeetingRoomInfoReducer, {
    selectedDevice: "",
  });
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  let handleDeviceChange = (device) => {
    dispatch({
      type: "selected_device",
      payload: device,
    });
  };

  const handleClick = () => {
    router.push(`/meetinginfo`);
  };
  const handleDeviceClick = () => {
    if (!enableFaultReporting) return false;
    setShowModal(!showModal);
  };
  const closeClick = () => {
    router.back();
  };

  const freeColor = themeDataResponse?themeDataResponse.availableStatusColor : "green";
  const busyColor = themeDataResponse?themeDataResponse.occupiedStatusColor : "red"; 

  return (
    <div
      className={
        "w-full h-[20vh] min-h-[150px] flex justify-between box-border  rounded-[40px] bg-white/25"
      }
    >
      <div
        className={
          "flex justify-between flex-1 pt-6 pb-5 pl-10 pr-6 items-center"
        }
      >
        <div className="flex ">
          <div className={"flex flex-col justify-between items-center mr-4"}>
            <img
              src={"../pixroom/assets/images/meeting_logo.png"}
              className={"h-[40px]"}
            />
            {!info && (
              <div
                className={`h-[25px] w-[25px] ${
                  booked ? "bg-[#ff544f]" : "bg-[#58968b]"
                } rounded-full`}
              ></div>
            )}
          </div>
          <div className={"flex flex-col justify-between"}>
            <div className="flex flex-col justify-between">
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold flex items-center">
                {spaceInfo?.spaceAliasName ? spaceInfo?.spaceAliasName : ""}{" "}
                {!info && (
                  <span
                    onClick={handleClick}
                    className={`text-[#58968b] pl-2 cursor-pointer mt-2`}
                  >
                    <img
                      className={`text-[#58968b] h-[30px] w-[30px]`}
                      src="../pixroom/assets/images/info_icon.svg"
                    />
                  </span>
                )}
              </h1>
              <p className={"opacity-70"}>Room Capacity: {spaceInfo?.resource_count} People</p>
            </div>
            {info ? (
              <p className={"text-[#626574] text-xl"}>
                Meeting Room Information
              </p>
            ) : !booked ? (
              <p className={"text-[#626574] text-xl"}>
                Meeting Room <span className={"text-[#58968b]"}>Available</span>
              </p>
            ) : (
              <p className={"text-[#626574] text-xl"}>Meeting in progress</p>
            )}
          </div>
        </div>
        <Clock intervals={busyIntervals} free={freeColor} busy={busyColor} />
      </div>

      {info ? (
        <div
          className={
            "flex flex-col items-end justify-between pt-6 pb-5 pl-10 pr-6 mt-[-10px]"
          }
        >
          <img
            src={"../pixroom/assets/images/X_BTN.png"}
            className={"cursor-pointer"}
            height={40}
            width={40}
            onClick={() => closeClick()}
          />
          <div>A problem with a facility? Touch to report.</div>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={`Report a fault with the meeting ${meetingInfoState.selectedDevice}`}
          >
            <ReportFaultModal setMessage={setMessage} setSuccess={setSuccess} />
          </Modal>
          <Devices
            orgId={spaceInfo?.orgId}
            handleClick={handleDeviceClick}
            handleDeviceChange={handleDeviceChange}
          />
          <Snackbar open={success} autoHideDuration={5000}>
            <Alert variant="filled" sx={{ width: "100%" }}>
              {message?.text}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <div className="flex flex-col bg-[#dee4f0] h-full rounded-[40px] w-[30%] p-2">
          <div className="mx-4 mt-2">Upcoming Meetings</div>
          <Calender margin={2} size={size} setMeetingDate={setMeetingDate}/>
        </div>
      )}
    </div>
  );
}

export default MeetingRoomInfo;
