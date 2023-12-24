'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Devices from "../Devices";
import ReportFaultModal from "../ReportFaultModal";
import { Modal } from "../Modals/FindRoom";
import Calender from "../MeetingCalenderContainer/Calender";
import AnalogClock from 'analog-clock-react';

function MeetingRoomInfo({ info, size = "LARGE", booked }: any) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    router.push("/PlayerPage/meetinginfo");
  };
  const handleDeviceClick = () => {
      setShowModal(!showModal)
  }
  const options = {
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    }
};
  return (
    <div
      className={
        "w-full h-[20vh] min-h-[150px] flex justify-between box-border  rounded-[40px] bg-white/25"
      }
    >
      <div className={"flex justify-between flex-1 pt-6 pb-5 pl-10 pr-6"}>
        <div className="flex ">
        <div className={"flex flex-col justify-between items-center mr-4"}>
          <img src={"../assets/images/meeting_logo.png"} className={"h-[40px]"} />
          {!info && (
            <div
              className={`h-[25px] w-[25px] ${booked ? 'bg-[#ff544f]' :'bg-[#58968b]'} rounded-full`}
            ></div>
          )}
        </div>
        <div className={"flex flex-col justify-between"}>
          <div className="flex flex-col justify-between">
            <h1 className="text-5xl font-bold flex items-center">
              EINSTEIN{" "}
              {!info && (
                <span
                  onClick={handleClick}
                  className={`text-[#58968b] pl-2 cursor-pointer`}
                >
                  <img
                    className={`text-[#58968b] h-[35px] w-[35px]`}
                    src="../assets/images/info_icon.svg"
                  />
                </span>
              )}
            </h1>
            <p className={"opacity-70"}>Room Capacity: 16 People</p>
          </div>
          {info ? (
            <p className={"text-[#626574] text-xl"}>Meeting Room Information</p>
          ) : (
            !booked ? <p className={"text-[#626574] text-xl"}>
              Meeting Room <span className={"text-[#58968b]"}>Available</span>
            </p> :  <p className={"text-[#626574] text-xl"}>
              Meeting in progress
            </p>

          )}
        </div>
        </div>
        <div className="self-end relative z-0">
        <AnalogClock width={"110px"} {...options}/>
        </div>
      </div>
      {info ? (
        <div
          className={
            "flex flex-col items-end justify-between pt-6 pb-5 pl-10 pr-6 mt-[-10px]"
          }
        >
          <img
            src={"../assets/images/X_BTN.png"}
            className={"cursor-pointer"}
            height={40}
            width={40}
          />
          <div>A problem with a facility? Touch to report.</div>
          <Modal onClose={() => setShowModal(false)} show={showModal} title = {"Report a fault with the meeting room phone"}>
          <ReportFaultModal />
          </Modal>
          <Devices handleClick={handleDeviceClick}/>
        </div>
      ) : (
        <div className="flex flex-col bg-[#dee4f0] h-full rounded-[40px] w-[30%] p-2">
          <div className="mx-4 mt-2">Upcoming Meetings</div>
          <Calender margin={2} size={size} />
        </div>
      )}
    </div>
  );
}

export default MeetingRoomInfo;
