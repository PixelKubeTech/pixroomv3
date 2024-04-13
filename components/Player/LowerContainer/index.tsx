"use client";
import React, { useState, useEffect, useContext } from "react";
import { Modal } from "../../../components/Player/Modals/FindRoom";
import Button from "../@common/Button";
import TimelineComponent from "../MeetingCalenderContainer/BottomComponent/TimelineComponent";
import QRContainer from "./QRContainer";
import { CalenderType, MeetingContext } from "@/app/context/MeetingContext";
import { getCurrentDate, reverseDate } from "@/app/utils/DateUtils";
import MeetingDailer from "../MeetingDailer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function getMeetingDataByDate(meetingData:Array<any>,date:any){
  let result =  meetingData.filter(item => item.date === date)
  return result;
}

interface Message {
  serverity: string;
  text?: string;
}

function LowerContainer({ booked, meetingInfo }: any) {
  const [showModal, setShowModal] = useState(false);
  const [meetingData,setEvent] = useState(meetingInfo);
  const currentDate = getCurrentDate()
  const [selectedMeetingInfo,setSelectMeetingInfo] = useState(getMeetingDataByDate(meetingData,reverseDate(currentDate)))
  const {meetingDate} = useContext(MeetingContext) || {}
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  useEffect(()=>{
    let meetingList = getMeetingDataByDate(meetingData,meetingDate)
    if(meetingList.length > 0){
      setSelectMeetingInfo(meetingList)
    }else{
      setSelectMeetingInfo([])
    }
  },[meetingDate])
  return (
    <div className="flex justify-between h-full">
      <QRContainer booked={booked}/>
      <div className="w-[30%] h-[100%] min-h-[100%] bg-black/5 rounded-br-[40px]">
        <div className="bg-white h-[80%] max-h-[80%] rounded-b-[40px] p-4 ">
          <p className="py-2 text-lg pb-4 px-4 bg-[#0072B8]/5 mb-2 rounded-lg">
            Today
          </p>
          <div className="h-[86%] overflow-hidden">
            {
              selectedMeetingInfo.length == 0 ? "No meeting scheduled..." :  <TimelineComponent meetingInfo={selectedMeetingInfo} />
            }
          
          </div>
        </div>
        <div className="flex items-center justify-center h-[20%] rounded-b-[40px]">
          <Button
            text={"Book This Room"}
            className={"px-10"}
            handleClick={() => setShowModal(true)}
          />
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"Book a Room"}
          >
            <MeetingDailer setSuccess={setSuccess} setMessage={setMessage}  onClose={() => setShowModal(false)}/>
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
    </div>
  );
}

export default LowerContainer;
