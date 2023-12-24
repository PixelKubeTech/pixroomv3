import React, { ReactEventHandler, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ show, onClose, children, title }: any) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/75">
      <div className="bg-white min-w-[650px] min-h-[500px] rounded-[15px] p-4">
        <div className="flex justify-between items-center">
          <p className="ml-4 font-bold">
            {title}
            </p>
          <img
            src={"../assets/images/X_BTN.png"}
            className={"cursor-pointer "}
            height={40}
            width={40}
            onClick={onClose}
          />
            {/* <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div> */}
        </div>

        <div>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};
