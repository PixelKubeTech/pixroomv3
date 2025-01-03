import MeetingTimeline from "@/app/timeline2/TimelineComponent";
import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import { Modal as TimelineModal } from "../../../../components/Player/Modals/TimeLine";
import React, { useEffect, useState } from "react";
import MeetingCard from "@/components/common/meetingcard";
import { useRouter,usePathname,useSearchParams} from "next/navigation";
import { useAppStore } from "@/app/store/appStore";
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

function floorToTwoDecimalPlaces(number) {
  return Math.floor(number * 100) / 100;
}

const getTimeDifferenceInMinutes = (date1, date2) => {
  const diffInMs = date2 - date1; // difference in milliseconds
  return floorToTwoDecimalPlaces(Math.abs(Math.abs(diffInMs) / (1000 * 60))); // convert milliseconds to minutes
};

const meetingDetails: IMeetingDetails = {} as IMeetingDetails;
function QRContainer(props: QRContainerProps) {
    const {
      spaceInfo,
      themeInfo,
      deviceInfo,
      intervalsForAnalogClock,
      loadFromLocalStorage
    } = useAppStore();
    useEffect(() => {
      loadFromLocalStorage();
    }, [loadFromLocalStorage]);

  const handleClick = () => {
    
    //const queryString = new URLSearchParams(queryParams12).toString();
    router.push(`/meetinginfo`);
  };
  const router = useRouter();
  const pathName = usePathname();
  const [endsIn,setEndsIn] = useState(0);
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
  let currentTime=new Date();
  
  const today = new Date();
  const [hours, minutes] = meetingExtendEndTime.split(':').map(Number);
  const timeDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  
  if (props.eventBookingDetails != null) {
    meetingDetails.title =props.eventBookingDetails.meetingName;
    meetingDetails.time =
      props.eventBookingDetails.from + "-" + props.eventBookingDetails.to;
    meetingDetails.bookedBy = props.eventBookingDetails.bookingPersonName;
    meetingDetails.participants = props.eventBookingDetails.duration;
  }
  meetingDetails.nextMeetingStartAt=props.nextMeetingStartAt!=""?props.nextMeetingStartAt:"tomorrow";
  const [showModal, setShowModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [newEnd, setNewEnd] = useState("00:00");

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  const getMeetingEndsInTime=()=>{
    let now=new Date();
    let currentTime=formatTime(now);
    const [hours, minutes] = meetingExtendEndTime.split(':').map(Number);
    const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    setEndsIn(getTimeDifferenceInMinutes(now,timeDate));
    if (pathName=="/meetingbooked" && meetingExtendEndTime!="00:00" && currentTime >= meetingExtendEndTime) {
      router.back();
    }
    else if (pathName=="/meeting" && currentTime >= meetingDetails.nextMeetingStartAt) {
      router.back();
    }
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('This runs every 5 seconds');
      getMeetingEndsInTime();
    }, 1000); // 1000 milliseconds = 1 seconds

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [endsIn]); // Empty dependency array means this effect runs once on mount

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
            This meeting is going to end in the next {endsIn} minutes
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default QRContainer;
