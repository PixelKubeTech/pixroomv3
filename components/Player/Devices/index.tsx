import React, { useState, useEffect, useReducer } from "react";
import { getFacilitiesByOrgId } from "@/services/FacilitiesService";
import { DeviceMapping } from "./deviceMapping";
import { MeetingRoomInfoReducer } from "../MeetingRoomInfo";

function DeviceIcon({ size, deviceIcon }) {
  let icon = DeviceMapping.find((device) =>
    device.device.includes(deviceIcon)
  )?.icon;
  let deviceImage = `../pixroom/assets/images/${icon}.png`;
  return (
    <img
      src={deviceImage}
      className={`${
        size === "SMALL" ? "h-[16px]" : "h-[25px]"
      } px-2 cursor-pointer`}
    />
  );
}
function  Devices({ size, handleClick, orgId,handleDeviceChange }: any) {

  const [loading, setLoading] = useState(true);
  const [facilities, setFacilities] = useState<string[]>([]);
  console.log("orgId", orgId);
  useEffect(() => {
    let getFacilities = async () => {
      setLoading(true);
      let result = await getFacilitiesByOrgId({ orgId: orgId });
      console.log("result", result.facilities);
      if (result != undefined) {
        console.log(result.facilities);
        setFacilities(result.facilities);
        setLoading(false);
      } else {
        setFacilities(["chair", "wifi projector"]);
        setLoading(false);
      }
    };
    getFacilities();
  }, []);

  return (
    <div    className={`flex items-center`}>
      {loading ? (
        <div>Loading Facilities...</div>
      ) : !facilities ? (
        <div>No Facilities</div>
      ) : (
        facilities.map((device) => (
          <div
         
            onClick={(e) => {
              handleDeviceChange(device);
              handleClick();
            }}
          >
            <DeviceIcon
              size={size}
              deviceIcon={device}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Devices;
