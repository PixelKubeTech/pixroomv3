"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function Settings() {
  const searchParams = useSearchParams();
  const macAddress = searchParams.get("macaddress");
  const generateRandomSixDigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      <div className="text-5xl font-bold flex items-center color-[#58968b]">
        Mac Address : {macAddress}
      </div>
      <div className="text-5xl font-bold flex items-center">
        Code :{" "}
        {generateRandomSixDigitCode()
          .toString()
          .split("")
          .map((data, idx) => (
            <span
              key={`${idx} ${data}`}
              className="text-5xl bold border-2 m-2 p-2 rounded-lg"
            >
              {data}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Settings;
