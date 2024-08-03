"use client";
import React, { useState, useEffect, useContext } from "react";
import { Modal } from "../../../components/Player/Modals/FindRoom";
import Button from "../@common/Button";
import TimelineComponent from "../MeetingCalenderContainer/BottomComponent/TimelineComponent";
import QRContainer from "./QRContainer";
import { CalenderType, MeetingContext } from "@/app/context/MeetingContext";
import { getCurrentDate, reverseDate,addOneDay } from "@/app/utils/DateUtils";
import MeetingDailer from "../MeetingDailer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { EventService } from "@/services";

function getMeetingDataByDate(meetingData:Array<any>,date:any){
  if((meetingData as any)?.success==false){ return []}
  let result =  meetingData.filter(item => item.date === date)
  return result;
}

interface Message {
  serverity: string;
  text?: string;
}

function LowerContainer({ booked, meetingInfo , themeInfo, calendarId}: any) {
  const [showModal, setShowModal] = useState(false);
  const [meetingData,setEvent] = useState(meetingInfo);
  const[calendarIdparam,setCalendarId] = useState(calendarId);
  const currentDate = getCurrentDate()
  const [selectedMeetingInfo,setSelectMeetingInfo] = useState(getMeetingDataByDate(meetingData,reverseDate(currentDate)))
  const {meetingDate} = useContext(MeetingContext) || {}
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  const [eventBookingDetails, setEventBookingDetails] = React.useState(null);
  let themeDataResponse;
  if (themeInfo && themeInfo.themedata) {
    try {
      themeDataResponse = JSON.parse(themeInfo.themedata);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      themeDataResponse = null; // or handle the error as needed
    }
  } else {
    themeDataResponse = null; // or handle the absence of data as needed
  }
  let showFindRoom=themeDataResponse!=null ? themeDataResponse.findRoom:true;
  let scrollSubject=themeDataResponse!=null  ? themeDataResponse.scrollSubject:true;

  const eventClick = (data) => {
   setEventBookingDetails(data.bookingDetails);
   };

   let [progress, setProgress] = React.useState(0);

  

  useEffect(() => {
    // Fetch meeting response
    const fetchMeetingResponse = async () => {
      try {
        console.log('calendarIdparam', calendarIdparam);
        const meetingList = await EventService.getEventInstances({
          calendarId: calendarIdparam ? calendarIdparam : '4'
        });
        setEvent(meetingList);
        if (meetingList.length > 0) {
          setSelectMeetingInfo(meetingList);
        } else {
          setSelectMeetingInfo([]);
        }
      } catch (error) {
        console.error('Error fetching event instances', error);
      }
    };

    fetchMeetingResponse();
  }, [meetingDate]);
  useEffect(() => {
    if(progress < 97) {
      setTimeout(() => setProgress(newVal1=>newVal1+1), 200)
    }
  });
 return (
    <div className="flex justify-between relative" style={{height: 'calc(100% - 150px)'}}>
      <QRContainer booked={booked} showFindRoom={showFindRoom} scrollSubject={scrollSubject} eventBookingDetails={eventBookingDetails} />
      <div className="w-[30%] h-[100%] bg-black/5 rounded-br-[40px] pb-3">
        <div className="bg-green rounded-b-[40px] py-4 pl-4" style={{height: 'calc(100% - 52px)'}}>
          <p className="py-2 text-lg pb-4 px-4 bg-[#0072B8]/5 mb-2 rounded-lg">
            Today
          </p>
          <div className="h-[86%] overflow-hidden">
            {
              selectedMeetingInfo.length == 0 ? "No meeting scheduled..." :  <TimelineComponent  eventClick={eventClick} meetingInfo={selectedMeetingInfo} themeInfo={themeDataResponse} />
            }
          </div>
        </div>
        {themeDataResponse?.allowBooking?
        <div className="flex items-center justify-center rounded-b-[40px] py-2">
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
        </div>:null}
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
        <div className="progress-bar h-[8px] w-[30%]" style={{width: `${progress}%`}}></div>
      </div>  
    </div>
  );
}

export default LowerContainer;
