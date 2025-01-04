"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import RandomDigits from "./RandomDigits";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "../store/appStore";
import { getDeviceInfo } from "@/services/DeviceService";

function Settings() {
  const {
    macaddress: storedMacAddress,
    spaceInfo,
    deviceInfo,
    getSpaceInfo,
    getDevInfo,
    loadFromLocalStorage,
    clearLocalStorage,
    activeMeeting,
    setMacAddress,
    fetchEvents,
  } = useAppStore();

  const searchParams = useSearchParams(); // Hook called unconditionally
  const router = useRouter(); // Hook called unconditionally
  const [loading, setLoading] = useState(true);

  // Query parameter for mac address
  const queryMacAddress = searchParams.get("macaddress") || storedMacAddress;

  useEffect(() => {
    loadFromLocalStorage(); // Load local storage on mount
  }, [loadFromLocalStorage,]);

  useEffect(() => {
    // Handle mac address logic
    if (queryMacAddress) {
      if (queryMacAddress !== storedMacAddress) {
        clearLocalStorage();
      }
    }
    setMacAddress(queryMacAddress || "");
    getDevInfo().then(() => {
      loadFromLocalStorage();
      console.log("deviceInfo", deviceInfo);
      if (!deviceInfo) {
        router.push(`/deviceeregistration?macaddress=${queryMacAddress}`);
        return;
      }
      if (deviceInfo) {
        getSpaceInfo().then
        fetchEvents().then(() => { });
      }
      if (deviceInfo && activeMeeting) {
        router.push("/meetingbooked");
      } else if (deviceInfo) {
        router.push("/meeting");
      }
    });



    setLoading(false); // Stop loading once logic is complete
  }, [queryMacAddress, storedMacAddress, deviceInfo, router]);

  let [result, setResult] = React.useState(null);
  const [errorInfo, setErrorInfo] = useState<{ code: string; message: string } | null>(null);
  if (!loading) {
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

  return null; // Render nothing while redirecting
}

function SettingsWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Settings />
    </Suspense>
  );
}

export default SettingsWrapper;
