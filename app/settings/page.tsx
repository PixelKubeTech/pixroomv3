"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import RandomDigits from "./RandomDigits";
import { DeviceService, EventService } from "../../services";
import { useSearchParams } from "next/navigation";
import { IErrorInfo, IResponse } from "./SettingsInterface";
import { getCurrentDate,addOneDay } from "../utils/DateUtils";
import moment from "moment";

function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const macAddress = searchParams.get("macaddress");
  const currentDate= getCurrentDate();
  let [result, setResult] = React.useState(null);
  let [loading, setLoading] = React.useState(true);
  let [errorInfo, setErrorInfo] = React.useState<IErrorInfo>({
    code: "",
    message: "",
  });
  const meetingQueryparam = searchParams.get("meeting");
  
  React.useEffect(() => {
    // Function to fetch data and handle redirection

    const fetchData = async () => {
      try {
        // Fetch data from the provided route
        const serialResponse = await DeviceService.getDeviceInfo({
          serialNumber: macAddress ? macAddress : "10001",
        });
        console.log("serialResponse", serialResponse);
        if (serialResponse.success) {
          console.log("spaceId", serialResponse?.result.spaceId);
          const queryParams = {
            spaceId: serialResponse.result.spaceId,
            calendarId: serialResponse.result.calendarId,
            themeId:serialResponse.result.theme
          };

          const starttime = moment().utc().format('YYYY-MM-DD hh:mm:ss');
          const enddate = moment().utc().format('YYYY-MM-DD 23:59:59');
          let currentTime=moment().utc().format('hh:mm');
         
          let meetingResponse = await EventService.getEventInstances({
            calendarId: serialResponse.result.calendarId,
            startTime: starttime,
            endTime: enddate,
          });

          let pageName="meeting";
          //let currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          if(meetingResponse!=null)
          {
            meetingResponse.map(x=>{
              if(x.date==currentDate && x.bookingDetails!=null &&  currentTime >= x.bookingDetails.from && currentTime < x.bookingDetails.to)
                  pageName="meetingbooked";
            })
          }
          const queryString = new URLSearchParams(queryParams).toString();
          router.push(`/${pageName}?${queryString}`);
          //router.push(`/meeting?spaceId=${serialResponse.result.spaceId}`);
          setLoading(false);
        } else if (!serialResponse.success) {
          setLoading(false);
          setErrorInfo((error) => ({
            ...error,
            code: "Space Id not assigned",
            message: "No device assigned to serial number",
          }));
        } else {
          console.log("serialResponse", serialResponse);
          setLoading(false);
          setErrorInfo((error) => ({
            ...error,
            code: "Error",
            message: "No device found",
          }));
        }
      } catch (error) {
        setLoading(false);
        setResult(null);
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <RandomDigits result={result} errorInfo={errorInfo} />
      )}
    </div>
  );
}

export default Settings;
