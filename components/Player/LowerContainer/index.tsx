"use client";

import { CalenderType, MeetingContext } from "@/app/context/MeetingContext";
import React, { useContext, useEffect, useState } from "react";
import { addOneDay, getCurrentDate, reverseDate } from "@/app/utils/DateUtils";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "../@common/Button";
import { EventService } from "@/services";
import MeetingDailer from "../MeetingDailer";
import { Modal } from "../../../components/Player/Modals/FindRoom";
import QRContainer from "./QRContainer";
import Snackbar from "@mui/material/Snackbar";
import TimelineComponent from "../MeetingCalenderContainer/BottomComponent/TimelineComponent";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/app/store/appStore";
function getMeetingDataByDate(meetingData:Array<any>,date:any){
  if((meetingData as any)?.success==false){ return []}
  let result =  meetingData.filter(item => item.date === date)
  return result;
}

interface Message {
  serverity: string;
  text?: string;
}

function LowerContainer({ booked, meetingInfo, calendarId}: any) {
    const {
      spaceInfo,
      themeInfo,
      loadFromLocalStorage
    } = useAppStore();


    useEffect(() => {
      loadFromLocalStorage();
    }, [loadFromLocalStorage]);


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
  const [nextMeetingStartAt,setNextMeetingStartAt]=React.useState("");
  themeDataResponse = themeInfo?.themedatajson;

  let showFindRoom=themeDataResponse!=null ? themeDataResponse.findRoom:true;
  let scrollSubject=themeDataResponse!=null  ? themeDataResponse.scrollSubject:true;

  const router = useRouter();


  const handleClick = () => {
    //console.log("searchParams", searchParams);
    //const queryString = new URLSearchParams(queryParams12).toString();
    router.push(`/meetinginfo`);
    //router.push(`/meetinginfo?spaceId=${queryParams}`);
  };
  const eventClick = (data) => {
   setEventBookingDetails(data.bookingDetails);
   };

   let [progress, setProgress] = React.useState(0);

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  useEffect(() => {
    // Fetch meeting response
    const fetchMeetingResponse = async () => {
      try {
        let currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        
        console.log('calendarIdparam', calendarIdparam);
        const meetingList = await EventService.getEventInstances({
          calendarId: calendarIdparam ? calendarIdparam : '4'
        });
        setEvent(meetingList);
        const currentDate= getCurrentDate();
        if (meetingList.length > 0) {
          setSelectMeetingInfo(meetingList);
          meetingList.map((x,i)=>{
            if(x.date==currentDate && x.bookingDetails!=null &&  currentTime >= x.bookingDetails.from && currentTime < x.bookingDetails.to)
            {
              setEventBookingDetails(x.bookingDetails);
              if(meetingList[i + 1]!=null && meetingList[i + 1].bookingDetails!=null)
                setNextMeetingStartAt(meetingList[i+1].bookingDetails.from);
            }
          })
         if(nextMeetingStartAt=="")
 
          {
            const nextMeeting = meetingList.filter(x => x.date==currentDate && x.bookingDetails!=null &&  timeToMinutes(currentTime) <= timeToMinutes(x.bookingDetails.from));
            if(nextMeeting!=null && nextMeeting.length>0)
              setNextMeetingStartAt(nextMeeting[0].bookingDetails.from);
          }
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
      <QRContainer nextMeetingStartAt={nextMeetingStartAt} booked={booked} showFindRoom={showFindRoom} scrollSubject={scrollSubject} eventBookingDetails={eventBookingDetails} spaceInfo={spaceInfo} themeInfo={themeInfo}/>
      <div className="w-[30%] h-[100%] bg-black/5 rounded-br-[40px] pb-3">
        <div className="bg-green rounded-b-[40px] py-4 pl-4" style={{height: 'calc(100% - 52px)'}}>
          <p className="py-2 text-lg pb-4 px-4 bg-[#0072B8]/5 mb-2 rounded-lg">
            Today
          </p>
          <div className="h-[86%] overflow-hidden">
            {
              meetingInfo?.length == 0 ? "No meeting scheduled..." :  <TimelineComponent  eventClick={eventClick} meetingInfo={meetingInfo || []} themeInfo={themeDataResponse} />
            }
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
        <div className="progress-bar h-[8px] w-[30%]" style={{width: `${progress}%`}}></div>
      </div>  
    </div>
  );
}

export default LowerContainer;
