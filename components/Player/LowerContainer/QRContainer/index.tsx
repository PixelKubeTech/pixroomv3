import MeetingTimeline from "@/app/timeline2/TimelineComponent";
import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import { Modal as TimelineModal } from "../../../../components/Player/Modals/TimeLine";
import React, { useState } from "react";
interface QRContainerProps {
  booked: Boolean;
  showFindRoom:Boolean;
  scrollSubject:Boolean;
}
function QRContainer(props: QRContainerProps) {
  const [showModal, setShowModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [newEnd, setNewEnd] = useState("13:00");
  return (
    <div className="h-full flex flex-col w-[70%] p-6 justify-between mb-10">
      {props.showFindRoom?<div className={"self-end"}>
        <img
          className="cursor-pointer"
          height={54}
          width={54}
          src={"../../../../pixroom/assets/images/Search_BTN.png"}
          onClick={() => setShowModal(!showModal)}
        />
      </div>:null}
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={"Find a Room"}
      >
      {/* <MeetingTimeline
          startTime="11:00"
          endTime="13:00"
          onEndTimeChange={(newEndTime) => setNewEnd(newEndTime)}
        />; */}
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

      {!props.booked ? (
        <div className="ml-20">
          <h1
            className="text-7xl font-bold
            "
          >
            Room available
          </h1>
          <p className="text-7xl font-light">until 12:00am</p>
        </div>
      ) : (
        <div className="ml-20">
          <h1
            className="text-7xl font-bold
          "
          >
            Room not available
          </h1>
        </div>
      )}

      <div className="self-end mb-10 mr-20">
        <img
          height={150}
          width={150}
          src={"../../../../pixroom/assets/images/qr.png"}
        />
      </div>
      {props.booked ? (
      <div className="flex items-start justify-start ml-20 mb-10 mr-20">
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
