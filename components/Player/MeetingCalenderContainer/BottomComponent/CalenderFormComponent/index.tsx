import {
  bookMeeting,
  Meeting,
  Parking,
  Service,
} from "@/services/BookMeetingService";
import Button from "../../../@common/Button";
import Input from "../../../@common/Input";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getTimeSlots } from "./utils";
import moment from "moment";
import { addOneDay } from "@/app/utils/DateUtils";
interface Message {
  serverity?: string;
  text?: string;
}
interface UseFormInputs {
  hhStart: string;
  mmStart: string;
  hhEnd: string;
  mmEnd: string;
  meetingName: string;
  participants: string;
}
function CalenderFormComponent(props) {
  console.log("props",props);
  const [startTime,setStartTime]=React.useState<String>(props.startTime);
  const [endTime,setEndTime]=React.useState<String>(props.endTime);

  let { hhStart, mmStart, hhEnd, mmEnd } = getTimeSlots();
  const { register, handleSubmit, reset } = useForm<UseFormInputs>({
    defaultValues: {
      participants: "",
      hhStart: startTime,
      mmStart: startTime,
      hhEnd: endTime,
      mmEnd: endTime,
      meetingName: "",
    },
  });
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  
  const handleSuccess = (status) => {
    setSuccess(status);
  };

  const onSubmit = async (formData) => {
    if(props.meetingInfo!=null && props.eventBookingDetails!=null && props.meetingInfo.spaceInfo!=null)
      {
        let { meetingName } =   formData;
        let currentDate=moment().format("YYYY-MM-DD");
        const dateObj = addOneDay(currentDate);
        let currentTime=dateObj.currentTime;
        let request= {"meeting":{"spaceId":props.meetingInfo.spaceInfo.spaceId,
          //"noOfAttendees":props.eventBookingDetails.noOfAttendees,
          "buildingId":props.meetingInfo.spaceInfo.buildingId,
          "orgId":props.meetingInfo.spaceInfo.orgId,
          "floorId":props.meetingInfo.spaceInfo.floorId,
          "alldays":false,
          "reminder":0,
          "startDateTime":currentDate+"T"+props.startTime+":00Z",
          "endDateTime":currentDate+"T"+props.endTime+":00Z",
          "meetingName":meetingName,
          //"participants":props.eventBookingDetails.noOfAttendees,
          "action":"create",
          //"sourceEventId":props.eventBookingDetails.sourceEventId,
          //"notes":props.eventBookingDetails.summary,
          //"timeZone": getCurrentTimeZone()
        },
        "parkings":[],
        "services":[]};

        console.log("Mari Req",request);
         let meetingResponse = await bookMeeting(request);
         console.log("Book Meeting Update Response", meetingResponse);
      }
  };
  return (
    <div className="basis-1/2 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <span>Start :</span>
          <div className="flex gap-4 items-center">
            <Input register={startTime?startTime.split(":")[0]:"17"} placeholder={"11"} />
            :
            <Input register={startTime?startTime.split(":")[1]:"30"} placeholder={"15"} />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <span>End:</span>
          <div className="flex gap-4 items-center">
            <Input register={endTime?endTime.split(":")[0]:"18"} placeholder={"11"} />
            :
            <Input register={endTime?endTime.split(":")[1]:"30"} placeholder={"45"} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 meeting-information">
        <div className="flex items-center justify-between gap-4">
          <span>Meeting Title:</span>
          <div className="w-[70%]">
            <Input
              fillWidth={true}
              register={register("meetingName")}
              placeholder={"Enter meeting title"}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>Booked By:</span>
          <div className="w-[70%]">
            <Input
              fillWidth={true}
              register={register("participants")}
              placeholder={"Enter meeting organizer name"}
            />
          </div>
        </div>
      </div>
      <Button
        handleClick={handleSubmit(onSubmit)}
        text={"Book This Slot"}
        className={"self-end"}
      />
      <Snackbar open={success} autoHideDuration={5000}>
        <Alert variant="filled" sx={{ width: "100%" }}>
          <AlertTitle>{message?.serverity}</AlertTitle>
          {message?.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CalenderFormComponent;
function getCurrentTimeZone() {
  throw new Error("Function not implemented.");
}

