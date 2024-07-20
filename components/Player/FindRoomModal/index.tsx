import React from 'react'
import Devices from '../Devices'
import { FindRoomService } from '@/services'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  CircularProgress,
} from '@mui/material'
import {getDifferenceInMinutes} from '../../../app/utils/DateUtils'
import { DeviceMapping } from '../Devices/deviceMapping'
import { getFacilitiesByOrgId } from '@/services/FacilitiesService'
import MeetingDailer from '../MeetingDailer'

function DeviceIcon({ size, deviceIcon }) {
  let icon = DeviceMapping.find((device) =>
    device.device.includes(deviceIcon)
  )?.icon;
  let deviceImage = `../pixroom/assets/images/${icon}.png`;
  return (
    <img
      src={deviceImage}
      className={`${
        size === "SMALL" ? "h-[16px]" : "h-[25px]"
      } px-2 cursor-pointer`}
    />
  );
}
function FindRoomTable() {
  const [loading, setLoading] =React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  let [rooms, setRooms] = React.useState([])
  const [facilities, setFacilities] = React.useState<string[]>([]);
  console.log("orgId", '42');
  React.useEffect(() => {
    let getFacilities = async () => {
      let result = await getFacilitiesByOrgId({ orgId: '46' });
      console.log("result", result.facilities);
      if (result != undefined) {
        console.log(result.facilities);
        setFacilities(result.facilities);
      } else {
        setFacilities(["chair", "wifi projector"]);
      }
    };
    getFacilities();
  }, []);

  React.useEffect(() => {
    let fetchRooms = async () => {
      try {
        let roomsResponse = await FindRoomService.getFindRoomDetails({
          startDate: '2024-05-11 05:24:17',
          endDate: '2024-05-11 05:24:17',
          orgId: 44,
          buildingId: 34,
          floorId: 43,
        })
        // console.log('rooms', roomsResponse)
        if (roomsResponse.statusCode === 200) {
          setRooms(roomsResponse.data)
          setLoading(false)
        } else {
          setRooms([])
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  if (loading) {
    return (
      <div className="max-h-[380px] overflow-auto mt-6">
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="max-h-[380px] overflow-auto mt-6">
      <div className="flex items-center justify-center h-[20%] rounded-b-[40px]">
         {/* <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"Book a Room"}
          >
            <MeetingDailer setSuccess={setSuccess} setMessage={setMessage}  onClose={() => setShowModal(false)}/>
          </Modal> */}
          </div>
        <TableContainer component={Paper}>
          <Table className="p-4" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Meeting Room</TableCell>
                <TableCell className="font-bold">Facilities</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((roomDetails:FindRoom, idx) => (
                <TableRow
                  key={idx}
                  style={{ backgroundColor: idx % 2 === 0 ? 'slategray' : 'white' }}
                >
                  <TableCell component="th" scope="row">
                    <div
                      className={`h-[25px] w-[25px] ${
                        idx % 2 === 0 ? 'bg-[#ff544f]' : 'bg-[#58968b]'
                      } rounded-full mr-2`}
                    >
                    <div style={{paddingLeft:"32px",paddingTop:"2px"}}>
                    {roomDetails.spaceName}</div></div>
                  </TableCell>
                  <TableCell> 
                  <div    className={`flex items-center`}>
                      {loading ? (
                        <div>Loading Facilities...</div>
                      ) : !facilities ? (
                        <div>No Facilities</div>
                      ) : (
                        facilities.map((device) => (
                          <div>              
                            <DeviceIcon
                              size={'SMALL'}
                              deviceIcon={device}
                            />
                          </div>
                        ))
                      )}
                   </div> 
                 </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default FindRoomTable
