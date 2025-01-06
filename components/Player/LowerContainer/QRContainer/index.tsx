import MeetingTimeline from "@/app/timeline2/TimelineComponent";
import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import { Modal as TimelineModal } from "../../../../components/Player/Modals/TimeLine";
import React, { useEffect, useState } from "react";
import RoomBusyCard from "@/components/common/roombusycard";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/store/appStore";
import moment from "moment";
import RoomFreeCard from "@/components/common/roomfreecard";

interface QRContainerProps {
  booked: Boolean;
  showFindRoom: Boolean;
  scrollSubject: Boolean;
  eventBookingDetails: any;
  spaceInfo: any;
  nextMeetingStartAt: String;
  themeInfo: any;
}

interface IMeetingDetails {
  time: string;
  title: string;
  bookedBy: string;
  participants: number;
  nextMeetingStartAt:String;
}


const meetingDetails: IMeetingDetails = {} as IMeetingDetails;
function QRContainer(props: QRContainerProps) {
  let meetingStartTime;
  let meetingExtendEndTime;
  let nextMeetingStartAt = "tomorrow";

    const {
      activeMeeting,
      nextMeeting,
      spaceInfo,
      loadFromLocalStorage
    } = useAppStore();
    useEffect(() => {
      loadFromLocalStorage();
    }, []);
    const [endsIn, setEndsIn] = useState({minutes:0, seconds:0});

    useEffect(() => {
      console.log("activeMeeting", activeMeeting);
      console.log("nextMeeting", nextMeeting);

      if (activeMeeting?.bookingDetails != null) {
        meetingDetails.title = activeMeeting.bookingDetails.meetingName;
        meetingDetails.time = activeMeeting.bookingDetails.from + "-" + activeMeeting.bookingDetails.to;
        meetingDetails.bookedBy = activeMeeting.bookingDetails.bookingPersonName;
        meetingDetails.participants = activeMeeting.bookingDetails.noOfAttendees;
      }

      if(nextMeeting){
        nextMeetingStartAt= nextMeeting.bookingDetails.from;
      }
    }, [activeMeeting, nextMeeting]);

  const handleClick = () => {
    router.push(`/meetinginfo`);
  };
  const router = useRouter();
  const d = new Date()
  meetingStartTime = `${d.getHours()}:${d.getMinutes()}`;
  meetingExtendEndTime = `${d.getHours()}:${d.getMinutes()}`;
  nextMeetingStartAt = `${d.getHours()}:${d.getMinutes()}`;
  if(activeMeeting){
    const startDate = new Date(activeMeeting.bookingDetails.from1);
    let endDate = new Date(activeMeeting.bookingDetails.to2);
     meetingStartTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
     meetingExtendEndTime = `${endDate.getHours()}:${endDate.getMinutes()}`;
  }
  if(nextMeeting){
    const nextDate = new Date(nextMeeting.bookingDetails.from1);
    nextMeetingStartAt = `${nextDate.getHours()}:${nextDate.getMinutes().toString().padStart(2, '0')}`;

  }
  const [showModal, setShowModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [newEnd, setNewEnd] = useState("00:00");

  const getTimeDiffinMinutesAndSeconds = (date1, date2) => {
    const totalDiffInSeconds = moment(date2).diff(moment(date1), "seconds");
    const minutes = Math.floor( totalDiffInSeconds / 60);
    const seconds = Math.floor( totalDiffInSeconds % 60);
    return {minutes, seconds}
  };

  const getMeetingEndsInTime = () => {
      const now = new Date();
      setEndsIn(getTimeDiffinMinutesAndSeconds(now, new Date(activeMeeting?.bookingDetails.endTime)));
    };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      getMeetingEndsInTime();
    }, 1000); 

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [endsIn]); 

  return (
    <div className="h-full flex flex-col w-[70%] p-6 mb-10 relative">
      <div className="flex justify-between items-center pl-[76px]">
        <img
          style={{ maxHeight: "50px", maxWidth: "200px", objectFit: "contain" }}
          src={props.themeInfo?.logo}
          alt="Logo"
        />
        {props.showFindRoom ? (
          <div className={"self-end"}>
            <img
              className="cursor-pointer"
              height={54}
              width={54}
              src={"../../../../pixroom/assets/images/Search_BTN.png"}
              onClick={() => setShowModal(!showModal)}
            />
          </div>
        ) : null}
      </div>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={"Find a Room"}
      >
        <FindRoomTable  spaceInfo={spaceInfo} handleClick={handleClick}/>
      </Modal>

      <TimelineModal
        onClose={() => setShowTimelineModal(false)}
        show={showTimelineModal}
      >
        <MeetingTimeline
          startTime={meetingStartTime}
          endTime={meetingExtendEndTime}
          onEndTimeChange={(newEndTime) => setNewEnd(newEndTime)}
          spaceInfo={props.spaceInfo}
          eventBookingDetails={meetingDetails}
          onMeetingClose={() => setShowTimelineModal(false)}
          nextMeetingStartAt={nextMeetingStartAt}
        />
      </TimelineModal>
      {activeMeeting? <RoomBusyCard {...meetingDetails} /> : <RoomFreeCard  nextMeetingStartAt={nextMeetingStartAt}/>}
      
      <img
        className="absolute bottom-[10%] right-[10%]"
        height={75}
        width={75}
        src={"../../../../pixroom/assets/images/qr.png"}
      />
      {props.booked ? (
        <div className="absolute flex items-center bottom-4 flex gap-1 pb-3 pl-6">
          <img
            className="cursor-pointer"
            height={36}
            width={36}
            src={"../../../../pixroom/assets/images/Search_BTN.png"}
            onClick={() => setShowTimelineModal(!showTimelineModal)}
          />
          <span className="ml-2">
          This meeting is going to end in the next {endsIn.minutes}:{endsIn.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default QRContainer;
