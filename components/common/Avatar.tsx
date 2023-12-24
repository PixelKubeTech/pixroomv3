import React from "react";

function Avatar() {
  return (
    <div className="flex gap-[-5px]">
      <img
        src="https://i.pravatar.cc/300"
        alt="avatar"
        className="rounded-full relative z-1"
        height={25}
        width={25}
      />

      <img
        src="https://i.pravatar.cc/300"
        alt="avatar"
        className="rounded-full relative -left-[-5px] ml-[-15px] z-1"
        height={25}
        width={25}
      />

      <img
        src="https://i.pravatar.cc/300"
        alt="avatar"
        className="rounded-full relative -left-[-5px] ml-[-10px] z-1"
        height={25}
        width={25}
      />
    </div>
  );
}

export default Avatar;
