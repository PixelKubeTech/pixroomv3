import React from "react";
import Devices from "../Devices";
const dummyArr = Array.from(Array(20).keys());
function FindRoomTable() {
  return (
    <div className="p-4">
      <p className="flex ">
        <span className="ml-12 font-bold">Meeting Room</span>
        <span className="ml-12 font-bold">{`Available for (time)`}</span>
        <span className="ml-4 font-bold">Facilities</span>
      </p>
      <div className="max-h-[380px] overflow-auto mt-6">
        {dummyArr.map((ele, idx) => {
          return (
            <div className={`flex justify-between p-4 ${
                idx % 2 === 0 ? "bg-slate-300" : "bg-white"
              }`}
              key={idx}
              >
              <span className="flex">
                {" "}
                <div
                  className={`h-[25px] w-[25px] ${
                    idx % 2 === 0 ? "bg-[#ff544f]" : "bg-[#58968b]"
                  } rounded-full mr-2`}
                ></div>
                Room Name Here
              </span>
              <span>1hr30mins</span>
              <Devices size="SMALL" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FindRoomTable;
