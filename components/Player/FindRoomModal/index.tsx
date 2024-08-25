import React, { useContext } from "react";
import { FindRoomService } from "@/services";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  CircularProgress,
} from "@mui/material";
import MeetingDailer from "../MeetingDailer";
import { Modal } from "../Modals/FindRoom";
import { spaceResourceConfig } from "../Config/config";
import { MeetingInfoContext } from "@/app/context/MeetingContext";
import dayjs from "dayjs";

export interface Message {
  serverity: string;
  text?: string;
}

function FindRoomTable() {
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedSpaceDetail, setSelectedSpaceDetail] = React.useState(
    {} as RoomDetails
  );
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState<Message>();
  let [rooms, setRooms] = React.useState<FindRoom[]>([]);
  const meetingInfo: any = useContext(MeetingInfoContext);

  React.useEffect(() => {
    let fetchRooms = async () => {
      try {
        const startDate = dayjs();
        let roomsResponse = await FindRoomService.getFindRoomDetails({
          startDate: startDate.format("YYYY-MM-DD HH:mm:01"),
          endDate: startDate.add(1, "hour").format("YYYY-MM-DD HH:mm:00"),
          orgId: meetingInfo.spaceInfo.orgId,
          buildingId: meetingInfo.spaceInfo.buildingId,
          floorId: meetingInfo.spaceInfo.floorId,
        });
        // console.log('rooms', roomsResponse)
        if (roomsResponse.length > 0) {
          setRooms(roomsResponse);
          setLoading(false);
        } else {
          setRooms([]);
          setLoading(false);
        }
      } catch (error) {
        setRooms([]);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="max-h-[380px] overflow-auto mt-6">
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="max-h-[380px] overflow-auto mt-6">
        <div className="flex items-center justify-center h-[20%] rounded-b-[40px]">
        </div>
        <TableContainer component={Paper}>
          <Table className="p-4" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Meeting Room</TableCell>
                <TableCell className="font-bold">Floor Name</TableCell>
                <TableCell className="font-bold">Facilities</TableCell>
                <TableCell className="font-bold"> Available For(minutes)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((roomDetails: FindRoom, idx) => (
                <TableRow
                  key={idx}
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    setSelectedSpaceDetail(roomDetails.value);
                    setShowModal(true);
                  }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex">
                      <div
                        className={`h-[25px] w-[25px] bg-[#58968b] rounded-full mr-2`}
                      ></div>
                      <div style={{ paddingTop: "2px" }}>{roomDetails.key}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center`}>
                      {roomDetails.value.floorName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center`}>
                      {roomDetails.value.spaceResources.length === 0 ? (
                        <div>No Facilities</div>
                      ) : (
                        spaceResourceConfig
                          .filter((spaceResource) => {
                            return roomDetails.value.spaceResources?.some(
                              (meetingSpaceResource: ISpaceResource) =>
                                meetingSpaceResource.resourceId ===
                                spaceResource.resourceId
                            );
                          })
                          .map((spaceResource, index: number) => (
                            <div key={index}>{spaceResource.resourceIcon}</div>
                          ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center`}>
                      {roomDetails.value.availableIn}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"Book a Room"}
          >
            <MeetingDailer
              setSuccess={setSuccess}
              setMessage={setMessage}
              onClose={() => setShowModal(false)}
              spaceId={selectedSpaceDetail.spaceId}
              buildingId={selectedSpaceDetail.buildingId}
              floorId={selectedSpaceDetail.floorId}
              orgId={selectedSpaceDetail.orgId}
              floorName={selectedSpaceDetail.floorName}
              handleClick={null}
              maxAvailableTime={
                selectedSpaceDetail.availableIn
                  ? selectedSpaceDetail.availableIn
                  : 60
              }
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default FindRoomTable;
