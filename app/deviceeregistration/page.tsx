"use client";

import React from "react";
import RandomDigits from "./RegistrationPage";

function MainPage() {
  let [result, setResult] = React.useState(null);
  let [errorInfo, seterrorInfo] = React.useState(null);


  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
    <RandomDigits result={result} errorInfo={errorInfo} />
    </div>
  )
}
export default MainPage;