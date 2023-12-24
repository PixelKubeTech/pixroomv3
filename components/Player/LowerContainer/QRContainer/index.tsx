import FindRoomTable from "../../../../components/Player/FindRoomModal";
import { Modal } from "../../../../components/Player/Modals/FindRoom";
import React, { useState } from "react";

function ORContainer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full flex flex-col w-[70%] p-6 justify-between mb-10">
      <div className={"self-end"}>
        <img
        className="cursor-pointer"
          height={54}
          width={54}
          src= {"../../../../assets/images/Search_BTN.png"}
          onClick={() => setShowModal(!showModal)}
        />
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal} title = {"Find a Room"}>
        <FindRoomTable />
      </Modal>
      <div className="ml-20">
        <h1
          className="text-7xl font-bold
            "
        >
          Room available
        </h1>
        <p className="text-7xl font-light">until 12:00am</p>
      </div>
      <div className="self-end mb-10 mr-20">
        <img height={150} width={150} src={"../../../../assets/images/qr.png"} />
      </div>
    </div>
  );
}

export default ORContainer;
