import MeetingTimeline from "@/app/timeline2/TimelineComponent";
import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import { Modal as TimelineModal } from "../../../../components/Player/Modals/TimeLine";
import React, { useState } from "react";
import MeetingCard from "@/components/common/meetingcard";
interface QRContainerProps {
  booked: Boolean;
  showFindRoom:Boolean;
  scrollSubject:Boolean;
  eventBookingDetails:any;
  spaceInfo:any;
}
const meetingDetails = {
  time: '10:00am - 11:00am',
  title: 'Testing the Marketing Meeting',
  bookedBy: 'Dinesh Kumar Indarmal',
  participants: 6,
};
function QRContainer(props: QRContainerProps) {
  let meetingStartTime=props!=null && props.eventBookingDetails!=null && props.eventBookingDetails.from!=null?props.eventBookingDetails.from:"11:00";
  let meetingExtendEndTime=props!=null && props.eventBookingDetails!=null && props.eventBookingDetails.to!=null?props.eventBookingDetails.to:"13:00";
  if(props.eventBookingDetails!=null)
  {
  	meetingDetails.title=props.eventBookingDetails.meetingName;
  	meetingDetails.time=props.eventBookingDetails.from+"-"+props.eventBookingDetails.to;
  	meetingDetails.bookedBy=props.eventBookingDetails.bookingPersonName;
  	meetingDetails.participants=props.eventBookingDetails.duration;
  }
  const [showModal, setShowModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [newEnd, setNewEnd] = useState("13:00");
  return (
    <div className="h-full flex flex-col w-[70%] p-6 mb-10 relative">

      <div className="flex justify-between items-center pl-[76px]">
        <img
              height={50}
              width={200}
              src={"../../../../pixroom/assets/images/Tesla.png"}
            />
            {props.showFindRoom?<div className={"self-end"}>
            <img
              className="cursor-pointer"
              height={54}
              width={54}
              src={"../../../../pixroom/assets/images/Search_BTN.png"}
              onClick={() => setShowModal(!showModal)}
            />
          </div>:null}
      </div>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={"Find a Room"}
      >
        <FindRoomTable />
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
            onMeetingClose={()=>setShowTimelineModal(false)}
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
        <span className="ml-2">This meeting is going to end in the next 30 minutes</span>
      </div>
    ) : null}
    </div>
  );
}

export default QRContainer;
