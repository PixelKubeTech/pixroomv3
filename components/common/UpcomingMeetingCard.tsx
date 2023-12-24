import { Card } from "@mui/material";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import React from "react";
import Avatar from "./Avatar";
import { AcUnit, Tv } from "@mui/icons-material";

function UpcomingMeetingCard() {
  return (
    <Card className="min-h-[195px] border shadow w-full flex justify-center flex-col p-4 gap-2">
      <div className="min-h-[35px]">
        <h4>Annual Audit Meeting</h4>
        <p></p>
      </div>
      <div className="mb-2" style={{ fontSize: "0.8rem" }}>
        <div>
          <CalendarIcon
            style={{ fontSize: "1rem", color: "#a5a0a0" }}
            className="mr-2"
          />
          <span>Aug 10, 2022</span>
        </div>
        <div>
          <ClockIcon
            style={{ fontSize: "1rem", color: "#a5a0a0" }}
            className="mr-2"
          />
          <span>10:00 AM - 11:00 AM</span>
        </div>
      </div>
      <div>
        <Avatar />
      </div>
      <span className="flex gap-2 mt-2">
        <AcUnit style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
        <Tv style={{ fontSize: "1rem", color: "#a5a0a0" }} />
      </span>
    </Card>
  );
}

export default UpcomingMeetingCard;
