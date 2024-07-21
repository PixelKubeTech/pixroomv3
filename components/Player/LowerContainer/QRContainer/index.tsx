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
}
const meetingDetails = {
  time: '10:00am - 11:00am',
  title: 'Testing the Marketing Meeting',
  bookedBy: 'Dinesh Kumar Indarmal',
  participants: 6,
};
function QRContainer(props: QRContainerProps) {
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

      <div className="flex justify-between items-center">
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
            startTime="11:00"
            endTime="13:00"
            onEndTimeChange={(newEndTime) => setNewEnd(newEndTime)}
          />
      </TimelineModal>

      <MeetingCard {...meetingDetails} />

      <img
        className="absolute bottom-8 right-2"
          height={150}
          width={150}
          src={"../../../../pixroom/assets/images/qr.png"}
        />
      {props.booked ? (
      <div className="absolute bottom-0 flex gap-1 pb-3 pl-4">
        <img
          className="cursor-pointer"
          height={24}
          width={24}
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
