"use client";

import React, {useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "../@common/Button";
import MeetingDailer from "../MeetingDailer";
import { Modal } from "../../../components/Player/Modals/FindRoom";
import QRContainer from "./QRContainer";
import Snackbar from "@mui/material/Snackbar";
import TimelineComponent from "../MeetingCalenderContainer/BottomComponent/TimelineComponent";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/store/appStore";
import moment from "moment";

interface Message {
  serverity: string;
  text?: string;
}

function formatDate(date: Date): string {
  if (moment(date).isSame(new Date(), "day")) {
    return "Today";
  } else if (moment(date).isSame(moment().add(1, "day"), "day")) {
    return "Tomorrow";
  } else {
    return moment(date).format("YYYY-MM-DD");
  }
}

function LowerContainer({ booked, meetingInfo, calendarId }: any) {
  const {
    spaceInfo,
    themeInfo,
    selectedDate,
  } = useAppStore();


  useEffect(() => {
  }, [selectedDate]);


  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  const [eventBookingDetails, setEventBookingDetails] = React.useState(null);
  let themeDataResponse;
  const [nextMeetingStartAt, setNextMeetingStartAt] = React.useState("");
  themeDataResponse = themeInfo?.themedatajson;

  let showFindRoom = themeDataResponse != null ? themeDataResponse.findRoom : true;
  let scrollSubject = themeDataResponse != null ? themeDataResponse.scrollSubject : true;

  const router = useRouter();


  const handleClick = () => {
    router.push(`/meetinginfo`);
  };
  const eventClick = (data) => {
    setEventBookingDetails(data.bookingDetails);
  };

  let [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (progress < 97) {
      setTimeout(() => setProgress(newVal1 => newVal1 + 1), 200)
    }
  });
  const timelineHeader = formatDate(selectedDate);
  return (
    <div className="flex justify-between relative" style={{ height: 'calc(100% - 150px)' }}>
      <QRContainer nextMeetingStartAt={nextMeetingStartAt} booked={booked} showFindRoom={showFindRoom} scrollSubject={scrollSubject} eventBookingDetails={eventBookingDetails} spaceInfo={spaceInfo} themeInfo={themeInfo} />
      <div className="w-[30%] h-[100%] bg-black/5 rounded-br-[40px] pb-3">
        <div className="bg-green rounded-b-[40px] py-4 pl-4" style={{ height: 'calc(100% - 52px)' }}>
          <p className="py-2 text-lg pb-4 px-4 bg-[#0072B8]/5 mb-2 rounded-lg">
            {timelineHeader}
          </p>
          <div className="h-[86%] overflow-hidden">
            <TimelineComponent eventClick={eventClick} />
          </div>
        </div>
        <div className="flex items-center justify-center rounded-b-[40px] py-2">
          <div>
            {!booked && (
              <Button
                text={"Book This Room"}
                className={"px-10"}
                handleClick={() => setShowModal(true)}
              />
            )}
          </div>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"Book a Room"}
          >
            <MeetingDailer
              spaceId={spaceInfo}
              setSuccess={setSuccess}
              setMessage={setMessage}
              maxAvailableTime={60}
              handleClick={handleClick}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </div>
      <Snackbar open={success} autoHideDuration={5000}>
        <Alert
          variant="filled"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Success</AlertTitle>
          {message?.text}
        </Alert>
      </Snackbar>
      <div className="left-[22px] right-[22px] absolute bottom-0">
        <div className="progress-bar h-[8px] w-[30%]" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default LowerContainer;
