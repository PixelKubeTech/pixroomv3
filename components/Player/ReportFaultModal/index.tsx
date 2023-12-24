import React, { useRef, useState } from "react";
import Button from "../@common/Button";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function ReportFaultModal() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
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

  return (
    <div className="p-4">
      <div className="flex justify-center text-[#95a1b8]">
        Touch one of the following issues:
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <Button
          text="Keeps cutting out"
          className="bg-[#626574]/10 text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]"
        />
        <Button
          text="Can't hear caller"
          className="bg-[#626574]/10 text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]"
        />
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <Button
          text="No Dial Tone"
          className="bg-[#626574]/10 text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]"
        />
        <Button
          text="Doesn't respond"
          className="bg-[#626574]/10 text-[#95a1b8] rounded-[24px] px-8 py-2 h-[50px] w-[200px]"
        />
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
        <Button text="Send Report" className="px-4" />
      </div>
    </div>
  );
}

export default ReportFaultModal;
