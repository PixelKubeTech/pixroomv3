"use client";

import React, { Suspense } from "react";
import RandomDigits from "./RegistrationPage";
import { CircularProgress } from "@mui/material";

function DeviceRegistrationMainPage() {
  let [result, setResult] = React.useState(null);
  let [errorInfo, seterrorInfo] = React.useState(null);


  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
    <RandomDigits result={result} errorInfo={errorInfo} />
    </div>
  )
}

function DeviceRegistrationPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DeviceRegistrationMainPage />
    </Suspense>
  );
}

export default DeviceRegistrationPageWrapper;