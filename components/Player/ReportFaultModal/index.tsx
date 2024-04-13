import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { saveReportFault } from "@/services/ReportFaultService";
function Button({ text, className, handleClick, inputRef }: any) {
  return (
    <button
      ref={inputRef}
      className={`bg-[#58968b] rounded-md 
    w-fit h-[40px] p-1 px-2 text-white ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function ReasonBtn({ text, setReason }) {
  let [selected, setSelected] = useState(true);
  let inputRef = useRef<any>(null);
  let notSelectedClass =
    "text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]";
  let selectedClass =
    "bg-[#626574]/10 text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]";

  let handleClick = () => {
    setSelected(!selected);
    if (selected) {
      setReason((reason) => [
        ...reason,
        inputRef.current.innerText.toLowerCase(),
      ]);
    }
  };
  return (
    <Button
      inputRef={inputRef}
      handleClick={handleClick}
      text={text}
      className={selected ? selectedClass : notSelectedClass}
    />
  );
}

function ReportFaultModal({ setSuccess, setMessage }) {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [reason, setReason] = useState([]);
  const keyboard = useRef<any>();

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard?.current?.setInput(input);
  };

  const reportFault = async () => {
    try {
      let faultObject = {
        faultId: 1,
        faultType: reason.join(","),
        remarks: input,
        faultLookupId: 1,
        faultLookupValue: reason,
        floorId: 1,
      };
      let result = await saveReportFault(faultObject);
      if (result.success) {
        setSuccess(true);
        setMessage({
          text: result.result.message,
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setSuccess(true);
      setMessage({
        text: "Failed to report fault! Please retry",
      });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-[#95a1b8]">
        Touch one of the following issues:
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <ReasonBtn setReason={setReason} text={"Keeps cutting out"} />
        <ReasonBtn setReason={setReason} text={"Can't hear caller"} />
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <ReasonBtn setReason={setReason} text={"No Dial Tone"} />
        <ReasonBtn setReason={setReason} text={"Doesn't respond"} />
      </div>
      <div className="flex m-6">
        <textarea
          value={input}
          onChange={onChangeInput}
          className="border h-[150px] w-full rounded-lg p-1"
          placeholder="Alternative you can start typing"
        />
      </div>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="flex justify-center">
        <Button handleClick={reportFault} text="Send Report" className="px-4" />
      </div>
    </div>
  );
}

export default ReportFaultModal;
