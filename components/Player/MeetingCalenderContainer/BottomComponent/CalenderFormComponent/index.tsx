import Button from "../../../@common/Button";
import Input from "../../../@common/Input";
import React from "react";

function CalenderFormComponent() {
  return (
    <div className="basis-1/2 p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <span>Start :</span>
          <div className="flex gap-4 items-center">
            <Input />
            :
            <Input />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <span>End :</span>
          <div className="flex gap-4 items-center">
            <Input />
            :
            <Input />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Meeting Title :</span>
        <div className="w-[70%]">
          <Input fillWidth={true} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Booked By       :</span>
        <div className="w-[70%]">
          <Input fillWidth={true} />
        </div>
      </div>
      <Button text={'Book This Slot'} className={'self-end'}/>
    </div>
  );
}

export default CalenderFormComponent;
