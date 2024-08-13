"use client";

import { useState } from "react";
import MeetingTimeline from "./TimelineComponent";

function index() {
  const [newEnd, setNewEnd] = useState("13:00");
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const spaceInfo = null;
  const eventBookingDetails=null;
  console.log({newEnd});
  return <MeetingTimeline
    startTime="11:00"
    endTime="13:00"
    onEndTimeChange={(newEndTime) => setNewEnd(newEndTime)}
    spaceInfo={spaceInfo}
    onMeetingClose={()=>setShowTimelineModal(false)}
    eventBookingDetails={eventBookingDetails}
  />;
};

export default index;
