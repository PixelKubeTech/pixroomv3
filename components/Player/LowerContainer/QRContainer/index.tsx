import MeetingTimeline from "@/app/timeline2/TimelineComponent";
import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import { Modal as TimelineModal } from "../../../../components/Player/Modals/TimeLine";
import React, { useEffect, useState } from "react";
import MeetingCard from "@/components/common/meetingcard";
import { useRouter,usePathname,useSearchParams} from "next/navigation";
import { useAppStore } from "@/app/store/appStore";
import moment from "moment";
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
    const {
      spaceInfo,
      themeInfo,
      deviceInfo,
      intervalsForAnalogClock,
      activeMeeting,
      nextMeeting,
      loadFromLocalStorage
    } = useAppStore();
    useEffect(() => {
      loadFromLocalStorage();
    }, []);
    const [endsIn, setEndsIn] = useState({minutes:0, seconds:0});

  const handleClick = () => {
    router.push(`/meetinginfo`);
  };
  const router = useRouter();
  const pathName = usePathname();
  let meetingStartTime =
    props != null &&
    props.eventBookingDetails != null &&
    props.eventBookingDetails.from != null
      ? props.eventBookingDetails.from
      : "11:00";
  let meetingExtendEndTime =
    props != null &&
    props.eventBookingDetails != null &&
    props.eventBookingDetails.to != null
      ? props.eventBookingDetails.to
      : "00:00";
    
  if (activeMeeting?.bookingDetails != null) {
    meetingDetails.title = activeMeeting.bookingDetails.meetingName;
    meetingDetails.time = activeMeeting.bookingDetails.from + "-" + activeMeeting.bookingDetails.to;
    meetingDetails.bookedBy = activeMeeting.bookingDetails.bookingPersonName;
    meetingDetails.participants = activeMeeting.bookingDetails.noOfAttendees;
  }
  if(nextMeeting){
    meetingDetails.nextMeetingStartAt= nextMeeting?.bookingDetails.from!=""?nextMeeting.bookingDetails.from:"tomorrow";
  }
  else{
    meetingDetails.nextMeetingStartAt= "tomorrow";
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
      console.log('This runs every second');
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
        <FindRoomTable  spaceInfo={props.spaceInfo} handleClick={handleClick}/>
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
          eventBookingDetails={props.eventBookingDetails}
          onMeetingClose={() => setShowTimelineModal(false)}
          nextMeetingStartAt={props.nextMeetingStartAt}
        />
      </TimelineModal>

      <MeetingCard {...meetingDetails} />

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
