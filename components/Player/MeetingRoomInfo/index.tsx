"use client";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";
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
  spaceInfo,
  themeInfo,
  meetingInfo,
  setMeetingDate,
}: any) {
  let themeDataResponse;
  let enableFaultReporting = true;
  if (themeInfo && themeInfo.themedata) {
    try {
      themeDataResponse = JSON.parse(themeInfo.themedata);
      enableFaultReporting = themeDataResponse.enableFaultReporting;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      themeDataResponse = null; // or handle the error as needed
    }
  } else {
    themeDataResponse = null; // or handle the absence of data as needed
  }
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

  const searchParams = useSearchParams();

  const spaceId = searchParams.get("spaceId");
  let calendarId =
    spaceInfo != null
      ? spaceInfo.mappedCalendarIds != null
        ? spaceInfo.mappedCalendarIds[0]
        : "5"
      : "6";

  console.log("SpaceInfo for RoomCapacity",spaceInfo);
  const queryParams12 = {
    spaceId: spaceId || "",
    calendarId: calendarId?.toString() || "",
    themeid: themeInfo?.id?.toString() || "",
  };
  const handleClick = () => {
    //console.log("searchParams", searchParams);
    const queryString = new URLSearchParams(queryParams12).toString();
    router.push(`/meetinginfo?${queryString}`);
    //router.push(`/meetinginfo?spaceId=${queryParams}`);
  };
  const handleDeviceClick = () => {
    if (!enableFaultReporting) return false;
    setShowModal(!showModal);
  };
  const closeClick = () => {
    router.back();
  };

  const [intervalsFromAPI, setIntervalsFromAPI] = useState<Interval[]>([]);

  React.useEffect(() => {
    const processBookingDetails = (bookingDetails: any[]): Interval[] => {
      return bookingDetails
        .map((bookingDetail: any) => {
          console.log("bookingDetails", bookingDetail)
          const startTime = bookingDetail.bookingDetails?.from.split(":");
          const endTime = bookingDetail.bookingDetails?.to.split(":");
  
          if (!startTime || !endTime) {
            console.warn("Invalid booking detail:", bookingDetail);
            return null;
          }

          const start = convertTimeToDegrees(bookingDetail.bookingDetails?.from);
          const end = convertTimeToDegrees(bookingDetail.bookingDetails?.to);
          console.log( "start end ", start, end)
          return {
            start: start,
            end: end,
          } as Interval;
        })
        .filter(Boolean) as Interval[]; // Explicitly cast to Interval[]
    };
  
    const fetchAndSetIntervals = async () => {
      if (!meetingInfo) {
        const meetingResponse = await EventService.getEventInstances({
          calendarId: calendarId,
        });
  
        setIntervalsFromAPI(processBookingDetails(meetingResponse?.bookingDetails || []));
      } else {
        setIntervalsFromAPI(processBookingDetails(meetingInfo));
      }
    };
  
    fetchAndSetIntervals();
  }, [meetingInfo]);

  const options = {
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };
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
        <Clock intervals={intervalsFromAPI} />
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
