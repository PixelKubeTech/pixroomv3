import React from "react";

function Devices({ size, handleClick }: any) {
  return (
    <div className={`flex items-center`} onClick={handleClick}>
      <img
        src={"../assets/images/Screen_Icon.png"}
        className={`${
          size === "SMALL" ? "h-[16px]" : "h-[25px]"
        } px-2 cursor-pointer`}
      />
      <img
        src={"../assets/images/Present_Icon.png"}
        className={`${
          size === "SMALL" ? "h-[16px]" : "h-[25px]"
        }  px-2 cursor-pointer`}
      />
      <img
        src={"../assets/images/Projector.png"}
        className={`${
          size === "SMALL" ? "h-[16px]" : "h-[25px]"
        } px-2 cursor-pointer`}
      />
      <img
        src={"../assets/images/Video_Conference_Icon.png"}
        className={`${
          size === "SMALL" ? "h-[16px]" : "h-[25px]"
        } px-2 cursor-pointer`}
      />
      <img
        src={"../assets/images/fax.png"}
        className={`${
          size === "SMALL" ? "h-[16px]" : "h-[25px]"
        } px-2 cursor-pointer `}
      />
      <img
        src={"../assets/images/Media_Player_Icon.png"}
        className={
          `${size === 'SMALL' ? 'h-[16px]' : 'h-[25px]'} px-2 cursor-pointer`
        }
      />
    </div>
  );
}

export default Devices;
