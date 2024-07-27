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
  console.log(props);
  let { hhStart, mmStart, hhEnd, mmEnd } = getTimeSlots();
  const { register, handleSubmit, reset } = useForm<UseFormInputs>({
    defaultValues: {
      participants: "",
      hhStart: hhStart,
      mmStart: mmStart,
      hhEnd: hhEnd,
      mmEnd: mmEnd,
      meetingName: "",
    },
  });
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  const handleSuccess = (status) => {
    setSuccess(status);
  };

  const onSubmit = async (formData) => {
   
    let { hhStart, mmStart, hhEnd, mmEnd, meetingName, participants } =
      formData;
    let hhStartTime = `${hhStart}:${mmStart}`;
    let endTime = `${hhEnd}:${mmEnd}`;

    let meetingInfo = new Meeting(
      15,
      19,
      31,
      hhStartTime,
      endTime,
      meetingName,
      participants,
      ""
    );
    let services = [];
    let parkings = [];
    console.log("meetingInfo", meetingInfo);
    let meetingResponse = await bookMeeting({
      meeting: meetingInfo,
      parkings: parkings,
      services: services,
    });

    handleSuccess(true);
    setMessage({
      serverity: meetingResponse.result.serverity,
      text: meetingResponse.result.message,
    });
    reset();
    setTimeout(()=>{
      setSuccess(false)
    },3000)
   //
    console.log("meetingResponse", meetingResponse);
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
