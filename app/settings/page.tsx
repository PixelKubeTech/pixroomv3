"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import RandomDigits from "./RandomDigits";
import { DeviceService, EventService } from "../../services";
import { useSearchParams } from "next/navigation";
import { IErrorInfo, IResponse } from "./SettingsInterface";
import { getCurrentDate,addOneDay } from "../utils/DateUtils";
import moment from "moment";


interface DeviceInfoResponseSuccess {
  success: true;
  result: {
    spaceId: string;
    calendarId: string;
    theme: string;
  };
}

interface DeviceInfoResponseFailure {
  success: false;
  errors: {
    code: string;
    message: string;
  }[];
  result: null;
}

type DeviceInfoResponse = DeviceInfoResponseSuccess | DeviceInfoResponseFailure;

interface SpaceDetailsResponse {
  // Define the structure based on API response
  [key: string]: any;
}

interface EventInstance {
  date: string;
  bookingDetails: {
    from: string;
    to: string;
  } | null;
}

interface MeetingResponse extends Array<EventInstance> {}

// Props for the component
interface MyComponentProps {
  macAddress?: string;
  currentDate: string;
}

function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const macAddress = searchParams.get("macaddress");
  const currentDate= getCurrentDate();
  let [result, setResult] = React.useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const meetingQueryparam = searchParams.get("meeting");
  const [errorInfo, setErrorInfo] = useState<{ code: string; message: string } | null>(null);
  
   // Helper function to fetch device info
  const fetchDeviceInfo = async (macAddress?: string): Promise<DeviceInfoResponse> => {
        const defaultMacAddress = "10001";
      
        const response = await DeviceService.getDeviceInfo({
          serialNumber: macAddress || defaultMacAddress,
        });
      
        // Type assertion to ensure `response` matches `DeviceInfoResponse`
        if (response.success === true && response.result) {
          return {
            success: true,
            result: {
              spaceId: response.result.spaceId,
              calendarId: response.result.calendarId,
              theme: response.result.theme,
            },
          };
        } else {
          return {
            success: false,
            errors: response.errors || [],
            result: null,
          };
        }
      };
  
    // Helper function to fetch space details
    const fetchSpaceDetails = async (spaceId: string): Promise<SpaceDetailsResponse> => {
      return await DeviceService.getSpaceDetails({ spaceid: spaceId });
    };
  
    // Helper function to fetch meeting instances
    const fetchMeetingInstances = async (calendarId: string): Promise<MeetingResponse> => {
      return await EventService.getEventInstances({ calendarId });
    };
  
    // Determine the meeting page based on time and bookings
    const determinePageName = (
      meetingResponse: MeetingResponse,
      currentDate: string,
      currentTime: string
    ): string => {
      if (meetingResponse) {
        for (const meeting of meetingResponse) {
          if (
            meeting.date === currentDate &&
            meeting.bookingDetails &&
            currentTime >= meeting.bookingDetails.from &&
            currentTime < meeting.bookingDetails.to
          ) {
            return "meetingbooked";
          }
        }
      }
      return "meeting";
    };
  
    // Main function to handle data fetching and redirection
    const handleDataFetching = async (macAddress) => {
        try {
          const serialResponse = await fetchDeviceInfo(macAddress);
      
          if (!serialResponse.success) {
            setLoading(false);
            setErrorInfo({
              code: "Space Id not assigned",
              message: serialResponse.errors[0]?.message || "Unknown error",
            });
            return;
          }
      
          const { spaceId, calendarId, theme } = serialResponse.result;
      
          const spaceDetails = await fetchSpaceDetails(spaceId);
          console.log("Space Details:", spaceDetails);
      
          const queryParams = { spaceId, calendarId, themeId: theme };
      
          const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const meetingResponse = await fetchMeetingInstances(calendarId);
      
          const pageName = determinePageName(meetingResponse, currentDate, currentTime);
          const queryString = new URLSearchParams(queryParams).toString();
      
          router.push(`/${pageName}?${queryString}`);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
          setErrorInfo({
            code: "Error",
            message: "An unexpected error occurred while fetching data",
          });
        }
      };
  
    // Fetch data when the component mounts
    useEffect(() => {
      handleDataFetching(macAddress);
    }, []);
  
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
