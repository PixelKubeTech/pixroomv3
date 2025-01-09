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
import momenttz from 'moment-timezone';
import { useMeetingInfo } from "@/app/context/MeetingInfoDataContext";

import { addOneDay } from "@/app/utils/DateUtils";
import { useAppStore } from "@/app/store/appStore";
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
  const {startTime, endTime} = props;
  let { hhStart, mmStart, hhEnd, mmEnd } = getTimeSlots();
  const { register, handleSubmit, reset, setValue } = useForm<UseFormInputs>({
    defaultValues: {
      participants: "",
      hhStart: hhStart,
      mmStart: mmStart,
      hhEnd: hhEnd,
      mmEnd: mmEnd,
      meetingName: "",
    },
  });
  React.useEffect(() => {
    setValue("hhStart", startTime.split(":")[0]);
    setValue("mmStart", startTime.split(":")[1]);
    setValue("hhEnd", endTime.split(":")[0]);
    setValue("mmEnd", endTime.split(":")[1]);
  }, [startTime, endTime]);
  
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();

  const handleSuccess = (status) => {
    setSuccess(status);
  };

const {fetchMeetingInfo, meetingDate} = useMeetingInfo();
const {
  spaceInfo,
  deviceInfo,
} = useAppStore();

  const onSubmit = async (formData) => {
    if(spaceInfo!=null)
      {
        let { meetingName } =   formData;
        let currentDate= meetingDate.startDate? moment(meetingDate.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const dateObj = addOneDay(currentDate);
        let currentTime=dateObj.currentTime;
        let request= {"meeting":{"spaceId":spaceInfo.spaceId,
          "buildingId":spaceInfo.buildingId,
          "orgId":spaceInfo.orgId,
          "floorId":spaceInfo.floorId,
          //"calendarId": deviceInfo?.calendarId,
          "alldays":false,
          "reminder":0,
          "startDateTime": moment.utc(`${currentDate}T${startTime}`).toISOString(), // Force to UTC ISO format
          "endDateTime": moment.utc(`${currentDate}T${endTime}`).toISOString(),     // Force to UTC ISO format 
          "meetingName":meetingName,
          "action":"create",
          //"sourceEventId":props.eventBookingDetails.sourceEventId,
          "notes":"Booked By System",
          "timeZone": momenttz.tz.guess(),
        },
        "parkings":[],
        "services":[]};
         let meetingResponse = await bookMeeting(request);
         setTimeout(() => fetchMeetingInfo(), 4000);         
         console.log("Book Meeting Update Response", meetingResponse);
      }
  };
  return (
    <div className="basis-1/2 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <span>Start :</span>
          <div className="flex gap-4 items-center">
            <Input register={register("hhStart")} placeholder={"11"} />
            :
            <Input register={register("mmStart")} placeholder={"15"} />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <span>End:</span>
          <div className="flex gap-4 items-center">
            <Input register={register("hhEnd")} placeholder={"11"} />
            :
            <Input register={register("mmEnd")} placeholder={"45"} />
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
        <Alert
          variant="filled"
          sx={{ width: "100%" }}
        >
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

