"use client";

import { useState } from "react";
import MeetingTimeline from "./TimelineComponent";

function index() {
  const [newEnd, setNewEnd] = useState("13:00");
  console.log({newEnd});
  return <MeetingTimeline
    startTime="11:00"
    endTime="13:00"
    onEndTimeChange={(newEndTime) => setNewEnd(newEndTime)}
  />;
};

export default index;
